const { assert, json, exists } = require("../lib/testing");

describe("/", () => {
  describe("jsonfeed.json", () => {
    "home posts echos notes".split(" ").forEach((section) => {
      const $ =
        section === "home"
          ? json("jsonfeed.json")
          : json(`${section}/jsonfeed.json`);

      it("author", () => {
        const author = $.author;
        assert.equal(
          author.avatar,
          "https://the.kalaclista.com/assets/avatar.svg"
        );
        assert.equal(author.name, "OKAMURA Naoki");
        assert.equal(author.url, "https://the.kalaclista.com/nyarla/");
      });

      it("feed_url", () => {
        assert.equal(
          $.feed_url,
          `https://the.kalaclista.com${
            section !== "home" ? `/${section}` : ""
          }/jsonfeed.json`
        );
      });

      it("home_page_url", () => {
        assert.equal(
          $.home_page_url,
          `https://the.kalaclista.com${
            section !== "home" ? `/${section}` : ""
          }/`
        );
      });

      it("icon", () => {
        assert.equal($.icon, "https://the.kalaclista.com/apple-touch-icon.png");
      });

      it("items[]", () => {
        assert.equal($.items.length, 15);
        $.items.forEach((item) => {
          assert.equal(item.id, item.url);
          assert.ok(item.tags instanceof Array);
          assert.ok(
            item.date.match(
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[\-+]\d+:\d+)$/
            )
          );
          assert.ok(
            item.url.match(
              /^https:\/\/the.kalaclista.com\/[^\/]+\/(?:\d{4}\/\d{2}\/\d{2}\/\d{6}\/|[^\/]+\/)?$/
            )
          );
        });
      });

      it("title", () => {
        const titles = {
          home: "カラクリスタ",
          posts: "カラクリスタ・ブログ",
          echos: "カラクリスタ・エコーズ",
          notes: "カラクリスタ・ノート",
        };

        assert.equal($.title, titles[section]);
      });

      it("version", () => {
        assert.equal($.version, "https://jsonfeed.org/version/1");
      });
    });
  });
});
