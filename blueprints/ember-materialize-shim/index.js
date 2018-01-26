/* eslint-env node*/
module.exports = {
  description: 'ember-materialize-shim installation blueprint',
  normalizeEntityName() {},

  beforeInstall() {
    return this.addAddonsToProject({
      packages: [{
        name: 'materialize-css',
        target: '1.0.0-alpha.3'
      },{
        name: 'roboto-fontface',
        target: '^0.8.0'
      },{
        name: 'ember-cli-sass',
        target: '^6.2.0'  // TODO: Update to next version after 7.1.5 once released (waiting for node 4.x bug fix)
      }, {
        name: 'ember-material-design-icons-shim',
        target: '^0.1.12'
      }]
    });
  }
};
