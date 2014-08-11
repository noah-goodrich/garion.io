var dependable = require('dependable');
var container = dependable.container;
var local = require('./local.config.js');

container.register('Promise', function() {
  return require('bluebird');
});
container.register('reheat', function() {
  return require('reheat');
});
container.register('rethink', function() {
  return require('rethinkdb');
});

container.register('db', function(reheat) {
  return new reheat.Connection();
});

module.exports = container;
