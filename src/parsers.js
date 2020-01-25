const yaml = require('js-yaml');
const ini = require('ini');

module.exports = {
  '.json': (file) => JSON.parse(file),
  '.yml': (file) => yaml.safeLoad(file),
  '.ini': (file) => ini.decode(file),
};
