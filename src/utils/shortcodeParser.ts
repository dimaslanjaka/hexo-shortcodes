export function shortcodeParser(str: string) {
  /** shortcode tag name */
  let tagName = '';
  const attributes = [] as { key: string; value: string }[];

  // https://regex101.com/r/XoeXnw/6
  const regex = /{%\s([\w]{1,100})\s([^%}]+)%}/gm;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    tagName = m[1] || '';
    const str2 = m[2] || '';
    if (str2.length > 0) {
      const r =
        /(\w+)[=:]["']?((?:.(?!["']?\s+(?:\S+)[=:]|\s*\/?[%}]))+.)(?:["'])|(\w+)[=:]["']?((?:.(?!["']?\s+(?:\S+)[=:]|\s*\/?[%}]))+.)["']?/gm;
      let mm: RegExpExecArray | null;

      while ((mm = r.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (mm.index === r.lastIndex) {
          r.lastIndex++;
        }

        const regex1Found = typeof mm[1] != 'undefined' && typeof mm[2] != 'undefined';
        if (regex1Found) {
          attributes.push({ key: mm[1], value: mm[2] });
        } else {
          attributes.push({ key: mm[3], value: mm[4] });
        }

        // The result can be accessed through the `m`-variable.
        // mm.forEach((match, groupIndex) => {
        //   console.log(`Found match, group ${groupIndex}: ${match}`);
        // });
      }
    }
  }

  return { tagName, attributes };
}

/**
 * shortcode result to hexo tag attributes array format
 * @param result
 * @returns
 */
export function shortcodeParserResultToArrayAttrParam(result: ReturnType<typeof shortcodeParser>) {
  const { attributes } = result;
  /** array of key:value */
  const arrayResult = [] as string[];

  for (let i = 0; i < attributes.length; i++) {
    const attr: { [key: string]: string } & (typeof attributes)[number] = attributes[i];
    arrayResult.push(`${attr.key}:${attr.value}`);
  }

  return arrayResult;
}
