/**
 * parse shortcode parameter
 * @param args
 */
export declare function parseTagParameter(args: string[]): {
    lang: string;
    from: number;
    to: number;
    sourceFile: string;
} & Record<string, string | number>;
