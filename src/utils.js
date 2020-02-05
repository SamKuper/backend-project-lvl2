const flatten = (a) => a.reduce((acc, n) => (Array.isArray(n)
  ? [...acc, ...flatten(n)] : [...acc, n]), []);

module.exports = flatten;
