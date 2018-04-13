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
