const { assert, html, exists } = require("../lib/testing");

const headerTests = require("./fixtures/notes/body");
const metaTests = require("./fixtures/notes/html");

describe("notes/", () => {
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
        const $ = html("notes/index.html");

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

        assert.equal(data["@id"], "https://the.kalaclista.com/notes/");
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
      const $ = html("notes/index.html");
      const content = $(".content__main");

      content.find(".content__summary").each(function () {
        const $e = $(this);

        it(".content__summary > a:first-child", () => {
          assert.ok(
            $e
              .find("a:first-child")
              .attr("href")
              .match(/^https:\/\/the.kalaclista.com\/notes\/.+?\/$/)
          );
        });
        it(".content__summary", () => {
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
    });
  });
  describe("_default/single.html.html", () => {
    describe("html, head", () => {
      metaTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html("notes/Wine-VST-Bridge/index.html");

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
      it('script[type="application/json+ld"]', () => {
        const $ = html("notes/Wine-VST-Bridge/index.html");

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
          "https://the.kalaclista.com/notes/Wine-VST-Bridge/"
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
        assert.equal(branch.item, "https://the.kalaclista.com/notes/");

        assert.equal(leaf["@type"], "ListItem");
        assert.equal(leaf.position, 3);
        assert.equal(leaf.name, $('meta[property="og:title"]').attr("content"));
        assert.equal(leaf.item, data["@id"]);
      });
    });
    describe("body > header", () => {
      headerTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html("notes/Wine-VST-Bridge/index.html");

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
    });
    describe("body > main", () => {
      const $ = html("notes/Wine-VST-Bridge/index.html");
      const content = $(".content__main");

      const $e = content.find(".content__entry--notes");
      it(".content__entry--notes", () => {
        assert.equal(content.find(".content__entry").length, 1);
        assert.equal(
          $e.find("a:first-child").attr("href"),
          "https://the.kalaclista.com/notes/Wine-VST-Bridge/"
        );

        assert.equal(
          $e.find("a:nth-child(2)").attr("href"),
          "https://the.kalaclista.com/archives/#/2020/04/"
        );
      });
      it(".content__entry--notes > nav > .stack", () => {
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
      it(".content__entry--notes > nav > .tags", () => {
        $e.find("nav > .tags > a").each(function () {
          const $t = $(this);

          assert.ok(
            $t
              .attr("href")
              .match(/https:\/\/the.kalaclista.com\/tags\/[^\/]+\/$/)
          );
        });
      });
      it(".content__entry--notes > .share > a", () => {
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
      it(".content__entry--notes > .comment > a", () => {
        assert.ok(
          $e
            .find(".comment > a")
            .attr("href")
            .match(/https:\/\/scrapbox.io\/kalaclista\/.*?$/)
        );
      });
    });
  });
});
