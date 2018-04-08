import { test } from 'ava';
import { Position as IPosition } from '../lib';
import { newPage } from './env';

declare const Position: typeof IPosition;

test('should get position', async t => {
  const scrolls = [
    0, // above
    100, // start
    150, // middle
    200, // end
    300 // under
  ];

  const page = await newPage();

  await page.evaluate(
    (start: number, end: number) => {
      (window as any).pos = new Position(document.body, () => start, () => end);
    },
    scrolls[1],
    scrolls[3]
  );

  await page.waitFor(100);

  const cb = (positions: number[]) =>
    JSON.stringify(
      positions.map(scroll => (window as any).pos.getPosition(scroll))
    );

  t.is(await page.evaluate(cb, scrolls), JSON.stringify([0, 0, 0.5, 1, 1]));
});

test('should update', async t => {
  const positions = [100, 100];
  const page = await newPage();

  await page.evaluate(() => {
    (window as any).pos = new Position(document.body, () => 0, () => 0);
  });

  await page.waitFor(100);

  await page.evaluate(
    (to: number, from: number) => {
      const position: IPosition = (window as any).pos;
      position.fromFn = () => from;
      position.toFn = () => to;
      position.update();
    },
    positions[0],
    positions[1]
  );

  await page.waitFor(100);

  const cb = () => {
    const position: IPosition = (window as any).pos;
    return JSON.stringify([position.from, position.to]);
  };

  t.is(await page.evaluate(cb), JSON.stringify(positions));
});
