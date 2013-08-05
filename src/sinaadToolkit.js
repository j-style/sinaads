/**
 * sinaadToolkit
 * @description 新浪广告工具包，提供了浏览器判断，渲染，cookie, storage, iframe, 转义等基础操作
 * @author  acelan <xiaobin8[at]staff.sina.com.cn>
 * @version  1.0.0
 */
(function (window, undefined) {

    var sinaadToolkit = window.sinaadToolkit || {
        /**
         * 工具包版本号
         * @type {String}
         * @const
         */
        VERSION : '1.0.0',
        /**
         * 工具包资源地址
         * @static
         * @const
         */
        TOOLKIT_URL : 'http://d1.sina.com.cn/litong/zhitou/sinaads/src/core.js',
        /**
         * 获取当前时间戳
         * @return {Number} 当前时间戳
         * @static
         */
        now : function () {
            return new Date().getTime();
        },
        /**
         * 随机数生成，生成一个随机数的36进制表示方法
         * @return {String} 生成一个随机的36进制字符串（包含0-9a-zA-Z）
         * @static
         */
        rnd : function () {
            return Math.floor(Math.random() * 2147483648).toString(36);
        },
        /**
         * 判断是否是函数
         * @param  {Any}        source      需要判断的对象
         * @return {Boolean}                是否是函数
         * @staitc
         */
        isFunction : function (source) {
            return '[object Function]' == Object.prototype.toString.call(source);
        },
        /**
         * 判断是否是字符串
         * @param  {Any} source 要判断的对象
         * @return {Boolean}        是否字符串
         * @static
         */
        isString : function (source) {
           return '[object String]' == Object.prototype.toString.call(source);
        }
    };

    /**
     * @namespace sinaadToolkit.browser
     */
    sinaadToolkit.browser = sinaadToolkit.browser || (function (ua) {
        /**
         * @lends sinaadToolkit.browser
         */
        var browser = {
            /**
             * 是否是andriod系统
             * @type {Boolean}
             */
            android : /(Android)\s+([\d.]+)/i.test(ua),
            /**
             * @type {Boolean}
             */
            ipad : /(iPad).*OS\s([\d_]+)/i.test(ua),
            /**
             * @type {Boolean}
             */
            webos : /(webOS|hpwOS)[\s\/]([\d.]+)/i.test(ua),
            /**
             * @type {Boolean}
             */
            kindle : /Kindle\/([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            silk : /Silk\/([\d._]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            blackberry : /(BlackBerry).*Version\/([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            bb10 : /(BB10).*Version\/([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            rimtabletos : /(RIM\sTablet\sOS)\s([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            playbook : /PlayBook/i.test(ua),
            /** 
             * 如果是chrome浏览器，返回浏览器当前版本号
             * @type {Number}
             */
            chrome : /chrome\/(\d+\.\d+)/i.test(ua) ? + RegExp['\x241'] : undefined,
            /**
             * 如果是firefox浏览器，返回浏览器当前版本号
             * @type {Number}
             */
            firefox : /firefox\/(\d+\.\d+)/i.test(ua) ? + RegExp['\x241'] : undefined,
            /**
             * 如果是ie返回ie当前版本号
             * @type {Number}
             */
            ie : /msie (\d+\.\d+)/i.test(ua) ? (document.documentMode || + RegExp['\x241']) : undefined,
            /**
             * @type {Boolean}
             */
            isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua),
            /**
             * @type {Boolean}
             */
            isStrict : document.compatMode == "CSS1Compat",
            /**
             * @type {Boolean}
             */
            isWebkit : /webkit/i.test(ua),
            /**
             * 如果是opera,返回opera当前版本号
             * @type {Number}
             */
            opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(ua) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined
        };

        /**
         * @type {Boolean}
         */
        browser.iphone = !browser.ipad && /(iPhone\sOS)\s([\d_]+)/i.test(ua);
        /**
         * @type {Boolean}
         */
        browser.touchpad = browser.webos && /TouchPad/.test(ua);
        /**
         * @type {Boolean}
         */
        browser.tablet = !!(browser.ipad || browser.playbook || (browser.android && !/Mobile/.test(ua)) || (browser.firefox && /Tablet/.test(ua)));
        /**
         * @type {Boolean}
         */
        browser.phone  = !!(!browser.tablet && (browser.android || browser.iphone || browser.webos || browser.blackberry || browser.bb10 || (browser.chrome && /Android/.test(ua)) || (browser.chrome && /CriOS\/([\d.]+)/.test(ua)) || (browser.firefox && /Mobile/.test(ua))));

        try {
            if (/(\d+\.\d+)/.test(external.max_version)) {
                /**
                 * 如果是遨游浏览器，返回遨游版本号
                 * @type {Number}
                 */
                browser.maxthon = + RegExp['\x241'];
            }
        } catch (e) {}

        /**
         * 如果是safari浏览器，返回safari版本号
         * @type {Number}
         */
        browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
        /**
         * 是否支持position:fixed属性
         * @type {Boolean}
         */
        browser.isSupportFixed = !browser.ie || browser.ie >=7;

        return browser;

    })(navigator.userAgent);


    /**
     * @namespace sinaadToolkit.array
     */
    sinaadToolkit.array = sinaadToolkit.array || /** @lends sinaadToolkit.array */{
        /**
         * 移除数组元素
         * @param  {Array} source 要移除元素的数组
         * @param  {Any} match  要移除的元素
         * @return {Array}        移除元素后的数组
         */
        remove : function (source, match) {
            var len = source.length;
                
            while (len--) {
                if (len in source && source[len] === match) {
                    source.splice(len, 1);
                }
            }
            return source;
        },
        /**
         * 遍历数组
         * @param  {Array} source     要遍历的源数组
         * @param  {Function} iterator   遍历方法
         * @param  {Object} thisObject 调用对象
         * @return {Array}            被遍历的源数组
         */
        each : function (source, iterator, thisObject) {
            var returnValue, 
                item, 
                i, 
                len = source.length;
            
            if ('function' == typeof iterator) {
                for (i = 0; i < len; i++) {
                    item = source[i];
                    //TODO
                    //此处实现和标准不符合，标准中是这样说的：
                    //If a thisObject parameter is provided to forEach, it will be used as the this for each invocation of the callback. If it is not provided, or is null, the global object associated with callback is used instead.
                    returnValue = iterator.call(thisObject || source, item, i);
            
                    if (returnValue === false) {
                        break;
                    }
                }
            }
            return source;
        }
    };


    /**
     * @namespace sinaadToolkit.string
     */
    sinaadToolkit.string = sinaadToolkit.string || (function () {
        var ESCAPE_MAP = {
                '"'     : '\\"',
                "\\"    : "\\\\", 
                "/"     : "\\/",
                "\b"    : "\\b",
                "\f"    : "\\f",
                "\n"    : "\\n",
                "\r"    : "\\r",
                "\t"    : "\\t",
                "\x0B"  : "\\u000b"
            },
            //字符串中非中文字符串
            STR_REG =  /\uffff/.test("\uffff") ? (/[\\\"\x00-\x1f\x7f-\uffff]/g) : (/[\\\"\x00-\x1f\x7f-\xff]/g);
        
        return /** @lends sinaadToolkit.string */{
            /**
             * 转义html
             * @param  {String} source 要转义的源字符串
             * @return {String}        转义后的字符串
             */
            encodeHTML : function (source) {
                return String(source)
                            .replace(/&/g,'&amp;')
                            .replace(/</g,'&lt;')
                            .replace(/>/g,'&gt;')
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#39;");
            },      
            /**
             * 反转义html
             * @param  {String} source 要转义的源字符串
             * @return {String}        转义后的字符串
             */
            decodeHTML : function (source) {
                var str = String(source)
                            .replace(/&quot;/g,'"')
                            .replace(/&lt;/g,'<')
                            .replace(/&gt;/g,'>')
                            .replace(/&amp;/g, "&");
                //处理转义的中文和实体字符
                return str.replace(/&#([\d]+);/g, function(_0, _1){
                    return String.fromCharCode(parseInt(_1, 10));
                });
            },
            /**
             * 转义字符串中的特殊字符
             * @params {Sting} source 要转义的字符串
             * @return {String} 转义后的字符串
             */
            formalString : function (source) {
                var ret = [];
                ret.push(source.replace(STR_REG, function(str) {
                    //如果再需要转义的字符表中，替换成转移字符对应的值
                    if (str in ESCAPE_MAP) {
                        return ESCAPE_MAP[str];
                    }
                    //否则转成对应的unicode码
                    var alphaCode = str.charCodeAt(0), 
                        unicodePerfix = "\\u";
                    //需要增加几位0来补位
                    16 > alphaCode ? unicodePerfix += "000" : 256 > alphaCode ? unicodePerfix += "00" : 4096 > alphaCode && (unicodePerfix += "0");

                    //保存转移过的值到ESCAPE_MAP提高转义效率，同时返回进行替换
                    return ESCAPE_MAP[str] = unicodePerfix + alphaCode.toString(16);
                }));
                return '"' + ret.join('') + '"';
            }
        };
    })();



    /**
     * @namespace sinaadToolkit.object
     */
    sinaadToolkit.object = sinaadToolkit.object || /** @lends sinaadToolkit.object */{
        /**
         * object的遍历方法
         * @param  {Object} source   要遍历的对象
         * @param  {Function} iterator 遍历方法，第一个参数为遍历的值，第二个位key
         * @return {Object}          key映射的遍历结果
         */
        map : function (source, iterator) {
            var results = {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    results[key] = iterator(source[key], key);
                }
            }
            return results;
        }
    };

    /**
     * @namespace sinaadToolkit.cookie
     */
    sinaadToolkit.cookie = sinaadToolkit.cookie || /** @lends sinaadToolkit.cookie */{
        /**
         * @private
         * @param  {String} key 要验证的cookie的key
         * @return {Boolean}    是否为符合规则的key
         */
        // http://www.w3.org/Protocols/rfc2109/rfc2109
        // Syntax:  General
        // The two state management headers, Set-Cookie and Cookie, have common
        // syntactic properties involving attribute-value pairs.  The following
        // grammar uses the notation, and tokens DIGIT (decimal digits) and
        // token (informally, a sequence of non-special, non-white space
        // characters) from the HTTP/1.1 specification [RFC 2068] to describe
        // their syntax.
        // av-pairs   = av-pair *(";" av-pair)
        // av-pair    = attr ["=" value] ; optional value
        // attr       = token
        // value      = word
        // word       = token | quoted-string
         
        // http://www.ietf.org/rfc/rfc2068.txt
        // token      = 1*<any CHAR except CTLs or tspecials>
        // CHAR       = <any US-ASCII character (octets 0 - 127)>
        // CTL        = <any US-ASCII control character
        //              (octets 0 - 31) and DEL (127)>
        // tspecials  = "(" | ")" | "<" | ">" | "@"
        //              | "," | ";" | ":" | "\" | <">
        //              | "/" | "[" | "]" | "?" | "="
        //              | "{" | "}" | SP | HT
        // SP         = <US-ASCII SP, space (32)>
        // HT         = <US-ASCII HT, horizontal-tab (9)>
        _isValidKey : function (key) {
            return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
        },
        /**
         * 从cookie中获取key所对应的值
         * @private
         * @param  {String} key 要获取的cookie的key
         * @return {String}     cookie对应该key的值
         */
        _getRaw : function (key) {
            if (sinaadToolkit.cookie._isValidKey(key)) {
                var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                    result = reg.exec(document.cookie);
                     
                if (result) {
                    return result[2] || null;
                }
            }
            return null;
        },
        /**
         * 将cookie中key的值设置为value, 并带入一些参数
         * @private
         * @param  {String} key 要设置的cookie的key
         * @param  {String} value 要设置的值
         * @param  {Object} options 选项
         */
        _setRaw : function (key, value, options) {
            if (!sinaadToolkit.cookie._isValidKey(key)) {
                return;
            }
             
            options = options || {};

            // 计算cookie过期时间
            var expires = options.expires;
            if ('number' == typeof options.expires) {
                expires = new Date();
                expires.setTime(expires.getTime() + options.expires);
            }
             
            document.cookie =
                key + "=" + value
                + (options.path ? "; path=" + options.path : "")
                + (expires ? "; expires=" + expires.toGMTString() : "")
                + (options.domain ? "; domain=" + options.domain : "")
                + (options.secure ? "; secure" : ''); 

        },
        /**
         * 获取cookie中key的值
         * @param  {String} key 要获取的key
         * @return {String}     cookie值
         */
        get : function (key) {
            var value = sinaadToolkit.cookie._getRaw(key);
            if ('string' == typeof value) {
                value = decodeURIComponent(value);
                return value;
            }
            return null;
        },
        /**
         * 设置cookie值
         * @param  {String} key     要设置的key
         * @param  {String} value   要设置的value   
         * @param  {object} options 选项
         */
        set : function (key, value, options) {
            sinaadToolkit.cookie._setRaw(key, encodeURIComponent(value), options);
        },
        /**
         * 移除key相关的cookie
         * @param  {String} key     要移除的cookie的key
         * @param  {Object} options 选项
         */
        remove : function (key, options) {
            options = options || {};
            options.expires = new Date(0);
            sinaadToolkit.cookie._setRaw(key, '', options);
        }
    };

    /**
     * @namespace sinaadToolkit.storage
     */
    sinaadToolkit.storage = sinaadToolkit.storage || (function () {
        /**
         * UserData相关方法
         */
        var UserData = {
            userData : null,
            name : location.hostname,
            init : function () {
                if (!UserData.userData) {
                    try {
                        UserData.userData = document.createElement('INPUT');
                        UserData.userData.type = "hidden";
                        UserData.userData.style.display = "none";
                        UserData.userData.addBehavior ("#default#userData");
                        document.body.appendChild(UserData.userData);
                        var expires = new Date();
                        expires.setDate(expires.getDate() + 365);
                        UserData.userData.expires = expires.toUTCString();
                    } catch (e) {
                        return false;
                    }
                }
                return true;
            },
            setItem : function (key, value, expires) {
                if (UserData.init()) {
                    UserData.userData.load(UserData.name);
                    UserData.userData.setAttribute(key, value);
                    UserData.userData.save(UserData.name);
                }
            },
            getItem : function (key) {
                if (UserData.init()) {
                    UserData.userData.load(UserData.name);
                    return UserData.userData.getAttribute(key);
                }
            },
            removeItem : function (key) {
                if (UserData.init()) {
                    UserData.userData.load(UserData.name);
                    UserData.userData.removeAttribute(key);
                    UserData.userData.save(UserData.name);
                }

           }
        };

        /**
         * localstorage相关方法
         */
        var ls = {
            getItem : function (key) {
                return window.localStorage.getItem(key);
            },
            setItem : function (key, value, expires) {
                window.localStorage.setItem(key, value + (expires ? ';expires=' + (sinaadToolkit.now() + expires) : ''));
            },
            removeItem : function (key) {
                window.localStorage.removeItem(key);
            }
        };
        /**
         * cookie相关方法
         * @type {Object}
         */
        var cookie = {
            getItem : function (key) {
                return sinaadToolkit.cookie.get(key);
            },
            setItem : function (key, value, expires) {
                sinaadToolkit.cookie.set(key, value, {expires : expires || 0});
            },
            removeItem : function (key) {
                sinaadToolkit.cookie.remove(key);
            }
        };

        /** 
         * 根据浏览器支持选择相关的存储方案
         * 当ie且ie<8时使用userData方案，否则使用localStorage方案，否则使用cookie方案
         */
        var storage = sinaadToolkit.browser.ie && sinaadToolkit.browser.ie < 8 ? userData : window.localStorage ? ls : cookie;
        
        return /** @lends sinaadToolkit.storage */{
            /**
             * 获取本地存储的key的值
             * @param  {String} key key
             * @return {String}     取得的值
             */
            get : function (key) {
                var value = storage.getItem(key);
                if (value) {
                    value = value.split(';');
                    //有过期时间
                    if (value[1] && sinaadToolkit.now() > parseInt(value[1].split('=')[1], 10)) {
                        storage.removeItem(key);
                        return null;
                    } else {
                        return value[0];
                    }
                }
                return null;
            },
            /**
             * 设置本地存储key的值为value
             * 注意：请不要设置非字符串格式形式的值到本地存储
             * @param  {String} key     设置的key
             * @param  {String} value   设置的value
             * @param  {Number} expires 过期时间毫秒数
             */
            set : function (key, value, expires) {
                storage.setItem(key, value, expires);
            },
            /**
             * 移除本地存储中key的值
             * @param  {String} key 要移除的key
             */
            remove : function (key) {
                storage.removeItem(key);
            }
        };
    })();



    /**
     * @namespace sinaadToolkit.url
     */
    sinaadToolkit.url = sinaadToolkit.url || /** @lends sinaadToolkit.url */{
        /**
         * 创建一个url
         * @param  {String} domain url主域
         * @param  {String} path   path
         * @param  {Boolean} useSSL 使用https?
         * @return {String}        生成的url
         */
        createURL : function (domain, path, useSSL) {
            return [useSSL ? "https" : "http", "://", domain, path].join("");
        },
        /**
         * 获取当前页面所在的主页面url
         * @return {String} 获取当前页面所在的主页面url
         */
        top : (function () {
            var top;
            try {
                top = window.top.location.href;
            } catch (e) {}
            return top || document.referrer || window.location.href;
        })()
    };



    /**
     * @namespace sinaadToolkit.dom
     */
    sinaadToolkit.dom = sinaadToolkit.dom || /** @lends sinaadToolkit.dom */{
        /**
         * 获取某个dom节点所属的document
         * @param  {HTMLNodeElement} element 节点
         * @return {DocumentElement}         所属的document节点
         */
        getDocument : function (element) {
            return element.nodeType == 9 ? element : element.ownerDocument || element.document;
        },
        /**
         * 获取某个dom节点的某个计算后样式
         * @param  {HTMLNodeElement} element 节点
         * @param  {String} key     样式名
         * @return {String}         样式值
         */
        getComputedStyle : function(element, key){
            var doc = sinaadToolkit.dom.getDocument(element),
                styles;
            if (doc.defaultView && doc.defaultView.getComputedStyle) {
                styles = doc.defaultView.getComputedStyle(element, null);
                if (styles) {
                    return styles[key] || styles.getPropertyValue(key);
                }
            }
            return ''; 
        },
        /**
         * 获取某个dom节点的某个当前样式
         * @param  {HTMLNodeElement} element 节点
         * @param  {String} key     样式名
         * @return {String}         样式值
         */
        getCurrentStyle : function(element, key){
            return element.style[key] || (element.currentStyle ? element.currentStyle[key] : "") || sinaadToolkit.dom.getComputedStyle(element, key);
        }
    };



    /**
     * @namespace sinaadToolkit.page
     */
    sinaadToolkit.page = sinaadToolkit.page || /** @lends sinaadToolkit.page */{
        /**
         * 获取向上滚动高度
         * @return {Number} 向上滚动高度
         */
        getScrollTop : function () {
            var d = document;
            return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
        },
        /**
         * 获取向左滚动高度
         * @return {Number} 向左滚动高度
         */
        getScrollLeft : function () {
            var d = document;
            return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
        },
        /**
         * 获取页面高度
         * @return {Number} 页面高度
         */
        getViewHeight : function () {
            var doc = document,
            client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
            return client.clientHeight;
        },
        /**
         * 获取页面宽度
         * @return {Number} 页面宽度
         */
        getViewWidth : function () {
            var doc = document,
            client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
            return client.clientWidth;
        }
    };

    
    /**
     * @namespace sinaadToolkit.event
     */
    sinaadToolkit.event = sinaadToolkit.event || /** @lends sinaadToolkit.event */{
        /**
         * 注册事件
         * @param  {HTMLNodeElement}   dom      事件监听节点
         * @param  {String}   type     事件类型
         * @param  {Function} callback 回调方法
         */
        on : function (dom, type, callback) {
            if (dom.attachEvent) {
                dom.attachEvent('on' + type, callback);
            } else {
                dom.addEventListener(type, callback, false);
            }
        }
    };


    /**
     * @namespace sinaadToolkit.sio
     */
    sinaadToolkit.sio = sinaadToolkit.sio || (function () {
        /**
         * @private
         * @param  {HTMLScriptElement} scr     script节点
         * @param  {String} url     资源地址
         * @param  {String} charset 字符集
         */
        function _createScriptTag(scr, url, charset) {
            scr.setAttribute('type', 'text/javascript');
            charset && scr.setAttribute('charset', charset);
            scr.setAttribute('src', url);
            document.getElementsByTagName('head')[0].appendChild(scr);
        }
        /**
         * @private
         * @param  {HTMLScriptElement} scr script节点
         */
        function _removeScriptTag(scr) {
            if(scr && scr.parentNode){
                scr.parentNode.removeChild(scr);
            }
            scr = null;
        }
        return /** @lends sinaadToolkit.sio */{
            /**
             * 加载js模块
             * @param  {String} url          资源地址
             * @param  {Function} opt_callback 成功后回调方法
             * @param  {Object} opt_options  选项
             */
            loadScript : function (url, opt_callback, opt_options) {
                var scr = document.createElement("SCRIPT"),
                    scriptLoaded = 0,
                    options = opt_options || {},
                    charset = options['charset'],
                    callback = opt_callback || function(){},
                    timeOut = options['timeOut'] || 0,
                    timer;
                
                // IE和opera支持onreadystatechange
                // safari、chrome、opera支持onload
                scr.onload = scr.onreadystatechange = function () {
                    // 避免opera下的多次调用
                    if (scriptLoaded) {
                        return;
                    }
                    
                    var readyState = scr.readyState;
                    if ('undefined' == typeof readyState
                        || readyState == "loaded"
                        || readyState == "complete") {
                        scriptLoaded = 1;
                        try {
                            callback();
                            clearTimeout(timer);
                        } finally {
                            scr.onload = scr.onreadystatechange = null;
                            _removeScriptTag(scr);
                        }
                    }
                };

                if( timeOut ){
                    timer = setTimeout(function(){
                        scr.onload = scr.onreadystatechange = null;
                        _removeScriptTag(scr);
                        options.onfailure && options.onfailure();
                    }, timeOut);
                }
                
                _createScriptTag(scr, url, charset);
            },
            /**
             * jsonp方式回调
             * @param  {String}   url         资源地址
             * @param  {Function} callback    回调方法
             * @param  {Object}   opt_options 选项
             */
            jsonp : function(url, callback, opt_options) {
                var scr = document.createElement('SCRIPT'),
                    prefix = '_sinaads_cbs_',
                    callbackName,
                    callbackImpl,
                    options = opt_options || {},
                    charset = options['charset'],
                    queryField = options['queryField'] || 'callback',
                    timeOut = options['timeOut'] || 0,
                    timer,
                    reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
                    matches;
         
                if (sinaadToolkit.isFunction(callback)) {
                    callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
                    window[callbackName] = getCallBack(0);
                } else if(sinaadToolkit.isString(callback)){
                    // 如果callback是一个字符串的话，就需要保证url是唯一的，不要去改变它
                    // TODO 当调用了callback之后，无法删除动态创建的script标签
                    callbackName = callback;
                } else {
                    if (matches = reg.exec(url)) {
                        callbackName = matches[2];
                    }
                }
         
                if( timeOut ){
                    timer = setTimeout(getCallBack(1), timeOut);
                }
         
                //如果用户在URL中已有callback，用参数传入的callback替换之
                url = url.replace(reg, '\x241' + queryField + '=' + callbackName);
                 
                if (url.search(reg) < 0) {
                    url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
                }
                _createScriptTag(scr, url, charset);
         
                function getCallBack(onTimeOut){
                     
                    return function(){
                        try {
                            if( onTimeOut ){
                                options.onfailure && options.onfailure();
                            }else{
                                callback.apply(window, arguments);
                                clearTimeout(timer);
                            }
                            window[callbackName] = null;
                            delete window[callbackName];
                        } catch (exception) {
                            // ignore the exception
                        } finally {
                            _removeScriptTag(scr);
                        }
                    }
                }
            },
            /**
             * 日志方法
             * @param  {String} url 发送日志地址
             */
            log : function(url) {
                var img = new Image(),
                    key = '_sinaads_sio_log_' + Math.floor(Math.random() *
                          2147483648).toString(36);

                window[key] = img;
             
                img.onload = img.onerror = img.onabort = function() {
                  img.onload = img.onerror = img.onabort = null;
             
                  window[key] = null;
                  img = null;
                };
         
                img.src = url;
            }
        };
    })();


    /**
     * @namespace sinaadToolkit.swf
     */
    sinaadToolkit.swf = sinaadToolkit.swf || /** @lends sinaadToolkit.swf */{
        /**
         * flash版本号
         * @type {Number}
         */
        version : (function () {
            var n = navigator;
            if (n.plugins && n.mimeTypes.length) {
                var plugin = n.plugins["Shockwave Flash"];
                if (plugin && plugin.description) {
                    return plugin.description
                            .replace(/([a-zA-Z]|\s)+/, "")
                            .replace(/(\s)+r/, ".") + ".0";
                }
            } else if (window.ActiveXObject && !window.opera) {
                for (var i = 12; i >= 2; i--) {
                    try {
                        var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                        if (c) {
                            var version = c.GetVariable("$version");
                            return version.replace(/WIN/g,'').replace(/,/g,'.');
                        }
                    } catch(e) {}
                }
            }
        })(),
        /**
         * 获取当前flash对象
         * @param  {String} name    要获取的flash的id或name
         * @param  {Object} context 从哪个上下文对象中获取这个flash对象，默认从当前上下文
         * @return {Object}         得到的flash对象
         */
        getMovie : function (name, context) {
            context = context || window;
            //ie9下, Object标签和embed标签嵌套的方式生成flash时,
            //会导致document[name]多返回一个Object元素,而起作用的只有embed标签
            var movie = context.document[name],
                ret;
            return sinaadToolkit.browser.ie == 9 ?
                movie && movie.length ? 
                    (ret = sinaadToolkit.array.remove(sinaadToolkit.toArray(movie), function(item){
                        return item.tagName.toLowerCase() != "embed";
                    })).length == 1 ? ret[0] : ret
                    : movie
                : movie || context[name];
        },
        /**
         * 创建flash的html
         * @param  {Object} options 选项
         * @return {String}         flash的html
         */
        createHTML : function (options) {
            options = options || {};
            var version = sinaadToolkit.swf.version, 
                needVersion = options['ver'] || '6.0.0', 
                vUnit1, vUnit2, i, k, len, item, tmpOpt = {},
                encodeHTML = sinaadToolkit.string.encodeHTML;
            
            // 复制options，避免修改原对象
            for (k in options) {
                tmpOpt[k] = options[k];
            }
            options = tmpOpt;
            
            // 浏览器支持的flash插件版本判断
            if (version) {
                version = version.split('.');
                needVersion = needVersion.split('.');
                for (i = 0; i < 3; i++) {
                    vUnit1 = parseInt(version[i], 10);
                    vUnit2 = parseInt(needVersion[i], 10);
                    if (vUnit2 < vUnit1) {
                        break;
                    } else if (vUnit2 > vUnit1) {
                        return ''; // 需要更高的版本号
                    }
                }
            } else {
                return ''; // 未安装flash插件
            }
            
            var vars = options['vars'],
                objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];
            
            // 初始化object标签需要的classid、codebase属性值
            options['align'] = options['align'] || 'middle';
            options['classid'] = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
            options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
            options['movie'] = options['url'] || '';
            delete options['vars'];
            delete options['url'];
            
            // 初始化flashvars参数的值
            if ('string' == typeof vars) {
                options['flashvars'] = vars;
            } else {
                var fvars = [];
                for (k in vars) {
                    item = vars[k];
                    fvars.push(k + "=" + encodeURIComponent(item));
                }
                options['flashvars'] = fvars.join('&');
            }
            
            // 构建IE下支持的object字符串，包括属性和参数列表
            var str = ['<object '];
            for (i = 0, len = objProperties.length; i < len; i++) {
                item = objProperties[i];
                str.push(' ', item, '="', encodeHTML(options[item]), '"');
            }
            str.push('>');
            var params = {
                'wmode'             : 1,
                'scale'             : 1,
                'quality'           : 1,
                'play'              : 1,
                'loop'              : 1,
                'menu'              : 1,
                'salign'            : 1,
                'bgcolor'           : 1,
                'base'              : 1,
                'allowscriptaccess' : 1,
                'allownetworking'   : 1,
                'allowfullscreen'   : 1,
                'seamlesstabbing'   : 1,
                'devicefont'        : 1,
                'swliveconnect'     : 1,
                'flashvars'         : 1,
                'movie'             : 1
            };
            
            for (k in options) {
                item = options[k];
                k = k.toLowerCase();
                if (params[k] && (item || item === false || item === 0)) {
                    str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />');
                }
            }
            
            // 使用embed时，flash地址的属性名是src，并且要指定embed的type和pluginspage属性
            options['src']  = options['movie'];
            options['name'] = options['id'];
            delete options['id'];
            delete options['movie'];
            delete options['classid'];
            delete options['codebase'];
            options['type'] = 'application/x-shockwave-flash';
            options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer';
            
            
            // 构建embed标签的字符串
            str.push('<embed');
            // 在firefox、opera、safari下，salign属性必须在scale属性之后，否则会失效
            // 经过讨论，决定采用BT方法，把scale属性的值先保存下来，最后输出
            var salign;
            for (k in options) {
                item = options[k];
                if (item || item === false || item === 0) {
                    if ((new RegExp("^salign\x24", "i")).test(k)) {
                        salign = item;
                        continue;
                    }
                    
                    str.push(' ', k, '="', encodeHTML(item), '"');
                }
            }
            
            if (salign) {
                str.push(' salign="', encodeHTML(salign), '"');
            }
            str.push('></embed></object>');
            
            return str.join('');
        }
    };



    /**
     * @namespace sinaadToolkit.iframe
     */
    sinaadToolkit.iframe = sinaadToolkit.iframe || /** @lends sinaadToolkit.iframe */{
        /**
         * 往一个对象中填充iframe的初始属性，返回一个用于生成iframe的对象
         * @param  {Object} config   需要填充的对象
         * @param  {Number} width    iframe宽
         * @param  {Number} height   iframe高
         * @param  {Boolean} useQuote 属性前后是否用引号包裹
         * @return {Object}          填充完初始属性，用于生成iframe的对象
         */
        init : function (config, width, height, useQuote) {
            var quote = useQuote ? '"' : ""; //是否使用引号将属性包裹
            var zero = quote + "0" + quote;
            config.width = quote + width + quote;
            config.height = quote + height + quote;
            config.frameborder = zero;
            config.marginwidth = zero;
            config.marginheight = zero;
            config.vspace = zero;
            config.hspace = zero;
            config.allowtransparency = quote + "true" + quote;
            config.scrolling = quote + "no" + quote;
        },
        /**
         * 使用iframe配置对象生成iframe的html
         * @param  {Object} config iframe配置属性对象
         * @return {String}        生成iframe的html
         */
        createHTML : function (config) {
            var html = [];

            //将iframe的name设置成跟id一样，如果没有的配置name的话
            config.name = config.name || config.id;

            sinaadToolkit.object.map(config, function(value, key) {
                html.push(" " + key + '="' + (null == value ? "" : value) + '"')
            });
            return "<iframe" + html.join("") + "></iframe>";
        },
        /**
         * 往iframe中填充内容
         * @param  {HTMLIframeElement} iframe  iframe节点
         * @param  {String} content 要填充的内容
         */
        fill : function (iframe, content) {
            var doc,
                ie = sinaadToolkit.browser.ie;
            //ie
            if (ie) {
                //是否可以获取到iframe的document
                try {
                    doc = !!iframe.contentWindow.document
                } catch(e) {
                    doc = false;
                }
                if (doc) {
                    try {
                        //ie > 6
                        if (ie > 6) {
                            var k;
                            i: {
                                //ie 7 - 10
                                if (ie > 7 && ie <= 10) {
                                    for (var i = 0; i < content.length; ++i) {
                                        if (127 < content.charCodeAt(i)) {
                                            k = true;
                                            break i;
                                        }
                                    }
                                }
                                k = false;
                            }
                            if (k) {
                                var content = unescape(encodeURIComponent(content));
                                var mid = Math.floor(content.length / 2);
                                k = [];
                                for (var i = 0; i < mid; ++i) {
                                    k[i] = String.fromCharCode(256 * content.charCodeAt(2 * i + 1) + content.charCodeAt(2 * i));
                                }
                                1 == content.length % 2 && (k[mid] = content.charAt(content.length - 1));
                                content = k.join("");
                            }
                            window.frames[iframe.name].contents = content;
                            iframe.src = 'javascript:window["contents"]';
                        // ie < 6
                        } else {
                            window.frames[iframe.name].contents = content;
                            iframe.src = 'javascript:document.write(window["contents"]);/* document.close(); */';
                        }
                    } catch(e) {
                        alert("无法ie的iframe中写入内容: " + e.message);
                    }
                } else {
                    /**
                     * ie下，且iframe.contentWindow.document无法取到，跨域
                     * 比如宿主页面设置了document.domain, 而iframe没有设置
                     * 在iframe中设置document.domain  
                     */
                    try {
                        var key = "sinaads-ad-iframecontent-" + sinaadToolkit.rnd();
                        window[key] = content;
                        content = 'var adContent = window.parent["' + key + '"];window.parent["' + key + '"] = null;document.write(adContent);';
                        content = sinaadToolkit.browser.ie && sinaadToolkit.browser.ie <= 6 ? 
                             "window.onload = function() {"
                                + "document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \"" + document.domain + '";' + content + "<\\/scr\\' + \\'ipt>\\');"
                                + "document.close();"
                            + "};" :
                             'document.domain = "' + document.domain + '";'
                            + content
                            + "document.close();";

                        iframe.src = 'javascript:\'<script type="text/javascript">' + content + "\x3c/script>'";
                    } catch(e) {
                        window[key] = null;
                        alert("无法通过修改document.domain的方式来填充IE下的iframe内容: " + e.message);
                    }
                }
            //标准浏览器，标准方法
            } else {
                try {
                    doc = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument, 
                    sinaadToolkit.browser.firefox 
                    && doc.open("text/html", "replace");
                       doc.write(content);
                       doc.close();
                } catch(e) {
                    alert("无法使用标准方法填充iframe的内容: " + e.message);
                }
            }
        }
    };


    /**
     * @namespace sinaadToolkit.monitor
     */
    sinaadToolkit.monitor = sinaadToolkit.monitor || /** @lends sinaadToolkit.monitor */{

        /**
         * 将监控url中的__xxx__变量名替换成正确的值，值从对象data中获取
         * @param  {String} monitorUrl 监控url
         * @param  {Object} data       用于替换的值对象
         * @return {String}            返回替换后的url
         */
        parseTpl : (function (monitorUrl, data) {
            var reg = /\{__([a-zA-Z0-9]+(_*[a-zA-Z0-9])*)__\}/g;

            return function (monitorUrl, data) {
                if (!monitorUrl) return '';
                return monitorUrl.replace(reg, function (s1, s2) {
                    //插入adbox能支持的模版变量
                    //见adbox监控接口文档，
                    //https://github.com/acelan86/pandora/wiki/%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E%E6%96%87%E6%A1%A3%E8%AF%B4%E6%98%8E
                    //adbox的监控需要插入到iframe的name中，使用api_exu=xxx的方式
                    if (s2.indexOf('adbox_') > 0) {
                        s2 = s2.split('_');
                        return '{__mo' + s2[2] + '__}';
                    }
                    return data[s2] || s1;
                });
            };
        })(),
        /**
         * 创建曝光监测, 返回创建曝光的iframe的html片段
         * @param  {Array:String} pvs 曝光监控的url数组
         * @return {String}     返回创建曝光的iframe的html片段
         */
        createImpressMonitor : function (pvs) {
            var html = [];

            sinaadToolkit.array.each(pvs, function (pv, i) {
                var config = {};
                sinaadToolkit.iframe.init(config, 1, 1, false);
                config.src = pv;
                config.style = 'display:none;';
                html.push(sinaadToolkit.iframe.createHTML(config));
            });
            return html.join('');
        },
        /**
         * 创建点击监测
         * @param  {String} type    需要监测的对象的类型，如图片，链接，flash等
         * @param  {Array:String} monitor 监测url数组
         * @return {String}         返回监测的html片段
         */
        createClickMonitor : function (type, monitor) {
            if (!monitor) {
                return;
            }
            var monitor = 'string' === typeof monitor ? [monitor] : monitor,
                ret = [],
                comma = '';

            sinaadToolkit.array.each(monitor, function(url, i) {
                var code = '';

                if (url) {
                    switch (type) {
                        case 'image' :
                        case 'flash' :
                            code = 'sinaadToolkit.sio.log(\'' + url + '\')';
                            comma = ';'
                            break;
                        case 'adbox' :
                            code = 'api_exu=' + encodeURIComponent(url);
                            comma = '&';
                            break;
                        default :
                            break;
                    }
                    code && ret.push(code);
                } 
            });
            return ret.join(comma);
        }
    };



    /**
     * @namespace sinaadToolkit.ad
     */
    sinaadToolkit.ad = sinaadToolkit.ad || /** @lends sinaadToolkit.ad */{
        /**
         * 创建广告展现html
         * @param  {String} type    广告类型，如图片等
         * @param  {String} src     广告资源地址
         * @param  {Number} width   广告宽
         * @param  {Number} height  广告高
         * @param  {String} link    广告资源落地页地址
         * @param  {Array:String} monitor 广告点击监测的url数组
         * @return {String}         广告展现html
         */
        createHTML : function (type, src, width, height, link, monitor) {
            var html = '',
                config,
                monitorCode;

            width += String(width).indexOf('%') !== -1 ? '' : 'px';
            height += String(height).indexOf('%') !== -1 ? '' : 'px';

            monitorCode = sinaadToolkit.monitor.createClickMonitor(type, monitor);
            switch (type) {
                case 'js' :
                    html = ['<', 'script src="', src, '"></','script>'].join('');
                    break;
                case 'url' : 
                    config = {};
                    sinaadToolkit.iframe.init(config, width, height, false);
                    config.src = src;
                    html = sinaadToolkit.iframe.createHTML(config);
                    break;
                case 'image' : 
                    html = '<img border="0" src="' + src + '" style="width:' + width + ';height:' + height +';border:0" alt="' + src + '"/>';
                    html = link ? '<a href="' + link + '" target="' + (sinaadToolkit.browser.phone ? '_top' : '_blank') + '"' + (monitorCode ? ' onclick="try{' + monitorCode + '}catch(e){}"' : '') + '>' + html + '</a>' : html;
                    break;
                case 'text' : 
                    html = '<span>' + src + '</span>';
                    break;
                case 'flash' : 
                    html = sinaadToolkit.swf.createHTML({
                        url : src,
                        width : width,
                        height : height,
                        wmode : 'transparent'
                    });
                    if (link) {
                        html = [
                            '<div style="width:' + width + ';height:' + height + ';position:relative;overflow:hidden;">',
                                html,
                                '<a style="position:absolute;background:#fff;opacity:0;filter:alpha(opacity=0);width:' + width + ';height:' + height + ';left:0;top:0" href="' + link + '" target="' + (sinaadToolkit.browser.phone ? '_top' : '_blank') + '"' + (monitorCode ? ' onclick="try{' + monitorCode + '}catch(e){}"' : '') + '></a>',
                            '</div>'
                        ].join('');
                    }
                    break;
                case 'adbox' :
                    config = {};
                    sinaadToolkit.iframe.init(config, width, height, false);
                    config.src = src;
                    monitorCode && (config.name = monitorCode);
                    html = sinaadToolkit.iframe.createHTML(config);
                    break;
                default : 
                    html = src.replace(/\\x3c/g, '<').replace(/\\x3e/g, '>');
                    break;
            }
            return html;
        }
    };



    /**
     * @namespace sinaadToolkit.sandbox
     */
    sinaadToolkit.sandbox = sinaadToolkit.sandbox || (function () {
        /**
         * 沙箱uid
         * @private
         * @type {Number}
         */
        var uid = 0;
        /**
         * 将对象转换成字符串形式表示
         * @private
         */
        function _stringify(value, arr) {
            switch (typeof value) {
                case "string":
                    arr.push(sinaadToolkit.string.formalString(value));
                    break;
                case "number":
                    arr.push(isFinite(value) && !isNaN(value) ? value : "null");
                    break;
                case "boolean":
                    arr.push(value);
                    break;
                case "undefined":
                    arr.push("null");
                    break;
                case "object":
                    //is Null
                    if (null == value) {
                        arr.push("null");
                        break;
                    }
                    //is Array
                    if (value instanceof Array) {
                        var len = value.length,
                            comma;
                        arr.push("[");
                        for (comma = "", i = 0; i < len; i++) {
                            arr.push(comma);
                            _stringify(value[i], arr);
                            comma = ",";
                        }
                        arr.push("]");
                        break;
                    }

                    //is Object
                    arr.push("{");
                    var comma = "",
                        v;
                    for (var key in value) {
                        if (value.hasOwnProperty(key)) {
                            v = value[key];
                            if ("function" != typeof v) { 
                                arr.push(comma);
                                arr.push(key); 
                                arr.push(":");
                                _stringify(v, arr);
                                comma = ",";
                            }
                        }
                    }
                    arr.push("}");
                    break;
                case "function":
                    break;
                default:
                    //throw Error("未知的值类型: " + typeof value);
            }
        }
 

        /**
         * 将config的属性值转换成变量声明代码
         * @private
         */
        function _objToJsVarCode(obj) {
            var code = [];

            sinaadToolkit.object.map(obj, function(value, key) {
                if (null != value) {
                    var tmp = [];
                    try {
                        _stringify(value, tmp);
                        tmp = tmp.join("");
                    } catch (k) {
                    }
                    tmp && code.push(key, "=", tmp, ";");
                }
            });

            return code.join("");
        }

        return /** @lends sinaadToolkit.sandbox */{
            /**
             * 创建一个广告展现沙箱
             * @param  {HTMLNodeElement} container 沙箱所在容器
             * @param  {Number} width     沙箱宽
             * @param  {Number} height    沙箱搞
             * @param  {String} content   沙箱内容
             * @param  {Object} context   沙箱中传入的外部属性值
             */
            create : function (container, width, height, content, context) {
                var context = context || {},
                    sandboxId =  context.sandboxId || (context.sandboxId = '_sinaads_sandbox_id' + (uid++));

                width += String(width).indexOf('%') !== -1 ? '' : 'px';
                height += String(height).indexOf('%') !== -1 ? '' : 'px';

                var iframeConfig = {};
                sinaadToolkit.iframe.init(iframeConfig, width, height, 0);
                iframeConfig.src = 'javascript:\'<html><body style=background:transparent;></body></html>\'';
                iframeConfig.id = sandboxId;
                iframeConfig.style = 'float:left;';

                container.innerHTML = [
                    '<ins style="margin:0px auto;display:block;overflow:hidden;width:' + width + ';height:' + height + ';">',
                        sinaadToolkit.iframe.createHTML(iframeConfig),
                    '</ind>'
                ].join('');

                container.style.cssText += ';display:block;overflow:hidden;';

                //context转成js代码描述，用于注入到iframe中
                context = _objToJsVarCode(context);

                //构造iframe实体
                sinaadToolkit.iframe.fill(document.getElementById(sandboxId), [
                    '<!doctype html><html><body style="background:transparent">',
                        '<', 'script>', context, '</', 'script>',
                        '<', 'script src="' + sinaadToolkit.TOOLKIT_URL + '" charset="utf-8"></', 'script>',
                        content,
                    '</body></html>'
                ].join(""));
            }
        };
    })();

    /**
     * 计数种子，每次加载获取cookie或者storage中的这个值，如果没有，随机生成1个值
     */
    if (!sinaadToolkit.seed) {
        var KEY = 'sinaadtoolkit_seed_core';
        sinaadToolkit.seed = parseInt(sinaadToolkit.storage.get(KEY), 10) || Math.floor(Math.random() * 100);
        //大于1000就从0开始，防止整数过大
        sinaadToolkit.storage.set(KEY, sinaadToolkit.seed > 1000 ? 0 : ++sinaadToolkit.seed);
    }

    //exports
    window.sinaadToolkit = window.sinaadToolkit || sinaadToolkit;

})(window);