/**
 * 打印日志
 * 本质上是封装了console，防止在ie下报错
 *
 * Created by sourcod on 2018/06/04.
 * Copyright 2018 ljy. All rights reserved.
 * @type {{isSupport: Log.isSupport, log: Log.log, i: Log.i, d: Log.d, w: Log.w, e: Log.e, profile: Log.profile, profileEnd: Log.profileEnd, time: Log.time, timeEnd: Log.timeEnd, dir: Log.dir}}
 */
var Log = {
    /*判断是否支持console*/
    isSupport:function() {
        if(window.console) {
            return true;
        }
        return false;
    },
    log:function(message) {
        if(this.isSupport()) {
            console.log(message);
        }
    },
    info:function(message) {
        if(this.isSupport()) {
            console.info(message);
        }
    },
    info:function(message, a) {
        if(this.isSupport()) {
            console.info(message);
        }
    },
    debug:function(message) {
        if(this.isSupport()) {
            console.debug(message);
        }
    },
    warn:function(message) {
        if(this.isSupport()) {
            console.warn(message);
        }
    },
    error:function(message) {
        if(this.isSupport()) {
            console.error(message);
        }
    },
    profile:function(message) {
        if(this.isSupport()) {
            console.profile(message);
        }
    },
    profileEnd:function() {
        if(this.isSupport()) {
            console.profileEnd();
        }
    },
    time:function(message) {
        if(this.isSupport()) {
            console.time(message);
        }
    },
    timeEnd:function(message) {
        if(this.isSupport()) {
            console.timeEnd(message);
        }
    },
    dir:function(obj) {
        if(this.isSupport()) {
            console.dir(obj);
        }
    }
};
