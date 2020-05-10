const { assert, html } = require("../../lib/testing");

describe("notes/ -> _default/list.html # meta", () => {
  const testCases = [
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
    {
      selector: 'meta[property="og:type"]',
      path: "notes/index.html",
      attr: "content",
      value: "WebSite",
    },
  ];

  testCases.forEach((test) => {
    it(`${test.selector}`, () => {
      const $ = html(test.path);

      assert.equal($(test.selector).attr(test.attr), test.value);
    });
  });
});
