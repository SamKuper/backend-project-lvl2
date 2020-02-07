import fs from 'fs';
import path from 'path';
import compare from '../src';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const jsonBefore = getPath('before.json');
const jsonAfter = getPath('after.json');

const yamlBefore = getPath('before.yml');
const yamlAfter = getPath('after.yml');

const iniBefore = getPath('before.ini');
const iniAfter = getPath('after.ini');

const resultObj = fs.readFileSync(getPath('resObject.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getPath('resPlain.txt'), 'utf-8');
const resultJSON = fs.readFileSync(getPath('resJSON.txt'), 'utf-8');

describe.each([
  [jsonBefore, jsonAfter, resultObj],
  [yamlBefore, yamlAfter, resultObj],
  [iniBefore, iniAfter, resultObj],
])('objectFormat', (a, b, expected) => {
  test('obj', () => {
    expect(compare(a, b)).toBe(expected);
  });
});

describe.each([
  [jsonBefore, jsonAfter, resultPlain],
  [yamlBefore, yamlAfter, resultPlain],
  [iniBefore, iniAfter, resultPlain],
])('plainFormat', (a, b, expected) => {
  test('plain', () => {
    expect(compare(a, b, 'plain')).toBe(expected);
  });
});

describe.each([
  [jsonBefore, jsonAfter, resultJSON],
  [yamlBefore, yamlAfter, resultJSON],
  [iniBefore, iniAfter, resultJSON],
])('jsonFormat', (a, b, expected) => {
  test('json', () => {
    expect(compare(a, b, 'json')).toBe(expected);
  });
});
