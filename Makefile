install:
	npm ci

lint:
	npx eslint .

jest:
	npx jest
		
coverage:
	npx jest --coverage

gendiff:
	node bin/gendiff.js			