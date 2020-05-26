const { assert, exists } = require("../lib/testing");

describe("/", () => {
  describe("static/", () => {
    describe("(file exists)", () => {
      it("/favicon.ico", () => {
        assert.ok(exists("favicon.ico"));
      });

      it("apple-touch-icon.png", () => {
        assert.ok(exists("apple-touch-icon.png"));
      });

      it("assets/avatar.svg", () => {
        assert.ok(exists("assets/avatar.svg"));
      });
    });
  });
});
