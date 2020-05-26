module.exports = exports = [
  {
    selector: 'link[rel="alternate"][type="application/json"]',
    path: "notes/index.html",
    attr: "href",
    value: "https://the.kalaclista.com/notes/jsonfeed.json",
  },
  {
    selector: 'link[rel="alternate"][type="application/json"]',
    path: "notes/index.html",
    attr: "name",
    value: "カラクリスタ・ノートの JSON Feed v1",
  },
  {
    selector: 'link[rel="alternate"][type="application/atom+xml"]',
    path: "notes/index.html",
    attr: "href",
    value: "https://the.kalaclista.com/notes/atom.xml",
  },
  {
    selector: 'link[rel="alternate"][type="application/atom+xml"]',
    path: "notes/index.html",
    attr: "name",
    value: "カラクリスタ・ノートの Atom 1.0 Feed",
  },
  {
    selector: 'link[rel="alternate"][type="application/rss+xml"]',
    path: "notes/index.html",
    attr: "href",
    value: "https://the.kalaclista.com/notes/index.xml",
  },
  {
    selector: 'link[rel="alternate"][type="application/rss+xml"]',
    path: "notes/index.html",
    attr: "name",
    value: "カラクリスタ・ノートの RSS 2.0 Feed",
  },
];
