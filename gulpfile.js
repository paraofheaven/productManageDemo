var fs        = require('fs');
var path      = require('path');
var gulp      = require('gulp');
var rename    = require('gulp-rename');
var VueModule = require('gulp-vue-module');
 
gulp.task('vue', function() {
    return gulp.src('./vue/*.vue')
                .pipe(VueModule({
                    debug : true,
                    loadCSSMethod: 'require.loadCSS'
                }))
                .pipe(rename({extname : ".js"}))
                .pipe(gulp.dest("./components"));
});
gulp.task('default', ['vue']);

gulp.watch('./vue/*.vue', function(){
    gulp.run('default');
});
 
