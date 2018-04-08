import { test } from 'ava';
import { Container as IContainer } from '../lib';
import { newPage } from './env';

declare const Container: typeof IContainer;

test('should animate parts', async t => {
  const page = await newPage();

  const cb = () => {
    let result = 0;

    const position = {
      getPosition(s: number) {
        return s;
      },
      update() {}
    };

    const part = {
      update() {},
      animate() {
        result += 1;
      }
    };

    new Container(position, [
      Object.create(part),
      Object.create(part)
    ]).animate();

    return result;
  };

  t.is(await page.evaluate(cb), 2);
});

test('should send progress to animation', async t => {
  const page = await newPage();

  const cb = () => {
    let result = 0;

    const position = {
      getPosition(s: number) {
        return s;
      },
      update() {}
    };

    const part = {
      update() {},
      animate(progress: number) {
        result = progress;
      }
    };

    scrollTo(0, 2);

    new Container(position, [part]).animate();

    return result;
  };

  t.is(await page.evaluate(cb), 2);
});

test('should not send progress to animation, while progress equal to last progress', async t => {
  const page = await newPage();

  const cb = () => {
    let result = 0;

    const position = {
      getPosition(s: number) {
        return s;
      },
      update() {}
    };

    const part = {
      update() {},
      animate(progress: number) {
        result += progress;
      }
    };

    const container = new Container(position, [part]);

    scrollTo(0, 2);

    container.animate();
    container.animate();

    return result;
  };

  t.is(await page.evaluate(cb), 2);
});

test('should update parts and position', async t => {
  const page = await newPage();

  const cb = () => {
    let result = 0;

    const position = {
      getPosition(s: number) {
        return s;
      },
      update() {
        result += 1;
      }
    };

    const part = {
      animate() {},
      update() {
        result += 1;
      }
    };

    new Container(position, [
      Object.create(part),
      Object.create(part)
    ]).update();

    return result;
  };

  t.is(await page.evaluate(cb), 3);
});
