import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getAst from './buildAst';
import render from './formatters';

const getObject = (filepath) => {
  const format = path.extname(filepath).slice(1);
  const data = fs.readFileSync(filepath, 'utf-8');
  return parse(data, format);
};

export default (filePath1, filePath2, outputFormat = 'object') => {
  const firstObject = getObject(filePath1);
  const secondObject = getObject(filePath2);
  const diffTree = getAst(firstObject, secondObject);
  return render(diffTree, outputFormat);
};
