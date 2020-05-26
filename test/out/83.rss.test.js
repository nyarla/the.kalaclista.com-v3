const { assert, xml, exists } = require("../lib/testing");

"home posts echos notes".split(" ").forEach((section) => {
  const path = section === "home" ? "" : `${section}/`;

  describe("list.rss.xml", () => {
    const $ = xml(`${path}index.xml`);

    it("channel > title", () => {
      assert.equal(
        $("channel > title").text(),
        {
          home: "カラクリスタ",
          posts: "カラクリスタ・ブログ",
          echos: "カラクリスタ・エコーズ",
          notes: "カラクリスタ・ノート",
        }[section]
      );
    });

    it("channel > link", () => {
      assert.equal(
        $("channel > link").text(),
        `https://the.kalaclista.com/${path}`
      );
    });
    it("channel > managingEditor, channel > webMaster", () => {
      assert.equal(
        $("channel > managingEditor").text(),
        $("channel > webMaster").text()
      );
    });

    it("channel > atom:link", () => {
      assert.equal(
        $("channel > atom\\:link").attr("href"),
        `https://the.kalaclista.com/${path}`
      );
    });

    it("channel > lastBuildDate", () => {
      $("channel > lastBuildDate")
        .text()
        .match(/^\w+, \d+ \w+ \d+ \d+:\d+:\d+ [\-+]\d+$/);
    });

    it("channel > item", () => {
      $("channel > item").each(function () {
        const $i = $(this);

        assert.ok(
          $i
            .find("link")
            .text()
            .match(
              /^https:\/\/the.kalaclista.com\/[^\/]+\/(?:\d{4}\/\d{2}\/\d{2}\/\d{6}\/|[^\/]+\/)?$/
            )
        );

        assert.equal($i.find("link").text(), $i.find("guid").text());

        assert.ok(
          $i
            .find("pubDate")
            .text()
            .match(/^\w+, \d+ \w+ \d+ \d+:\d+:\d+ [\-+]\d+$/)
        );

        assert.equal(
          $i.find("author").text(),
          "OKAMURA Naoki a.k.a nyarla nyarla@kalaclista.com"
        );
      });
    });
  });
});
