var gulp = require('gulp');
var oss = require('gulp-aliyunoss');
gulp.task('oss', function(){
    return gulp.src([
        './dist/client/app/*',
        './dist/client/bower_components/zeroclipboard/dist/ZeroClipboard.swf'
      ], { base: 'dist/client' })
      .pipe(plugins.alioss({
          accessKeyId: '***',
          accessKeySecret: '******',
          endpoint: 'oss-cn-hangzhou-internal.aliyuncs.com',
          bucket: 'photo',
          prefix: 'serve'
      }));
});
