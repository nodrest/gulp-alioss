// PLUGIN_NAME: gulp-oss
const PLUGIN_NAME = 'gulp-oss';

var path = require('path');
var through2 = require('through2');
var PluginError = require('gulp-util').PluginError;
var colors = require('gulp-util').colors;
var log = require('gulp-util').log;
var OSS = require('ali-oss').Wrapper;
var Moment = require('moment');
var Q = require('q');

function oss(option) {
    if (!option) {
        throw new PluginError(PLUGIN_NAME, 'Missing option!');
    }
    if(!option.bucket){
        throw new PluginError(PLUGIN_NAME, 'Missing option.bucket!');
    }

    //var ossClient = new ALY.OSS({
    //    accessKeyId: option.accessKeyId,
    //    secretAccessKey: option.secretAccessKey,
    //    endpoint: option.endpoint,
    //    apiVersion: option.apiVersion
    //});

    var version = Moment().format('YYMMDDHHmm');

    return through2.obj(function (file, enc, cb) {
        if(file.isDirectory()) return cb();
        if(file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        if(file.contents.length >= option.maxSize){
            log('WRN:', colors.red(file.path + "\t" + file.contents.length));
            return cb();
        }
        var getFileKey = function(){
            return option.prefix
                + ((!option.prefix || (option.prefix[option.prefix.length - 1]) === '/') ? '' : '/')
                + (option.versioning ? version + '/' : '')
                + path.relative(file.base, file.path);
        };
        var uploadFile = function(fileKey){
            oss = new OSS({
                accessKeyId: option.accessKeyId,
                accessKeySecret: option.accessKeySecret,
                endpoint: option.endpoint,
                bucket: option.bucket
            });
            oss.put(fileKey,file.contents).then(function (val) {
              log('OK:', colors.green(fileKey));
            }).catch (function (err) {
              log('ERR:', colors.red(fileKey + "\t" + err.code));
            });
        };
        Q.fcall(getFileKey).then(uploadFile);
        this.push(file);
        return cb();
    });
}

module.exports = oss;
