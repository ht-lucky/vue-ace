"use strict";
import axios from "axios";
import qs from 'qs';
import {Message} from 'element-ui';
import router from '../router'; //路由
import store from '../store'
// import config from "./config";
// axios.defaults.withCredentials=true
var util = {
    intervalFnc(_data, _val = 4) {
        if (_data && _data.length > 0) {
            return parseInt(util.ceilNumber((Math.max(..._data))) / 4)
        }
    },
    maxFnc(_data) {
        return util.ceilNumber((Math.max(..._data)))
    },
    ceilNumber(number) {
        return Math.ceil(number / 100) * 100
    },
    percent(_val, _num) {
        let _return = '';
        if (!_val) {
            _return = 0;
        } else {
            if (+_val === 1) {
                _return = 100;
            } else {
                _return = util.myFixed(_val * 100, 1)
            }
        }
        if (!_num) {
            _return += '%'
        }
        return _return;
    },
    myFixed(num, digit) {
        if (Object.is(parseFloat(num), NaN)) {
            return console.log(`传入的值：${num}不是一个数字`);
        }
        num = parseFloat(num);
        return (Math.round((num + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit);
    },
    /**
     * 深拷贝
     */
    // 定义一个深拷贝函数  接收目标target参数
    deepClone(obj) {
        if (Object.prototype.toString.call(obj).slice(8, -1) != 'Object' && Object.prototype.toString.call(obj).slice(8, -1) != 'Array') {
            return obj;
        }
        var newObj = obj.constructor === Array ? [] : {}; //开辟一块新的内存空间

        for (var i in obj) {
            newObj[i] = this.deepClone(obj[i]); //通过递归实现深层的复制
        }
        return newObj;
    },
    $success(_msg) {
        Message({
            type: 'success',
            message: _msg
        });
    },
    $error(_msg) {
        Message({
            type: 'error',
            message: _msg
        });
    },
    $warn(_msg) {
        Message({
            type: 'warning',
            message: _msg
        });
    },
    $alert(_msg) {
        Message(_msg);
    },
    /**
     * 获取url参数
     */
    getParam(b) {
        var c = document.location.href;
        if (!b) {
            return c
        }
        var d = new RegExp("[?&]" + b + "=([^&]+)", "g");
        var g = d.exec(c);
        var a = null;
        if (null != g) {
            try {
                a = decodeURIComponent(decodeURIComponent(g[1]))
            } catch (f) {
                try {
                    a = decodeURIComponent(g[1])
                } catch (f) {
                    a = g[1]
                }
            }
        }
        return a;
    },
    /**
     * 写入cookie
     * @param key
     * @param val
     * @param day
     */
    setCookies(key, val, day) {
        //获取当前日期
        var expiresDate = new Date();
        //设置生存期，一天后过期
        expiresDate.setDate(expiresDate.getDate() + (day ? day : 1));
        document.cookie = key + "=" + val + ";expires= " + expiresDate.toGMTString() + ";path=/"; //标记已经访问了站点
    },
    /**
     * 获取cookies
     * @param key
     */
    getCookies(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    /**
     * 删除cookies
     * @param key
     */
    delCookies(key) {
        //获取当前日期
        var expiresDate = new Date();
        //设置生存期，一天后过期
        expiresDate.setDate(expiresDate.getDate() - 100);
        document.cookie = key + "=;expires= " + expiresDate.toGMTString() + ";path=/"; //标记已经访问了站点
    },
    /**
     * 清空所有cookies
     */
    delAllCookies() {
        //获取所有的cookies key
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                this.delCookies(keys[i]);
            }
        }
    },
    checkImg(_name) {
        var index = _name.indexOf("."); //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
        _name = _name.substring(index); //截断"."之前的，得到后缀
        if (_name != ".bmp" && _name != ".png" && _name != ".gif" && _name != ".jpg" && _name != ".jpeg") { //根据后缀，判断是否符合图片格式
            return false;
        }
        return true;
    },
    //http请求封装
    $ajax(obj, cb) {
        let token = localStorage.getItem('token');
        let realName = localStorage.getItem('realName');
        if (typeof obj == 'object' && obj.url) {
            const _isForm = obj.isForm ? obj.isForm : '1';
            const _type = obj.type ? obj.type : 'get'; // 是否是get 请求  默认是get
            const _login = obj.login ? obj.login : '1'; // 是否需要登录   默认是需要登录否则跳转到登录页面
            const _showError = obj.mistake ? obj.mistake : '1'; // 是否有报错信息  默认是有
            let _data = obj.data ? obj.data : {};
            var _obj = {
                method: _type,
                url: (process.env.NODE_ENV === "development" ? '/api/' : '/api/') + obj.url,
                headers: obj.headers ? obj.headers : {}
            };
            //如果是政务环境 重写url变成绝对路径 -----------------结束----------------
            if (_type == 'get' || _type == 'GET') {
                _obj.params = _data;
            } else {
                _obj.data = _data;
            }
            if (_type == 'post' || _type == 'POST') {
                if (_isForm == '2') {
                    _obj.headers = {..._obj.headers, "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"};
                    _obj.data = qs.stringify(_obj.data, {arrayFormat: 'brackets'});
                } else {
                    _obj.headers = {
                        ..._obj.headers,
                        "Content-type": "application/json",
                    }
                }
            }
            _obj.headers.Authorization = token;
            _obj.headers.realName = encodeURI(realName);
            axios(_obj).then((_res) => {
                const res = _res.data;
                if (+res.code === 0) {
                    if (cb && typeof cb === 'function') {
                        cb(res);
                    }
                } else {
                    if (+res.code === 403 && +_login === 1) {
                        if (+_showError === 1) {
                            util.$error('未登录或者登录已过期，请登录');
                            store.commit('setUserGjInfo', {});
                            localStorage.setItem('token', '');
                            setTimeout(() => {
                                router.push({path: '/nav'});
                            }, 1000);
                        }
                    } else {
                        util.$error(res.msg || res.message || '服务器出小差了');

                    }
                }
            }).catch((res) => {
                this.$error(res.msg || res.message || '服务器出小差了');
            });
        }
    },
    /**
     * 深拷贝
     */
    deepClones(obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj); //系列化对象
            newobj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    this.deepClones(obj[i]) : obj[i];
            }
        }
        return newobj;
    },

    Tools: {
        /**
         * 手机号码格式是否正确
         * @param mobile:string 手机号码 11位
         * @return true/false
         */
        isMobile: function (mobile) {
            if (mobile && mobile.length != 11) return false;
            var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;
            if (mobile == '' || !reg.test(mobile)) {
                return false;
            }
            return true;
        },
        /**
         * 身份证号码格式是否正确
         * @param cardNo:string 身份证号码
         * @return true/false
         */
        isIdCardNo: function (cardNo) {
            if (cardNo == '' || !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(cardNo)) {
                return false;
            }
            return true;
        },

        /**
         * IP地址格式是否正确
         * @param IPNo:string ip地址
         * @return true/false
         */
        isIPNo: function (IPNo) {
            if (IPNo == '' || !/^\d+\.\d+\.\d+\.\d+$/i.test(IPNo)) {
                return false;
            }
            return true;
        },


        /**
         * 邮箱地址格式是否正确
         * @param _email:string 邮箱地址
         * @return true/false
         */
        isEmail: function (_email) {
            var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (_email == '' || !reg.test(_email)) {
                return false;
            }
            return true;
        },

        /**
         * 公用处理数据---格式化金额  保留2位小数 千分位逗号
         * @param {type} number
         * @param {type} decimals
         * @param {type} thousands_sep
         * @param {type} dec_point
         * @param {type} roundtag  舍入参数，默认 "round" 四舍五入 ,"ceil" 向上取,"floor"向下取,
         * @returns {unresolved}
         */
        priceFormat: function (number, decimals, thousands_sep, dec_point, roundtag) {
            /*
             * 参数说明：
             * number：要格式化的数字
             * decimals：保留几位小数
             * dec_point：小数点符号
             * thousands_sep：千分位符号
             * roundtag:舍入参数，默认 "round" 四舍五入 ,"ceil" 向上取,"floor"向下取,
             * */
            //if(!number) return 0.00*1;
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            roundtag = roundtag || "round"; //"ceil","floor","round"
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var s = n.toString();
                    var sArr = s.split(".");
                    var m = 0;
                    try {
                        m += sArr[1].length;
                    } catch (e) {
                    }

                    if (prec > m) {
                        return s;
                        /*'' + Number(s.replace(".", "")) / Math.pow(10, m);*/
                    } else {
                        sArr[1] = Math[roundtag](Number(sArr[1]) / Math.pow(10, m - prec));
                        while (sArr[1].toString().length < prec) {
                            sArr[1] = '0' + sArr[1];
                        }
                        return sArr.join('.');
                    }
                };
            s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        }
    },
    // 格式化时间 返回 年月日的格式
    forMatterDate(_date, _type) {
        if (_date) {
            var date = new Date(_date);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
            var hh = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
            var mm = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
            var ss = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds();
            if (_type) {
                return (Y + M + D + ' ' + hh + ':' + mm + ':' + ss);
            } else {
                return (Y + M + D);
            }
        } else {
            return '';
        }

    },
    // 格式化时间 返回 年月日的格式
    forMatterChineseDate(_date, _type) {
        if (_date) {
            var date = new Date(_date);
            var Y = date.getFullYear() + '年';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
            var D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
            var hh = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
            var mm = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
            var ss = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds();
            if (_type) {
                return (Y + M + D + ' ' + hh + ':' + mm + ':' + ss);
            } else {
                return (Y + M + D + '日');
            }
        } else {
            return '';
        }

    },
    // 获取当前日期
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
};
export {util};
