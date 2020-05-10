const { assert, html } = require("../../lib/testing");

describe("posts/ -> _default/list.html # meta", () => {
  const testCases = [
    {
      selector: 'link[rel="alternate"][type="application/json"]',
      path: "posts/index.html",
      attr: "href",
      value: "https://the.kalaclista.com/posts/jsonfeed.json",
    },
    {
      selector: 'link[rel="alternate"][type="application/json"]',
      path: "posts/index.html",
      attr: "name",
      value: "カラクリスタ・ブログの JSON Feed v1",
    },
    {
      selector: 'link[rel="alternate"][type="application/atom+xml"]',
      path: "posts/index.html",
      attr: "href",
      value: "https://the.kalaclista.com/posts/atom.xml",
    },
    {
      selector: 'link[rel="alternate"][type="application/atom+xml"]',
      path: "posts/index.html",
      attr: "name",
      value: "カラクリスタ・ブログの Atom 1.0 Feed",
    },
    {
      selector: 'link[rel="alternate"][type="application/rss+xml"]',
      path: "posts/index.html",
      attr: "href",
      value: "https://the.kalaclista.com/posts/index.xml",
    },
    {
      selector: 'link[rel="alternate"][type="application/rss+xml"]',
      path: "posts/index.html",
      attr: "name",
      value: "カラクリスタ・ブログの RSS 2.0 Feed",
    },
    {
      selector: 'meta[property="og:type"]',
      path: "posts/index.html",
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
