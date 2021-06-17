import * as fs from 'fs';
import * as util from 'util'
 
const writeFile = util.promisify(fs.writeFile);
 
export default function touch(path: string) {
  writeFile(path, 'This is a content.')
    .then(() => {
      console.log('File created successfully');
    })
    .catch(error => console.error(error));
}
