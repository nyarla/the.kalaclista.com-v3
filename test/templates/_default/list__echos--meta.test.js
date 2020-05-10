const { assert, html } = require("../../lib/testing");

describe("echos/ -> _default/list.html # meta", () => {
  const testCases = [
    {
      selector: 'link[rel="alternate"][type="application/json"]',
      path: "echos/index.html",
      attr: "href",
      value: "https://the.kalaclista.com/echos/jsonfeed.json",
    },
    {
      selector: 'link[rel="alternate"][type="application/json"]',
      path: "echos/index.html",
      attr: "name",
      value: "カラクリスタ・エコーズの JSON Feed v1",
    },
    {
      selector: 'link[rel="alternate"][type="application/atom+xml"]',
      path: "echos/index.html",
      attr: "href",
      value: "https://the.kalaclista.com/echos/atom.xml",
    },
    {
      selector: 'link[rel="alternate"][type="application/atom+xml"]',
      path: "echos/index.html",
      attr: "name",
      value: "カラクリスタ・エコーズの Atom 1.0 Feed",
    },
    {
      selector: 'link[rel="alternate"][type="application/rss+xml"]',
      path: "echos/index.html",
      attr: "href",
      value: "https://the.kalaclista.com/echos/index.xml",
    },
    {
      selector: 'link[rel="alternate"][type="application/rss+xml"]',
      path: "echos/index.html",
      attr: "name",
      value: "カラクリスタ・エコーズの RSS 2.0 Feed",
    },
    {
      selector: 'meta[property="og:type"]',
      path: "echos/index.html",
      attr: "content",
      value: "Blog",
    },
  ];

  testCases.forEach((test) => {
    it(`${test.selector}`, () => {
      const $ = html(test.path);

      assert.equal($(test.selector).attr(test.attr), test.value);
    });
  });
});
