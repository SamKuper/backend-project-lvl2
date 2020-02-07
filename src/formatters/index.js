import getPlain from './toPlain';
import getObject from './toObject';

const render = {
  object: (ast) => getObject(ast),
  plain: (ast) => getPlain(ast),
};

export default (ast, format) => render[format](ast);
