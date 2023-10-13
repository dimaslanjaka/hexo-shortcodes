import gitEmbed from 'git-embed';

gitEmbed(
  'https://github.com/dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158'
).then((response) => {
  console.log(response.result);
});
