const fs = require('fs');
const path = require('path');
const compare = require('../src');

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const jsonBefore = getPath('before.json');
const jsonAfter = getPath('after.json');

const yamlBefore = getPath('before.yml');
const yamlAfter = getPath('after.yml');

const iniBefore = getPath('before.ini');
const iniAfter = getPath('after.ini');

const result = fs.readFileSync(getPath('res.txt'), 'utf-8');

describe('compare', () => {
  test('flatJSON', () => {
    expect(compare(jsonBefore, jsonAfter)).toBe(result);
  });
  test('flatYaml', () => {
    expect(compare(yamlBefore, yamlAfter)).toBe(result);
  });
  test('flatIni', () => {
    expect(compare(iniBefore, iniAfter)).toBe(result);
  });
});
