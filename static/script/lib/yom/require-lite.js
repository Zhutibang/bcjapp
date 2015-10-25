var require=require||{baseUrl:G.CDN_BASE+"/script",paths:{async:"lib/async/main",zepto:"lib/jquery-2.1.3/main",jquery:"lib/jquery-2.1.3/main",riot:"lib/riot/main",react:"lib/react/react-0.13.3",app:"lib/app/main",skateboard:"lib/skateboard/main",parallax:"lib/parallax/main",iscroll:"lib/iscroll/main",turn:"lib/turn/main","mega-pix-image":"lib/mega-pix-image/main",exif:"lib/exif/main",hammer:"lib/hammer/main",fabric:"lib/fabric/main",jstree:"lib/jquery-jstree/main",howler:"lib/howler/main",slick:"lib/slick/main",lazyload:"lib/jquery-lazyload/main"},shim:{async:{exports:"async"},zepto:{exports:"jQuery"},jquery:{exports:"jQuery"},parallax:{exports:"jQuery.fn.parallax",deps:["jquery"]},iscroll:{exports:"iScroll"},turn:{exports:"jQuery.fn.turn",deps:["jquery"]},"mega-pixel-image":{exports:"MegaPixImage"},fabric:{exports:"fabric"},slick:{exports:"jQuery.fn.slick",deps:["jquery"]},lazyload:{exports:"jQuery.fn.lazyload",deps:["jquery"]}},resolveUrl:function(e){var r;if(r=0===e.indexOf(G.CDN_BASE+"/app/")?G.CDN_BASE+"/app/":G.CDN_BASE+"/script/",0===e.indexOf(r)){var n=e.replace(r,""),t=G.MD5_MAP[n];return t?e.indexOf("?")>0?e+"&v="+t:e+"?v="+t:e}return e},onLoadStart:function(){require(["app"],function(e){e.ajax.showLoading()})},onLoadEnd:function(){require(["app"],function(e){e.ajax.hideLoading()})},errCallback:function(){}},define,require;!function(e){function r(e){return Array.prototype.slice.call(e)}function n(e){return"[object Function]"==T.call(e)}function t(e,r){return N.hasOwnProperty.call(e,r)}function i(e){return e.replace(/\/+$/,"")}function o(e,r){for(var n=0,t=e.length;t>n;n++)r(e[n],n,e)}function a(e,r,n){e=e||{};for(var i in r)!t(r,i)||n&&"undefined"!=typeof e[i]||(e[i]=r[i]);return e}function s(e,r,n){var i=e;if(r=r||0,n=n||0,n>r)return i;if("object"==typeof e&&e)if(F(e))i=[],o(e,function(e){i.push(e)});else{i={};for(var a in e)t(e,a)&&(i[a]=r?s(e[a],r,++n):e[a])}return i}function l(e,r,n,t,i,o){this._nrmId=e,this._baseUrl=r,this._exports=n,this._module=t,this._getter=i,this._loader=o,H[t.uri]=this}function u(e,r,n){var t=n.baseUrl;this._id=e,this._nrmId=r,this._baseUrl=t,this._config=n,this._defineCalled=!1,this._queue=[],this._fallbacks=n.fallbacks[e],this._shim=n.shim[e],this._uri=E(r,t),F(this._fallbacks)||(this._fallbacks=[this._fallbacks]),Y[this._uri]=this}function f(e,r){var n=E(e,r);return Y[n]}function c(e,r,n){var t,i,o,a,s=E(r,n.baseUrl);return t=H[s],t||(i=n.shim[e],i&&i.exports&&(o=d(i.exports),o&&(a={id:r,uri:E(r,n.baseUrl)},t=new l(r,n.baseUrl,o,a)))),t}function d(r){var n=e;for(r=r.split(".");n&&r.length;)n=n[r.shift()];return n}function p(e){var r=J[e]=J[e]||{};return r}function h(e,r){var n=p(e);n[r]=1}function b(e,r,n){var i,o=p(e);if(n=n||{},n[e])return!1;if(r==e||o[r])return!0;n[e]=1;for(i in o)if(t(o,i)&&b(i,r,n))return!0;return!1}function m(e){return/^https?:|^\/|\.js$/.test(e)}function g(e){return 0===(e+"").indexOf(".")}function v(e,r,n){var t,o,a,s;if(!e)return e;if(m(e))return e;if(r&&g(e))return m(r.nrmId)&&(e+=".js"),y(r.nrmId,e);if(t=e,g(t))return t;if(n)for(o=t.split("/"),a=[];o.length;){if(s=n[o.join("/")])return a.unshift(i(s)),a.join("/");a.unshift(o.pop())}return t}function _(e,r,n){return r?!n||r==n||1===e.length&&"baseUrl"==e[0]&&r.baseUrl==n.baseUrl?r:(n.baseUrl=x(n.baseUrl),r=n.baseUrl&&r.baseUrl!=n.baseUrl?s(z,1):s(r,1),o(e,function(e){r[e]="object"==typeof r[e]&&"object"==typeof n[e]?a(r[e],n[e]):"undefined"==typeof n[e]?r[e]:n[e]}),r):n}function U(){return location.origin||location.protocol+"//"+location.host}function y(e,r){if(!g(r))return r;var n,t=e.split("/"),i=r.split("/");for(t.pop();i.length;)if(n=i.shift(),".."==n)if(t.length){for(n=t.pop();"."==n;)n=t.pop();".."==n&&t.push("..","..")}else t.push(n);else"."!=n&&t.push(n);return r=t.join("/")}function x(e){return e&&(e=e.indexOf("://")<0&&0!==e.indexOf("//")?0===e.indexOf("/")?U()+i(e):U()+y(location.pathname,i(e)):i(e)),e}function E(e,r){var n="";return r=r||G.baseUrl,Q[e]||m(e)?n=e:e&&g(e)?n=y(r+"/",e)+".js":e&&(n=r+"/"+e+".js"),G.resolveUrl&&(n=G.resolveUrl(n)),n}function q(e,r){return"string"==typeof r?r:r&&(r[e]||r["*"])||""}function j(e,r,n){P--,e.removeEventListener("load",r,!1),e.removeEventListener("error",n,!1),e.parentNode.removeChild(e),0===P&&G.onLoadStart&&G.onLoadEnd()}function C(e,r,n){if(r=r||{},n)n(e,r);else{if(!G.errCallback)throw r.uri?new Error("Failed to load "+r.uri):new Error("Load Error");G.errCallback(e,r)}}function D(e,r,n,t){function i(){var s;j(l,i,o),k(r,a,n),t.isDefineCalled()||t.shimDefine()||(s=t.getFallback(),s?D(e,s,n,t):(t.remove(),t.dispatch(B.NO_DEFINE)))}function o(){var r=t.getFallback();j(l,i,o),r?D(e,r,n,t):(t.remove(),t.dispatch(B.NO_DEFINE))}var a,s,l,u;a=n.baseUrl,s=q(e,n.charset),l=document.createElement("script"),l.addEventListener("load",i,!1),l.addEventListener("error",o,!1),s&&(l.charset=s),l.type="text/javascript",l.async="async",u=E(r,a),l.src=u,l.setAttribute("data-nrm-id",r),l.setAttribute("data-base-url",a),A.insertBefore(l,A.firstChild),P++,1===P&&G.onLoadStart&&G.onLoadStart()}function I(e,r,n,t){var i,o,a=n.baseUrl;return i=c(e,r,n),o=f(r,a),i?void t(0):o?void o.push(t):(o=new u(e,r,n),o.push(t),void(o.getShim()?o.loadShimDeps(function(t){t?(o.remove(),o.dispatch(t)):D(e,r,n,o)}):D(e,r,n,o)))}function k(e,r,n){var t,i,o;for(i=$,o=W,t=i.shift();t;)w(t.id,t.deps,t.factory,{nrmId:e||t.id,baseUrl:r||t.config&&t.config.baseUrl||n&&n.baseUrl||G.baseUrl,config:n},t.config,o),t=i.shift();for(t=o.shift();t;)O(t.base,t.deps,t.factory,t.hold,t.config),t=o.shift()}function w(e,r,n,t,i,o){var a,s,l,c=t.baseUrl,d=t.config||i;i=_(["charset","baseUrl","paths","fallbacks","shim","enforceDefine"],d,i),s=f(t.nrmId,c),a=e==t.nrmId?t.nrmId:v(e,t,i.paths),a&&a!=t.nrmId||!s?(l=new u(e,a,d),l.defineCall()):(a=t.nrmId,l=s,l.defineCall()),o.push({base:{id:e,nrmId:a,baseUrl:c,config:d},deps:r,factory:n,hold:l,config:i})}function O(t,i,o,a,s){R({config:s,base:t})(i,function(){var u,f,c=t.nrmId,d=t.baseUrl||s.baseUrl,p=r(arguments);if(f={id:c,uri:E(c,d)},"module"==i[2]&&(p[2]=f),n(o)){"exports"==i[1]&&(u=f.exports=p[1]={});try{u=o.apply(null,p)||f.exports}catch(h){throw a.remove(),a.dispatch(B.DEFINE_FACTORY_ERROR),e&&e.console&&e.console.error&&e.console.error(h.stack),h}}else u=o;f.exports=u,new l(c,d,u,f),a.remove(),a.dispatch(0)},function(e,r){a.remove(),a.dispatch(e,r)})}function L(e){function r(e,i,o){var a,s,l;return"string"!=typeof e&&(o=i,i=e,e=""),"undefined"!=typeof o&&F(i)||(o=i,i=[]),!i.length&&n(o)&&o.length&&(a=o.toString(),s=a.match(/^function[^\(]*\(([^\)]+)\)/)||["","require"],s=s[1].split(",")[0].replace(/\s/g,""),a.replace(new RegExp("(?:^|[^\\.\\/\\w])"+s+"\\s*\\(\\s*([\"'])([^\"']+?)\\1\\s*\\)","g"),function(e,r,n){i.push(n)}),i=(1===o.length?["require"]:["require","exports","module"]).concat(i)),l=$,l.push({id:e,deps:i,factory:o,config:t}),r}var t;return e=e||{},e.parentConfig=e.parentConfig||G,t=_(["charset","baseUrl","paths","fallbacks","shim","enforceDefine"],e.parentConfig,e.config),r.config=function(e){return t=_(["charset","baseUrl","paths","fallbacks","shim","enforceDefine","resolveUrl","errCallback","onLoadStart","onLoadEnd","waitSeconds"],t,e),r},r.extend=function(e){return L({config:e,parentConfig:t})},r}function S(e,r,n){var t,i,o,a,s,l,u;return e?(a=H[e])?(u=a.getLoader(),u?{inst:a,load:{loader:u,id:e,nrmId:e,config:r}}:{inst:a}):(i=r,t=n.base,o=v(e,t,i.paths),g(e)&&(i=t&&t.config||i),a=c(e,o,i),s=E(o,i.baseUrl),t&&(l=E(t.nrmId,t.baseUrl),h(s,l),!a&&!c(t.id,t.nrmId,t.config||i)&&b(l,s))?{}:a?{inst:a}:{load:{id:e,nrmId:o,config:i}}):{}}function R(e){function r(t,i,a){function s(r,n){h||(r?(h=!0,clearTimeout(p),e.base?C(r,n,a):C(r,n,a)):(u--,0>=u&&(h=!0,clearTimeout(p),i&&(o(d,function(r,n){var t;"undefined"==typeof r&&(r=b.shift(),t=c(r.id,r.nrmId,r.config),d[n]=t.getDef(e))}),i.apply(null,d)))))}var l,u,d,p,h=!1,b=[];if("string"==typeof t){if(1===arguments.length)return l=S(t,n,e),l.inst&&l.inst.getDef(e);throw new Error("Wrong arguments for require.")}return d=new Array(t.length),o(t,function(r,t){var i=S(r,n,e);i.load?b.push(i.load):i.inst?d[t]=i.inst.getDef(e):d[t]=null}),u=b.length,u?(e.base||(p=setTimeout(function(){h||(h=!0,C(B.TIMEOUT,a))},1e3*n.waitSeconds)),o(b,function(r,n){var t;r.loader?r.loader(e,s):(t=f(r.nrmId,r.config.baseUrl),t?t.push(s):I(r.id,r.nrmId,r.config,s))})):i&&i.apply(null,d),r}var n;return e=e||{},e.parentConfig=e.parentConfig||G,n=_(["charset","baseUrl","paths","fallbacks","shim","enforceDefine"],e.parentConfig,e.config),r.config=function(e){return n=_(["charset","baseUrl","paths","fallbacks","shim","enforceDefine","resolveUrl","errCallback","onLoadStart","onLoadEnd","waitSeconds"],n,e),r._ROOT_&&(G=n,define.config(e)),r},r.extend=function(e){return R({config:e,parentConfig:n})},r.getConfig=function(e){return e?n[e]:n},r.toUrl=function(r,t){return r=e.base?y(E(e.base.nrmId,e.base.baseUrl),r):y(n.baseUrl+"/",r),t&&(r=r.replace(/^https?:\/\/[^\/]*?\//,"/")),r},r.ERR_CODE=B,r}if(!require||!require._YOM_){var A=document.head||document.getElementsByTagName("head")[0]||document.documentElement,N=Object.prototype,T=N.toString,F=Array.isArray||function(e){return"[object Array]"==T.call(e)},M=location.protocol+"//"+location.host+location.pathname.split("/").slice(0,-1).join("/"),Q={require:1,exports:1,module:1,global:1,domReady:1},B={DEFAULT:1,TIMEOUT:2,LOAD_ERROR:3,NO_DEFINE:4,DEFINE_FACTORY_ERROR:5},z={charset:"utf-8",baseUrl:"",paths:{},fallbacks:{},shim:{},enforceDefine:!1,resolveUrl:null,errCallback:null,onLoadStart:null,onLoadEnd:null,waitSeconds:30},G=_(["charset","baseUrl","paths","fallbacks","shim","enforceDefine","resolveUrl","errCallback","onLoadStart","onLoadEnd","waitSeconds"],s(z,1),"object"==typeof require?require:void 0);G.baseUrl=x(G.baseUrl);var P=0,Y={},$=[],W=[],H={},J={};l.prototype={getDef:function(e){return this._getter?this._getter(e):this._exports},getLoader:function(){return this._loader},constructor:l},new l("require",G.baseUrl,{},{id:"require",uri:"require"},function(e){return R({config:e.config,base:e.base})}),new l("exports",G.baseUrl,{},{id:"exports",uri:"exports"},function(e){return{}}),new l("module",G.baseUrl,{},{id:"module",uri:"module"},function(e){return{}}),new l("global",G.baseUrl,e,{id:"global",uri:"global"}),new l("domReady",G.baseUrl,{},{id:"domReady",uri:"domReady"},function(e){return{}},function(){function e(){if(!a)for(a=!0;i.length;)t.apply(null,r(i.shift()))}function n(){o||a||(o=!0,"complete"==document.readyState?e():(document.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("load",e,!1)))}function t(e,r){a?r(0):(i.push(arguments),n())}var i=[],o=!1,a=!1;return t}()),u.prototype={push:function(e){this._queue.push(e)},defineCall:function(){this._defineCalled=!0},isDefineCalled:function(){return this._defineCalled},remove:function(){delete Y[this._uri]},dispatch:function(e,r){for(var n;this._queue.length;)n=this._queue.shift(),n&&n(e,r||{uri:this._uri})},getConfig:function(){return this._config},getShim:function(){return this._shim},getFallback:function(){return this._fallbacks.shift()},loadShimDeps:function(e){var r=this._id,n=this._nrmId,t=this._config,i=this._shim;i.deps?R({config:t,base:{id:r,nrmId:n,baseUrl:this._baseUrl}})(i.deps,function(){e()},function(r){e(r)}):e()},shimDefine:function(){var n,t=this,i=this._id,o=this._nrmId,a=this._baseUrl,s=this._config,u=this._shim;return s.enforceDefine&&!u?!1:u&&u.exports&&(n=d(u.exports),!n)?!1:(R({config:s,base:{id:i,nrmId:o,baseUrl:a}})(u&&u.deps||[],function(){var i=r(arguments);u&&u.init&&(n=u.init.apply(e,i)||n),new l(o,a,n,{id:o,uri:E(o,a)}),t.remove(),t.dispatch(0)},function(e,r){t.remove(),t.dispatch(e,r)}),!0)},constructor:u},define=L(),define._ROOT_=!0,define.amd={},require=R(),require._YOM_=!0,require._ROOT_=!0,require.PAGE_BASE_URL=M,require.processDefQueue=k,require.getBaseUrlConfig=function(e){return _(["baseUrl"],G,{baseUrl:e||M})},require._debug={defQueue:$,postDefQueue:W,hold:Y,defined:H,depReverseMap:J},G.baseUrl||(G.baseUrl=M)}}(this);