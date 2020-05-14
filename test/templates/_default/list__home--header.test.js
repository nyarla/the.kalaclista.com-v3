const { assert, html } = require("../../lib/testing");

describe("/ -> _default/list.html.html # body > header", () => {
  const testCases = [
    {
      selector: ".global__header > a",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/nyarla/",
    },
    {
      selector: ".global__header > a > img",
      path: "index.html",
      attr: "src",
      value: "https://the.kalaclista.com/assets/avatar.svg",
    },
    {
      selector: ".header__title > a",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/",
    },
    {
      selector: ".header__message > a",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/notes/nyarla-is-not-nyalra/",
    },
    {
      selector: ".header__sections a.current",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/",
    },
    {
      selector: ".header__sections a:nth-child(1)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/",
    },
    {
      selector: ".header__sections a:nth-child(2)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/posts/",
    },
    {
      selector: ".header__sections a:nth-child(3)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/echos/",
    },
    {
      selector: ".header__sections a:nth-child(4)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/notes/",
    },
    {
      selector: ".header__sections a:nth-child(5)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/search/",
    },
    {
      selector: ".header__sections a:nth-child(6)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/archives/",
    },
    {
      selector: ".header__about a:nth-child(1)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/nyarla/",
    },
    {
      selector: ".header__about a:nth-child(2)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/policies/",
    },
    {
      selector: ".header__about a:nth-child(3)",
      path: "index.html",
      attr: "href",
      value: "https://the.kalaclista.com/licenses/",
    },
  ];

  testCases.forEach((test) => {
    it(`${test.selector}`, () => {
      const $ = html(test.path);

      assert.equal($(test.selector).attr(test.attr), test.value);
    });
  });
});
