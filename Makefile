install:
	npm install
run:
	npx run babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
test:
	npm test
test-coverage:
	npm run test-coverage
