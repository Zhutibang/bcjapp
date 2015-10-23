/* trace:src/script/lib/app/main.js */
define(['require', 'exports', 'module', './config', './css', './cookie', './local-storage', './util', './ajax', './alerts', './scroll', './toggle', './stat', './wx'], function(require) {
	return {
		config: require('./config'),
		css: require('./css'),
		cookie: require('./cookie'),
		localStorage: require('./local-storage'),
		util: require('./util'),
		ajax: require('./ajax'),
		alerts: require('./alerts'),
		scroll: require('./scroll'),
		toggle: require('./toggle'),
		stat: require('./stat'),
		wx: require('./wx')
	};
});


/* trace:src/script/lib/app/config.js */
define('./config', ['require', 'exports', 'module'], function(require) {
	return {
		DEFAULT_MOD: 'home',
		MOD_PREFIX: 'view',
		RES_CODE: {
			RESOURCE_NOT_EXIST: 2,
			NEED_LOGIN: 10
		}
	};
});

/* trace:src/script/lib/app/css.js */
define('./css', ['require', 'exports', 'module', 'jquery'], function(require) {
	var $ = require('jquery');
	
	var _linkCount = 0;
	var _hrefIdMap = {};
	
	function load(href, force) {
		var id, el;
		if($.isArray(href)) {
			id = [];
			$.each(href, function(i, item) {
				id.push(load(item, force));
			});
			return id;
		} else if(!(/^https?:|^\//).test(href)) {
			href = G.CDN_ORIGIN + href;
		}
		id = _hrefIdMap[href];
		el = $('#' + id)[0];
		if(id && el) {
			if(force) {
				unload(href);
			} else {
				return id;
			}
		}
		id = 'app-css-link-' + _linkCount++;
		el = $('<link id="' + id + '" rel="stylesheet" type="text/css" media="screen" href="' + href + '" />');
		$($(document.head || 'head').children()[0]).before(el);
		return _hrefIdMap[href] = id;
	};
	
	function unload(href) {
		var el;
		if($.isArray(href)) {
			el = [];
			$.each(href, function(i, item) {
				el.push(unload(item));
			});
			return el;
		} else if(!(/^https?:|^\//).test(href)) {
			href = G.CDN_ORIGIN + href;
		}
		el = $('#' + _hrefIdMap[href])[0];
		if(el) {
			delete _hrefIdMap[href];
			return el.parentNode.removeChild(el);
		}
		return null;
	};

	return {
		load: load,
		unload: unload
	};
});


/* trace:src/script/lib/app/cookie.js */
define('./cookie', ['require', 'exports', 'module'], function(require) {
	var _DOMAIN = G.DOMAIN;
	
	return {
		set: function(name, value, domain, path, hour) {
			var expire;
			if(hour) {
				expire = new Date();
				expire.setTime(expire.getTime() + 3600000 * hour);
			}
			document.cookie = (name + '=' + value + '; ') + (expire ? ('expires=' + expire.toGMTString() + '; ') : '') + ('path=' + (path || '/') + '; ') + ('domain=' + (domain || _DOMAIN) + ';');
		},
		
		get: function(name) {
			var r = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'), m = document.cookie.match(r);
			return m && m[1] || '';
		},
		
		del: function(name, domain, path) {
			document.cookie = name + '=; expires=Mon, 26 Jul 1997 05:00:00 GMT; ' + ('path=' + (path || '/') + '; ') + ('domain=' + (domain || _DOMAIN) + ';');
		}
	}
});

/* trace:src/script/lib/app/local-storage.js */
define('./local-storage', ['require', 'exports', 'module'], function(require) {
	var _db = {
		name: 'default',
		db: {},

		set: function(key, val) {
			this.db[key] = val;
		},

		get: function(key) {
			return this.db[key];
		},

		remove: function(key) {
			delete this.db[key];
		},

		clear: function() {
			this.db = {};
		}
	};
	
	var _dbs = [
		{
			name: 'localStorage',
			isSupported: !!window.localStorage,
			
			set: function(key, val) {
				localStorage.setItem(key, val);
			},
			
			get: function(key) {
				return localStorage.getItem(key);
			},

			remove: function(key) {
				localStorage.removeItem(key);
			},

			clear: function() {
				localStorage.clear();
			},

			init: function() {}
		}
	];

	for(i = 0; i < _dbs.length; i++) {
		if(_dbs[i].isSupported) {
			_db = _dbs[i];
			_db.init();
			break;
		}
	}

	var _facade = {
		set: function(opts) {
			var res = _db.set(opts.key, opts.val, opts.life);
			if(opts.cb) {
				return opts.cb(res);
			} else {
				return res;
			}
		},

		get: function(opts) {
			var res;
			var keys = opts.key.split(' ');
			if(keys.length > 1) {
				res = {};
				$.each(keys, function(i, key) {
					res[key] = _db.get(key);
				});
			} else {
				res = _db.get(keys[0]);
			}
			if(opts.cb) {
				return opts.cb(res);
			} else {
				return res;
			}
		},

		remove: function(opts) {
			var keys = opts.key.split(' ');
			if(keys.length > 1) {
				$.each(keys, function(i, key) {
					_db.remove(key);
				});
			} else {
				_db.remove(keys[0]);
			}
			if(opts.cb) {
				opts.cb();
			}
		},

		clear: function(opts) {
			_db.clear();
			if(opts.cb) {
				opts.cb();
			}
		}
	};

	function _do(action, opts) {
		opts = opts || {};
		return _facade[action](opts);
	};

	function _getWithExpires(val, key, proxy) {
		var rmKeys = [];
		if(val && typeof val == 'object') {
			$.each(val, function(k, v) {
				val[k] = getOne(v, k);
			});
		} else {
			val = getOne(val, key);
		}
		if(rmKeys.length) {
			remove(rmKeys.join(' '), {proxy: proxy});
		}
		function getOne(val, key) {
			var m;
			if(val) {
				m = val.match(/(.*)\[expires=(\d+)\]$/);
				if(m) {
					if(m[2] < new Date().getTime()) {
						val = undefined;
						rmKeys.push(key);
					} else {
						val = m[1];
					}
				}
			} else {
				val = undefined;
			}
			return val;
		}
		return val;
	};

	function set(key, val, opts) {
		opts = opts || {};
		if(opts.life && _db.name != 'cookie') {//hour
			val = val + ('[expires=' + (new Date().getTime() + opts.life * 3600000) + ']');
		}
		return _do('set', {key: key, val: val, cb: opts.callback, life: opts.life});
	};

	function get(key, opts) {
		var cb, res;
		opts = opts || {};
		if(opts.callback) {
			cb = function(res) {
				opts.callback(_getWithExpires(res, key, opts.proxy));
			}
			return _do('get', {key: key, cb: cb});
		} else {
			res = _do('get', {key: key});
			return _getWithExpires(res, key, opts.proxy);
		}
	};

	function remove(key, opts) {
		opts = opts || {};
		return _do('remove', {key: key});
	};

	function clear(opts) {
		opts = opts || {};
		return _do('clear', {});
	};

	return {
		_db: _db,
		_do: _do,
		set: set,
		get: get,
		remove: remove,
		clear: clear
	};
});


/* trace:src/script/lib/app/util.js */
define('./util', ['require', 'exports', 'module', 'jquery'], function(require) {
	var $ = require('jquery');
	
	var _uniqueIdCount = 0;
	
	var util = {};

	util.url2obj = function(str) {
		if(typeof str != 'string') {
			return str;
		}
		var m = str.match(/([^:]*:)?(?:\/\/)?([^\/:]+)?(:)?(\d+)?([^?#]+)(\?[^?#]*)?(#[^#]*)?/);
		m = m || [];
		uri = {
			href: str,
			protocol: m[1] || 'http:',
			host: (m[2] || '') + (m[3] || '') + (m[4] || ''),
			hostname: m[2] || '',
			port: m[4] || '',
			pathname: m[5] || '',
			search: m[6] || '',
			hash: m[7] || ''
		};
		uri.origin = uri.protocol + '//' + uri.host;
		return uri;
	};

	util.cloneObject = function(obj, deep, _level) {
		var res = obj;
		deep = deep || 0;
		_level = _level || 0;
		if(_level > deep) {
			return res;
		}
		if(typeof obj == 'object' && obj) {
			if($.isArray(obj)) {
				res = [];
				$.each(obj, function(i, item) {
					res.push(item);
				})
			} else {
				res = {};
				for(var p in obj) {
					if(Object.prototype.hasOwnProperty.call(obj, p)) {
						res[p] = deep ? util.cloneObject(obj[p], deep, ++_level) : obj[p];
					}
				}
			}
		}
		return res;
	};
	
	util.getUniqueId = function() {
		return 'APP_UNIQUE_ID_' + _uniqueIdCount++;
	};
	
	util.getOrigin = function(loc) {
		loc = loc || window.location;
		return loc.origin || [
			loc.protocol, '//', loc.host
		].join('');
	};

	util.getByteLength = function(str) {
		return str.replace(/[^\x00-\xff]/g, 'xx').length;
	};
	
	util.headByByte = function(str, len, postFix) {
		str = new String(str).toString();
		if(util.getByteLength(str) <= len) {
			return str;
		}
		postFix = postFix || '';
		var l;
		if(postFix) {
			l = len = len - util.getByteLength(postFix);
		} else {
			l = len;
		}
		do {
			str = str.slice(0, l--);
		} while(util.getByteLength(str) > len);
		return str + postFix;
	};
	
	util.encodeHtml = function(str) {
		return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x60/g, '&#96;').replace(/\x27/g, '&#39;').replace(/\x22/g, '&quot;');
	};
	
	util.decodeHtml = function(str) {
		return (str + '').replace(/&quot;/g, '\x22').replace(/&#0*39;/g, '\x27').replace(/&#0*96;/g, '\x60').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
	};
	
	util.getUrlParam = function(name, loc) {
		loc = loc || window.location;
		var r = new RegExp('(\\?|#|&)' + name + '=(.*?)(&|#|$)');
		var m = (loc.href || '').match(r);
		return (m ? decodeURIComponent(m[2]) : '');
	};
	
	util.getUrlParams = function(loc) {
		loc = loc || window.location;
		var raw = loc.search, res = {}, p, i;
		if(raw) {
			raw = raw.slice(1);
			raw = raw.split('&');
			for(i = 0, l = raw.length; i < l; i++) {
				p = raw[i].split('=');
				res[p[0]] = decodeURIComponent(p[1] || '');
			}
		}
		raw = loc.hash;
		if(raw) {
			raw = raw.slice(1);
			raw = raw.split('&');
			for(i = 0, l = raw.length; i < l; i++) {
				p = raw[i].split('=');
				res[p[0]] = res[p[0]] || decodeURIComponent(p[1] || '');
			}
		}
		return res;
	};
	
	util.appendQueryString = function(url, param, isHashMode) {
		if(typeof param == 'object') {
			param = $.param(param, true);
		} else if(typeof param == 'string') {
			param = param.replace(/^&/, '');
		} else {
			param = '';
		}
		if(!param) {
			return url;
		}
		if(isHashMode) {
			if(url.indexOf('#') == -1) {
				url += '#' + param;
			} else {
				url += '&' + param;
			}
		} else {
			if(url.indexOf('#') == -1) {
				if(url.indexOf('?') == -1) {
					url += '?' + param;
				} else {
					url += '&' + param;
				}
			} else {
				var tmp = url.split('#');
				if(tmp[0].indexOf('?') == -1) {
					url = tmp[0] + '?' + param + '#' + (tmp[1] || '');
				} else {
					url = tmp[0] + '&' + param + '#' + (tmp[1] || '');
				}
			}
		}
		return url;
	};
	
	util.formatMsg = function(msg, data) {
		msg = msg + '';
		if(data) {
			$.each(data, function(key, val) {
				val = util.encodeHtml(val);
				msg = msg.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), val);
			});
		}
		return msg;
	};

	util.formatDecimal = function(decimal, format, opt) {
		function formatInteger(integer) {
			var res = [], count = 0;
			integer = integer.split('');
			while(integer.length) {
				if(count && !(count % 3)) {
					res.unshift(',');
				}
				res.unshift(integer.pop());
				count++;
			}
			return res.join('');
		};
		opt = opt || {};
		var res = '';
		var decimalMatchRes, formatMatchRes, fLen, dLen, tmp;
		decimal += '';
		decimalMatchRes = decimal.match(/^(\-?)(\w*)(.?)(\w*)/);
		formatMatchRes = format.match(/^(\-?)(\w*)(.?)(\w*)/);
		if(formatMatchRes[2]) {
			res += decimalMatchRes[2];
		}
		if(formatMatchRes[3] && formatMatchRes[4]) {
			res += formatMatchRes[3];
		} else {
			if(opt.round) {
				res = Math.round(decimal) + '';
			} else if(opt.ceil) {
				res = Math.ceil(decimal) + '';
			}
			res = formatInteger(res);
			return res;
		}
		fLen = Math.min(formatMatchRes[4].length, 4);
		dLen = decimalMatchRes[4].length;
		res += decimalMatchRes[4].slice(0, fLen);
		if(fLen > dLen) {
			res += new Array(fLen - dLen + 1).join('0');
		}
		if(dLen > fLen && (opt.round && decimalMatchRes[4].charAt(fLen) >= 5 || opt.ceil && decimalMatchRes[4].charAt(fLen) > 0)) {
			return util.formatDecimal((res * Math.pow(10, fLen) + 1) / Math.pow(10, fLen), format);
		}
		res = res.split('.');
		res[0] = formatInteger(res[0]);
		res = res.join('.');
		if(decimalMatchRes[1] && res != '0') {
			res = decimalMatchRes[1] + res;
		}
		return res;
	};

	util.formatDateTime = function(date, format) {
		if(!date) {
			return '';
		}
		var res = format, tt = '';
		date = new Date(date);
		res = res.replace(/yyyy|yy/, function($0) {
			if($0.length === 4) {
				return date.getFullYear();
			} else {
				return (date.getFullYear() + '').slice(2, 4);
			}
		}).replace(/MM|M/, function($0) {
			if($0.length === 2 && date.getMonth() < 9) {
				return '0' + (date.getMonth() + 1);
			} else {
				return date.getMonth() + 1;
			}
		}).replace(/dd|d/, function($0) {
			if($0.length === 2 && date.getDate() < 10) {
				return '0' + date.getDate();
			} else {
				return date.getDate();
			}
		}).replace(/HH|H/, function($0) {
			if($0.length === 2 && date.getHours() < 10) {
				return '0' + date.getHours();
			} else {
				return date.getHours();
			}
		}).replace(/hh|h/, function($0) {
			var hours = date.getHours();
			if(hours > 11) {
				tt = 'PM';
			} else {
				tt ='AM';
			}
			hours = hours > 12 ? hours - 12 : hours;
			if($0.length === 2 && hours < 10) {
				return '0' + hours;
			} else {
				return hours;
			}
		}).replace(/mm/, function($0) {
			if(date.getMinutes() < 10) {
				return '0' + date.getMinutes();
			} else {
				return date.getMinutes();
			}
		}).replace(/ss/, function($0) {
			if(date.getSeconds() < 10) {
				return '0' + date.getSeconds();
			} else {
				return date.getSeconds();
			}
		}).replace('tt', tt);
		return res;
	};

	util.formatLeftTime = function(ms, hh, mm, ss) {
		var s = m = h = 0;
		s = parseInt(ms / 1000);
		s = s || 1;
		if(s >= 60) {
			m = parseInt(s / 60);
			s = s % 60;
		}
		if(m >= 60) {
			h = parseInt(m / 60);
			m = m % 60;
		}
		return [h ? h + (hh || 'h') : '', m ? m + (mm || 'm') : '', s ? s + (ss || 's') : ''].join('');
	};

	util.formatFileSize = function(bytes) {
		var k, m, g;
		if(bytes < 100) {
			return util.formatDecimal(bytes, '0.00' , {ceil: 1}) + 'B';
		}
		k = bytes / 1024;
		if(k < 1000) {
			return util.formatDecimal(k, '0.00', {ceil: 1}) + 'KB';
		}
		m = k / 1024;
		if(m < 1000) {
			return util.formatDecimal(m, '0.00', {ceil: 1}) + 'MB';
		}
		g = m / 1024;
		return util.formatDecimal(g, '0.00', {ceil: 1}) + 'GB';
	};
	
	return util;
});

/* trace:src/script/lib/app/ajax.js */
define('./ajax', ['require', 'exports', 'module', 'jquery', './config', './alerts', './util', './cookie'], function(require) {
	var $ = require('jquery');
	var config = require('./config');
	var alerts = require('./alerts');
	var util = require('./util');
	var cookie = require('./cookie');

	var _postQueue = {};
	var _getQueue = {};
	var _proxyQueue = [];

	var ajax = {};

	/**
	 * returns the full url according to backend service name and data type
	 * @private
	 * @param {String} url
	 * @param {String} dataType
	 * @returns {String} the full url
	 */
	ajax.getDataTypeUrl = function(url, dataType) {
		var fullUrl, params;
		if(!(/^(https?:|\/\/)/).test(url)) {
			url = url.replace(/^\/+/, '');
			fullUrl = G.CGI_ORIGIN +  '/' + url;
			params = util.getUrlParams(util.url2obj(fullUrl));
			if(G.IS_PROTOTYPE) {
				if(params.m && params.c && params.a) {
					fullUrl = G.CGI_ORIGIN + '/static/mockup-data/' + [params.m, params.c, params.a].join('/');
				} else {
					fullUrl = G.CGI_ORIGIN + '/static/mockup-data/' + url;
				}
			}
			fullUrl = fullUrl.replace(/[^\/]+$/, function(m) {
				return m.replace(/^[\w\-\.]+/, function(m) {
					return m.split('.')[0] + '.' + dataType;
				});
			});
		} else {
			fullUrl = url;
		}
		if(G.csrfToken && fullUrl.indexOf('csrf_token=') === -1) {
			fullUrl = util.appendQueryString(fullUrl, {csrf_token: G.csrfToken});
		}
		return fullUrl;
	};

	/**
	 * show the loading icon
	 */
	ajax.showLoading = function() {
		$('#circleG').show();
	};

	/**
	 * hide the loading icon
	 */
	ajax.hideLoading = function() {
		$('#circleG').hide();
	};

	/**
	 * take action to some common code
	 * @param {Number} code
	 * @returns {Boolean} whether common code has been dealt
	 */
	ajax.dealCommonCode = function(code) {
		var res = true;
		if(code === config.RES_CODE.NEED_LOGIN && !(/\/login\/login\-/).test(location.pathname)) {
			//TODO
		} else {
			res = false;
		}
		return res;
	};

	/**
	 * ajax get wrapper for jquery ajax
	 * @param {Object} opt
	 */
	ajax.get = function(opt) {
		var xhrObj, success;
		opt = opt || {};
		opt.type = opt._method = 'GET';
		opt.headers = opt.headers || {};
		opt.headers['X-Requested-With'] = 'XMLHttpRequest';
		success = opt.success;
		opt.success = function(res, textStatus, xhrObj) {
			if((opt.noDealCommonCode || !ajax.dealCommonCode(res.code)) && success) {
				success(res, textStatus, xhrObj);
			}
		}
		opt.url = ajax.getDataTypeUrl(opt.url, 'json');
		opt.dataType = 'json';
		if(opt.queueName) {
			if(_getQueue[opt.queueName]) {
				return;
			}
			_getQueue[opt.queueName] = true;
		}
		// opt.xhrFields = {
		// 	withCredentials: true
		// };
		xhrObj = $.ajax(opt);
		opt.loading === false || ajax.showLoading();
		xhrObj.always(function() {
			if(opt.queueName) {
				_getQueue[opt.queueName] = false;
			};
			opt.loading === false || ajax.hideLoading();
		});
		return xhrObj;
	};

	/**
	 * ajax post wrapper for jquery ajax
	 * @param {Object} opt
	 */
	ajax.post = function(opt) {
		var xhrObj, success, data;
		opt = opt || {};
		opt.type = opt._method = opt._method || 'POST';
		opt.dataType = 'json';
		opt.url = ajax.getDataTypeUrl(opt.url, opt.dataType);
		data = opt.data;
		opt.charset = opt.charset || 'UTF-8';
		opt.headers = opt.headers || {};
		opt.headers['X-Requested-With'] = 'XMLHttpRequest';
		if(!opt.notJsonParamData) {
			opt.contentType = 'application/json; charset=' + opt.charset;
			opt.data = typeof data == 'string' ? data : data == null ? data : JSON.stringify(data);
		}
		success = opt.success;
		opt.success = function(res, textStatus, xhrObj) {
			if((opt.noDealCommonCode || !ajax.dealCommonCode(res.code)) && success) {
				success(res, textStatus, xhrObj);
			}
		}
		if(opt.queueName) {
			if(_postQueue[opt.queueName]) {
				return;
			}
			_postQueue[opt.queueName] = true;
		}
		//for prototype
		if(G.IS_PROTOTYPE) {
			opt.type = 'POST';
			opt.url = util.appendQueryString(opt.url, {_method: (opt._method || 'POST').toLowerCase()});
		}
		// opt.xhrFields = {
		// 	withCredentials: true
		// };
		xhrObj = $.ajax(opt);
		opt.loading === false || ajax.showLoading();
		xhrObj.always(function() {
			if(opt.queueName) {
				_postQueue[opt.queueName] = false;
			};
			opt.loading === false || ajax.hideLoading();
		});
		return xhrObj;
	};

	/**
	 * ajax put wrapper for jquery ajax
	 * @param {Object} opt
	 */
	ajax.put = function(opt) {
		opt = opt || {};
		opt._method = 'PUT';
		ajax.post(opt);
	};

	/**
	 * ajax delete wrapper for jquery ajax
	 * @param {Object} opt
	 */
	ajax.del = function(opt) {
		opt = opt || {};
		opt._method = 'DELETE';
		ajax.post(opt);
	};

	/**
	 * get FileUploader options
	 * @param {String} url
	 * @param {String} dataType
	 */
	ajax.getUploadOpt = function(url, dataType, callback) {
		url = ajax.getDataTypeUrl(url, dataType);
		if(G.ORIGIN == G.CGI_ORIGIN) {
			callback({
				url: url
			});
		} else {
			callback({
				url: url,
				data: {domain: G.DOMAIN || ''},
				xhrGetter: function(getXhr) {
					var xhr = new XMLHttpRequest();
					getXhr(xhr);
				}
			});
		}
	};

	return ajax;
});


/* trace:src/script/lib/app/alerts.js */
define('./alerts', ['require', 'exports', 'module', 'jquery'], function(require) {
	var $ = require('jquery');
	
	var _modalCallbacks = [];
	var _toRef;
	
	var alerts = {};
	
	alerts.alert = function(content, type, timeout) {
		clearTimeout(_toRef);
		content = content || G.SVR_ERR_MSG;
		type = ({
			info: 'info',
			succ: 'succ',
			error: 'error'
		})[type] || 'error';
		alerts.alert.hide();
		$([
			'<div class="float-alert ' + type + '" style="display: none;">',
				content,
			'</div>'
		].join('')).appendTo(document.body).fadeIn();
		_toRef = setTimeout(function() {
			alerts.alert.hide();
		}, timeout || 5000);
	};

	alerts.alert.hide = function() {
		$('.float-alert').remove();
	};
	
	alerts.modal = function(content, opt) {
		var contentArr = [];
		var container = $('.modal-container');
		if(!container.length) {
			container = $('<div class="modal-container"><div class="modal-mask"></div><div class="modal-dialog"></div></div>').appendTo(document.body);
			$('.modal-mask', container).on('click', function() {
				if($('.modal-btns', container).length) {
					alerts.modal.hide();
				}
			});
		}
		opt = opt || {};
		contentArr.push('<div class="modal-content">' + content + '</div>');
		if(opt.btns) {
			contentArr.push('<div class="modal-btns">');
			$.each(opt.btns, function(i, btn) {
				_modalCallbacks[i] = btn.click;
				contentArr.push('<a data-modal-btn="' + i + '" href="javascript:void(0);">' + btn.text + '</a>');
			});
			contentArr.push('</div>');
		}
		$('.modal-dialog', container).html(contentArr.join(''));
		container.fadeIn(200);
	};

	alerts.modal.hide = function() {
		$('.modal-container').hide();
	};

	$(document.body).on('click', '.alert .icon-close', function(evt) {
		target = evt.target;
		$(target).closest('.alert').remove();
	}).on('click', '.modal-container [data-modal-btn]', function(evt) {
		var i = $(evt.target).data('modal-btn');
		var cb = _modalCallbacks[i];
		alerts.modal.hide();
		if(cb) {
			cb();
		}
	});
	
	return alerts;
});


/* trace:src/script/lib/app/scroll.js */
define('./scroll', ['require', 'exports', 'module', 'jquery'], function(require) {
	var $ = require('jquery');

	function scroll(wrapper, callback, opt) {
		require(['iscroll'], function(iscroll) {
			opt = opt || {};
			wrapper = $(wrapper);
			var topOffset = typeof opt.topOffset != 'undefined' ? opt.topOffset : 40;
			var pullDown = $('.scroll-pull-down', wrapper);
			var pullUp = $('.scroll-pull-up', wrapper);
			var y = NaN;
			var scroller = new iscroll(wrapper[0], {
				click: true,
				hScrollbar: false,
				vScrollbar: false,
				topOffset: topOffset,
				onRefresh: function() {
					pullDown.removeClass('release loading');
					pullUp.removeClass('release loading');
					this.minScrollY = -topOffset;
				},
				onNewPositionStart: opt.onNewPositionStart,
				onScrollMove: function() {
					var x = this.y - y;
					y = this.y;
					opt.onScrollMove && opt.onScrollMove(y);
					if(x > 0) {
						opt.onScrollUp && opt.onScrollUp(y);
					} else if(x < 0) {
						opt.onScrollDown && opt.onScrollDown(y);
					}
					if(pullDown[0]) {
						if(this.y > 5 && !pullDown.hasClass('loading')) {
							pullDown.addClass('release');
							this.minScrollY = 0;
						} else {
							pullDown.removeClass('release');
							if(!pullDown.hasClass('loading')) {
								this.minScrollY = -topOffset;
							}
						}
					}
					if(pullUp[0]) {
						if(this.y + 5 < this.maxScrollY && !pullUp.hasClass('loading') && !pullUp.hasClass('nomore')) {
							pullUp.addClass('release');
						} else {
							pullUp.removeClass('release');
						}
					}
				},
				onScrollEnd: function() {
					opt.onScrollEnd && opt.onScrollEnd(this.y);
					if(pullDown.hasClass('release')) {
						pullDown.addClass('loading');
						opt.pullDownLoad && opt.pullDownLoad();
					}
					if(pullUp.hasClass('release')) {
						pullUp.addClass('loading');
						opt.pullUpLoad && opt.pullUpLoad();
					}
				}
			});
			callback(scroller);
		});
	};
	
	return scroll;
});


/* trace:src/script/lib/app/toggle.js */
define('./toggle', ['require', 'exports', 'module', 'jquery'], function(require) {
	var $ = require('jquery');

	var toggle = $({});

	function showOne(target, toggleClass) {
		var type;
		target = $(target);
		if(!target.hasClass(toggleClass)) {
			if(toggleClass == 'visible') {
				target.css({display: 'block'});
				target.prop('offsetHeight');
				target.off('webkitTransitionEnd');
			}
			target.addClass(toggleClass);
			type = target.data('type');
			type && toggle.trigger(type + '.on', target);
		}
	};

	function hideOne(target, toggleClass) {
		var type;
		target = $(target);
		if(target.hasClass(toggleClass)) {
			if(toggleClass == 'visible') {
				target.on('webkitTransitionEnd', function() {
					target.css({display: 'none'});
				});
			}
			target.removeClass(toggleClass);
			type = target.data('type');
			type && toggle.trigger(type + '.off', target);
		}
	};

	function hideAll() {
		var types = ['title.menu', 'mini-bar-tab'];
		$.each(types, function(i, type) {
			$('[data-type="' + type + '"]').each(function(i, target) {
				target = $(target);
				var toggleClass = 'visible';
				toggleClass = target.data('toggle-class') || toggleClass;
				if(target.hasClass(toggleClass)) {
					hideOne(target, toggleClass);
				}
			});
		});
	};

	$(document.body).on('click', function(evt) {
		var target = $(evt.target);
		var toggleSelector = target.data('toggle');
		var toggleClass = 'visible';
		if(!toggleSelector) {
			target = target.closest('[data-toggle]');
			toggleSelector = target.data('toggle');
		}
		if(toggleSelector) {
			toggleClass = target.data('toggle-class') || toggleClass;
			target = $(toggleSelector);
			if(target.length) {
				if(target.hasClass(toggleClass)) {
					hideAll();
					hideOne(target, toggleClass);
				} else {
					hideAll();
					showOne(target, toggleClass);
				}
			} else {
				hideAll();
			}
		} else {
			hideAll();
		}
	});
	
	return toggle;
});


/* trace:src/script/lib/app/stat.js */
define('./stat', ['require', 'exports', 'module', 'jquery', './ajax'], function(require) {
	var $ = require('jquery');
	var ajax = require('./ajax');

	var _senderCount = 0;

	var stat = {};

	function _send(url) {
		var id = 0;
		var pool = window.app_stat_sender_pool = window.app_stat_sender_pool || [];
		while (pool[id]) {
			id++;
		}
		var sender = pool[id] = new Image();
		var cb = sender.onload = sender.onerror = function() {
			sender.onload = sender.onerror = null;
			pool[id] = null;
		};
		sender.src = url;
	}

	stat.pv = function(url, cid, mid) {
		url = encodeURIComponent(url || location.href);
		url = ajax.getDataTypeUrl('tracking/open/trace/' + cid + '?action=onload&event=' + url + (mid ? '&mid=' + mid : ''), 'json');
		_send(url);
	};

	//fv => first view， 跟pv几乎一样，只是event变为firstview
	stat.fv = function(url, cid, mid) {
		url = 'firstview';
		url = ajax.getDataTypeUrl('tracking/open/trace/' + cid + '?action=onload&event=' + url + (mid ? '&mid=' + mid : ''), 'json');
		_send(url);
	};
	//统计用户UA
	stat.ua = function(cid, mid) {
		var url = encodeURIComponent(navigator.userAgent);
		url = ajax.getDataTypeUrl('tracking/open/trace/' + cid + '?action=record&event=' + url + (mid ? '&mid=' + mid : ''), 'json');
		_send(url);
	};

	stat.click = function(tag, cid, mid) {
		url = ajax.getDataTypeUrl('tracking/open/trace/' + cid + '?action=click&event=' + tag + (mid ? '&mid=' + mid : ''), 'json');
		_send(url);
	};

	$(document).on('click', '[data-click-tag]', function(evt) {
		tag = $(this).data('click-tag');
		if (tag) {
			tag = tag.split('.');
			stat.click(tag[0], tag[1], tag[2]);
		}
	});

	return stat;
});


/* trace:src/script/lib/app/wx.js */
define('./wx', ['require', 'exports', 'module'], function(require) {
	var _ready = typeof WeixinJSBridge != 'undefined';
	
	var wx = {};

	wx.ready = function(callback) {
		if(_ready) {
			callback();
		} else {
			if(typeof WeixinJSBridge == 'undefined') {
				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', function() {
						_ready = true;
						callback();
					}, false);
				} else if (document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', function() {
						_ready = true;
						callback();
					}); 
					document.attachEvent('onWeixinJSBridgeReady', function() {
						_ready = true;
						callback();
					});
				}
			} else {
				_ready = true;
				callback();
			}
		}
	};

	wx.version = function() {
		var wx = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
		if(wx) {
			return parseInt(wx[1]);
		} else {
			return -1;
		}
	};
	
	return wx;
});