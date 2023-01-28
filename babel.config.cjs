require("@babel/core").transformSync("code", {
  presets: ["minify"],
  comments: false,
  minified: true,
  compact: true,
  retainLines: false,
});