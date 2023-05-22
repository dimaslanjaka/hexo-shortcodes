import { parseTagParameter } from '../src/parseTagParameter';

export function testParseArgs() {
  const varargs = [
    "lang:javascript 'fixtures/test.js'",
    "lang:javascript 'fixtures/file test.js'",
    "'../fixtures/include two.txt'",
    'lang:javascript from:3 to:3 test.js',
    'lang:javascript from:5 test.js',
    'from:5 test.js'
  ].map((arg) => {
    if (arg.length > 0) {
      return { arg, parse: parseTagParameter(arg.trim()) };
    }
  });

  const singleArgs = [
    ['lang:javascript', 'test.js'],
    ['lang:javascript', 'test.js', 'from:7'],
    ['lang:javascript', 'test.js', 'from:7', 'to:10']
  ].map((arg) => {
    if (arg.length > 0) {
      return { arg, parse: parseTagParameter(arg) };
    }
  });

  return [...varargs, ...singleArgs];
}

if (require.main === module) {
  // run only for direct call
  const tests = testParseArgs();
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    if (!test?.parse.sourceFile) {
      console.log(test);
    }
  }
}
