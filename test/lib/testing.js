const path = require("path");
const fs = require("fs");

const assert = require("power-assert");
const cheerio = require("cheerio");

var cache = {};

function html(fn) {
  if (typeof cache[fn] !== "undefined" && cache[fn] !== null) {
    return cache[fn];
  }

  cache[fn] = cheerio.load(
    fs.readFileSync(path.resolve(__dirname, "..", "..", "dist", fn)),
    {
      decodeEntities: true,
      lowerCaseTags: true,
      lowerCaseAttributeNames: true,
    }
  );

  return cache[fn];
}

function exists(fn) {
  return fs.statSync(path.resolve(__dirname, "..", "..", "dist", fn)).isFile();
}

module.exports = exports = {
  assert,
  html,
  exists,
};
