install-deps:
	npm ci

lint:
	npx eslint .

jest:
	npx jest
		
coverage:
	npx jest --coverage		