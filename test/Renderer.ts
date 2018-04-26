import { test } from 'ava';
import { Renderer as IRenderer, AnimatableOnScroll, Updatable } from '../lib';
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

    new Renderer([Object.create(container), Object.create(container)]).render(
      Date.now()
    );

    return result;
  };

  t.is(await page.evaluate(cb), 2);
});

test('should create animation loop', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    (window as any).result = 0;

    const container: AnimatableOnScroll & Updatable = {
      animate() {
        (window as any).result += 1;
      },
      update() {}
    };

    new Renderer([container]).loop();
  });

  await page.waitFor(100);

  t.true(await page.evaluate(() => (window as any).result > 1));
});

test('should always provide time difference', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    (window as any).isTriggered = false;
    (window as any).wasUndefined = false;

    const container: AnimatableOnScroll & Updatable = {
      animate(scroll, timeDiff) {
        if (timeDiff !== undefined) {
          (window as any).isTriggered = true;
        } else {
          (window as any).wasUndefined = true;
        }
      },
      update() {}
    };

    new Renderer([container]).loop();
  });

  await page.waitFor(100);

  t.true(
    await page.evaluate(
      () => (window as any).isTriggered && !(window as any).wasUndefined
    )
  );
});

test('time difference should be meaningful', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    (window as any).result = true;

    const container: AnimatableOnScroll & Updatable = {
      animate(scroll, timeDiff) {
        if (
          typeof timeDiff !== 'number' ||
          isNaN(timeDiff) ||
          timeDiff < 0 ||
          timeDiff > 10000
        ) {
          (window as any).result = `Difference was ${timeDiff}`;
        }
      },
      update() {}
    };

    new Renderer([container]).loop();
  });

  await page.waitFor(100);

  t.true(await page.evaluate(() => (window as any).result));
});
