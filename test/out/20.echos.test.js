const { assert, html, exists } = require("../lib/testing");

const headerTests = require("./fixtures/echos/body");
const metaTests = require("./fixtures/echos/html");

describe("echos/", () => {
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
        const $ = html("echos/index.html");

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
    describe("body > header", () => {
      headerTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html(testCase.path);

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
    });
    describe("body > main", () => {
      const $ = html("echos/index.html");
      const content = $(".content__main");

      it(".content__entry--echos", () => {
        assert.equal(content.find(".content__entry").length, 15);
      });

      content.find(".content__entry").each(function () {
        const $e = $(this);

        it(".content__entry > a:first-child", () => {
          assert.ok(
            $e
              .find("a:first-child")
              .attr("href")
              .match(
                /^https:\/\/the.kalaclista.com\/echos\/\d{4}\/\d{2}\/\d{2}\/\d{6}\/$/
              )
          );
        });

        it(".content__entry > a:nth-child(2)", () => {
          assert.ok(
            $e
              .find("a:nth-child(2)")
              .attr("href")
              .match(
                /^https:\/\/the.kalaclista.com\/archives\/#\/\d{4}\/\d{2}\/$/
              )
          );
        });
      });

      it(".navigation--paginate", () => {
        assert.equal(
          content
            .find(".navigation--paginate > p > .navigation__next")
            .attr("href"),
          "https://the.kalaclista.com/echos/pages/2/"
        );
        assert.equal(
          content.find(".navigation--paginate > p > .navigation__next").text(),
          "次へ"
        );

        if (exists("echos/pages/2/index.html")) {
          const $page = html("echos/pages/2/index.html")(".content__main");
          assert.equal(
            $page
              .find(".navigation--paginate > p > .navigation__prev")
              .attr("href"),
            "https://the.kalaclista.com/echos/"
          );
          assert.equal(
            $page.find(".navigation--paginate > p > .navigation__prev").text(),
            "前へ"
          );
        }
        if (exists("echos/pages/3/index.html")) {
          const $page = html("echos/pages/3/index.html")(".content__main");
          assert.equal(
            $page
              .find(".navigation--paginate > p > .navigation__prev")
              .attr("href"),
            "https://the.kalaclista.com/echos/pages/2/"
          );
          assert.equal(
            $page.find(".navigation--paginate > p > .navigation__prev").text(),
            "前へ"
          );
        }
      });
    });
  });
  describe("_default/single.html.html", () => {
    describe("html, head", () => {
      metaTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html("echos/2020/03/15/153826/index.html");

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
      it('script[type="application/json+ld"]', () => {
        const $ = html("echos/2020/03/15/153826/index.html");

        const jsonld = JSON.parse(
          $('script[type="application/json+ld"]').html()
        );

        const data = jsonld[0];
        const breadcrumb = jsonld[1];

        const root = breadcrumb.itemListElement[0];
        const branch = breadcrumb.itemListElement[1];
        const leaf = breadcrumb.itemListElement[2];
        assert.equal(data["@context"], "https://schema.org");

        assert.deepEqual(data.author, {
          "@type": "Person",
          name: "OKAMURA Naoki a.k.a nyarla",
          email: "nyarla@kalaclista.com",
        });

        assert.equal(
          data["@id"],
          "https://the.kalaclista.com/echos/2020/03/15/153826/"
        );
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
        assert.equal(
          branch.name,
          $('meta[property="og:site_title"]').attr("content")
        );
        assert.equal(branch.item, "https://the.kalaclista.com/echos/");

        assert.equal(leaf["@type"], "ListItem");
        assert.equal(leaf.position, 3);
        assert.equal(leaf.name, $('meta[property="og:title"]').attr("content"));
        assert.equal(leaf.item, data["@id"]);
      });
    });
    describe("body > header", () => {
      headerTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html(testCase.path);

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
    });
    describe("body > main", () => {
      const $ = html("echos/2020/03/15/153826/index.html");
      const content = $(".content__main");

      const $e = content.find(".content__entry--echos");
      it(".content__entry--echos", () => {
        assert.equal(content.find(".content__entry").length, 1);
        assert.equal(
          $e.find("a:first-child").attr("href"),
          "https://the.kalaclista.com/echos/2020/03/15/153826/"
        );

        assert.equal(
          $e.find("a:nth-child(2)").attr("href"),
          "https://the.kalaclista.com/archives/#/2020/03/"
        );
      });
      it(".content__entry--echos > nav > .stack", () => {
        const $nav = $e.find("nav");
        assert.ok(
          $nav
            .find(".stack > .stack__pinboard")
            .attr("href")
            .match(
              /^https:\/\/pinboard.in\/add\?next=same&url=[^&]+&title=[^&]+$/
            )
        );
        assert.ok(
          $nav
            .find(".stack > .stack__instapaper")
            .attr("href")
            .match(
              /^https:\/\/www.instapaper.com\/edit\?url=[^&]+&title=[^&]+$/
            )
        );
        assert.ok(
          $nav
            .find(".stack > .stack__pocket")
            .attr("href")
            .match(/^https:\/\/getpocket.com\/edit\?url=[^&]+&title=[^&]+$/)
        );
        assert.ok(
          $nav
            .find(".stack > .stack__hatena-bookmark")
            .attr("href")
            .match(
              /^https:\/\/b.hatena.ne.jp\/add\?mode=confirm&url=[^&]+&title=[^&]+$/
            )
        );
      });
      it(".content__entry--echos > nav > .tags", () => {
        $e.find("nav > .tags > a").each(function () {
          const $t = $(this);

          assert.ok(
            $t
              .attr("href")
              .match(/https:\/\/the.kalaclista.com\/tags\/[^\/]+\/$/)
          );
        });
      });
      it(".content__entry--echos > .share > a", () => {
        const $share = $e.find(".share");
        assert.ok(
          $share
            .find(".share > .share__twitter")
            .attr("href")
            .match(/^https:\/\/twitter.com\/intent\/tweet\?text=[^&]+$/)
        );
        assert.ok(
          $share
            .find(".share > .share__facebook")
            .attr("href")
            .match(
              /^https:\/\/www.facebook.com\/sharer\/sharer.php\?u=[^&]+&t=[^&]+$/
            )
        );
        assert.ok(
          $share
            .find(".share > .share__pinboard")
            .attr("href")
            .match(
              /^https:\/\/pinboard.in\/add\?next=same&url=[^&]+&title=[^&]+$/
            )
        );
        assert.ok(
          $share
            .find(".share > .share__hatena-bookmark")
            .attr("href")
            .match(
              /^https:\/\/b.hatena.ne.jp\/add\?mode=confirm&url=[^&]+&title=[^&]+$/
            )
        );
      });
      it(".content__entry--echos > .comment > a", () => {
        assert.ok(
          $e
            .find(".comment > a")
            .attr("href")
            .match(/https:\/\/scrapbox.io\/kalaclista\/.*?$/)
        );
      });
      it(".navgation--paginate", () => {
        assert.equal(
          content
            .find(".navigation--paginate > p > .navigation__next")
            .attr("href"),
          "https://the.kalaclista.com/echos/2020/02/28/150242/"
        );
        assert.equal(
          content.find(".navigation--paginate > p > .navigation__next").text(),
          "次の記事"
        );
        assert.equal(
          html("echos/2020/02/28/150242/index.html")(".content__main")
            .find(".navigation--paginate > p > .navigation__prev")
            .attr("href"),
          "https://the.kalaclista.com/echos/2020/03/15/153826/"
        );
        assert.equal(
          html("echos/2020/02/28/150242/index.html")(".content__main")
            .find(".navigation--paginate > p > .navigation__prev")
            .text(),
          "前の記事"
        );
      });
    });
  });
});
