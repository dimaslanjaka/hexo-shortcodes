/**
 * parse shortcode parameter
 * @param args
 */
export declare function parseTagParameter<T>(args: string[] | string, ...argv: string[]): {
    lang: string;
    from: number;
    to: number;
    sourceFile: string;
} & Record<string, string | number> & T;
