const { assert, html, exists } = require("../lib/testing");

const sections = {
  posts: "posts/2020/04/09/114412",
  echos: "echos/2020/03/15/153826",
  notes: "notes/Wine-VST-Bridge",
};

Object.keys(sections).forEach((section) => {
  describe(`${section}/_single.html.html`, () => {
    describe("body > main", () => {
      it(".content__entry > .subscribe", () => {
        const $ = html(`${sections[section]}/index.html`);
        const subscribe = $(".subscribe");

        assert.equal(
          subscribe.find("nav > a:first-child").attr("href"),
          `https://the.kalaclista.com/${section}/atom.xml`
        );
        assert.equal(
          subscribe.find("nav > a:last-child").attr("href"),
          `https://the.kalaclista.com/atom.xml`
        );
      });
      it(".content__entry > .author", () => {
        const $ = html(`${sections[section]}/index.html`);
        const author = $(".author");

        assert.equal(
          author.find("a:first-child").attr("href"),
          "https://the.kalaclista.com/nyarla/"
        );
        assert.equal(
          author.find("h2 > a").attr("href"),
          "https://the.kalaclista.com/nyarla/"
        );

        assert.equal(
          author.find("nav > a:nth-child(1)").attr("href"),
          "https://twitter.com/kalaclista"
        );
        assert.equal(
          author.find("nav > a:nth-child(2)").attr("href"),
          "https://github.com/nyarla"
        );
        assert.equal(
          author.find("nav > a:nth-child(3)").attr("href"),
          "https://gitlab.com/nyarla"
        );
        assert.equal(
          author.find("nav > a:nth-child(4)").attr("href"),
          "https://note.com/kalaclista/"
        );
        assert.equal(
          author.find("nav > a:nth-child(5)").attr("href"),
          "https://b.hatena.ne.jp/nyarla-net/"
        );
      });
    });
  });
});
