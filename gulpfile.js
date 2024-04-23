const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const htmlmin = require("gulp-htmlmin");

function sassTask() {
  return src("./assets/styles/scss/style.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("./assets/styles/css/"));
}

function htmlTask() {
  return src("./html/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./"));
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch("*.html", browsersyncReload);
  watch("./assets/styles/**/*.scss", series(sassTask, browsersyncReload));
}

exports.default = series(htmlTask, sassTask, browsersyncServe, watchTask);
