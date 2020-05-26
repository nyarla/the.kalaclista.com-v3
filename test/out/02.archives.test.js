const { assert, html, exists } = require("../lib/testing");

const metaTests = require("./fixtures/archives/html");
const headerTests = require("./fixtures/archives/body");

describe("archives/", () => {
  describe("_default/single.html.html", () => {
    describe("html, head", () => {
      metaTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html("archives/index.html");

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
    });
    describe("body > header", () => {
      headerTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html("archives/index.html");

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
      it('script[type="application/json+ld"]', () => {
        const $ = html("archives/index.html");

        const jsonld = JSON.parse(
          $('script[type="application/json+ld"]').html()
        );
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

        assert.equal(data["@id"], "https://the.kalaclista.com/archives/");
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
    describe("body > main", () => {
      it(".content__entry--archives > .p-content", () => {
        const $ = html("archives/index.html");
        const content = $(".p-content");

        content.find("h1").each(function () {
          h1 = $(this);

          assert.ok(h1.attr("id").match(/^\/\d{4}\/\d{2}\/$/));
        });

        content.find("a").each(function () {
          a = $(this);

          assert.ok(
            a
              .attr("href")
              .match(
                /^https:\/\/the.kalaclista.com\/[^\/]+\/(?:\d{4}\/\d{2}\/\d{2}\/\d{6}|[^\/]+)\//
              )
          );
        });
      });
    });
  });
});
