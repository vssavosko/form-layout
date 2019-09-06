const gulp = require('gulp'),
    sass = require('gulp-sass'),
    bs = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(bs.reload({
            stream: true
        }))
});

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(bs.reload({
            stream: true
        }))
});

gulp.task('bs', function () {
    bs({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clean', async function () {
    return del.sync('dist')
});

gulp.task('prebuild', async function () {
    const buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

    const buildCss = gulp.src([
            'src/css/main.css',
        ])
        .pipe(gulp.dest('dist/css'));

    const buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));

    const buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('clear', function () {
    return cache.clearAll()
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch(['src/js/common.js']);
});

gulp.task('default', gulp.parallel('sass', 'bs', 'watch'));
gulp.task('build', gulp.parallel('clean', 'prebuild', 'img'));