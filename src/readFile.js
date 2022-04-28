import fs from 'fs';
import path from 'path';

export default (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8');
