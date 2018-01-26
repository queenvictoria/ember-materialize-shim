/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const existsSync = require('exists-sync');

const FONT_FILES = [
  'Roboto-Thin.woff2',
  'Roboto-Thin.woff',
  'Roboto-Thin.ttf',
  'Roboto-Light.woff2',
  'Roboto-Light.woff',
  'Roboto-Light.ttf',
  'Roboto-Regular.woff2',
  'Roboto-Regular.woff',
  'Roboto-Regular.ttf',
  'Roboto-Medium.woff2',
  'Roboto-Medium.woff',
  'Roboto-Medium.ttf',
  'Roboto-Bold.woff2',
  'Roboto-Bold.woff',
  'Roboto-Bold.ttf'
];

module.exports = {
  name: 'ember-materialize-shim',
  included(appOrAddon) {
    this._super.included(appOrAddon);
    let app = appOrAddon;
    if (typeof appOrAddon.import !== 'function' && appOrAddon.app) {
      app = appOrAddon.app;
    }
    this.app = app;

    for (let i = 0; i < FONT_FILES.length; i++) {
      app.import(`node_modules/roboto-fontface/fonts/roboto/${FONT_FILES[i]}`, {
        destDir: 'assets'
      });
    }

    if (!(app.options['materialize-shim'] || {}).omitJS) {
      app.import('vendor/fastboot-transformed/materialize/materialize.js');
      app.import('vendor/fastboot-transformed/materialize-shim.js');
    }
  },

  treeForVendor(tree) {
    const trees = [];

    if (tree) {
      trees.push(tree);
    }

    const materializePath = path.join(this.project.root, 'node_modules', 'materialize-css', 'dist', 'js');
    if (existsSync(materializePath)) {
      const materializeTree = fastbootTransform(new Funnel(materializePath, {
        files: ['materialize.js'],
        destDir: 'fastboot-transformed/materialize'
      }));

      trees.push(materializeTree);
    }

    const vendorPath = path.join(this.project.root, 'vendor');
    trees.push(fastbootTransform(new Funnel(vendorPath, {
      files: ['materialize-shim.js'],
      destDir: 'fastboot-transformed'
    })));

    return new Merge(trees, { overwrite: false });
  }
};
