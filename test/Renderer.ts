import { test } from 'ava';
import { Renderer as IRenderer, AnimatableOnScroll } from '../lib';
import { newPage } from './env';

declare const Renderer: typeof IRenderer;

test('should evaluate animate on containers', async t => {
  const page = await newPage();

  const cb = () => {
    let result = 0;

    const container: AnimatableOnScroll = {
      animate() {
        result += 1;
      }
    };

    new Renderer([Object.create(container), Object.create(container)]).render();

    return result;
  };

  t.is(await page.evaluate(cb), 2);
});

test('should create animation loop', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    (window as any).result = 0;

    const container: AnimatableOnScroll = {
      animate() {
        (window as any).result += 1;
      }
    };

    new Renderer([container]).loop();
  });

  await page.waitFor(100);

  t.true(await page.evaluate(() => (window as any).result > 1));
});
