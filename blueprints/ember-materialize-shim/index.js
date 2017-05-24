/* eslint-env node*/
module.exports = {
  description: 'ember-materialize-shim installation blueprint',
  normalizeEntityName() {},

  beforeInstall() {
    return this.addBowerPackageToProject('materialize', '0.97.7').then(function() {
      return this.addAddonsToProject({
        packages: [{
          name: 'ember-cli-sass',
          target: '~5.4.0'
        }, {
          name: 'ember-material-design-icons-shim',
          target: '~0.1.9'
        }]
      });
    }.bind(this));
  }
};
