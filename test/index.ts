import { test } from 'ava';
import { launch } from 'puppeteer';
import { globs } from './env';
import './Position';
import './Renderer';
import './Container';
import './Animation';

test.before(async () => {
  globs.browser = await launch();
});

test.after('cleanup', async () => {
  await globs.browser.close();
});
