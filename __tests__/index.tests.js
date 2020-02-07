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

describe('gendiff', () => {
  describe('objectFormat', () => {
    test('JSON', () => {
      expect(compare(jsonBefore, jsonAfter)).toBe(resultObj);
    });
    test('yaml', () => {
      expect(compare(yamlBefore, yamlAfter)).toBe(resultObj);
    });
    test('ini', () => {
      expect(compare(iniBefore, iniAfter)).toBe(resultObj);
    });
  });
  describe('plainFormat', () => {
    test('JSON', () => {
      expect(compare(jsonBefore, jsonAfter, 'plain')).toBe(resultPlain);
    });
    test('yaml', () => {
      expect(compare(yamlBefore, yamlAfter, 'plain')).toBe(resultPlain);
    });
    test('ini', () => {
      expect(compare(iniBefore, iniAfter, 'plain')).toBe(resultPlain);
    });
  });
});
