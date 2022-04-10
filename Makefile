install:
	npm ci

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8	
		
coverage:
	npx jest --coverage

gendiff:
	node bin/gendiff.js			