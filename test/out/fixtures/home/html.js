module.exports = exports = [
  {
    selector: "html[lang]",
    path: "index.html",
    attr: "lang",
    value: "ja",
  },
  {
    selector: "head[prefix]",
    path: "index.html",
    attr: "prefix",
    value: "og: http://ogp.me/ns# website: http://ogp.me/ns/website#",
  },
  {
    selector: "meta[charset]",
    path: "index.html",
    attr: "charset",
    value: "utf-8",
  },
  {
    selector: 'meta[name="viewport"]',
    path: "index.html",
    attr: "content",
    value: "width=device-width,initial-scale=1",
  },
  {
    selector: 'link[rel="canonical"]',
    path: "index.html",
    attr: "href",
    value: "https://the.kalaclista.com/",
  },
  {
    selector: 'link[rel="shortcut icon"]',
    path: "index.html",
    attr: "href",
    value: "https://the.kalaclista.com/favicon.ico",
  },
  {
    selector: 'link[rel="icon"]',
    path: "index.html",
    attr: "href",
    value: "https://the.kalaclista.com/favicon.ico",
  },
  {
    selector: 'link[rel="icon"]',
    path: "index.html",
    attr: "type",
    value: "image/x-icon",
  },
  {
    selector: 'meta[name="twitter:card"]',
    path: "index.html",
    attr: "content",
    value: "summary",
  },
  {
    selector: 'meta[name="twitter:site"]',
    path: "index.html",
    attr: "content",
    value: "@kalaclista",
  },
  {
    selector: 'meta[name="twitter:creator"]',
    path: "index.html",
    attr: "content",
    value: "@kalaclista",
  },
  {
    selector: 'meta[property="og:profile:first_name"]',
    path: "index.html",
    attr: "content",
    value: "Naoki",
  },
  {
    selector: 'meta[property="og:profile:last_name"]',
    path: "index.html",
    attr: "content",
    value: "OKAMURA",
  },

  {
    selector: 'meta[property="og:image"]',
    path: "index.html",
    attr: "content",
    value: "https://the.kalaclista.com/apple-touch-icon.png",
  },
  {
    selector: 'meta[property="og:url"]',
    path: "index.html",
    attr: "content",
    value: "https://the.kalaclista.com/",
  },
  {
    selector: 'link[rel="alternate"][type="application/json"]',
    path: "index.html",
    attr: "href",
    value: "https://the.kalaclista.com/jsonfeed.json",
  },
  {
    selector: 'link[rel="alternate"][type="application/json"]',
    path: "index.html",
    attr: "name",
    value: "カラクリスタの JSON Feed v1",
  },
  {
    selector: 'link[rel="alternate"][type="application/atom+xml"]',
    path: "index.html",
    attr: "href",
    value: "https://the.kalaclista.com/atom.xml",
  },
  {
    selector: 'link[rel="alternate"][type="application/atom+xml"]',
    path: "index.html",
    attr: "name",
    value: "カラクリスタの Atom 1.0 Feed",
  },
  {
    selector: 'link[rel="alternate"][type="application/rss+xml"]',
    path: "index.html",
    attr: "href",
    value: "https://the.kalaclista.com/index.xml",
  },
  {
    selector: 'link[rel="alternate"][type="application/rss+xml"]',
    path: "index.html",
    attr: "name",
    value: "カラクリスタの RSS 2.0 Feed",
  },
  {
    selector: 'meta[property="og:type"]',
    path: "index.html",
    attr: "content",
    value: "WebSite",
  },
];
