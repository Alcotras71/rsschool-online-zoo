const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  pug = require("gulp-pug"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// Functions
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
function scss(page) {
  return gulp
    .src(`src/scss/${page}/main.scss`)
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Styles",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`build/pages/${page}`))
    .pipe(browserSync.stream());
}
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// PUG
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("pug", function () {
  return gulp
    .src("src/pug/pages/**/*.pug")
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Pug",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("build/pages"))
    .pipe(browserSync.stream());
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// JS
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("js", () => {
  return gulp
    .src(`src/js/**/*.js`)
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: "Js",
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`build/pages/`))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// SCSS
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("scss:about", async () => {
  scss("about");
});
gulp.task("scss:map", async () => {
  scss("map");
});
gulp.task("scss:zoos", async () => {
  scss("zoos");
});
gulp.task("scss:contact", async () => {
  scss("contact");
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// COPY ASSETS
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("copy:assets", () => {
  return gulp
    .src("src/assets/**/*.*")
    .pipe(gulp.dest("build/assets/"))
    .pipe(browserSync.reload({ stream: true }));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// WATCH TASK
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("watch", () => {
  gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
  gulp.watch("src/js/**/*.js", gulp.parallel("js"));

  gulp.watch("src/scss/about/**/*.scss", gulp.parallel("scss:about"));
  gulp.watch("src/scss/map/**/*.scss", gulp.parallel("scss:map"));
  gulp.watch("src/scss/zoos/**/*.scss", gulp.parallel("scss:zoos"));
  gulp.watch("src/scss/contact/**/*.scss", gulp.parallel("scss:contact"));

  gulp.watch(
    "src/scss/_global.scss",
    gulp.parallel("scss:about", "scss:map", "scss:zoos", "scss:contact")
  );

  gulp.watch("src/assets/**/**.*", gulp.parallel("copy:assets"));
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// Server
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: "build",
    },
  });
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// Build
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task("clean:build", () => {
  return del("build/");
});
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// Default
// ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
gulp.task(
  "default",
  gulp.series(
    gulp.parallel("clean:build"),
    gulp.parallel(
      "pug",
      "scss:about",
      "scss:map",
      "scss:zoos",
      "scss:contact",
      "js",
      "copy:assets"
    ),
    gulp.parallel("server", "watch")
  )
);
