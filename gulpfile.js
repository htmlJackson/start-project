var gulp = require("gulp");
var less = require("gulp-less");
var LessAutoprefix = require("less-plugin-autoprefix");
var autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });
var path = require("path");
var plumber = require("gulp-plumber");
var server = require("browser-sync");

gulp.task("style", function () {
  return gulp.src("./less/style.less")
    .pipe(plumber())
    .pipe(less({
      paths: [ path.join(__dirname, "less", "includes") ],
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest("./css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "."
  });

  gulp.watch("./less/**/*.less", ["style"]);
  gulp.watch("*.html")
  .on("change", server.reload);
});
