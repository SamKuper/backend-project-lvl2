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

const table = [
  [jsonBefore, jsonAfter],
  [yamlBefore, yamlAfter],
  [iniBefore, iniAfter],
];

describe.each(table)('gendiff', (a, b) => {
  test('object', () => {
    expect(compare(a, b)).toBe(resultObj);
  });
  test('plain', () => {
    expect(compare(a, b, 'plain')).toBe(resultPlain);
  });
  test('json', () => {
    expect(compare(a, b, 'json')).toBe(resultJSON);
  });
});
