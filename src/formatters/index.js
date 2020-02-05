const getPlain = require('./toPlain.js');
const getObject = require('./toObject.js');

const render = {
  object: (ast) => getObject(ast),
  plain: (ast) => getPlain(ast),
};

module.exports = (ast, format) => render[format](ast);
