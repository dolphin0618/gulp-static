var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    cssnano = require('gulp-cssnano'),         //css过滤
    minifycss = require('gulp-clean-css'),     //css压缩
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    htmlmin  = require('gulp-htmlmin'),        //压缩html
    rev = require('gulp-rev'),                 //进行hash
    revCollector = require('gulp-rev-collector'); //- 路径替换


gulp.task('style', function() {
	return gulp.src('./test/*.css')
	.pipe(minifycss())
	.pipe(rev())
	.pipe(gulp.dest('./test/dist/css'))
	.pipe(rev.manifest({path:'css.json', merge: true}))
	.pipe(gulp.dest('./test/dist/rev'));
});

gulp.task('script', function(){
    gulp.src('./test/*.js')
    .pipe(concat({path: 'page1.js', cwd: ''}))
    .pipe(uglify())        //对合并后的文件进行压缩
    .pipe(rev())
    .pipe(gulp.dest('./test/dist/js'))
    .pipe(rev.manifest({path:'js.json', merge: true}))
    .pipe(gulp.dest('./test/dist/rev'));
});


// 处理html
gulp.task('htmlmin', function () {
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    
	return gulp.src(['./test/dist/rev/*.json', './test/index.html'])
        .pipe( revCollector({
            replaceReved: true
        }) )
   		//.pipe(htmlmin(options))
        .pipe(gulp.dest('./test/dist'));
});

//发布
gulp.task('default', ['style', 'script', 'htmlmin']);