const flatten = (a) => a.reduce((acc, n) => (Array.isArray(n)
  ? [...acc, ...flatten(n)] : [...acc, n]), []);

export default flatten;
