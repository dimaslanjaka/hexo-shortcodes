import google from "@types/google.accounts";

// Code Splitting and Loading Other Resources
declare let require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

// browser global scope
declare global {
  interface Window {
    [key: string]: any; // enable dynamic object support
    dataLayer: Record<string, any>[]; // google analytics
    adsbygoogle: any; // google adsense
    clipboardData?: any; // safari clipboard
    google: google; // google new api GSI client
    opera: Record<string, any>;
    opr: Record<string, any>;
    safari: Record<string, any>;
    /** Indicator for adsense initializer */
    adsenseInitialized?: boolean;
    /** current unique page id */
    pageId?: string;
  }

  interface Event {
    [key: string]: any; // enable dynamic object support
    clipboardData?: any; // safari clipboard
  }
}
