import { describe, expect, it } from '@jest/globals';
import { parseTagParameter } from '../src/parseTagParameter';

describe('parse tag parameter', () => {
  it('should be valid', () => {
    [
      `lang:javascript 'fixtures/test.js'`,
      `lang:javascript 'fixtures/file test.js'`,
      `'../fixtures/include two.txt'`,
      `lang:javascript from:3 to:3 test.js`,
      `lang:javascript from:5 test.js`,
      `from:5 test.js`
    ].forEach((str) => {
      if (str.length > 0) {
        const parse = parseTagParameter(str.trim());
        expect(parse).toHaveProperty('sourceFile');
        expect(typeof parse.sourceFile === 'string' && parse.sourceFile.length > 0).toBeTruthy();
      }
    });
  });
});
