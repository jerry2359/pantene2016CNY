/////////////////宽度全屏自适应设置////////////////////
(function( viewWidth, resize ){

    var oWrap = document.getElementById('wrap');

    function showScale(time) {
        setTimeout(function(){
            var deviceWidth = document.documentElement.clientWidth,
                deviceHeight = document.documentElement.clientHeight,
                viewHeight = viewWidth*deviceHeight/deviceWidth,
                iScale = deviceWidth / viewWidth;

            oWrap.style.cssText = 'width: '+ viewWidth +'px;' +
            'height: '+ viewHeight +'px;' +
            'position: relative;' +
            'top: 50%;' +
            'left: 50%;' +
            'margin: -'+ (viewHeight/2) +'px 0 0 -'+ (viewWidth/2) +'px;' +
            '-webkit-transform: scale('+ iScale +');' +
            'transform: scale('+ iScale +');';
        }, typeof time == 'number' ? time : 100);
    }

    showScale(100);
    resize && window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", showScale, false);

})( 750, true );
/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function R(t){return D(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(R(i[e])||A(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return _(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=$,n.isArray=A,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):[]},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&X(this,t)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?W(this,""):(i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void W(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?$(s)?s["inner"+i]:_(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function T(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?T(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n);var s=n.dataType,a=/\?.+=\?/.test(n.url);if(a&&(s="jsonp"),n.cache!==!1&&(e&&e.cache===!0||"script"!=s&&"jsonp"!=s)||(n.url=w(n.url,"_="+Date.now())),"jsonp"==s)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var S="async"in n?n.async:!0;d.open(n.type,n.url,S,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(S(t)+"="+S(e))},T(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);
/**
 * Created by LinJe on 2015/11/26.
 * H5 Animation 动画框架
 * 依赖 zepto.js
 */
;(function( $, window, document, undefined ) {

    //用于html中的标签，此标签保存了所有的动画数据
    var animateTag = 'data-animate',
        autoRenderTag = 'data-autoRender',
        styleTag = document.createElement('style'),
        styleStr = '';

    //生成的唯一动画存储到缓存中，确保其唯一性
    var cacheAnimation = {};

    /**
     * 基础模板
     * 可在模板的基础上调整动画细节
     */
    var template = {
        'animationDefs': {
            'duration': 1000,
            'function': 'ease',
            'fillMode': 'both',
            'infinite': false,
            'alternate': false
        },

        //滑动效果
        'slide': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        },

        //淡出效果
        'fadeIn': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        }
    };

    //扩展模板
    $.extend(template, {
        'fadeInLeft': {
            'defs': {
                'startX': '-100%',
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': template.fadeIn.style
        }
    });

    //定义基础对象原型
    var superBase = function() {
        var _this = this;
        _this.defs = {};
        _this.styleInfo = {};
        $.extend(_this.defs, template.animationDefs);
    };

    superBase.prototype.handleStyle = function( style, animationClass ) {
        var _this = this,
            newStyle = style.replace(/(#\w+#)/g, function($0) {
                var attr = $0.replace(/#/g, '');
                return attr != 'animationClass' ? _this.defs[attr] : animationClass;
            });

        return newStyle;
    };

    superBase.prototype.getStyle = function() {
        return this.styleInfo;
    };

    superBase.prototype.addAnimate = function( opts ) {
        var _this = this,
            defs = _this.defs,
            animationName = opts.animation,
            animationClass = animationName,
            curTemplate = template[animationName],
            duration,
            timingFunction,
            fillMode,
            infinite,
            alternate,
            delay;

        $.extend(defs, curTemplate.defs); //合并默认参数
        $.extend(defs, opts.details); //动画数据参数覆盖默认参数

        //console.log(defs);
        duration = defs.duration;
        timingFunction = defs.function;
        fillMode = defs.fillMode;
        delay = defs.delay;
        infinite = defs.infinite ? '-webkit-animation-iteration-count:infinite; animation-iteration-count:infinite;\n' : '';
        alternate = defs.alternate ? '-webkit-animation-direction:alternate; animation-direction:alternate;\n' : '';
        delay = delay ? '-webkit-animation-delay:'+delay+'ms; animation-delay:'+delay+'ms;\n' : '';

        //console.log(curTemplate);

        $.each(defs, function(attr, key) {
            animationClass += key;
        });

        //为兼容css样式命名书写规范，分别处理%号、贝塞尔格式、去掉 "."
        animationClass = animationClass.replace(/\%|\.|\(.+\)/g, function($0) {
            var result;
            if ( $0.indexOf('%') == -1 ) {
                result = $0.replace(/\(|\)|\,|\s|\./g, '');
            } else if ( $0.indexOf('.') != -1 ) {
                result = '';
            } else {
                result = 'percent';
            }
            return result;
        });

        _this.styleInfo = {
            'animationClass': animationClass,
            'style': '\n' + _this.handleStyle(curTemplate.style, animationClass) +
                            '\n.active>.'+ animationClass +' {\n\
                                -webkit-animation-name: '+ animationClass +';\n\
                                animation-name: '+ animationClass +';\n\
                                -webkit-animation-timing-function: '+ timingFunction +';\n\
                                animation-timing-function: '+ timingFunction +';\n\
                                -webkit-animation-duration: '+ duration +'ms;\n\
                                animation-duration: '+ duration +'ms;\n\
                                -webkit-animation-fill-mode: '+ fillMode +';\n\
                                animation-fill-mode: '+ fillMode +';\n\
                                '+ infinite + alternate + delay +'\n\
                            }'
        };

        return _this;
    };

    superBase.prototype.resetConfig = function(){
        var _this = this;
        _this.defs = {};
        _this.styleInfo = {};
        $.extend(_this.defs, template.animationDefs);
    };

    //字符串转json数据
    superBase.prototype.strToJson = function(str){
        return (new Function("return " + str))();
    };

    //模板继承扩展
    superBase.prototype.extendTemplate = function( newTemplate ) {
        $.extend(template, newTemplate);
        return this;
    };

    /**
     * 动画渲染
     * 1、获取页面中所有动画数据
     * 2、添加动画样式
     * 3、渲染到每个标签的class上
     */
    superBase.prototype.render = function() {
        var _this = this, $context, children;

        $context = arguments.length > 1 ? $(arguments[0], arguments[1]) : $(arguments[0]);
        children = $context.find('['+ animateTag +']');
        $($context.concat(children)).each(function() {
            _this.resetConfig();

            var thisTag = $(this),
                dataAnimate = _this.strToJson(thisTag.attr(animateTag)),
                styleInfo,
                animationClass,
                style;

            //console.log(template.animationDefs);
            if ( dataAnimate ) {
                styleInfo = _this.addAnimate(dataAnimate).getStyle();
                animationClass = styleInfo.animationClass;
                style = styleInfo.style;

                thisTag.addClass(animationClass);
                if ( !cacheAnimation[animationClass] ) {
                    styleStr += style;
                    cacheAnimation[animationClass] = style;
                }
            };
        });

        styleTag.innerHTML = styleStr;
        $(styleTag).remove();
        $('head').append(styleTag);

        return _this;
    };


    var baseAnimate = new superBase();

    //公开对外方法
    window.jerryAnimate = function() {
        if ( arguments.length != 0 ) {
            if ( arguments.length > 1 ) {
                baseAnimate.render(arguments[0], arguments[1]);
            } else {
                baseAnimate.render(arguments[0]);
            }
        }
        return baseAnimate;
    };

    jerryAnimate.template = template;


    //是否自动渲染动画
    $(document).ready(function() {
        $('body').find('['+ autoRenderTag +']').each(function() {
            var thisScript = $(this);
            if ( thisScript.attr(autoRenderTag) == 'true' ) {
                jerryAnimate('body').render();
                return;
            };
        });
    });

})( Zepto, window, document );
/**
 * Created by LinJe on 2015/11/30.
 * jerryAnimate.js 的模板扩展
 */
;(function( jerryAnimate ) {

    jerryAnimate().extendTemplate({

        //旋转
        'rotate': {
            'defs': {
                'startAngle': '0deg',
                'targetAngle': '360deg'
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#);\n\
                                transform: rotate(#startAngle#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#);\n\
                                transform: rotate(#targetAngle#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#);\n\
                                transform: rotate(#startAngle#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#);\n\
                                transform: rotate(#targetAngle#);\n\
                            }\n\
                        }'
        },

        //直线高光
        'lineLight': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            50% {\n\
                                opacity: 1;\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            50% {\n\
                                opacity: 1;\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        },

        //旋转缩放
        'rotateScale': {
            'defs': {
                'startAngle': 0,
                'targetAngle': 0,
                'startScale': 1,
                'targetScale': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#) scale(#startScale#);\n\
                                transform: rotate(#startAngle#) scale(#startScale#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                                transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#startAngle#) scale(#startScale#);\n\
                                transform: rotate(#startAngle#) scale(#startScale#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform-origin: center;\n\
                                transform-origin: center;\n\
                                -webkit-transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                                transform: rotate(#targetAngle#) scale(#targetScale#);\n\
                            }\n\
                        }'
        },

        /////////////////////////animate.css 动画包////////////////////////
        'bounceIn': {
            'defs': {},
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0%, 20%, 40%, 60%, 80%, 100% {\n\
                                -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                            }\n\
                            0% {\n\
                                opacity: 0;\n\
                                -webkit-transform: scale3d(.3, .3, .3);\n\
                                transform: scale3d(.3, .3, .3);\n\
                            }\n\
                            20% {\n\
                                -webkit-transform: scale3d(1.1, 1.1, 1.1);\n\
                                transform: scale3d(1.1, 1.1, 1.1);\n\
                            }\n\
                            40% {\n\
                                -webkit-transform: scale3d(.9, .9, .9);\n\
                                transform: scale3d(.9, .9, .9);\n\
                            }\n\
                            60% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1.03, 1.03, 1.03);\n\
                                transform: scale3d(1.03, 1.03, 1.03);\n\
                            }\n\
                            80% {\n\
                                -webkit-transform: scale3d(.97, .97, .97);\n\
                                transform: scale3d(.97, .97, .97);\n\
                            }\n\
                            100% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1, 1, 1);\n\
                                transform: scale3d(1, 1, 1);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0%, 20%, 40%, 60%, 80%, 100% {\n\
                                -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n\
                            }\n\
                            0% {\n\
                                opacity: 0;\n\
                                -webkit-transform: scale3d(.3, .3, .3);\n\
                                transform: scale3d(.3, .3, .3);\n\
                            }\n\
                            20% {\n\
                                -webkit-transform: scale3d(1.1, 1.1, 1.1);\n\
                                transform: scale3d(1.1, 1.1, 1.1);\n\
                            }\n\
                            40% {\n\
                                -webkit-transform: scale3d(.9, .9, .9);\n\
                                transform: scale3d(.9, .9, .9);\n\
                            }\n\
                            60% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1.03, 1.03, 1.03);\n\
                                transform: scale3d(1.03, 1.03, 1.03);\n\
                            }\n\
                            80% {\n\
                                -webkit-transform: scale3d(.97, .97, .97);\n\
                                transform: scale3d(.97, .97, .97);\n\
                            }\n\
                            100% {\n\
                                opacity: 1;\n\
                                -webkit-transform: scale3d(1, 1, 1);\n\
                                transform: scale3d(1, 1, 1);\n\
                            }\n\
                        }'
        },

        'zoomIn': {
            'defs': {
                'startOpacity': 0,
                'targetOpacity': 1,
                'startZoom': 0.3,
                'targetZoom': 1
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: scale(#startZoom#);\n\
                                transform: scale(#startZoom#);\n\
                            }\n\
                            50% {\n\
                                opacity: #targetOpacity#;\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: scale(#targetZoom#);\n\
                                transform: scale(#targetZoom#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: scale(#startZoom#);\n\
                                transform: scale(#startZoom#);\n\
                            }\n\
                            50% {\n\
                                opacity: #targetOpacity#;\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: scale(#targetZoom#);\n\
                                transform: scale(#targetZoom#);\n\
                            }\n\
                        }'
        },

        'fadeOut': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: 1;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: 0;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        }

    });

})( jerryAnimate );
/**
 * Created by LinJe on 2015/10/28.
 * 延迟loading百分比的累加
 * 依赖 zepto 或 jquery
 */
;(function( $ ) {

    $.fn.lazyLoading = function( settings ) {

        var $this = $(this),
            $imgArr = $this.find('img'),

            //延迟loading变量
            aLoadData = [],
            loadCur = -1,
            loadSpeed = 30,
            loadListenI = 0,
            isProgress = false,
            loadListenTimer = null;

        $this.concat = function( arr ) {
            var collection = [];

            arr.forEach(function(item) {
                var img = new Image();
                img.src = item;
                collection.push(img);
            });

            loadImages({
                '$imgs': $($imgArr.concat(collection)),
                'progressFn': function(percent) {
                    aLoadData.push(percent);
                }
            });

            return $this;
        };

        $this.progress = function( fn ) {
            $this.on('progress', function(ev) {
                fn && fn.call($this, ev._args);
            });

            return $this;
        };

        $this.callBack = function( fn ) {
            $this.on('callBack', function() {
                fn && fn.call($this);
            });

            return $this;
        };

        loadListenTimer = setInterval(function() {
            if ( loadListenI > 35 ) {
                //未检测到缓存资源，加长延迟加载时间
                loadSpeed = 150;
                !isProgress && progressPercent();
            }
            loadListenI ++;
            if ( aLoadData[aLoadData.length-1] >= 100 ) {
                //检测到缓存资源，正常延迟加载
                clearInterval(loadListenTimer);
                loadSpeed = 30;
                !isProgress && progressPercent();
            }
        }, 50);

        function progressPercent() {
            isProgress = true;
            if ( loadCur < 100 ) {
                if ( aLoadData.length > 0 ) {
                    //延迟加载中... 百分比
                    loadCur = aLoadData.shift();
                }
                $this.trigger('progress', loadCur);
                if ( loadCur != 100 ) {
                    //延迟加载中 百分比 loadCur
                    setTimeout(progressPercent, loadSpeed);
                } else {
                    //延迟加载完毕 百分比 loadCur
                    $this.trigger('callBack');
                }
            } else {
                //延迟加载完毕 百分比 loadCur
                $this.trigger('callBack');
            }
        }


        function loadImages( opts ) {
            var $imgs = opts.$imgs,
                progressFn = opts.progressFn,
                callBackFn = opts.callBackFn,
                index = 0,
                iLen = $imgs.length;

            $imgs.each(function(i, elem) {
                var img = new Image();

                img.onload = load;
                img.onerror = load;
                img.src = $(elem).attr('src');
            });

            function load() {
                index ++;
                progressFn && progressFn( Math.floor(index/iLen*100) );
                index == iLen && callBackFn && callBackFn();
            }
        }

        return $this;

    }

})( Zepto || jQuery );

//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto)
//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
  var prefix = '', eventPrefix, endEventName, endAnimationName,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming, transitionDelay,
    animationName, animationDuration, animationTiming, animationDelay,
    cssReset = {}

  function dasherize(str) { return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionDelay    = prefix + 'transition-delay'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationDelay     = prefix + 'animation-delay'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback, delay){
    if ($.isFunction(duration))
      callback = duration, ease = undefined, duration = undefined
    if ($.isFunction(ease))
      callback = ease, ease = undefined
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    if (delay) delay = parseFloat(delay) / 1000
    return this.anim(properties, duration, ease, callback, delay)
  }

  $.fn.anim = function(properties, duration, ease, callback, delay){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
        fired = false

    if (duration === undefined) duration = $.fx.speeds._default / 1000
    if (delay === undefined) delay = 0
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationDelay] = delay + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionDelay] = delay + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      } else
        $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

      fired = true
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0){
      this.bind(endEvent, wrappedCallback)
      // transitionEnd is not always firing on older Android phones
      // so make sure it gets fired
      setTimeout(function(){
        if (fired) return
        wrappedCallback.call(that)
      }, (duration * 1000) + 25)
    }

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)
/**
 * Created by LinJe on 2015/10/14.
 * 利用css合并工具生成的雪碧图和css代码来播放序列帧动画
 */
var CssSprite = function( settings ) {
    var _this = this;

    _this.defs = {
        'stage': null,
        'commonClass': 'icons',
        'classPrefix': 'b',
        'frames': 60,
        'time': 5000,
        'waitTime': 0,
        'loop': 0
    };
    _this.extend(_this.defs, settings);
    _this.index = 0;
    _this.timer = null;
    _this.timerWait = null,
    _this.speed = parseInt(_this.defs.time/_this.defs.frames);
};

CssSprite.prototype.extend = function( defs, opts ) {
    for ( var attr in defs ) {
        if ( typeof opts[attr] != 'undefined' ) {
            defs[attr] = opts[attr];
        }
    }
    return this;
};

CssSprite.prototype.play = function() {
    var _this = this;

    function spritePlay() {
        if ( _this.index < _this.defs.frames ) {
            _this.index ++;
            _this.toTarget();
        } else {
            clearInterval(_this.timer);
            if ( _this.defs.loop ) {
                clearTimeout(_this.timerWait);
                _this.timerWait = setTimeout(function() {
                    _this.index = 1;
                    _this.toTarget();
                    _this.timer = setInterval(spritePlay, _this.speed);
                }, _this.defs.waitTime);
            }
        }
    }

    clearInterval(_this.timer);
    _this.timer = setInterval(spritePlay, _this.speed);
    return _this;
};

CssSprite.prototype.toTarget = function() {
    var _this = this;
    _this.defs.stage.className = _this.defs.commonClass +' '+ _this.defs.classPrefix + _this.index;
    return _this;
};

CssSprite.prototype.stop = function() {
    var _this = this;
    clearInterval(_this.timer);
    clearTimeout(_this.timerWait);
    return _this;
};

/**
 * Created by LinJe on 2015/11/10.
 * 基于zepto的自定义滚动条插件
 */
;(function( $, window, document, undefined ) {

    $.extend($.fn, {
        'vScrollbar': function( settings ) {
            var defs = {
                'scrollEle':'.scrollWrap',
                'scrollBarEle': '.scrollBar',
                'scrollHandleEle': '.scrollHandle',
                'scrollBar': false,
                'easeSpeed': 5
            };

            $.extend(defs, settings);

            var $this = $(this),
                scrollEle = $this.find(defs.scrollEle),
                scrollBarEle = $this.find(defs.scrollBarEle),
                scrollHandleEle = $this.find(defs.scrollHandleEle),
                scrollBar = defs.scrollBar,
                winHeight = parseInt($this.css('height')),
                scrollHeight = undefined,
                scrollBarH = parseInt(scrollBarEle.css('height')) - parseInt(scrollHandleEle.css('height')),
                easeSpeed = defs.easeSpeed,
                startY = 0, distance = 0, oldDistance = 0,
                disBox = [],
                timerScrollH = null, timerScrollOut = null;

            if ( !$.fn.animate ) {
                var styleNode = document.createElement('style');
                styleNode.type = 'text/css';
                styleNode.innerHTML = defs.scrollEle+'.scrollTransition{-webkit-transition:300ms all ease-out;transition:300ms all ease-out;}';
                document.getElementsByTagName('head')[0].appendChild(styleNode);
            }

            var setTranslate = function( $obj, y ) {
                    var transVal = 'translateY('+ y +'px)';
                    $obj.css({'-webkit-transform':transVal, 'transform':transVal});
                },
                getHandleDis = function() {
                    return Math.abs(distance/scrollHeight * scrollBarH);
                },
                setHandle = function() {
                    setTranslate(scrollHandleEle, getHandleDis());
                },
                slowAction = function( $obj, target ) {
                    var transVal = 'translateY('+ target +'px)';
                    if ( $.fn.animate ) {
                        $obj.animate({'-webkit-transform':transVal, 'transform':transVal}, 300, 'ease-out');
                    } else {
                        $obj.addClass('scrollTransition').css({'-webkit-transform':transVal, 'transform':transVal});
                    }
                },
                rangeDistance = function() {
                    if ( distance > 0 ) {
                        distance = 0;
                    } else if ( distance < scrollHeight ) {
                        distance = scrollHeight < 0 ? scrollHeight : 0;
                    }
                },
                getScrollH = function( callBack ) {
                    clearInterval(timerScrollH);
                    clearTimeout(timerScrollOut);
                    timerScrollH = setInterval(function() {
                        var tmpScrollH = scrollEle.get(0).scrollHeight;
                        if ( !scrollHeight ) {
                            if ( tmpScrollH > winHeight ) {
                                scrollHeight = winHeight - tmpScrollH;
                            }
                        } else {
                            clearInterval(timerScrollH);
                            clearTimeout(timerScrollOut);
                            callBack && callBack();
                        }
                    }, 100);
                    timerScrollOut = setTimeout(function() {
                        clearInterval(timerScrollH);
                        $(window).on('load', function() {
                            scrollHeight = winHeight - scrollEle.get(0).scrollHeight;
                            callBack && callBack();
                        });
                    }, 10000);
                };


            getScrollH();

            $this.on('touchstart', function(ev) {
                disBox = [];
                oldDistance = distance;
                startY = ev.changedTouches[0].pageY;
                scrollEle.removeClass('scrollTransition');
            });

            $this.on('touchmove', function(ev) {
                var moveY = ev.changedTouches[0].pageY;

                distance = moveY - startY + oldDistance;
                rangeDistance();

                if ( distance != oldDistance ) {
                    setTranslate(scrollEle, distance);
                    scrollBar && setHandle();
                    disBox.push(moveY);
                }
                ev.preventDefault();
            });

            $this.on('touchend', function(ev) {
                var len = disBox.length,
                    speed = (disBox[len-1]-disBox[len-2]) * easeSpeed; //设置滚动的缓动灵敏度倍数

                if ( typeof speed == 'number' && speed === speed ) {
                    distance += speed;
                    rangeDistance();
                    slowAction(scrollEle, distance);
                    scrollBar && slowAction(scrollHandleEle, getHandleDis());
                }
            });

            //重置滚动区域
            $this.resize = function() {
                startY = 0;
                distance = 0;
                oldDistance = 0;
                scrollHeight = undefined;
                getScrollH(function() {
                    setTranslate(scrollEle, distance);
                    scrollBar && setHandle();
                });
            };

            return $this;
        }
    });

})( Zepto, window, document );

/**
 * Created by LinJe on 2015/12/17.
 */
;(function( $ ) {

    //共同方法
    $.extend($.fn, {
        'fadeIn': function( settings ) {
            var _this = $(this);
            settings && settings.addClass && _this.addClass(settings.addClass);
            _this.css('opacity', '0').animate({'opacity':1}, settings && settings.time || 500, '', function() {
                settings && settings.callBack && settings.callBack.call(_this);
            });
        },
        'fadeOut': function( settings ) {
            var _this = $(this);
            _this.css('opacity', '1').animate({'opacity':0}, settings && settings.time || 500, '', function() {
                settings.removeClass && _this.removeClass(settings.removeClass);
                settings && settings.callBack && settings.callBack.call(_this);
            });
        }
    });


    //loading ui
    (function() {

        var oBox = $('.loading'),
            oBdo = oBox.find('bdo'),
            oEm = oBox.find('em');

        //选取body 延迟加载
        $('body').lazyLoading()
            .concat([
                '../img/common/face/1.png', '../img/common/face/2.png', '../img/common/face/3.png',
                '../img/common/face/4.png', '../img/common/face/5.png', '../img/common/face/6.png'
            ])
            .progress(function(percent) {
                oBdo.text(percent+'%');
                oEm.css('width', percent+'%');
            })
            .callBack(function() {
                oBox.fadeOut({'removeClass':'active'});
                homeModule.show();
            });

    })();


    //首页
    var homeModule = (function() {

        var oBox = $('#home'),
            oStart = oBox.find('.start');

        oStart.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            selectModule.show();
        });

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            }
        }

    })();


    //选择图片
    var selectModule = (function() {

        var oBox = $('#select');

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
                setTimeout(function() {
                    oBox.fadeOut({'removeClass':'active'});
                    previewModule.show();
                }, 2000);
            }
        }

    })();


    //预览
    var previewModule = (function() {

        var oBox = $('#preview'),
            oDressup = oBox.find('.dressup'),
            oTurnhairstyle = oBox.find('.turnhairstyle');

        //不够美，调一下
        oDressup.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            editModule.show();
        });

        //立刻换发型
        oTurnhairstyle.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            hairstyleModule.show();
        });

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            }
        }

    })();


    //编辑
    var editModule = (function() {

        var oBox = $('#edit'),
            oComplete = oBox.find('.complete'),
            oPanel = oBox.find('.panel'),
            oTabBox = oPanel.find('ol'),
            aTabLi = oTabBox.find('li'),
            allUl = oPanel.find('ul'),
            aPrev = allUl.find('.prev'),
            aNext = allUl.find('.next'),
            allI = allUl.find('li i');

        //所有头像
        var aPortraitbox = $('.portraitbox'),
            eyesPortrait = aPortraitbox.find('.eyes'),
            nosePortrait = aPortraitbox.find('.nose'),
            mouthPortrait = aPortraitbox.find('.mouth'),
            browsPortrait = aPortraitbox.find('.brows');

        //切换 四官
        aTabLi.on('click', function() {
            var index = $(this).index();
            oTabBox.removeClass().addClass('tab'+(index+1));

            switch (index) {
                case 0:
                    //切换到 眼睛
                    allUl.removeClass('active').eq(0).addClass('active');
                    break;
                case 1:
                    //切换到 鼻子
                    allUl.removeClass('active').eq(1).addClass('active');
                    break;
                case 2:
                    //切换到 嘴型
                    allUl.removeClass('active').eq(2).addClass('active');
                    break;
                case 3:
                    //切换到 眉毛
                    allUl.removeClass('active').eq(3).addClass('active');
                    break;
            }
        });

        //点击 上一页
        aPrev.on('click', function() {
            var $this = $(this),
                thisParent = $this.parent(),
                thisLi = thisParent.find('li'),
                thisIndex = Number(thisParent.attr('_index'));

            if ( !thisIndex ) {
                thisParent.attr('_index', 0);
            }

            thisIndex = thisIndex > 0 ? thisIndex-1 : thisLi.length-1;
            thisLi.removeClass().eq(thisIndex).addClass('active');
            thisParent.attr('_index', thisIndex);
        });

        //点击 下一页
        aNext.on('click', function() {
            var $this = $(this),
                thisParent = $this.parent(),
                thisLi = thisParent.find('li'),
                thisIndex = Number(thisParent.attr('_index'));

            if ( !thisIndex ) {
                thisParent.attr('_index', 0);
            }

            thisIndex = thisIndex < thisLi.length-1 ? thisIndex+1 : 0;
            thisLi.removeClass().eq(thisIndex).addClass('active');
            thisParent.attr('_index', thisIndex);
        });

        //点击选择四官
        allI.on('click', function() {
            var $this = $(this),
                thisImgSrc = $this.find('img').attr('src');

            $this.siblings('i').removeClass();
            $this.addClass('select');

            if ( thisImgSrc.indexOf('eyes') != -1 ) {
                //眼睛
                eyesPortrait.attr('src', thisImgSrc);
            } else if ( thisImgSrc.indexOf('nose') != -1 ) {
                //鼻子
                nosePortrait.attr('src', thisImgSrc);
            } else if ( thisImgSrc.indexOf('mouth') != -1 ) {
                //嘴型
                mouthPortrait.attr('src', thisImgSrc);
            } else {
                //眉毛
                browsPortrait.attr('src', thisImgSrc);
            }
        });

        //点击完成
        oComplete.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            hairstyleModule.show();
        });

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            }
        }

    })();


    //选择发型
    var hairstyleModule = (function() {

        var oBox = $('#hairstyle'),
            oPortraitbox = oBox.find('.portraitbox'),
            aTypeImg = oBox.find('.type img'),
            typeLen = aTypeImg.length,
            oThisType = oBox.find('.thistype'),
            oAgain = oBox.find('.again'),
            oSave = oBox.find('.save'),
            oGift = oBox.find('.gift'),
            oLayerShare = oBox.find('.layer_share'),
            typeIndex = 0,
            typeTimer = null,
            shareTimer = null;

        function playType() {
            clearInterval(typeTimer);
            typeTimer = setInterval(function() {
                oPortraitbox.removeClass().addClass('portraitbox type'+(typeIndex+1));
                aTypeImg.removeClass().eq(typeIndex).addClass('show');
                typeIndex = typeIndex < typeLen-1 ? typeIndex+1 : 0;
            }, 1000);
        }

        function showShare() {
            clearTimeout(shareTimer);
            shareTimer = setTimeout(function() {
                oLayerShare.fadeIn({'addClass':'active'});
            }, 3000);
        }

        oThisType.on('click', function() {
            clearInterval(typeTimer);
            $(this).removeClass('active');
            oAgain.addClass('active');
            oSave.addClass('active');
            oGift.addClass('active');
            showShare();
            oBox.one('touchstart', function() {
                clearTimeout(shareTimer);
            });
        });

        oLayerShare.on('click', function() {
            $(this).fadeOut({'removeClass':'active'});
        });

        //点击再试一次
        oAgain.on('click', function() {
            $(this).removeClass('active');
            oSave.removeClass('active');
            oGift.removeClass('active');
            oThisType.addClass('active');
            playType();
        });

        return {
            'hide': function() {
                oBox.fadeOut({'removeClass':'active'});
            },
            'show': function() {
                oBox.fadeIn({'addClass':'active', 'callBack':playType});
            }
        }

    })();


    //分享成功落地页
    var sharecbModule = (function() {

        var oBox = $('#sharecb');

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            }
        }

    })();

    //分享成功显示落地页
    window.showShareCb = function() {
        hairstyleModule.hide();
        sharecbModule.show();
    };

})( Zepto );