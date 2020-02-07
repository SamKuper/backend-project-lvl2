const getValue = (arg) => (typeof arg === 'object' ? '[complex value]' : arg);

const types = {
  added: (node, path) => `Property '${path}' was added with value: '${getValue(node.newValue)}'`,
  removed: (node, path) => `Property '${path}' was deleted`,
  changed: (node, path) => `Property '${path}' was changed from '${getValue(node.oldValue)}' to '${getValue(node.newValue)}'`,
  nested: (node, path, fn) => fn(node.children, path).filter((n) => n !== '').join('\n'),
  stable: () => '',
};

const getPlain = (ast) => {
  const iter = (arr, path) => (arr.map((node) => {
    const { name, type } = node;
    return path === '' ? types[type](node, name, iter) : types[type](node, `${path}.${name}`, iter);
  }));
  return iter(ast, '').join('\n');
};

export default getPlain;
