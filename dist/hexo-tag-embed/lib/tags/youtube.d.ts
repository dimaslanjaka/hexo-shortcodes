type embedType1 = [string];
type embedType2 = [string, string];
type embedType3 = [string, boolean];
type embedType4 = [string, string, boolean];
/**
* Youtube tag
*
* Syntax:
*   {% youtube video_id, type, cookie %}
*/
export declare function youtubeTag([id, type, cookie]: embedType1 | embedType2 | embedType3 | embedType4): string;
export {};
