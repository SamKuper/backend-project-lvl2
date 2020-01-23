const fs = require('fs');
const path = require('path');
const compare = require('../src');

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('compare', () => {
  test('flatJSON', () => {
    const filepath1 = getPath('before.json');
    const filepath2 = getPath('after.json');
    const result = fs.readFileSync(getPath('res.txt'), 'utf-8');
    expect(compare(filepath1, filepath2)).toBe(result);
  });
});
