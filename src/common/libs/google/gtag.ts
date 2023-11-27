type WindowWidthDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWidthDataLayer;

export const GTAG_ID = process.env.GOOGLE_ANALYTICS_ID;

export function pageview(url: string) {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    });
  } else {
    console.log({
      event: 'pageview',
      page: url,
    });
  }
}
