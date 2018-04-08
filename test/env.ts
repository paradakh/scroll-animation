import { Page, Browser } from 'puppeteer';
const packageConf = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const memFs = require('memory-fs');
const fs = require('fs');

// variables for tests
export interface Globs {
  browser: any | Browser;
}

export const globs: Globs = {
  browser: undefined
};

// create bundle and put it to memory
const mFs = new memFs();

const webpackConf = {
  entry: path.resolve(__dirname, '..', packageConf.main),
  output: {
    path: '/test',
    filename: 'app.js',
    library: 'testLib'
  }
};

mFs.mkdirSync(webpackConf.output.path);

const compiler = webpack(webpackConf);

compiler.outputFileSystem = mFs;
compiler.run();

// create page with lib for testing
export const newPage = async () => {
  const page = await globs.browser.newPage();
  await page.goto('about:blank');
  await page.setViewport({
    width: 1280,
    height: 720
  });

  await page.addScriptTag({
    content: mFs.readFileSync(
      path.resolve(webpackConf.output.path, webpackConf.output.filename),
      'utf8'
    )
  });

  await page.addScriptTag({
    content: `
      const lib = ${webpackConf.output.library};
      
      for (let mod in lib) {
        window[mod] = lib[mod];
      }
      
      document.body.style.height = '5000px';
    `
  });

  return page;
};
