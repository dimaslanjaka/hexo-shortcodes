export type RSSType = {
    [key: string]: any;
    items: Array<{
        [key: string]: any;
        title: string;
        link: string;
        'content:encoded': string;
        'content:encodedSnippet': string;
        comments?: string;
        content: string;
        contentSnippet: string;
        guid: string;
        categories: Array<{
            _: string;
            $: {
                domain: string;
            };
        }>;
        isoDate: string;
        pubDate: string;
        generator: string;
    }>;
    feedUrl: string;
    image: {
        link: string;
        url: string;
        title: string;
    };
    paginationLinks: {
        self: string;
    };
    title: string;
    description: string;
    pubDate: string;
    generator: string;
    link: string;
};
export type rssreaderOptions = {
    limit?: string;
    debug?: string;
};
export declare function rssreader(hexo: import('hexo')): {
    callback: (args: any[], template?: string) => Promise<string>;
};
