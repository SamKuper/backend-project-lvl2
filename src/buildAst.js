import { union, has, keys } from 'lodash';

const types = [
  {
    type: 'added',
    check: (obj1, obj2, key) => has(obj2, key) && !has(obj1, key),
    build: (obj1, obj2, key) => ({ newValue: obj2[key] }),
  },
  {
    type: 'removed',
    check: (obj1, obj2, key) => !has(obj2, key) && has(obj1, key),
    build: (obj1, obj2, key) => ({ oldValue: obj1[key] }),
  },
  {
    type: 'nested',
    check: (obj1, obj2, key) => has(obj1, key) && has(obj2, key)
      && typeof obj1[key] === 'object' && typeof obj2[key] === 'object',
    build: (obj1, obj2, key, parse) => ({ children: parse(obj1[key], obj2[key]) }),
  },
  {
    type: 'stable',
    check: (obj1, obj2, key) => has(obj1, key) && has(obj2, key) && obj1[key] === obj2[key],
    build: (obj1, obj2, key) => ({ value: obj2[key] }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => has(obj1, key) && has(obj2, key) && obj1[key] !== obj2[key],
    build: (obj1, obj2, key) => ({ oldValue: obj1[key], newValue: obj2[key] }),
  },
];

const getBuildFunction = (...args) => types.find(({ check }) => check(...args));

const getAst = (obj1, obj2) => {
  const allKeys = union(keys(obj1), keys(obj2));
  return allKeys.map((key) => {
    const { type, build } = getBuildFunction(obj1, obj2, key);
    return { name: key, type, ...build(obj1, obj2, key, getAst) };
  });
};

export default getAst;
