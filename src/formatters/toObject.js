import { flattenDeep, isObject } from 'lodash';

const getSpaces = (i, flagSize = 2, stepSize = 4) => (
  ' '.repeat(stepSize * i - flagSize));

const toString = (obj, depth) => {
  const keys = Object.keys(obj);
  return keys.map((key) => (isObject(obj[key])
    ? ['{', `${getSpaces(depth)}  ${key}: `,
      `${toString(obj[key], depth + 1)}`, `${getSpaces(depth)}}`].join('\n')
    : ['{', `${getSpaces(depth)}  ${key}: ${obj[key]}`,
      `${getSpaces(depth - 1, 0)}}`].join('\n')));
};

const buildLine = (depth, name, value, flag) => {
  const stringValue = isObject(value) ? toString(value, depth + 1) : value;
  const str = `${getSpaces(depth)}${flag} ${name}: ${stringValue}`;
  return str;
};

const types = {
  added: (depth, node) => {
    const { name, newValue } = node;
    return buildLine(depth, name, newValue, '+');
  },
  removed: (depth, node) => {
    const { name, oldValue } = node;
    return buildLine(depth, name, oldValue, '-');
  },
  changed: (depth, node) => [types.added(depth, node), types.removed(depth, node)],
  stable: (depth, node) => {
    const { name, value } = node;
    return buildLine(depth, name, value, ' ');
  },
  nested: (depth, node, fn) => {
    const { name, children } = node;
    return [`${getSpaces(depth)}  ${name}: {`, fn(children, depth + 1),
      `${getSpaces(depth, 0)}}`];
  },
};

const render = (ast) => {
  const fn = (arr, depth) => arr.map((node) => types[node.type](depth, node, fn));
  const begin = 1;
  const rendered = flattenDeep(fn(ast, begin)).join('\n');
  return `{\n${rendered}\n}\n`;
};

export default render;
