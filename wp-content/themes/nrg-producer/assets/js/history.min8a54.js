"use strict";
/*!
 * History API JavaScript Library v4.2.2
 *
 * Support: IE8+, FF3+, Opera 9+, Safari, Chrome and other
 *
 * Copyright 2011-2015, Dmitrii Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 2015-06-26 23:22
 */
(function(m){if("function"===typeof define&&define.amd){var w="[history"+(new Date).getTime()+"]",j=requirejs.onError;m.toString=function(){return w};requirejs.onError=function(m){-1===m.message.indexOf(w)&&j.call(requirejs,m)};define([],m)}if("object"===typeof exports&&"undefined"!==typeof module)module.exports=m();else return m()})(function(){var h=!0,i=null,o=!1;function m(a,b){var c=e.history!==n;c&&(e.history=n);a.apply(n,b);c&&(e.history=k)}function w(){}function j(a,b,c){if(a!=i&&""!==a&&!b){var b=j(),d=g.getElementsByTagName("base")[0];
!c&&d&&d.getAttribute("href")&&(d.href=d.href,b=j(d.href,i,h));c=b.d;d=b.h;a=""+a;a=/^(?:\w+\:)?\/\//.test(a)?0===a.indexOf("/")?d+a:a:d+"//"+b.g+(0===a.indexOf("/")?a:0===a.indexOf("?")?c+a:0===a.indexOf("#")?c+b.e+a:c.replace(/[^\/]+$/g,"")+a)}else if(a=b?a:f.href,!q||c)a=a.replace(/^[^#]*/,"")||"#",a=f.protocol.replace(/:.*$|$/,":")+"//"+f.host+l.basepath+a.replace(RegExp("^#[/]?(?:"+l.type+")?"),"");M.href=a;var a=/(?:(\w+\:))?(?:\/\/(?:[^@]*@)?([^\/:\?#]+)(?::([0-9]+))?)?([^\?#]*)(?:(\?[^#]+)|\?)?(?:(#.*))?/.exec(M.href),
b=a[2]+(a[3]?":"+a[3]:""),c=a[4]||"/",d=a[5]||"",e="#"===a[6]?"":a[6]||"",k=c+d+e,m=c.replace(RegExp("^"+l.basepath,"i"),l.type)+d;return{b:a[1]+"//"+b+k,h:a[1],g:b,i:a[2],k:a[3]||"",d:c,e:d,a:e,c:k,j:m,f:m+e}}function Y(){var a;try{a=e.sessionStorage,a.setItem(A+"t","1"),a.removeItem(A+"t")}catch(b){a={getItem:function(a){a=g.cookie.split(a+"=");return 1<a.length&&a.pop().split(";").shift()||"null"},setItem:function(a){var b={};if(b[f.href]=k.state)g.cookie=a+"="+B.stringify(b)}}}try{p=B.parse(a.getItem(A))||
{}}catch(c){p={}}s(t+"unload",function(){a.setItem(A,B.stringify(p))},o)}function C(a,b,c,d){var f=0;c||(c={set:w},f=1);var g=!c.set,j=!c.get,k={configurable:h,set:function(){g=1},get:function(){j=1}};try{x(a,b,k),a[b]=a[b],x(a,b,c)}catch(l){}if(!g||!j)if(a.__defineGetter__&&(a.__defineGetter__(b,k.get),a.__defineSetter__(b,k.set),a[b]=a[b],c.get&&a.__defineGetter__(b,c.get),c.set&&a.__defineSetter__(b,c.set)),!g||!j){if(f)return o;if(a===e){try{var m=a[b];a[b]=i}catch(q){}if("execScript"in e)e.execScript("Public "+
b,"VBScript"),e.execScript("var "+b+";","JavaScript");else try{x(a,b,{value:w})}catch(r){"onpopstate"===b&&(s("popstate",c=function(){H("popstate",c,o);var b=a.onpopstate;a.onpopstate=i;setTimeout(function(){a.onpopstate=b},1)},o),N=0)}a[b]=m}else try{try{var n=I.create(a);x(I.getPrototypeOf(n)===a?n:a,b,c);for(var p in a)"function"===typeof a[p]&&(n[p]=a[p].bind(a));try{d.call(n,n,a)}catch(t){}a=n}catch(u){x(a.constructor.prototype,b,c)}}catch(v){return o}}return a}function Z(a,b,c){c=c||{};a=a===
O?f:a;c.set=c.set||function(c){a[b]=c};c.get=c.get||function(){return a[b]};return c}function D(a,b){var c=(""+("string"===typeof a?a:a.type)).replace(/^on/,""),d=u[c];if(d){b="string"===typeof a?b:a;if(b.target==i)for(var f=["target","currentTarget","srcElement","type"];a=f.pop();)b=C(b,a,{get:"type"===a?function(){return c}:function(){return e}});N&&(("popstate"===c?e.onpopstate:e.onhashchange)||w).call(e,b);for(var f=0,g=d.length;f<g;f++)d[f].call(e,b);return h}return $(a,b)}function P(){var a=
g.createEvent?g.createEvent("Event"):g.createEventObject();a.initEvent?a.initEvent("popstate",o,o):a.type="popstate";a.state=k.state;D(a)}function y(a,b,c,d){q?z=f.href:(0===r&&(r=2),b=j(b,2===r&&-1!==(""+b).indexOf("#")),b.c!==j().c&&(z=d,c?f.replace("#"+b.f):f.hash=b.f));!E&&a&&(p[f.href]=a);F=o}function Q(a){var b=z;z=f.href;if(b){R!==f.href&&P();var a=a||e.event,b=j(b,h),c=j();a.oldURL||(a.oldURL=b.b,a.newURL=c.b);b.a!==c.a&&D(a)}}function S(a){setTimeout(function(){s("popstate",function(a){R=
f.href;E||(a=C(a,"state",{get:function(){return k.state}}));D(a)},o)},0);!q&&a!==h&&"location"in k&&(T(G.hash),F&&(F=o,P()))}function aa(a){var a=a||e.event,b;a:{for(b=a.target||a.srcElement;b;){if("A"===b.nodeName)break a;b=b.parentNode}b=void 0}var c="defaultPrevented"in a?a.defaultPrevented:a.returnValue===o;b&&"A"===b.nodeName&&!c&&(c=j(),b=j(b.getAttribute("href",2)),c.b.split("#").shift()===b.b.split("#").shift()&&b.a&&(c.a!==b.a&&(G.hash=b.a),T(b.a),a.preventDefault?a.preventDefault():a.returnValue=
o))}function T(a){var b=g.getElementById(a=(a||"").replace(/^#/,""));b&&b.id===a&&"A"===b.nodeName&&(a=b.getBoundingClientRect(),e.scrollTo(J.scrollLeft||0,a.top+(J.scrollTop||0)-(J.clientTop||0)))}var e=("object"===typeof window?window:this)||{};if(!e.history||"emulate"in e.history)return e.history;var g=e.document,J=g.documentElement,I=e.Object,B=e.JSON,f=e.location,n=e.history,k=n,K=n.pushState,U=n.replaceState,q=!!K,E="state"in n,x=I.defineProperty,G=C({},"t")?{}:g.createElement("a"),t="",L=e.addEventListener?
"addEventListener":(t="on")&&"attachEvent",V=e.removeEventListener?"removeEventListener":"detachEvent",W=e.dispatchEvent?"dispatchEvent":"fireEvent",s=e[L],H=e[V],$=e[W],l={basepath:"/",redirect:0,type:"/",init:0},A="__historyAPI__",M=g.createElement("a"),z=f.href,R="",N=1,F=o,r=0,p={},u={},v=g.title,ba={onhashchange:i,onpopstate:i},X={setup:function(a,b,c){l.basepath=(""+(a==i?l.basepath:a)).replace(/(?:^|\/)[^\/]*$/,"/");l.type=b==i?l.type:b;l.redirect=c==i?l.redirect:!!c},redirect:function(a,b){k.setup(b,
a);b=l.basepath;if(e.top==e.self){var c=j(i,o,h).c,d=f.pathname+f.search;q?(d=d.replace(/([^\/])$/,"$1/"),c!=b&&RegExp("^"+b+"$","i").test(d)&&f.replace(c)):d!=b&&(d=d.replace(/([^\/])\?/,"$1/?"),RegExp("^"+b,"i").test(d)&&f.replace(b+"#"+d.replace(RegExp("^"+b,"i"),l.type)+f.hash))}},pushState:function(a,b,c){var d=g.title;v!=i&&(g.title=v);K&&m(K,arguments);y(a,c);g.title=d;v=b},replaceState:function(a,b,c){var d=g.title;v!=i&&(g.title=v);delete p[f.href];U&&m(U,arguments);y(a,c,h);g.title=d;v=
b},location:{set:function(a){0===r&&(r=1);e.location=a},get:function(){0===r&&(r=1);return q?f:G}},state:{get:function(){return p[f.href]||i}}},O={assign:function(a){0===(""+a).indexOf("#")?y(i,a):f.assign(a)},reload:function(){f.reload()},replace:function(a){0===(""+a).indexOf("#")?y(i,a,h):f.replace(a)},toString:function(){return this.href},href:{get:function(){return j().b}},protocol:i,host:i,hostname:i,port:i,pathname:{get:function(){return j().d}},search:{get:function(){return j().e}},hash:{set:function(a){y(i,
(""+a).replace(/^(#|)/,"#"),o,z)},get:function(){return j().a}}};if(function(){var a=g.getElementsByTagName("script"),a=(a[a.length-1]||{}).src||"";(-1!==a.indexOf("?")?a.split("?").pop():"").replace(/(\w+)(?:=([^&]*))?/g,function(a,b,c){l[b]=(c||"").replace(/^(0|false)$/,"")});s(t+"hashchange",Q,o);var b=[O,G,ba,e,X,k];E&&delete X.state;for(var c=0;c<b.length;c+=2)for(var d in b[c])if(b[c].hasOwnProperty(d))if("function"===typeof b[c][d])b[c+1][d]=b[c][d];else{a=Z(b[c],d,b[c][d]);if(!C(b[c+1],d,
a,function(a,d){if(d===k)e.history=k=b[c+1]=a}))return H(t+"hashchange",Q,o),o;b[c+1]===e&&(u[d]=u[d.substr(2)]=[])}k.setup();l.redirect&&k.redirect();l.init&&(r=1);!E&&B&&Y();if(!q)g[L](t+"click",aa,o);"complete"===g.readyState?S(h):(!q&&j().c!==l.basepath&&(F=h),s(t+"load",S,o));return h}())return k.emulate=!q,e[L]=function(a,b,c){a in u?u[a].push(b):3<arguments.length?s(a,b,c,arguments[3]):s(a,b,c)},e[V]=function(a,b,c){var d=u[a];if(d)for(a=d.length;a--;){if(d[a]===b){d.splice(a,1);break}}else H(a,b,c)},e[W]=D,k});