export declare function shortcodeParser(str: string): {
    tagName: string;
    attributes: {
        key: string;
        value: string;
    }[];
};
/**
 * shortcode result to hexo tag attributes array format
 * @param result
 * @returns
 */
export declare function shortcodeParserResultToArrayAttrParam(result: ReturnType<typeof shortcodeParser>): string[];
