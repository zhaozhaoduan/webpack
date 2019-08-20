/**
 * 工具类
 *              -- Author by Dio Zhu. on 2017.2.9
 *
 * 修改了以前的对象的方式，以前各方法作为对象属性，问题在打包（build）后，会把整个对象打进去。
 * 现改用es6的模块方式，前端引用方法：
 *      import * as utils from '../utils.js';
 *      utils.formatTime();
 * 打包时webpack的tree-shaking会只处理被引用的方法；
 *              -- Author by Dio Zhu. on 2017.6.26
 *
 * 因为滑出窗口的 v-modal 与 elementUI的 dialog 的遮罩class一样，产生冲突报错
 * 所以新增一个自定义属性detailmark 用于 获取DOM 时区分
 *              -- Author liangyuan  2019-6-21
 */
import Vue from 'vue';

// const isServer = Vue.prototype.$isServer;
// const SPECIAL_CHARS_REGEXP = /((.))/g;
// const MOZ_HACK_REGEXP = /^moz([A-Z])/;
// const ieVersion = isServer ? 0 : Number(document.documentMode);
/* istanbul ignore next */
// const trim = function (string) {
//     return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
// };
// /* istanbul ignore next */
// const camelCase = function (name) {
//     return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
//         return offset ? letter.toUpperCase() : letter;
//     }).replace(MOZ_HACK_REGEXP, 'Moz$1');
// };

// /** ==================== 浏览器相关 ==================== */
export function getQueryStringByName(name) {
    var result = document.location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'));
    if (result == null || result.length < 1) {
        return '';
    }
    return result[1];
}

// export function getCurrentPath(opts) {
//     // var rtn = document.location.hash;
//     // if (opts && opts.pathOnly) {
//     //     rtn = rtn.split('?')[0].replace(/#!\//g, '');
//     // }
//     // return rtn;
//     return document.location.pathname;
// };

export function getCookie(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'),
        arr = document.cookie.match(reg) || null;
    if (arr && arr.length > 2) return unescape(arr[2]);
    return null;
}

export function setCookie(key, value, expires) {
    let exdate = new Date();
    exdate.setTime(exdate.getTime() + expires);
    document.cookie = key + '=' + escape(value) + (expires == null ? '' : ';expires=' + exdate.toGMTString());
}

export function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}

export let cookie = {
    set: function(obj) {
        var ck = [];
        ck.push(obj.name + '=');
        if (obj.value) {
            ck.push(!!obj.encode ? obj.value : encodeURIComponent(obj.value)); //eslint-disable-line
            // 是否encodeURIComponent
        }
        if (obj.expires) {
            var d = new Date();
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setTime(d.getTime() + obj.expires * 86400000);
            // d.setTime(d.getTime() + obj.expires);
            // // 24 * 60 * 60 * 1000
            ck.push(';expires=' + d.toGMTString());
        }
        if (obj.domain) {
            ck.push(';domain=' + obj.domain);
        }
        ck.push(';path=' + (obj.path || '/'));
        if (obj.secure) {
            ck.push(';secure');
        }
        document.cookie = ck.join('');
    },
    get: function(name, encode) {
        var m = document.cookie.match(new RegExp('(^| )' + name + '=([^;])*', 'gi')),
            v = !m ? '' : m[0].split(name + '=')[1];
        return !!encode ? v : decodeURIComponent(v); //eslint-disable-line
    }
};

export function getLocalStorage(key = '') {
    let storage = window.localStorage,
        // _uid = 'net.dongyin.admins';
        _uid =
            key ||
            window.location.host
                .split('.')
                .reverse()
                .join('.');

    if (!storage) {
        console.error('This browser does NOT support localStorage!');
        return;
    }

    if (!storage[_uid]) {
        var obj = {};
        storage[_uid] = JSON.stringify(obj);
    }

    return {
        set: function(key, value) {
            // 设置某个已保存的键值
            var obj = JSON.parse(storage.getItem(_uid));
            obj[key] = value;
            storage[_uid] = JSON.stringify(obj);
        },
        get: function(key) {
            // 获取某个已保存的键值
            if (!this.has()) return;
            var obj = JSON.parse(storage.getItem(_uid));
            if (obj.hasOwnProperty(key)) {
                return obj[key];
            }
            return null;
        },
        has: function() {
            var v = storage.getItem(_uid);
            var obj = JSON.parse(v);
            if (typeof obj !== 'object' || obj == null) {
                return false;
            }
            return true;
        },
        remove: function(key) {
            storage.removeItem(key);
        },
        clear: function() {
            storage.clear();
        }
    };
}

export function getSessionStorage(key = '') {
    let storage = window.sessionStorage,
        // _uid = 'cn.hy-sport.comb';
        _uid =
            key ||
            window.location.host
                .split('.')
                .reverse()
                .join('.');

    if (!storage) {
        console.error('This browser does NOT support sessionStorage!');
        return;
    }

    if (!storage[_uid]) {
        var obj = {};
        storage[_uid] = JSON.stringify(obj);
    }

    return {
        set: function(key, value) {
            // 设置某个已保存的键值
            var obj = JSON.parse(storage.getItem(_uid));
            obj[key] = value;
            storage[_uid] = JSON.stringify(obj);
        },
        get: function(key) {
            // 获取某个已保存的键值
            if (!this.has()) return;
            var obj = JSON.parse(storage.getItem(_uid));
            if (obj.hasOwnProperty(key)) {
                return obj[key];
            }
            return null;
        },
        has: function() {
            var v = storage.getItem(_uid);
            var obj = JSON.parse(v);
            if (typeof obj !== 'object' || obj == null) {
                return false;
            }
            return true;
        },
        remove: function(key) {
            storage.removeItem(key);
        },
        clear: function() {
            storage.clear();
        }
    };
}

//
// /* istanbul ignore next */
// export function hasClass(el, cls) {
//     if (!el || !cls) return false;
//     if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
//     if (el.classList) {
//         return el.classList.contains(cls);
//     } else {
//         return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
//     }
// };
//
// /* istanbul ignore next */
// export function addClass(el, cls) {
//     if (!el) return;
//     var curClass = el.className,
//         classes = (cls || '').split(' ');
//
//     for (let i = 0, j = classes.length; i < j; i++) {
//         let clsName = classes[i];
//         if (!clsName) continue;
//
//         if (el.classList) {
//             el.classList.add(clsName);
//         } else {
//             if (!hasClass(el, clsName)) {
//                 curClass += ' ' + clsName;
//             }
//         }
//     }
//     if (!el.classList) {
//         el.className = curClass;
//     }
// };
//
// /* istanbul ignore next */
// export function removeClass(el, cls) {
//     if (!el || !cls) return;
//     var classes = cls.split(' '),
//         curClass = ' ' + el.className + ' ';
//
//     for (let i = 0, j = classes.length; i < j; i++) {
//         let clsName = classes[i];
//         if (!clsName) continue;
//
//         if (el.classList) {
//             el.classList.remove(clsName);
//         } else {
//             if (hasClass(el, clsName)) {
//                 curClass = curClass.replace(' ' + clsName + ' ', ' ');
//             }
//         }
//     }
//     if (!el.classList) {
//         el.className = trim(curClass);
//     }
// };
//
// /* istanbul ignore next */
// export const getStyle = ieVersion < 9 ? function (element, styleName) {
//     if (isServer) return;
//     if (!element || !styleName) return null;
//     styleName = camelCase(styleName);
//     if (styleName === 'float') {
//         styleName = 'styleFloat';
//     }
//     try {
//         switch (styleName) {
//             case 'opacity':
//                 try {
//                     return element.filters.item('alpha').opacity / 100;
//                 } catch (e) {
//                     return 1.0;
//                 }
//             default:
//                 return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
//         }
//     } catch (e) {
//         return element.style[styleName];
//     }
// } : function (element, styleName) {
//     if (isServer) return;
//     if (!element || !styleName) return null;
//     styleName = camelCase(styleName);
//     if (styleName === 'float') {
//         styleName = 'cssFloat';
//     }
//     try {
//         var computed = document.defaultView.getComputedStyle(element, '');
//         return element.style[styleName] || computed ? computed[styleName] : null;
//     } catch (e) {
//         return element.style[styleName];
//     }
// };
//
// /* istanbul ignore next */
// export function setStyle(element, styleName, value) {
//     if (!element || !styleName) return;
//
//     if (typeof styleName === 'object') {
//         for (var prop in styleName) {
//             if (styleName.hasOwnProperty(prop)) {
//                 setStyle(element, prop, styleName[prop]);
//             }
//         }
//     } else {
//         styleName = camelCase(styleName);
//         if (styleName === 'opacity' && ieVersion < 9) {
//             element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
//         } else {
//             element.style[styleName] = value;
//         }
//     }
// };

export function getModal({ clickFunc } = {}) {
    if (Vue.prototype.$isServer) return;
    let modalDom = window.document.getElementsByClassName('modal')[0];
    if (!modalDom) {
        modalDom = document.createElement('div');
        modalDom.setAttribute('class', 'v-modal');
        modalDom.setAttribute('detailmark', 'detailMark');
        modalDom.addEventListener('touchmove', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        modalDom.addEventListener('click', function() {
            console.log('【utils】getModal.handleClick: ');
            if (clickFunc) clickFunc();
        });
        document.body.appendChild(modalDom);
    }
    return modalDom;
}

export function removeModal() {
    if (Vue.prototype.$isServer) return;
    // let modalDom = window.document.getElementsByClassName('v-modal')[0];
    let modalDom = window.document.querySelector('div[detailmark]');
    if (modalDom) document.body.removeChild(modalDom);
}

// /** ==================== 事件扩展 ==================== */

/**
 * chrome为保证滑动性能添加了Passive支持，而支持度并不高。。。
 *              -- Author by Dio Zhu. on 2017.12.14
 */
export function supportsPassive() {
    // Test via a getter in the options object to see
    // if the passive property is accessed
    let supportsPassive = false;
    try {
        let opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
                return supportsPassive;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {
        //
    }
    return supportsPassive;
}

export function throttle(fn, delay) {
    // 节流
    let now, lastExec, timer, context, args; //eslint-disable-line

    let execute = function() {
        fn.apply(context, args);
        lastExec = now;
    };

    return function() {
        context = this;
        args = arguments;

        now = Date.now();

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (lastExec) {
            let diff = delay - (now - lastExec);
            if (diff < 0) {
                execute();
            } else {
                timer = setTimeout(() => {
                    execute();
                }, diff);
            }
        } else {
            execute();
        }
    };
}

/*
 * 图片处理*
 * 添加阿里云oss
 *              -- mod by Dio sunleqing. on 2018.5.19
 */
export function thumb(url, { width = 750, height = 0 } = {}) {
    let str = url;
    // console.log('utils.thumb: ', url, width, height);
    // return url + '!/fw/100';
    if (/upaiyun.com/.test(url)) {
        // 又拍云缩略图
        if (width && height) str += '!/both/' + width + 'x' + height;
        else if (width) str += '!/fw/' + width;
        else if (height) str += '!/fh/' + height;
    } else if (/oss.dongyin.net|img-yp-cdn.dongyin.net/.test(url)) {
        // 阿里云缩略图
        if (width && height) str += '?x-oss-process=image/resize,m_fill,h_' + height + ',w_' + width;
        else if (width) str += '?x-oss-process=image/resize,w_' + width;
        else if (height) str += '?x-oss-process=image/resize,h_' + height;
    }
    return str;
}

/** ==================== 图片相关 ==================== */
/**
 * 头像、七牛的缩略图
 *              -- Author by Dio Zhu. on 2017.5.2
 */
export function getThumbnail(url) {
    if (!url) {
        return 'http://static1.systoon.com/share/img/185x185.png';
        // return '../static/images/default-avatar.png';
    }
    if (/qiniu.toon.mobi/.test(url)) {
        // 七牛缩略图
        return url + '?imageView2/0/w/750';
    }
    // 静态服务器头像
    if (url.indexOf('http://img.icon.systoon.com') >= 0 || url.indexOf('http://static1.systoon.com') >= 0) {
        return url;
    }
    if (url.match(/_/g) && url.match(/_/g).length > 1) return url; // 已经转过的
    let w = 80,
        h = 80,
        q = 100,
        path = url.substr(0, url.lastIndexOf('.')),
        mimeType = url.substring(url.lastIndexOf('.'), url.length),
        suffix = '_' + w + '_' + h + '_' + q + '_1';
    if (mimeType.length >= 4) {
        // 会有没有后缀，直接显示地址的头像：feedId：s_1948762391184096，avatar："http://scloud.toon.mobi/f/Zs9xtlKKvwI6-iy1CGlAK5UFxlwMtlBU-U4tt0aqqYkfI"
        return path + mimeType + suffix + '.jpg';
    } else {
        return path + suffix + mimeType;
    }
}

/** ==================== 时间函数 ==================== */
/**
 * 时间转化
 * time 时间毫秒数,必传
 * format 格式,非必传 yyyy年 MM月 dd日 hh小时 mm分 ss秒，比如传入'始于yyyy-MM-dd的hh:mm',则返回'始于2014-06-15的12:05'
 *
 * 添加了毫秒格式, 用于logger.
 * 添加了星期格式, 用于酒店, 做了'今天'的判断.
 *              -- Modified by Dio Zhu. on 2016.10.20
 * ios下new Date(2016-10-31)报错:invalid date...要改为: 2016/10/31样式
 *              -- Modified by Dio Zhu. on 2016.11.01
 * */
export function formatTime(time, format) {
    if (!time) {
        return '';
    }
    if (typeof time === 'string') {
        time = time.toString().replace(/-/g, '/'); // ios下new Date(2016-10-31)报错:invalid date...要改为: 2016/10/31样式
    }
    if (typeof time === 'number' && time.toString().length === 10) {
        time = parseInt(time + '000');
    }
    // 过去
    var stamp = new Date(time),
        cur = new Date(),
        year = stamp.getFullYear(),
        month = stamp.getMonth() + 1 > 9 ? stamp.getMonth() + 1 : '0' + (stamp.getMonth() + 1),
        day = stamp.getDate() > 9 ? stamp.getDate() : '0' + stamp.getDate(),
        hour = stamp.getHours() > 9 ? stamp.getHours() : '0' + stamp.getHours(),
        minute = stamp.getMinutes() > 9 ? stamp.getMinutes() : '0' + stamp.getMinutes(),
        sec = stamp.getSeconds() > 9 ? stamp.getSeconds() : '0' + stamp.getSeconds(),
        ms =
            stamp.getMilliseconds() < 100
                ? '0' + (stamp.getMilliseconds() < 10 ? '0' + stamp.getMilliseconds() : stamp.getMilliseconds())
                : stamp.getMilliseconds(),
        weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        week = weeks[stamp.getDay()];
    if (format) {
        format = format.replace('yyyy', year);
        format = format.replace('MM', month);
        format = format.replace('dd', day);
        format = format.replace('hh', hour);
        format = format.replace('mm', minute);
        format = format.replace('ss', sec);
        format = format.replace('ms', ms);

        if (year === cur.getFullYear() && stamp.getMonth() === cur.getMonth() && stamp.getDate() === cur.getDate()) {
            week = '今天';
        }
        format = format.replace('week', week);
    } else {
        format = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }

    return format;
}

/**
 * 把字符串、数字转换成时间对象
 *              -- Author by Dio Zhu. on 2017.2.18
 */
export function dateTrans(dt) {
    if (typeof dt === 'string') {
        dt = dt.toString().replace(/-/g, '/'); // ios下new Date(2016-10-31)报错:invalid date...要改为: 2016/10/31样式
    }
    if (typeof dt === 'number' && dt.toString().length === 10) {
        dt = parseInt(dt + '000');
    }
    dt = new Date(dt);
    return dt;
}

/**
 * 时间是否同年、同月、同日的判断函数
 *              -- Author by Dio Zhu. on 2017.2.18
 */
export function isSameYear(dt1, dt2) {
    if (!dt1 || !dt2) return false;
    dt1 = dt1 instanceof Date ? dt1 : this.dateTrans(dt1);
    dt2 = dt2 instanceof Date ? dt2 : this.dateTrans(dt2);
    return dt1.getFullYear() === dt2.getFullYear();
}

export function isSameMonth(dt1, dt2) {
    if (!dt1 || !dt2) return false;
    dt1 = dt1 instanceof Date ? dt1 : this.dateTrans(dt1);
    dt2 = dt2 instanceof Date ? dt2 : this.dateTrans(dt2);
    return dt1.getFullYear() === dt2.getFullYear() && dt1.getMonth() === dt2.getMonth();
}

export function isSameDay(dt1, dt2) {
    if (!dt1 || !dt2) return false;
    dt1 = dt1 instanceof Date ? dt1 : dateTrans(dt1);
    dt2 = dt2 instanceof Date ? dt2 : dateTrans(dt2);
    return dt1.getMonth() === dt2.getMonth() && dt1.getDate() === dt2.getDate();
}

export const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/** 闰年 */
export const getIsLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
export const getMonthComps = (month, year) => ({
    days: month === 2 && getIsLeapYear(year) ? 29 : daysInMonths[month - 1],
    month,
    year
});

/** 上周 */
export const getPrevWeekComps = (month, year, day) => {
    let dt = year && month && day ? new Date(year, month - 1, day) : new Date();
    dt.setDate(dt.getDate() - 7 + dt.getDay() - 3); // 这么写是为了从周三开始计算本月还是下月、上月。。。
    let comps = getMonthComps(dt.getMonth() + 1, dt.getFullYear());
    // console.log('===========>>>>> ', year, month, day, dt, comps);
    return { ...comps, day: dt.getDate() };
};
/** 下周 */
export const getNextWeekComps = (month, year, day) => {
    let dt = year && month && day ? new Date(year, month - 1, day) : new Date();
    // console.log('===========>>>>> ', year, month, day, dt);
    dt.setDate(dt.getDate() + 7 - dt.getDay() + 3); // 这么写是为了从周三开始计算本月还是下月、上月。。。
    // console.log('===========>>>>> ', year, month, day, dt);
    let comps = getMonthComps(dt.getMonth() + 1, dt.getFullYear());
    // console.log('===========>>>>> ', year, month, day, dt, comps);
    return { ...comps, day: dt.getDate() };
};
/** 上个月 */
export const getPrevMonthComps = (month, year) => {
    if (month === 1) return getMonthComps(12, year - 1);
    return getMonthComps(month - 1, year);
};

/** 下个月 */
// Day/month/year components for next month
export const getNextMonthComps = (month, year) => {
    if (month === 12) return getMonthComps(1, year + 1);
    return getMonthComps(month + 1, year);
};

/** ==================== 各种正则 ==================== */
/**
 * validator校验
 *              -- Author By Dio Zhu. on 2017.5.10
 */
export function validateEmail(val) {
    let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // (字母、数字、下划线、-、. )@(字母、数字、-)
    return re.test(val);
}

export function validateTel(val) {
    let re = /^0\d{2,3}-?\d{7,8}$/; // 0开头2~3位区号，可以加-（也可不加），加上7~8位数字
    return re.test(val);
}

export function validateMobile(val) {
    let re = /^1\d{10}$/; // 1开头的11位数字
    return re.test(val);
}

/**
 * 不允许输入特殊字符
 * */
export function validateText(val) {
    let re = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
    return re.test(val);
}

/**
 * 输入手机号的校验
 * */
export function validatePhone(val) {
    let re = /^0?1[3|4|5|6|7|8|9]\d{9}$/;
    return re.test(val);
}

/**
 * 输入电话号的校验
 * */
export function validatePhoneTel(val) {
    let re = /^0?1[3|4|5|6|7|8|9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
    return re.test(val);
}

/**
 * 数字
 * */
export function validateNumbers(val) {
    let re = /^[0-9]*$/;
    return re.test(val);
}

/**
 * 输入身份证号的校验
 * */
export function validateCard(val) {
    let re = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return re.test(val);
}

// /**
//  * 银行卡号校验
//  * */
// export function validateBank(val) {
//     return true;
// };

// 军人身份证验证：6-8位字母数字组合 刘俊俊 2018.9.12(产品张佳欣)
export function validateSorderIdenty(val) {
    let re = /^\s*\w{6,8}\s*$/;
    return re.test(val);
}

// 社会保障卡验证--10位数字--孙硕---2017-12-15；
export function validateSocialSecurityCard(val) {
    let re = /^\s*\d{10}\s*$/;
    return re.test(val);
}

// 港澳通行证验证--字母c后至少六位数字后的任意字符--孙硕---2017-12-15；
export function validateHongKongMacauPasser(val) {
    // let re = /^\s*[a-zA-Z]\d{6,12}\s*$/ig;
    let re = /^\s*[a-zA-Z]\d{6,}/;
    return re.test(val);
}

// 台湾居民来往大陆通行证验证--8位数字--孙硕---2017-12-15；
export function validateTaiwanPasser(val) {
    let re = /^\s*\d{8}\s*$/;
    return re.test(val);
}

// 户口本验证--9位数字--孙硕---2017-12-15；
export function validateHouseHoldRegister(val) {
    let re = /^\s*\d{9}\s*$/;
    return re.test(val);
}

// 临时居民身份证验证--18位数字--孙硕---2017-12-15；
export function validateInterimId(val) {
    let re = /^\s*\d{18}\s*$/;
    return re.test(val);
}

// 护照验证---孙硕---2017-12-15；
export function validatePassport(val) {
    let re = /^\s*[a-zA-Z0-9]{6,12}\s*$/;
    return re.test(val);
}

// 外国人永久居留证验证--孙硕---2017-12-15；
export function permitForForeigners(val) {
    // 做有值校验
    return /\w+/.test(val);
}

export function getComputedStyle(el) {
    // return Vue.prototype.$isServer ? {} : document.defaultView.getComputedStyle(el);
    return document.defaultView.getComputedStyle(el);
}

export function completeDate(startTime, endTime, dayNum) {
    // 获取时间戳
    var startTimestamp = new Date(startTime).getTime();
    var endTimestamp = new Date(endTime).getTime();

    if (startTimestamp >= endTimestamp) {
        return false;
    }

    if (endTimestamp - startTimestamp >= dayNum * 24 * 60 * 60 * 1000) {
        return false;
    } else {
        return true;
    }
}

/*
 * 功能：给图片URL地址增加后缀
 * 解决问题：
 *   首次加载：接收req.headers.accept的值，确认是否有'image/webp'
 *       如果有：支持webp，给对应的webp图
 *       没有：则不支持webp，要啥图给啥图
 *   浏览器中的路由切换：判断浏览器是否支持webp
 *       如果有：支持webp，给对应的webp图
 *       没有：则不支持webp，要啥图给啥图
 *
 * 功能：对图片进行处理（阿里云）
 * @param string url 文件名
 * @param Object {}  参数
 *   width: 图片宽度
 *   height: 图片高度
 *
 * 调整type参数，兼容默认引用;
 * 默认png不做处理，如确定不需要透底，可指定type=jpg，进行类型转后后再启用渐进方案；
 *               -- Mod by Dio sunleqing. on 2019.5.24
 **/
export function format(url, { width = 0, height = 0, type = '', thumb = false } = {}) {
    // 请求过程中，有undefined, ''等URL地址，返回默认图片
    if (!url) return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    // 有地址会被两次处理
    // console.error(url, url.indexOf('x-oss-process') >= 0 || url.indexOf('!/') >= 0);
    if (url.indexOf('x-oss-process') >= 0 || url.indexOf('!/') >= 0) return url;

    // 判断是否支持webp
    let webp = getLocalStorage().get('webp-is-supported') || false;

    // 避免https下访问http图片会报警告（后台存储的sku图片等）。
    url = url.replace('http://', '//').replace('https://', '//');

    // 获取URL地址后的后缀名
    const newType = url.slice(url.lastIndexOf('.') + 1);

    // window.alert(url);
    // window.alert(/upyun-img/.test(url));
    if (/upaiyun.com/.test(url) || /upyun-img/.test(url)) {
        // 又拍云
        if (thumb) return url + '!/fw/50' + (newType === 'png' ? '' : '/gaussblur/5x5'); // 返回缩略图
        let tmp = '!';

        // 2. 格式转换 非空 && (非webp格式 || webp && 支持webp)
        if (webp) {
            // 如果浏览器支持webp，使用webp格式
            tmp += '/format/webp';
        } else if (type || (!type && newType === 'png')) {
            // 如果传入了类型转换 || (未指定类型转换 && 当前url为png类型)
            if (!type && newType === 'png') type = newType; // 默认png不指定类型转换是看不到渐进效果的，这里这么写是为了兼容。 Mod by Dio Zhu. on 2018.8.10
            tmp += `/format/${type}/progressive/true`;
        } else {
            // 默认所有图片都转换为jpg、渐进
            tmp += '/format/jpg/progressive/true';
        }

        // 1. 宽高
        if (width && height) tmp += '/both/' + width + 'x' + height;
        else if (width) tmp += '/fw/' + width;
        else if (height) tmp += '/fh/' + height;

        let newQuery = tmp === '!' ? '' : tmp;
        return url + newQuery;
    } else if (/aliyuncs.com|static.91wuliu.com/.test(url)) {
        // 阿里云oss（自有域名：s01.dongyin.net）
        // console.warn(url, thumb);
        if (thumb)
            return url + '?x-oss-process=image/format,webp/resize,w_51' + (newType === 'png' ? '' : '/blur,r_5,s_5'); // 返回缩略图
        let tmp = '';

        // 1. 针对宽高处理
        if (width) tmp = `/resize,w_${width}`;
        if (height) tmp = `/resize,h_${height}`;
        if (width && height) tmp = `/resize,m_fill,w_${width},h_${height}`;

        // 2. 格式转换 非空 && (非webp格式 || webp && 支持webp)
        if (webp) {
            // 如果浏览器支持webp，使用webp格式
            tmp += '/format,webp';
        } else if (type || (!type && newType === 'png')) {
            // 如果传入了类型转换 || (未指定类型转换 && 当前url为png类型)
            if (!type && newType === 'png') type = newType; // 默认png不指定类型转换是看不到渐进效果的，这里这么写是为了兼容。 Mod by Dio Zhu. on 2018.8.10
            tmp += `/format,${type}/interlace,1`;
        } else {
            // 默认所有图片都转换为jpg、渐进
            tmp += '/format,jpg/interlace,1';
        }

        // 3. 拼接新图片路径
        let newQuery = tmp === '' ? '' : '?x-oss-process=image' + tmp;
        return url + newQuery;
    } else {
        return url;
    }
}

/**
 * 获取开始日期 日期后面加上 00:00:00
 *              -- Author By 高海龙. on 2019.6.1
 */
export function getStartDate(start) {
    console.log(typeof start);
    if (start) {
        return start + ' 00:00:00';
    }
}

/**
 * 获取结束日期 日期后面加上 23:59:59
 *              -- Author By 高海龙. on 2019.6.1
 */
export function getEndDate(end) {
    if (end) {
        return end + ' 23:59:59';
    }
}

/**
 * 输入钱格式验证
 *              -- Author By 高海龙. on 2019.6.1
 */
export function validateMoney(val) {
    let re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([1-9])?$)/;
    return re.test(val);
}

/**
 * 输入钱  不能输入空格 两位小数 最大999999.99 做限制输入 input类型text
 *              -- Author By zouyu. on 2019.7.29
 */
export function validateMoneyInput(vm, data, k) {
    // console.log(vm, data, k);
    // console.log(vm[data][k]);
    if (vm[data][k] === '.') {
        vm[data][k] = '0.';
    }
    let regStrs = [
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'], //禁止录入小数点后两位以上
        ['^(\\.\\d+)', '$1'] //禁止输入情况下小数点出现在首位
    ];
    for (let i = 0; i < regStrs.length; i++) {
        let reg = new RegExp(regStrs[i][0]);
        vm[data][k] = vm[data][k].replace(reg, regStrs[i][1]);
    }
    if (Number(vm[data][k]) > 999999.99) {
        vm[data][k] = 999999.99;
    }
    console.log(vm[data][k], '----');
    return vm[data][k];
}

/**
 * 除“-”和“/” 和 "()"外不允许录入特殊字符 whx
 * */
export function validateCharacters(val) {
    let re = /^[\u4E00-\u9FA5A-Za-z0-9\-/\\\\/\-(\-)]+$/;
    return re.test(val);
}
/**
 * 保留小数点后两位 whx
 * */
export function validateDecimalPoint(val) {
    let re = /^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$/;
    return re.test(val);
}
