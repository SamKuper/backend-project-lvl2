import getPlain from './toPlain';
import getObject from './toObject';

const renders = {
  object: getObject,
  plain: getPlain,
  json: JSON.stringify,
};

export default (ast, format) => renders[format](ast);
