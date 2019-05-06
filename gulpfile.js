var gulp  = require('gulp'),
    gutil = require('gulp-util');
    clean = require('gulp-clean');
    zip = require('gulp-zip');
    concat = require('gulp-concat');


gulp.task('default', ['zip'], function() {
    return gutil.log('Gulp is running!')
});

gulp.task('copyreactbundle', ['clean'], function() {
    console.log("copying all the react code:::");
    return gulp.src('app/dist/*').pipe(gulp.dest('dist/app/dist'));
});

gulp.task('clean', function () {
    console.log("cleaning the dist directory:::");
    return gulp.src('bundle/dist.zip', { read: false }).pipe(clean());
});

gulp.task('zip', ['copyreactbundle'], () =>
    gulp.src(['dist/**/**']).pipe(zip('dist.zip')).pipe(gulp.dest('bundle'))
);

