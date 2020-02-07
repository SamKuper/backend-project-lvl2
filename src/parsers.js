import yaml from 'js-yaml';
import ini from 'ini';

export default {
  '.json': (file) => JSON.parse(file),
  '.yml': (file) => yaml.safeLoad(file),
  '.ini': (file) => ini.decode(file),
};
