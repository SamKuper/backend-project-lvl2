const flatten = require('../utils.js');

const getSpaces = (i) => ('  '.repeat(i));

const toString = (obj, depth) => {
  const keys = Object.keys(obj);
  return keys.map((key) => {
    return typeof obj[key] === 'object'
      ? ['{', `${getSpaces(depth)}  ${key}: `,
      `${toString(obj[key], depth + 1)}`, `${getSpaces(depth)}}`].join('\n') :
      ['{', `${getSpaces(depth)}  ${key}: ${obj[key]}`,
      `${getSpaces(depth)}}`].join('\n');
  });
}

const check = (arg) => (typeof arg === 'object');

const render = (ast) => {
  const types = {
    added: (depth, node) => {
      const { name, newValue } = node;
      return check(newValue)
        ? `${getSpaces(depth)}+ ${name}: ${toString(newValue, depth + 1)}` :
        `${getSpaces(depth)}+ ${name}: ${newValue}`;
    },
    removed: (depth, node) => {
      const { name, oldValue } = node;
      return check(oldValue)
        ? `${getSpaces(depth)}- ${name}: ${toString(oldValue, depth + 1)}` :
        `${getSpaces(depth)}- ${name}: ${oldValue}`;
    },
    changed: (depth, node) => {
      const { name, oldValue, newValue } = node;
      return [types.added(depth, node), types.removed(depth, node)];
    },
    stable: (depth, node) => {
      const { name, value } = node;
      return `${getSpaces(depth)}  ${name}: ${value}`;
    },
    nested: (depth, node, fn) => {
      const { name, children } = node;
      return [`${getSpaces(depth)}  ${name}: {`, fn(children, depth + 1),
        `${getSpaces(depth + 1)}}`];
    },
  }
  const fn = (ast, depth) => ast.map((node) => types[node.type](depth, node, fn));
  const begin = 0;
  const rendered = flatten(fn(ast, begin)).join('\n');
  return `{\n${rendered}\n}\n`;
};

module.exports = render;
