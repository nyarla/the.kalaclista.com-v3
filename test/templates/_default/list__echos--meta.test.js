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

  it('script[type="application/json+ld"]', () => {
    const $ = html("echos/index.html");

    const jsonld = JSON.parse($('script[type="application/json+ld"]').html());
    const data = jsonld[0];
    const breadcrumb = jsonld[1];
    const root = breadcrumb.itemListElement[0];
    const branch = breadcrumb.itemListElement[1];

    assert.equal(data["@context"], "https://schema.org");

    assert.deepEqual(data.author, {
      "@type": "Person",
      name: "OKAMURA Naoki a.k.a nyarla",
      email: "nyarla@kalaclista.com",
    });

    assert.equal(data["@id"], "https://the.kalaclista.com/echos/");
    assert.equal(
      data["headline"],
      $('meta[property="og:title"]').attr("content")
    );

    assert.equal(breadcrumb["@context"], "https://schema.org");
    assert.equal(breadcrumb["@type"], "BreadcrumbList");

    assert.equal(root["@type"], "ListItem");
    assert.equal(root.position, 1);
    assert.equal(root.name, "カラクリスタ");
    assert.equal(root.item, "https://the.kalaclista.com/");

    assert.equal(branch["@type"], "ListItem");
    assert.equal(branch.position, 2);
    assert.equal(branch.name, data.headline);
    assert.equal(branch.item, data["@id"]);
  });
});
