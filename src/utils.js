const flayt = (a) => a.reduce((acc, n) => (typeof n === 'object'
  ? [...acc, ...flayt(n)] : [...acc, n]), []);

module.exports = flayt;
