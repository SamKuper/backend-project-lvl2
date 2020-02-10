import fs from 'fs';
import path from 'path';
import parser from './parsers';
import getAst from './buildAst';
import render from './formatters';

const getObject = (file, format) => parser(file, format);
const getFormat = (str) => path.extname(str).split('').slice(1).join('');

export default (filePath1, filePath2, outputFormat = 'object') => {
  const firstFile = fs.readFileSync(filePath1, 'utf-8');
  const secondFile = fs.readFileSync(filePath2, 'utf-8');
  const format1 = getFormat(filePath1);
  const format2 = getFormat(filePath2);
  const firstConfig = getObject(firstFile, format1);
  const secondConfig = getObject(secondFile, format2);
  const diff = getAst(firstConfig, secondConfig);
  return render(diff, outputFormat);
};
