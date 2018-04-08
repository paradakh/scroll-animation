import { test } from 'ava';
import { Animation as IAnimation } from '../lib';
import { newPage } from './env';

declare const Animation: typeof IAnimation;

test('should trigger render method on animate', async t => {
  const page = await newPage();

  const cb = () => {
    let result = false;

    const animation = new Animation(document.body, 0, 1);

    animation.render = () => {
      result = true;
    };

    animation.animate(1);

    return result;
  };

  t.true(await page.evaluate(cb));
});

test('should trigger render method on update', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    (window as any).result = false;

    const animation = new Animation(document.body, 0, 1);

    animation.render = () => {
      (window as any).result = true;
    };

    animation.update();
  });

  await page.waitFor(100);

  t.true(await page.evaluate(() => (window as any).result));
});

test('should trigger update method on resize', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    (window as any).result = false;

    const animation = new Animation(document.body, 0, 1);

    animation.update = () => {
      (window as any).result = true;
    };
  });

  await page.setViewport({ width: 3000, height: 1000 });
  await page.waitFor(100);

  t.true(await page.evaluate(() => (window as any).result));
});

test('should not trigger render method, while progress same as last', async t => {
  const page = await newPage();

  const cb = () => {
    let result = 0;

    const animation = new Animation(document.body, 0, 1);

    animation.render = () => {
      result += 1;
    };

    animation.animate(1);
    animation.animate(1);

    return result;
  };

  t.is(await page.evaluate(cb), 1);
});

test('should have progress same as position', async t => {
  const page = await newPage();
  const position = 0.6;

  const cb = (progress: number) => {
    const animation = new Animation(document.body, 0, 1);
    animation.animate(progress);
    return animation.progress;
  };

  t.is(await page.evaluate(cb, position), position);
});

test('should calc progress', async t => {
  const page = await newPage();
  const cb = () => new Animation(document.body, 0.5, 1).calcProgress(0.75);
  t.is(await page.evaluate(cb), 0.5);
});

test('should return value from option', async t => {
  const page = await newPage();
  const cb = () =>
    new Animation(document.body, 0, 1, {
      testOption: 1
    }).validateOption('testOption', 0);
  t.is(await page.evaluate(cb), 1);
});

test('should return default option value', async t => {
  const page = await newPage();
  const cb = () =>
    new Animation(document.body, 0, 1).validateOption('testOption', 0);
  t.is(await page.evaluate(cb), 0);
});

test('should use easing', async t => {
  const page = await newPage();
  const cb = () =>
    new Animation(document.body, 0, 1, { easing: () => 0 }).calcProgress(0.2);
  t.is(await page.evaluate(cb), 0);
});
