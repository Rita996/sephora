const gulp = require("gulp");
gulp.task("html-copy",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
    
})
gulp.task("images",function(){
    return gulp.src(["*.{jpg,png}","images/*.{png,jpg}"])
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
const scss = require("gulp-sass");
const mini = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(mini())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/json"))
    .pipe(connect.reload());
})
gulp.task("build",["html-copy","images","scss","scripts","data"],function(){
    console.log("项目建立成功");
})
gulp.task("watch",function(){
    gulp.watch("*.html",["html-copy"]);
    gulp.watch("*.{jpg/png}",["images"]);
    gulp.watch("stylesheet/index.scss",["scss"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch(["*.json","!package.json"],["data"]);
})
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})
gulp.task("default",["watch","server"]);
