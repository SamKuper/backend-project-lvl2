import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getAst from './buildAst';
import render from './formatters';

const getObject = (file, format) => parse(file, format);
const getFormat = (str) => path.extname(str).split('').slice(1).join('');

export default (filePath1, filePath2, outputFormat = 'object') => {
  const firstFile = fs.readFileSync(filePath1, 'utf-8');
  const secondFile = fs.readFileSync(filePath2, 'utf-8');
  const firstFileFormat = getFormat(filePath1);
  const secondFileFormat = getFormat(filePath2);
  const firstObject = getObject(firstFile, firstFileFormat);
  const secondObject = getObject(secondFile, secondFileFormat);
  const diffTree = getAst(firstObject, secondObject);
  return render(diffTree, outputFormat);
};
