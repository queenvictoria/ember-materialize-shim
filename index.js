/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const existsSync = require('exists-sync');

/**
 * @type {string}
 */
const MATERIALIZE_JS_PATH = require.resolve('materialize-css');

module.exports = {
  name: 'ember-materialize-shim',
  included(appOrAddon) {
    this._super.included(appOrAddon);
    let app = appOrAddon;
    if (typeof appOrAddon.import !== 'function' && appOrAddon.app) {
      app = appOrAddon.app;
    }
    this.app = app;

    if (!(app.options['materialize-shim'] || {}).omitJS) {
      app.import('vendor/materialize/materialize.js');
      app.import('vendor/materialize-shim.js', {
        exports: {
          materialize: ['default']
        }
      });
    }
  },

  treeForVendor(tree) {
    let trees = [];

    if (tree) {
      trees.push(tree);
    }

    let materializePath = path.join(MATERIALIZE_JS_PATH, '..');
    if (existsSync(materializePath)) {
      let materializeJsTree = fastbootTransform(
        new Funnel(materializePath, {
          files: ['materialize.js'],
          destDir: 'materialize'
        })
      );
      let materializeFontsTree = fastbootTransform(
        new Funnel(path.join(materializePath, '..', 'fonts'), {
          destDir: 'fonts'
        })
      );

      trees.push(materializeJsTree);
      trees.push(materializeFontsTree);
    } else {
      throw new Error(`Could not find materialize JS at ${materializePath}`);
    }

    return new Merge(trees);
  }
};
