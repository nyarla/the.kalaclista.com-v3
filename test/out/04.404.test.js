const { assert, html, exists } = require("../lib/testing");

const metaTests = require("./fixtures/404/html");
const headerTests = require("./fixtures/404/body");

describe("search/", () => {
  describe("_default/single.html.html", () => {
    describe("html, head", () => {
      metaTests.forEach((testCase) => {
        it(testCase.selector, () => {
          const $ = html("404.html");

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
          const $ = html("404.html");

          assert.equal(
            $(testCase.selector).attr(testCase.attr),
            testCase.value
          );
        });
      });
    });
  });
});
