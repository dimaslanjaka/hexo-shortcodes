/**
 * parse shortcode parameter
 * @param args
 */
export declare function parseTagParameter<T>(args: string[] | string, ...varArgs: string[]): ({
    sourceFile: string;
} & Record<string, string>) & T;
