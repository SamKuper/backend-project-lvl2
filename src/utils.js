const flatten = (a) => a.reduce((acc, n) => (typeof n === 'object'
  ? [...acc, ...flatten(n)] : [...acc, n]), []);

module.exports = flatten;
