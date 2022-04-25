import fs from 'fs';
import path from 'path';

export default (file) => fs.readFileSync(path.resolve(process.cwd(), '../__fixtures__', file), 'utf-8');
