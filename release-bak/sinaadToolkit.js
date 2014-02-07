/*!
 * sinaadToolkit
 * @author acelan <xiaobin8[at]staff.sina.com.cn> zhouyi<zhouyi3[at]staff.sina.com.cn>
 * @version 1.0.0
 * 
 *                          $$!   ;$;
 *                    !$  $$$$  !$$$   ;;
 *                 $ *$$;$$$$$$$$$$;*$$$
 *                $$$$$$$$$$$$$$$$$$$$$
 *               $$$$$$;         o$$$$$o
 *              *$$$   *#####;     $$$$$
 *              $$$   &#$*!###     $$$$!
 *              $$$;  $#!!###$   ;$$$$
 *                $$$o  ;**   !$$$$!
 *          !$&&&&$!  o$$$$$$o;   ;$&###&!     ;o$&&##&$;
 *       ###########$ o####*  #############!  o############
 *     ;#####;        #####  $####    *####;          ####*
 *      ###########  o####   ####;    ####$  $######;o####
 *          ;*#####o ####$  ####&    !#### o####     ####
 *    ####$**&####$ ;####  o####     ####o &####$o$#####
 *   ;o########$    *###   ####!    &####   ;######&!
 *                 ###;
 *                  ##o
 *                 ;#!
 *                 ;
 */
!function(a,b){"use strict";function c(b){this.uid="sinaadToolkitBox"+c.uid++,this.width=b.width||0,this.height=b.height||"auto",this.position=b.position||"center center",this.follow=b.follow||0,this.zIndex=b.zIndex||99999,this.minViewportWidth=b.minViewportWidth||0,this.positionStyle=this.follow?d.browser.isSupportFixed?"fixed":"absolute":"absolute";var e=document.createElement("div");e.id=this.uid,e.style.cssText+="position:"+this.positionStyle+";width:"+this.width+"px;height:"+this.height+"px;z-index:"+this.zIndex+";display:"+(b.autoShow?"block":"none"),document.body.insertBefore(e,document.body.firstChild),this.setPosition(),d.event.on(a,"resize",this.getResetPositionHandler()),this.follow&&!d.browser.isSupportFixed&&d.event.on(a,"scroll",this.getResetPositionHandler())}var d=a.sinaadToolkit=a.sinaadToolkit||{VERSION:"1.0.0",mode:-1!==a.location.href.indexOf("__sinaadToolkitDebug__")?"debug":"release",debug:function(){var b="sinaadToolkitDebugContainer",c=a.console||{log:function(a){if(document.body){var c=document.getElementById(b);c||(c=document.createElement("ul"),c.id=b,c.style.cssText="z-index:99999;overflow:auto;height:300px;position:absolute;right:0;top:0;opacity:.9;*filter:alpha(opacity=90);background:#fff;width:500px;",document.body.insertBefore(c,document.body.firstChild));var d=document.createElement("li");d.style.cssText="border-bottom:1px dotted #ccc;line-height:30px;font-size:12px;",d.innerHTML=a+Array.prototype.slice.call(arguments,1).join(" "),c.appendChild(d)}}};return function(a){"debug"===d.mode&&c.log(a,Array.prototype.slice.call(arguments,1))}}(),error:function(a,b){if("debug"===d.mode)throw new Error(a+(b?":"+b.message:""))},now:function(){return+new Date},rnd:function(){return Math.floor(2147483648*Math.random()).toString(36)},rand:function(a,b){return Math.floor(a+Math.random()*(b-a+1))},hash:function(a){for(var b,c=0,d=0;!isNaN(b=a.charCodeAt(d++));)c=(c<<5)-c+b,c&=c;return Math.abs(c).toString(36)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isString:function(a){return"[object String]"===Object.prototype.toString.call(a)},isNull:function(a){return"undefined"==typeof a||null===a},isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},isNumber:function(a){return"[object Number]"===Object.prototype.toString.call(a)&&isFinite(a)},globalEval:function(b){b&&/\S/.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)}};d.RESOURCE_URL=d.RESOURCE_URL||["http://d1.sina.com.cn/litong/zhitou/sinaads","http://d2.sina.com.cn/litong/zhitou/sinaads","http://d3.sina.com.cn/litong/zhitou/sinaads","http://d4.sina.com.cn/litong/zhitou/sinaads","http://d5.sina.com.cn/litong/zhitou/sinaads","http://d6.sina.com.cn/litong/zhitou/sinaads","http://d7.sina.com.cn/litong/zhitou/sinaads","http://d8.sina.com.cn/litong/zhitou/sinaads","http://d9.sina.com.cn/litong/zhitou/sinaads"][d.rand(0,8)],d.TOOLKIT_URL=d.RESOURCE_URL+"/release/sinaadToolkit.js",d.browser=d.browser||function(c){var d={android:/(Android)(\s+([\d.]+))*/i.test(c),ipad:/(iPad).*OS\s([\d_]+)/i.test(c),webos:/(webOS|hpwOS)[\s\/]([\d.]+)/i.test(c),kindle:/Kindle\/([\d.]+)/i.test(c),silk:/Silk\/([\d._]+)/i.test(c),blackberry:/(BlackBerry).*Version\/([\d.]+)/i.test(c),bb10:/(BB10).*Version\/([\d.]+)/i.test(c),rimtabletos:/(RIM\sTablet\sOS)\s([\d.]+)/i.test(c),playbook:/PlayBook/i.test(c),chrome:/chrome\/(\d+\.\d+)/i.test(c)?+RegExp.$1:b,firefox:/firefox\/(\d+\.\d+)/i.test(c)?+RegExp.$1:b,ie:/msie (\d+\.\d+)/i.test(c)?document.documentMode||+RegExp.$1:b,isGecko:/gecko/i.test(c)&&!/like gecko/i.test(c),isStrict:"CSS1Compat"===document.compatMode,isWebkit:/webkit/i.test(c),opera:/opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(c)?+(RegExp.$6||RegExp.$2):b};d.iphone=!d.ipad&&/(iPhone\sOS)\s([\d_]+)/i.test(c),d.touchpad=d.webos&&/TouchPad/.test(c),d.tablet=!!(d.ipad||d.playbook||d.android&&!/Mobile/.test(c)||d.firefox&&/Tablet/.test(c)),d.phone=!(d.tablet||!(d.android||d.iphone||d.webos||d.blackberry||d.bb10||d.chrome&&/Android/.test(c)||d.chrome&&/CriOS\/([\d.]+)/.test(c)||d.firefox&&/Mobile/.test(c)));try{/(\d+\.\d+)/.test(a.external.max_version)&&(d.maxthon=+RegExp.$1)}catch(e){}return d.safari=/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(c)&&!/chrome/i.test(c)?+(RegExp.$1||RegExp.$2):b,d.isSupportFixed=!d.ie||d.ie>=7,d}(navigator.userAgent),d.array=d.array||{remove:function(a,b){for(var c=a.length;c--;)c in a&&a[c]===b&&a.splice(c,1);return a},each:function(a,b,c){a=d.array.ensureArray(a);var e,f,g,h=a.length;if("function"==typeof b)for(g=0;h>g&&(f=a[g],e=b.call(c||a,f,g),e!==!1);g++);return a},ensureArray:function(a){return d.isArray(a)?a:d.isNull(a)?[]:[a]}},d.string=d.string||function(){var a={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","  ":"\\t","":"\\u000b"},b=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;return{encodeHTML:function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},decodeHTML:function(a){var b=String(a).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");return b.replace(/&#([\d]+);/g,function(a,b){return String.fromCharCode(parseInt(b,10))})},formalString:function(c){var d=[];return d.push(c.replace(b,function(b){if(b in a)return a[b];var c=b.charCodeAt(0),d="\\u";return 16>c?d+="000":256>c?d+="00":4096>c&&(d+="0"),a[b]=d+c.toString(16),a[b]})),'"'+d.join("")+'"'},format:function(a,b){a=String(a);var c=Array.prototype.slice.call(arguments,1),d=Object.prototype.toString;return c.length?(c=1===c.length?null!==b&&/\[object Array\]|\[object Object\]/.test(d.call(b))?b:c:c,a.replace(/#\{(.+?)\}/g,function(a,b){var e=c[b];return"[object Function]"===d.call(e)&&(e=e(b)),"undefined"==typeof e?"":e})):a},toCamelCase:function(a){return a.indexOf("-")<0&&a.indexOf("_")<0?a:a.replace(/[-_][^-_]/g,function(a){return a.charAt(1).toUpperCase()})}}}(),d.string.trim=d.string.trim||function(){var a=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)","g");return function(b){return b=b||"",String(b).replace(a,"")}}(),d.object=d.object||{map:function(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d],d));return c}},d.event=d.event||{on:function(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)},un:function(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c)}},d.cookie=d.cookie||{_isValidKey:function(a){return new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(a)},_getRaw:function(a){if(d.cookie._isValidKey(a)){var b=new RegExp("(^| )"+a+"=([^;]*)(;|$)"),c=b.exec(document.cookie);if(c)return c[2]||null}return null},_setRaw:function(a,b,c){if(d.cookie._isValidKey(a)){c=c||{};var e=c.expires;"number"==typeof c.expires&&(e=new Date,e.setTime(e.getTime()+c.expires)),document.cookie=a+"="+b+(c.path?"; path="+c.path:"")+(e?"; expires="+e.toGMTString():"")+(c.domain?"; domain="+c.domain:"")+(c.secure?"; secure":"")}},get:function(a){var b=d.cookie._getRaw(a);return"string"==typeof b?b=decodeURIComponent(b):null},set:function(a,b,c){d.cookie._setRaw(a,encodeURIComponent(b),c)},remove:function(a,b){b=b||{},b.expires=new Date(0),d.cookie._setRaw(a,"",b)}},d.storage=d.storage||function(){var b={};d.event.on(a,"beforeunload",function(){for(var a in b)try{d.storage.remove(a),delete b[a]}catch(c){}});var c={id:"sinaadToolkitUserDataContainer",name:location.hostname,init:function(){var a=document.getElementById(c.id);if(!a)try{a=document.createElement("input"),a.type="hidden",a.style.display="none",a.addBehavior("#default#userData"),document.body.insertBefore(a,document.body.firstChild);var b=new Date;b.setDate(b.getDate()+365),a.expires=b.toUTCString()}catch(e){return d.debug("sinaadToolkit.storage:userData init fail, "+e.message),null}return a},setItem:function(a,e,f){var g=c.init();g&&(g.load(c.name),g.setAttribute(a,e+(f?";expires="+(d.now()+f):"")),g.save(c.name)),f||(b[a]=1)},getItem:function(a){var b=c.init();return b?(b.load(c.name),b.getAttribute(a)):null},removeItem:function(a){var b=c.init();b&&(b.load(c.name),b.removeAttribute(a),b.save(c.name))}},e={getItem:function(b){return a.localStorage.getItem(b)},setItem:function(c,e,f){a.localStorage.setItem(c,e+(f?";expires="+(d.now()+f):"")),f||(b[c]=1)},removeItem:function(b){a.localStorage.removeItem(b)}},f={getItem:function(a){return d.cookie.get(a)},setItem:function(a,b,c){d.cookie.set(a,b,{expires:c||0})},removeItem:function(a){d.cookie.remove(a)}},g=a.localStorage?e:d.browser.ie&&d.browser.ie<8?c:f;return{get:function(a){try{var b=g.getItem(a);return b?(d.debug("sinaadToolkit.storage.get:get value of "+a+":"+b),b=b.split(";expires="),b[1]&&d.now()>parseInt(b[1],10)?(g.removeItem(a),null):b[0]):null}catch(c){return d.debug("sinaadToolkit.storage.get:"+c.message),null}},set:function(a,b,c){try{g.setItem(a,b,c)}catch(e){d.error("sinaadToolkit.storage.set:"+e.message)}},remove:function(a){try{g.removeItem(a)}catch(b){d.error("sinaadToolkit.storage.remove:"+b.message)}}}}(),d.url=d.url||{protocol:function(){return"https:"===a.location.protocol?"https://":"http://"}(),ensureURL:function(a){return a=d.string.trim(a),a?/^(http|https):\/\//.test(a)?a:d.url.protocol+a:""},createURL:function(a,b,c){return[c?"https":"http","://",a,b].join("")},top:function(){var b;try{b=a.top.location.href}catch(c){}return b=b||(a.top===a.self?a.location.href:a.document.referrer),b||d.error("sinaadToolkit:Cannot get pageurl on which ad locates."),b}()},d.dom=d.dom||{get:function(a){return a?"string"==typeof a||a instanceof String?document.getElementById(a):!a.nodeName||1!==a.nodeType&&9!==a.nodeType?null:a:null},addClass:function(a,b){a=d.dom.get(a);for(var c=b.split(/\s+/),e=a.className,f=" "+e+" ",g=0,h=c.length;h>g;g++)f.indexOf(" "+c[g]+" ")<0&&(e+=(e?" ":"")+c[g]);return a.className=e,a},getDocument:function(a){return 9===a.nodeType?a:a.ownerDocument||a.document},getComputedStyle:function(a,b){var c,e=d.dom.getDocument(a);return e.defaultView&&e.defaultView.getComputedStyle&&(c=e.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b):""},getCurrentStyle:function(a,b){return a.style[b]||(a.currentStyle?a.currentStyle[b]:"")||d.dom.getComputedStyle(a,b)},_styleFixer:{},_styleFilter:[],getStyle:function(a,b){var c,e=d.dom;a=e.get(a),b=d.string.toCamelCase(b);var f=a.style[b]||(a.currentStyle?a.currentStyle[b]:"")||e.getComputedStyle(a,b);return f&&"auto"!==f||(c=e._styleFixer[b],c&&(f=c.get?c.get(a,b,f):d.dom.getStyle(a,c))),(c=e._styleFilter)&&(f=c.filter(b,f,"get")),f},getPosition:function(a){a=d.dom.get(a);var b,c,e=d.dom.getDocument(a),f=d.browser,g=d.dom.getStyle,h={left:0,top:0},i=f.ie&&!f.isStrict?e.body:e.documentElement;if(a===i)return h;if(a.getBoundingClientRect){c=a.getBoundingClientRect(),h.left=Math.floor(c.left)+Math.max(e.documentElement.scrollLeft,e.body.scrollLeft),h.top=Math.floor(c.top)+Math.max(e.documentElement.scrollTop,e.body.scrollTop),h.left-=e.documentElement.clientLeft,h.top-=e.documentElement.clientTop;var j=e.body,k=parseInt(g(j,"borderLeftWidth"),10),l=parseInt(g(j,"borderTopWidth"),10);f.ie&&!f.isStrict&&(h.left-=isNaN(k)?2:k,h.top-=isNaN(l)?2:l)}else{b=a;do{if(h.left+=b.offsetLeft,h.top+=b.offsetTop,f.isWebkit>0&&"fixed"===g(b,"position")){h.left+=e.body.scrollLeft,h.top+=e.body.scrollTop;break}b=b.offsetParent}while(b&&b!==a);for((f.opera>0||f.isWebkit>0&&"absolute"===g(a,"position"))&&(h.top-=e.body.offsetTop),b=a.offsetParent;b&&b!==e.body;)h.left-=b.scrollLeft,f.opera&&"TR"===b.tagName||(h.top-=b.scrollTop),b=b.offsetParent}return h},fill:function(){var a=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g;return function(b,c){function e(){h++<i&&(f=g[0])&&(d.browser.ie<=6&&f.defer?e():f.src?d.sio.loadScript(f.src,e,{charset:"gb2312"}):(d.globalEval((f.text||f.textContent||f.innerHTML||"").replace(a,"")),e()),f.parentNode&&f.parentNode.removeChild(f))}if(b){b.innerHTML='<i style="display:none;">Hack ie first node is script</i>'+c;var f,g=b.getElementsByTagName("script"),h=0,i=g.length;e()}}}()},d.dom._styleFilter.filter=function(a,b,c){for(var e,f=0,g=d.dom._styleFilter;e=g[f];f++)(e=e[c])&&(b=e(a,b));return b},d.page=d.page||{getScrollTop:function(){var b=document;return a.pageYOffset||b.documentElement.scrollTop||b.body.scrollTop},getScrollLeft:function(){var b=document;return a.pageXOffset||b.documentElement.scrollLeft||b.body.scrollLeft},getViewHeight:function(){var a=document,b="BackCompat"===a.compatMode?a.body:a.documentElement;return b.clientHeight},getViewWidth:function(){var a=document,b="BackCompat"===a.compatMode?a.body:a.documentElement;return b.clientWidth}},d.Deferred=d.Deferred||function(a){function b(a,b,c,f){return function(){if("function"==typeof c)try{var g=c.apply(a,arguments);e.isPromise(g)?g.then(function(){b.resolve.apply(b,arguments)},function(){b.reject.apply(b,arguments)}):b.resolve.call(b,g)}catch(h){d.error("sinaadToolkit.Deferred:Error occurred in _pipe. "+h.message),b.reject(h)}else b[f].apply(b,a._args)}}function c(b){if("pending"!==b._state){var c="resolved"===b._state?b._resolves.slice():b._rejects.slice();setTimeout(function(){a.array.each(c,function(a){try{a.apply(b,b._args)}catch(c){d.error("sinaadToolkit.Deferred:Error occurred in _flush. "+c.message)}})},0),b._resolves=[],b._rejects=[]}}function e(){this._state="pending",this._args=null,this._resolves=[],this._rejects=[]}return e.prototype={resolve:function(){"pending"===this._state&&(this._state="resolved",this._args=[].slice.call(arguments),c(this))},reject:function(){"pending"===this._state&&(this._state="rejected",this._args=[].slice.call(arguments),c(this))},then:function(a,d){var f=new e;return this._resolves.push(b(this,f,a,"resolve")),this._rejects.push(b(this,f,d,"reject")),c(this),f},done:function(a){return this.then(a)},fail:function(a){return this.then(null,a)}},e.isPromise=function(a){return a&&"function"==typeof a.then},e}(d),d.throttle=d.throttle||function(a,b,c,d){var e,f,g,h=+new Date,i=0,j=0,k=null,l=function(){j=h,a.apply(f,g)};return function(){h=+new Date,f=this,g=arguments,e=h-(d?i:j)-b,clearTimeout(k),d?c?k=setTimeout(l,b):e>=0&&l():e>=0?l():c&&(k=setTimeout(l,-e)),i=h}},d.debounce=d.debounce||function(a,b,c){return d.throttle(a,b,c,!0)},d.sio=d.sio||function(){function b(a,b,c){a.setAttribute("type","text/javascript"),c&&a.setAttribute("charset",c),a.setAttribute("src",b),document.getElementsByTagName("head")[0].appendChild(a)}function c(a){a&&a.parentNode&&a.parentNode.removeChild(a),a=null}return{IMG_1_1:"http://d00.sina.com.cn/a.gif",loadScript:function(a,d,e){var f,g=document.createElement("SCRIPT"),h=0,i=e||{},j=i.charset||"utf-8",k=d||function(){},l=i.timeout||0;g.onload=g.onreadystatechange=function(){if(!h){var a=g.readyState;if("undefined"==typeof a||"loaded"===a||"complete"===a){h=1;try{k(),clearTimeout(f)}finally{g.onload=g.onreadystatechange=null,c(g)}}}},l&&(f=setTimeout(function(){g.onload=g.onreadystatechange=null,c(g),i.onfailure&&i.onfailure()},l)),b(g,a,j)},jsonp:function(e,f,g){function h(b){return function(){try{b?n.onfailure&&n.onfailure():(f.apply(a,arguments),clearTimeout(j)),a[i]=null,delete a[i]}catch(d){}finally{c(l)}}}var i,j,k,l=document.createElement("SCRIPT"),m="_sinaads_cbs_",n=g||{},o=n.charset||"utf-8",p=n.queryField||"callback",q=n.timeout||0,r=new RegExp("(\\?|&)"+p+"=([^&]*)");d.isFunction(f)?(i=m+Math.floor(2147483648*Math.random()).toString(36),a[i]=h(0)):d.isString(f)?i=f:(k=r.exec(e))&&(i=k[2]),q&&(j=setTimeout(h(1),q)),e=e.replace(r,"$1"+p+"="+i),e.search(r)<0&&(e+=(e.indexOf("?")<0?"?":"&")+p+"="+i),b(l,e,o)},log:function(b,c){var e=new Image,f="_sinaads_sio_log_"+d.rnd();a[f]=e,e.onload=e.onerror=e.onabort=function(){e.onload=e.onerror=e.onabort=null,a[f]=null,e=null},e.src=b+(c?"":(b.indexOf("?")>0?"&":"?")+f)}}}(),d.swf=d.swf||{uid:0,getMovie:function(b,c){c=c||a;var e,f=c.document[b];return 9===d.browser.ie?f&&f.length?1===(e=d.array.remove(d.toArray(f),function(a){return"embed"!==a.tagName.toLowerCase()})).length?e[0]:e:f:f||c[b]},createHTML:function(a){a=a||{};var b,c,e={},f=d.string.encodeHTML;for(c in a)e[c]=a[c];a=e;var g=a.vars;if("string"==typeof g)a.flashvars=g;else{var h=[];for(c in g)b=g[c],h.push(c+"="+encodeURIComponent(b));a.flashvars=h.join("&")}var i=["<embed"];a.name=a.id||"sinaadtk_swf_uid_"+d.swf.uid++,a.align=a.align||"middle",a.src=a.url||"",a.type="application/x-shockwave-flash",a.pluginspage="http://www.macromedia.com/go/getflashplayer",delete a.id,delete a.url,delete a.vars;var j;for(c in a)if(b=a[c],b||b===!1||0===b){if(new RegExp("^salign$","i").test(c)){j=b;continue}i.push(" ",c,'="',f(b),'"')}return j&&i.push(' salign="',f(j),'"'),i.push("/>"),i.join("")}},d.iframe=d.iframe||{uid:0,init:function(a,b,c,d){var e=d?'"':"",f=e+"0"+e;a.width=e+b+e,a.height=e+c+e,a.frameborder=f,a.marginwidth=f,a.marginheight=f,a.vspace=f,a.hspace=f,a.allowtransparency=e+"true"+e,a.scrolling=e+"no"+e},createHTML:function(a){var b=[];return a.name=a.name||a.id||"sinaadtk_iframe_uid_"+d.iframe.uid++,d.object.map(a,function(a,c){b.push(" "+c+'="'+(null===a?"":a)+'"')}),"<iframe"+b.join("")+"></iframe>"},fill:function(b,c){var e,f=d.browser.ie;if(f){try{e=!!b.contentWindow.document}catch(g){e=!1}if(e)try{f>6?(a.frames[b.name].contents=c,b.src='javascript:window["contents"]'):(a.frames[b.name].contents=c,b.src='javascript:document.write(window["contents"]);/* document.close(); */')}catch(g){d.error("sinaadToolkit.iframe.fill: cannot fill iframe content in ie, ",g)}else try{var h="sinaads-ad-iframecontent-"+d.rnd();a[h]=c,c='var adContent = window.parent["'+h+'"];window.parent["'+h+'"] = null;document.write(adContent);',c=d.browser.ie&&d.browser.ie<=6?"window.onload = function() {document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \""+document.domain+'";'+c+"<\\/scr\\' + \\'ipt>\\');"+"document.close();"+"};":'document.domain = "'+document.domain+'";'+c+"document.close();",b.src='javascript:\'<script type="text/javascript">'+c+"</script>'"}catch(g){a[h]=null,d.error("sinaadToolkit.iframe.fill:Cannot fill iframe in IE by modifying the document.domain. ",g)}}else try{e=b.contentWindow?b.contentWindow.document:b.contentDocument,d.browser.firefox&&e.open("text/html","replace"),e.write(c),e.close()}catch(g){d.error("sinaadToolkit.iframe.fill:Cannot fill iframe by regular method. ",g)}}},d.monitor=d.monitor||{parseTpl:function(){var a=/\{__([a-zA-Z0-9]+(_*[a-zA-Z0-9])*)__\}/g;return function(b,c){return b?b.replace(a,function(a,b){return b.indexOf("adbox_")>0?(b=b.split("_"),"{__mo"+b[2]+"__}"):c[b]||a}):""}}(),createImpressMonitor:function(a){var b=[];return d.array.each(a,function(a){var c={};d.iframe.init(c,1,1,!1),c.src=a,c.style="display:none;",b.push(d.iframe.createHTML(c))}),b.join("")},createClickMonitor:function(a,b){if(b){var c=[],e="";return d.array.each(b,function(b){var f="";if(b){switch(a){case"image":case"flash":case"text":f="sinaadToolkit.sio.log('"+d.url.ensureURL(b)+"')",e=";";break;case"adbox":f="api_exu="+encodeURIComponent(d.url.ensureURL(b)),e="&"}f&&c.push(f)}}),c.join(e)}},createTrackingMonitor:function(a,b){if(!a)return"";var c=d.url.ensureURL(a);return d.array.each(b,function(a){a=d.url.ensureURL(a),a&&((-1!==a.indexOf("sax.sina.com.cn/click")||-1!==a.indexOf("sax.sina.com.cn/dsp/click"))&&(a=a.replace(/&url=$/,"")+"&url="),c=a+encodeURIComponent(c))}),c}},d.ad=d.ad||{getTypeBySrc:function(a,b){var c=b;if(!c)switch(c=a.substring(a.length-3).toLowerCase()){case"swf":c="flash";break;case"tml":c="url";break;case".js":c="js";break;case"png":case"jpg":case"gif":case"bmp":c="image";break;default:c="html"}return"url"===c&&a.indexOf("adbox.sina.com.cn/ad/")>=0&&(c="adbox"),c},createHTML:function(a,b,c,e,f,g,h,i){var j,k=[],l="",m={},n=0,o=0;if(i=i||{},b=d.array.ensureArray(b),a=d.array.ensureArray(a),f=d.array.ensureArray(f),c+=d.isNumber(c)?"px":"",e+=d.isNumber(e)?"px":"",d.array.each(b,function(b,c){m["src"+c]=b,m["type"+c]=a[c]||d.ad.getTypeBySrc(b,a[c]),m["link"+c]=d.monitor.createTrackingMonitor(f[c],g),m["monitor"+c]="",m["monitor1_1_"+c]=d.monitor.createTrackingMonitor(d.sio.IMG_1_1,g),m["monitor1_1_"+c]=m["monitor1_1_"+c]===d.sio.IMG_1_1?"":m["monitor1_1_"+c]}),m.width=c,m.height=e,m.src=m.src0||"",m.type=m.type0||"",m.link=m.link0||"",m.monitor=m.monitor0||"",m.monitor1_1=m.monitor1_1_0||"",h&&"string"==typeof h)return d.string.format(h,m);for(n=b.length,n=1;n>o;o++){switch(b=m["src"+o],a=m["type"+o],f=m["link"+o],g=m["monitor"+o],a){case"url":j={},d.iframe.init(j,c,e,!1),j.src=d.url.ensureURL(b),g=m["monitor1_1_"+o],g&&(j.name="clickTAG="+encodeURIComponent(g)),l=d.iframe.createHTML(j);break;case"image":l='<img border="0" src="'+d.url.ensureURL(b)+'" style="width:'+c+";height:"+e+';border:0" alt="'+b+'"/>',l=(d.browser.phone||d.browser.tablet)&&g?f?'<a href="'+f+'" ontouch="try{'+g+'}catch(e){}finally{}">'+l+"</a>":l:f?'<a href="'+f+'" target="_blank"'+(g?' onclick="try{'+g+'}catch(e){}"':"")+">"+l+"</a>":l;break;case"text":l=(d.browser.phone||d.browser.tablet)&&g?f?'<a href="'+f+'" ontouch="try{'+g+'}catch(e){}finally{}">'+b+"</a>":b:f?'<a href="'+f+'" target="_blank"'+(g?' onclick="try{'+g+'}catch(e){}"':"")+">"+b+"</a>":b;break;case"flash":l=d.swf.createHTML({url:d.url.ensureURL(b),width:c,height:e,wmode:i.wmode||"opaque",vars:{clickTAG:m["monitor1_1_"+o]}}),f&&(l=['<div style="width:'+c+";height:"+e+';position:relative;overflow:hidden;">',l,'<a style="position:absolute;background:#fff;opacity:0;filter:alpha(opacity=0);width:'+c+";height:"+e+';left:0;top:0" href="'+f+'" target="_blank"'+(g?' onclick="try{'+g+'}catch(e){}"':"")+"></a>","</div>"].join(""));break;case"adbox":j={},d.iframe.init(j,c,e,!1),j.src=d.url.ensureURL(b),g=m["monitor1_1_"+o],g&&(j.name="api_exu="+encodeURIComponent(g)+"&clickTAG="+encodeURIComponent(g)),l=d.iframe.createHTML(j);break;case"js":l=["<",'script charset="utf-8" src="',d.url.ensureURL(b),'"></',"script>"].join("");break;default:l=b.replace(/\\x3c/g,"<").replace(/\\x3e/g,">")}k.push(l)}return k.join(" ")}},d.sandbox=d.sandbox||function(){function a(b,c){var e,f="";switch(typeof b){case"string":c.push(d.string.formalString(b));break;case"number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case"boolean":c.push(b);break;case"undefined":c.push("null");break;case"object":if(null===b){c.push("null");break}if(b instanceof Array){var g=b.length;for(c.push("["),f="",e=0;g>e;e++)c.push(f),a(b[e],c),f=",";c.push("]");break}c.push("{");var h;f="";for(var i in b)b.hasOwnProperty(i)&&(h=b[i],"function"!=typeof h&&(c.push(f),c.push(i),c.push(":"),a(h,c),f=","));c.push("}");break;case"function":}}function b(b){var c=[];return d.object.map(b,function(b,d){if(null!==b){var e=[];try{a(b,e),e=e.join("")}catch(f){}e&&c.push(d,"=",e,";")}}),c.join("")}var c=0;return{create:function(a,e,f,g,h){var i="sinaadtk_sandbox_id_"+c++;h=h||{},h.sinaadToolkitSandboxId=i,e+=d.isNumber(e)?"px":"",f+=d.isNumber(f)?"px":"";var j={};d.iframe.init(j,e,f,0),j.src="javascript:'<html><body style=background:transparent;></body></html>'",j.id=i,j.style="float:left;",a.innerHTML=d.iframe.createHTML(j),h=b(h),d.iframe.fill(document.getElementById(i),['<!doctype html><html><body style="background:transparent">',"<","script>",h,"</","script>",g,"</body></html>"].join(""))}}}(),c.uid=0,c.prototype={getMain:function(){return document.getElementById(this.uid)},getResetPositionHandler:function(){var a=this;return function(){a.setPosition()}},setPosition:function(){var a=this.getMain(),b=this.position.split(" "),c=d.page.getViewWidth(),e=d.page.getViewHeight(),f=0,g=0,h=Math.min(this.minViewportWidth?c/2-this.minViewportWidth/2:0,0);switch(this.follow&&(f=d.browser.isSupportFixed?0:d.page.getScrollTop()||0,g=d.browser.isSupportFixed?0:d.page.getScrollLeft()||0),b[0]){case"center":a.style.left=g+(c-this.width)/2+g+"px";break;case"left":a.style.left=g+h+"px";break;case"right":this.follow?a.style.left=g+(c-this.width)-h+"px":a.style.right=h+"px";break;default:a.style.left=g+(parseInt(b[0],10)||0)+"px"}switch(b[1]){case"center":a.style.top=(e-this.height)/2+f+"px";break;case"top":a.style.top=f+"px";break;case"bottom":this.follow?a.style.top=f+(e-this.height)+"px":a.style.bottom="0px";break;default:a.style.top=f+(parseInt(b[1],10)||0)+"px"}},show:function(){this.getMain().style.display="block"},hide:function(){this.getMain().style.display="none"}},d.Box=d.Box||c}(window);
/*
//@ sourceMappingURL=sinaadToolkit.js.map
*/
