import { test } from 'ava';
import { launch } from 'puppeteer';
import { globs, newPage } from './env';
import './Position';
import './Renderer';
import './Container';
import './Animation';
import * as lib from '../lib';

declare const Renderer: typeof lib.Renderer;
declare const Container: typeof lib.Container;
declare const Position: typeof lib.Position;
declare const Animation: typeof lib.Animation;

test.before(async () => {
  globs.browser = await launch();
});

test.after('cleanup', async () => {
  await globs.browser.close();
});

test('base use case', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    const animation = new Animation(document.body, 0.1, 0.9);

    animation.render = function render() {
      this.style.opacity = `${this.progress}`;
    };

    new Renderer([
      new Container(new Position(document.body, () => 0, () => 100), [
        animation
      ])
    ]).loop();

    window.scrollTo(0, 50);
  });

  await page.waitFor(200);

  t.is(await page.evaluate(() => document.body.style.opacity), '0.5');
});

test('Position should be updated before then Animation', async t => {
  const page = await newPage();

  await page.evaluate(() => {
    class UpdatableAnimation extends Animation {
      update() {
        super.update();
        (window as any).animationUpdateTime = new Date();
      }
    }

    class UpdatablePosition extends Position {
      update() {
        super.update();
        (window as any).positionUpdateTime = new Date();
      }
    }

    new Renderer([
      new Container(new UpdatablePosition(document.body, () => 0, () => 0), [
        new UpdatableAnimation(document.body, 0, 1)
      ])
    ]).loop();
  });

  await page.waitFor(200);

  await page.setViewport({
    width: 400,
    height: 400
  });

  await page.waitFor(200);

  t.true(
    await page.evaluate(
      () =>
        (window as any).animationUpdateTime >=
        (window as any).positionUpdateTime
    )
  );
});
