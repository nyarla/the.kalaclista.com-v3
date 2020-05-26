const { assert, xml, exists } = require("../lib/testing");

describe("/", () => {
  describe("sitemap.xml", () => {
    it("urlset", () => {
      const $ = xml("sitemap.xml");

      $("urlset > url").each(function () {
        const $node = $(this);

        assert.ok(
          $node
            .find("loc")
            .text()
            .match(
              /^https:\/\/the.kalaclista.com\/[^\/]+\/(?:\d{4}\/\d{2}\/\d{2}\/\d{6}\/|[^\/]+\/)?/
            )
        );

        assert.ok(
          $node
            .find("lastmod")
            .text()
            .match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[\-+]\d+:\d+)$/)
        );
      });
    });
  });
});
