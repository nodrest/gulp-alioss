# gulp-aliyunoss

Aliyun Oss Client for Gulp,升级版，改用ali-oss

### Install
``` bash
npm install gulp-aliyunoss
```
### DEMO
``` node
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
```
### 操作结果

``` bash
cd /path/to/gulpfile.js/
gulp oss
[14:50:59] Using gulpfile ~/path/to/gulpfile.js
[14:50:59] Starting 'oss'...
[14:50:59] Finished 'oss' after *** ms
[14:50:59] OK: assets/a.js
[14:50:59] OK: assets/b/a.js
....
```

