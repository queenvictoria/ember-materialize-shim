'use strict';

const { readdirSync } = require('fs');
const { resolve, dirname } = require('path');
const { equal: assertEqual } = require('assert');

let materializePaths = null;
let fontPaths = null;

function determineMaterializePaths() {
  const jsFile = require.resolve('materialize-css');
  const jsDir = dirname(jsFile);
  const rootDir = dirname(require.resolve('materialize-css/package.json'));
  const mPackage = require('materialize-css/package.json');
  assertEqual(typeof mPackage.sass, 'string',
    `Failed to find Materialize SASS path via its (package.json).sass property (=${mPackage.sass}).`);
  const relativeSassFile = mPackage.sass;
  const sassFile = resolve(rootDir, relativeSassFile);
  const sassDir = dirname(sassFile);

  return {
    jsDir,
    jsFile,
    rootDir,
    sassDir,
    sassFile
  };
}


function getMaterializePaths() {
  if (!materializePaths) {
    materializePaths = determineMaterializePaths();
  }
  return materializePaths;
}


function determineFontPaths() {
  // TODO: Don't rely on fonts being bundled with materialize
  const rootDir = resolve(getMaterializePaths().jsDir, '..', 'fonts');
  // TODO: Maybe use glob here instead?
  const robotoFiles = readdirSync(resolve(rootDir, 'roboto'));
  return {
    rootDir,
    robotoFiles
  };
}

function getFontPaths() {
  if (!fontPaths) {
    fontPaths = determineFontPaths();
  }
  return fontPaths;
}

module.exports = {
  determineFontPaths,
  determineMaterializePaths,
  getFontPaths,
  getMaterializePaths
};
