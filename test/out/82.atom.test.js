const { assert, xml, exists } = require("../lib/testing");

"home posts echos notes".split(" ").forEach((section) => {
  const path = section === "home" ? "" : `${section}/`;

  describe(path, () => {
    describe("list.atom.xml", () => {
      const $ = xml(`${path}atom.xml`);
      it("feed > title", () => {
        assert.equal(
          $("feed > title").text(),
          {
            home: "カラクリスタ",
            posts: "カラクリスタ・ブログ",
            echos: "カラクリスタ・エコーズ",
            notes: "カラクリスタ・ノート",
          }[section]
        );
      });

      it("feed > link", () => {
        $("feed > link").each(function () {
          assert.equal(
            $(this).attr("href"),
            `https://the.kalaclista.com/${path}`
          );
        });
      });
      it("feed > id", () => {
        assert.equal(
          $("feed > id").text(),
          `https://the.kalaclista.com/${path}`
        );
      });

      it("feed > author", () => {
        assert.equal(
          $("feed > author > name").text(),
          "OKAMURA Naoki a.k.a nyarla"
        );
        assert.equal(
          $("feed > author > email").text(),
          "nyarla@kalaclista.com"
        );
        assert.equal(
          $("feed > author > uri").text(),
          "https://the.kalaclista.com/nyarla/"
        );
      });

      it("feed > updated", () => {
        assert.ok(
          $("feed > updated")
            .text()
            .match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[\-+]\d+:\d+)$/)
        );
      });

      it("feed > entry", () => {
        $("feed > entry").each(function () {
          const $e = $(this);

          assert.ok(
            $e
              .find("link")
              .attr("href")
              .match(
                /^https:\/\/the.kalaclista.com\/[^\/]+\/(?:\d{4}\/\d{2}\/\d{2}\/\d{6}\/|[^\/]+\/)?$/
              )
          );
          assert.equal(
            $e.find("author > name").text(),
            "OKAMURA Naoki a.k.a nyarla"
          );
          assert.equal(
            $e.find("author > email").text(),
            "nyarla@kalaclista.com"
          );
          assert.equal(
            $e.find("author > uri").text(),
            "https://the.kalaclista.com/nyarla/"
          );

          assert.ok(
            $e
              .find("published")
              .text()
              .match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[\-+]\d+:\d+)$/)
          );
          assert.ok(
            $e
              .find("lastmod")
              .text()
              .match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[\-+]\d+:\d+)$/)
          );
        });
      });
    });
  });
});
