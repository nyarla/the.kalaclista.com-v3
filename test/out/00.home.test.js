const { assert, html } = require("../lib/testing");

const headerTests = require("./fixtures/home/body");
const metaTests = require("./fixtures/home/html");

describe("/", () => {
  describe("_default/list.html.html", () => {
    describe("html, head", () => {
      metaTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html(testCase.path);

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
      it('script[type="application/json+ld"]', () => {
        const $ = html("index.html");

        const jsonld = JSON.parse(
          $('script[type="application/json+ld"]').html()
        );
        const data = jsonld[0];
        const breadcrumb = jsonld[1];
        const root = breadcrumb.itemListElement[0];

        assert.equal(data["@context"], "https://schema.org");

        assert.deepEqual(data.author, {
          "@type": "Person",
          name: "OKAMURA Naoki a.k.a nyarla",
          email: "nyarla@kalaclista.com",
        });

        assert.equal(data["@id"], "https://the.kalaclista.com/");
        assert.equal(
          data["headline"],
          $('meta[property="og:title"]').attr("content")
        );

        assert.equal(breadcrumb["@context"], "https://schema.org");
        assert.equal(breadcrumb["@type"], "BreadcrumbList");

        assert.equal(root["@type"], "ListItem");
        assert.equal(root.position, 1);
        assert.equal(root.name, data.headline);
        assert.equal(root.item, data["@id"]);
      });
    });
  });
  describe("body > header", () => {
    headerTests.forEach((testCase) => {
      it(testCase.selector, () => {
        const $ = html(testCase.path);

        assert.equal($(testCase.selector).attr(testCase.attr), testCase.value);
      });
    });
  });
  describe("body > main", () => {
    const $ = html("index.html");
    const content = $(".content__main");

    it(".content__main--home", () => {
      assert.ok(content.hasClass("content__main--home"));
      assert.equal(content.find("section").length, 15);
    });

    it(".content__main--home > nav", () => {
      assert.equal(content.find("nav > p > a").text(), "過去ログをもっと見る");
      assert.equal(
        content.find("nav > p > a").attr("href"),
        "https://the.kalaclista.com/archives/"
      );
    });

    content.find("section").each(function () {
      const el = $(this);

      it(".content__summary", () => {
        assert.ok(el.hasClass("content__summary"));
        assert.ok(
          el.hasClass("content__summary--notes") ||
            el.hasClass("content__summary--posts") ||
            el.hasClass("content__summary--echos")
        );
      });
      it(".content__summary > p > a", () => {
        assert.ok(
          el
            .find("p > a")
            .attr("href")
            .match(/https:\/\/the.kalaclista.com\/archives\/#\/\d{4}\/\d{2}\/$/)
        );

        assert.ok(
          el
            .find("p > a > time")
            .text()
            .match(/\d{4}年\d+月\d+日/)
        );

        assert.ok(
          el
            .find("p > a > time")
            .attr("datetime")
            .match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00/)
        );

        assert.ok(
          el
            .find("p > a")
            .text()
            .match(/\d{4}年\d+月\d+日に更新/)
        );
      });

      if (el.hasClass("content__summary--notes")) {
        it(".content__summary--notes", () => {
          assert.ok(
            el
              .find("a:first-child")
              .attr("href")
              .match(/^https:\/\/the.kalaclista.com\/notes\//)
          );

          assert.equal(
            el.find("a:nth-child(2)").attr("href"),
            "https://the.kalaclista.com/notes/"
          );
          assert.equal(el.find("a:nth-child(2)").text(), "ノート");
        });
      }

      if (el.hasClass("content__summary--posts")) {
        it(".content__summary--posts", () => {
          assert.ok(
            el
              .find("a:first-child")
              .attr("href")
              .match(/^https:\/\/the.kalaclista.com\/posts\//)
          );

          assert.equal(
            el.find("a:nth-child(2)").attr("href"),
            "https://the.kalaclista.com/posts/"
          );
          assert.equal(el.find("a:nth-child(2)").text(), "ブログ");
        });
      }

      if (el.hasClass("content__summary--echos")) {
        it(".content__summary--echos", () => {
          assert.ok(
            el
              .find("a:first-child")
              .attr("href")
              .match(/^https:\/\/the.kalaclista.com\/echos\//)
          );

          assert.equal(
            el.find("a:nth-child(2)").attr("href"),
            "https://the.kalaclista.com/echos/"
          );
          assert.equal(el.find("a:nth-child(2)").text(), "雑記");
        });
      }
    });
  });
});
