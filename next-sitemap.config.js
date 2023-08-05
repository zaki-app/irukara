/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.CLIENT_SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 1000,
  // オプション
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
