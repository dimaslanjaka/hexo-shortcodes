import { shortcodeParser, shortcodeParserResultToArrayAttrParam } from '../src/utils/shortcodeParser';

const contents = [
  '{% github repo:"value with space" key:"valueWithoutSpace" %}',
  '{% github repo:value key:keyValue %}'
];

contents.forEach((str) => {
  console.log('\n' + str + '\n');

  const parse = shortcodeParser(str);
  const arr = shortcodeParserResultToArrayAttrParam(parse);
  console.log(arr);
});
