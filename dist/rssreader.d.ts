import Hexo from 'hexo';
export type RSSType = {
    items: Array<{
        title: string;
        link: string;
        pubDate: string;
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
export declare function rssreader(hexo: Hexo): void;
