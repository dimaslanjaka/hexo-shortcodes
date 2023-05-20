/**
 * parse shortcode parameter
 * @param args
 */
export declare function parseTagParameter<T>(args: string[] | string, ...argv: string[]): {
    sourceFile: string;
} & Record<string, string> & T;
