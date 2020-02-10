import fs from 'fs';
import path from 'path';
import compare from '../src';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const getResult = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');

let resultObj;
let resultPlain;
let resultJSON;

const table = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];

beforeEach(() => {
  resultObj = getResult('resObject.txt');
  resultPlain = getResult('resPlain.txt');
  resultJSON = getResult('resJSON.txt');
});

describe.each(table)('gendiff', (a, b) => {
  test('object', () => {
    expect(compare(getPath(a), getPath(b))).toBe(resultObj);
  });
  test('plain', () => {
    expect(compare(getPath(a), getPath(b), 'plain')).toBe(resultPlain);
  });
  test('json', () => {
    expect(compare(getPath(a), getPath(b), 'json')).toBe(resultJSON);
  });
});
