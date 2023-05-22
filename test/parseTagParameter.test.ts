import { describe, expect, it } from '@jest/globals';
import { parseTagParameter } from '../src/utils/parseTagParameter';
import { testParseArgs } from './parseTagParameter';

describe('parse tag parameter', () => {
  it('should be valid', () => {
    testParseArgs().forEach((o) => {
      const arg = o?.arg;
      const parse = o?.parse;
      if (arg && parse) {
        expect(parse).toHaveProperty('sourceFile');
        expect(typeof parse.sourceFile === 'string' && parse.sourceFile.length > 0).toBeTruthy();
      }
    });
  });

  it('should work with whitespaces', () => {
    const tests = [
      parseTagParameter([`'../fixtures/include two.txt'`, 'lang:javascript', 'from:3', 'to:3']),
      parseTagParameter(`'../fixtures/include two.txt'`, 'lang:javascript', 'from:3', 'to:3')
    ];
    tests.forEach((test) => {
      expect(test).toHaveProperty('sourceFile');
    });
  });
});
