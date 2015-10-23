/* trace:src/app/bcj/script/mod/home/main.coffee */
define(['require', 'exports', 'module', 'app', 'skateboard', 'jquery', 'react', './components/Navigator/main', './components/Carousel/main', './components/ProductList/main', './body.tpl.html'], function(require, exports, module) {
(function() {
  var $, Carousel, Mod, Navigator, ProductList, React, Skateboard, app,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  app = require('app');

  Skateboard = require('skateboard');

  $ = require('jquery');

  React = require('react');

  Navigator = require('./components/Navigator/main');

  Carousel = require('./components/Carousel/main');

  ProductList = require('./components/ProductList/main');

  Mod = (function(superClass) {
    extend(Mod, superClass);

    function Mod() {
      return Mod.__super__.constructor.apply(this, arguments);
    }

    Mod.prototype._bodyTpl = require('./body.tpl.html');

    Mod.prototype.render = function() {
      Mod.__super__.render.apply(this, arguments);
      React.render(React.createElement(Navigator, {}), document.getElementById('container-navigator'));
      React.render(React.createElement(Carousel, {}), document.getElementById('container-carousel'));
      return React.render(React.createElement(ProductList, {}), document.getElementById('container-productlist'));
    };

    return Mod;

  })(Skateboard.BaseMod);

  module.exports = Mod;

}).call(this);

});

/* trace:src/app/bcj/script/mod/home/components/Navigator/main.jsx */
define('./components/Navigator/main', ['require', 'exports', 'module', 'react', 'app', 'skateboard', './main.less'], function(require, exports, module) {
var React = require('react');
var app = require('app');
var Skateboard = require('skateboard');
var Style = require('./main.less')
//
var Navigator = React.createClass({displayName: "Navigator",
	getInitialState: function(){
		return {
            displayMore: this.props.displayMore || false,
            activeTab: this.props.activeTab || 'zuixintemai'
		}
	},
    handleSwitch: function(){
        this.setState({
            displayMore: !this.state.displayMore
        })
    },
    handleTabClick: function(activeTab, evt){
        this.setState({
            activeTab: activeTab
        });
		$(window).trigger('navigator-tab-change', activeTab)
    },
	handleMoreTabClick: function(type, evt){
		console.log('==>'+type);
		this.setState({
			activeTab: '',
			displayMore: false
		});

		$(window).trigger('navigator-tab-change', type)
	},
	render: function(){
		return (
            React.createElement("div", null, 
                React.createElement("style", {type: "text/css", dangerouslySetInnerHTML: {__html: Style.render()}}), 
                React.createElement("header", {className: "navigator"}, 
            		React.createElement("section", {className: "navigator-basic"}, 
            			React.createElement("nav", null, 
            				React.createElement("div", {className: "tabs-wrapper"}, 
            					React.createElement("div", {className: "tabs"}, 
            						React.createElement("a", {className: this.state.activeTab === 'zuixintemai'?"tab active":"tab", 
                                        onClick: this.handleTabClick.bind(this, 'zuixintemai')}, "最新特卖"), 
									React.createElement("a", {className: this.state.activeTab === 'renqirexiao'?"tab active":"tab", 
                                        onClick: this.handleTabClick.bind(this, 'renqirexiao')}, "人气热销"), 
									React.createElement("a", {className: this.state.activeTab === 'nvzhuang'?"tab active":"tab", 
                                        onClick: this.handleTabClick.bind(this, 'nvzhuang')}, "女装"), 
									React.createElement("a", {className: this.state.activeTab === 'nanzhuang'?"tab active":"tab", 
                                        onClick: this.handleTabClick.bind(this, 'nanzhuang')}, "男装"), 
									React.createElement("a", {className: this.state.activeTab === 'xiebao'?"tab active":"tab", 
                                        onClick: this.handleTabClick.bind(this, 'xiebao')}, "鞋包")
            					)
            				), 
            				React.createElement("div", {className: "btn-switch", onClick: this.handleSwitch}, 
            					React.createElement("a", {className: "fa "+(this.state.displayMore?"fa-angle-up":"fa-angle-down")})
            				)
            			)
            		), 
            		React.createElement("section", {className: "navigator-more "+ (this.state.displayMore ? "":"undisplay")}, 
            			React.createElement("ul", null, 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'quanbu')}, "全部"), 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'chaoliunvzhuang')}, "\b潮流女装"), 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'xingnanfuzhuang')}, "型男服装"), 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'xiebaoshipin')}, "\b鞋包饰品")
            			), 
            			React.createElement("ul", null, 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'wentiyule')}, "\b文体娱乐"), 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'jujiashenghuo')}, "\b居家生活"), 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'kekoumeishi')}, "\b可口美食"), 
            				React.createElement("li", {onClick: this.handleMoreTabClick.bind(this, 'meizhuangpeishi')}, "美妆配饰")
            			)
            		)
            	)
            )
		);
	}
});

module.exports = Navigator;

});

define('./components/Navigator/main.less', ['require', 'exports', 'module'], function(require, exports, module) {
    exports.render = function() {
        var _$out_ = [];
        /* trace:src/app/bcj/script/mod/home/components/Navigator/main.less */
        _$out_.push(".undisplay { display: none;}.navigator .navigator-basic { height: 40px; background: #E6E6E6;}.navigator .navigator-basic nav { position: relative;}.navigator .navigator-basic nav .tabs-wrapper { margin-right: 29px;}.navigator .navigator-basic nav .tabs-wrapper .tabs { font-size: 0.9rem; padding-top: 8px;}.navigator .navigator-basic nav .tabs-wrapper .tabs .tab { display: inline-block; width: 20%; text-align: center;}.navigator .navigator-basic nav .tabs-wrapper .tabs .active { color: red; border-bottom: 2px solid red;}.navigator .navigator-basic nav .btn-switch { z-index: 1500; position: absolute; right: 0; top: 0; width: 32px; height: 40px; text-align: center; font-size: 1.2rem; padding: 8px;}.navigator .navigator-more { position: absolute; top: 40px; left: 0; right: 0; bottom: 0; background: rgba(19, 19, 19, 0.6); z-index: 20000;}.navigator .navigator-more ul { margin: 0; padding: 0; background: #E3E3E3;}.navigator .navigator-more ul li { width: 25%; display: inline-block; text-align: center; padding: 6px; border-bottom: 1px solid gainsboro; border-right: 1px solid gainsboro;}");
        return _$out_.join("");
    };
});

/* trace:src/app/bcj/script/mod/home/components/Carousel/main.jsx */
define('./components/Carousel/main', ['require', 'exports', 'module', 'react', 'app', 'skateboard', 'jquery', 'slick'], function(require, exports, module) {
var React = require('react');
var app = require('app');
var Skateboard = require('skateboard');
var $ = require('jquery');
var slick = require('slick');

var Carousel = React.createClass({displayName: "Carousel",
	getInitialState: function(){
		return {
			advertisements: this.props.advertisements || []
		};
	},
    componentDidMount: function() {
		this.fetchData();
    },
	fetchData: function(){
		app.ajax.get({
			url: '/bcj/api/carousel.json',
			success: function(res){
				// console.log(res)
				this.setState({
					advertisements: res
				})
				$('.your-class').slick({
					arrows: false,
					accessibility: false,
					fade: true,
					speed: 700,
					cssEase: 'linear',
					slidesToShow: 1,
					// dots: true,
					// adaptiveHeight: true,
					centerMode: true,
					centerPadding: '60px',
					autoplay: true,
					autoplaySpeed: 2000
				});
			}.bind(this),
			error: function(){
				app.alerts.alert('网络繁忙，获取轮播广告失败');
			}
		})
	},
	handleImgClick: function(advertisement){
		location.href = advertisement.link;
	},
	render: function(){
        var imgStyle = {
            height: '120px'
        }
		return (
            React.createElement("div", {className: "your-class"}, 
				this.state.advertisements.map(function(advertisement){
					return (
						React.createElement("img", {style: imgStyle, 
							src: advertisement.img, 
							onClick: this.handleImgClick.bind(this, advertisement), 
							key: advertisement.link, 
							alt: advertisement.title})
					);
				}.bind(this))
    		)
		);
	}
});

module.exports = Carousel;

});

/* trace:src/app/bcj/script/mod/home/components/ProductList/main.jsx */
define('./components/ProductList/main', ['require', 'exports', 'module', 'react', 'app', 'skateboard'], function(require, exports, module) {
var React = require('react');
var app = require('app');
var Skateboard = require('skateboard');

var ProductList = React.createClass({displayName: "ProductList",
	getInitialState: function(){
		return {
			products: this.props.products || []
		};
	},
	componentDidMount: function() {
		this.fetchData('zuixintemai');
		$(window).on('navigator-tab-change', function(event, type){
			this.fetchData(type);
		}.bind(this))
	},
	componentWillUnmount: function() {
		$(window).off('navigator-tab-change')
	},
	fetchData: function(type){
		app.ajax.get({
			url: '/bcj/api/{type}.json'.replace('{type}', type),
			success: function(res){
				this.setState({
					products: res
				})
			}.bind(this),
			error: function(){
				app.alerts.alert('网络繁忙，获取产品列表失败');
			}
		})
	},
	handleItemClick: function(product){
		location.href = product.link;
	},
	render: function(){
		return (
            React.createElement("section", {style: {marginTop: '-30px', background: '#E6E6E6'}}, 
				this.state.products.map(function(product){
					return (
						React.createElement("div", {style: {position: 'relative',padding: '5px', borderBottom: '1px solid gainsboro'}, onClick: this.handleItemClick.bind(this, product)}, 
		        			React.createElement("div", {style: {height: '100px', width: '100px'}}, 
		        				React.createElement("img", {src: product.img, style: {width: '100%', height: '100%'}})
		        			), 
		        			React.createElement("div", {style: {top: '0',right: '0', bottom: '0',position: 'absolute', left: '105px', padding: '10px'}}, 
		        				React.createElement("div", {style: {display: 'inline-block', fontSize: '0.8rem'}}, 
		        					React.createElement("span", {style: {display: 'inline-block', background: (product.tag==='天猫'?'red':'#DEB92F'), color: 'white',padding: '1px'}}, product.tag), 
									React.createElement("span", null, product.title)
		        				), 
								React.createElement("div", {style: {fontSize: '1rem', color: 'red'}}, 
									"￥", React.createElement("span", null, product.price), 
									product.free_ship === '1'
									  ?React.createElement("span", {style: {border: '1px solid red', fontSize: '0.9rem', marginLeft: '2px'}}, "包邮")
									  : ""
								    
		        				), 
		        				React.createElement("div", {style: {color: 'gray', fontSize: '0.8rem'}}, 
		        					React.createElement("del", null, "￥189"), 
		        					React.createElement("div", {style: {float: 'right'}}, "1990人在抢")
		        				)
		        			)
		        		)
					);
				}.bind(this))
        	)
		);
	}
});

module.exports = ProductList;

});

define('./body.tpl.html', [ "require", "exports", "module" ], function(require, exports, module) {
    function $encodeHtml(str) {
        return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`/g, "&#96;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
    exports.render = function($data, $opt) {
        $data = $data || {};
        var _$out_ = [];
        var $print = function(str) {
            _$out_.push(str);
        };
        with ($data) {
            /* trace:src/app/bcj/script/mod/home/body.tpl.html */
            /* trace:src/app/bcj/script/mod/home/body.less */
            _$out_.push('<style type="text/css">.sb-mod.sb-mod--home { background-position: center; background-repeat: no-repeat; background-size: cover; height: 100%;}</style>');
            /* trace:src/style/lib/slick/main.css */
            _$out_.push("<style type=\"text/css\">/* Slider */.slick-slider{ position: relative; display: block; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; -khtml-user-select: none; -ms-touch-action: pan-y; touch-action: pan-y; -webkit-tap-highlight-color: transparent;}.slick-list{ position: relative; display: block; overflow: hidden; margin: 0; padding: 0;}.slick-list:focus{ outline: none;}.slick-list.dragging{ cursor: pointer; cursor: hand;}.slick-slider .slick-track,.slick-slider .slick-list{ -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0);}.slick-track{ position: relative; top: 0; left: 0; display: block;}.slick-track:before,.slick-track:after{ display: table; content: '';}.slick-track:after{ clear: both;}.slick-loading .slick-track{ visibility: hidden;}.slick-slide{ display: none; float: left; height: 100%; min-height: 1px;}[dir='rtl'] .slick-slide{ float: right;}.slick-slide img{ display: block;}.slick-slide.slick-loading img{ display: none;}.slick-slide.dragging img{ pointer-events: none;}.slick-initialized .slick-slide{ display: block;}.slick-loading .slick-slide{ visibility: hidden;}.slick-vertical .slick-slide{ display: block; height: auto; border: 1px solid transparent;}.slick-arrow.slick-hidden { display: none;}</style>");
            /* trace:src/style/lib/slick/slick-theme-main.css */
            _$out_.push("<style type=\"text/css\">@charset 'UTF-8';/* Slider */.slick-loading .slick-list { background: #fff url(\"data:image/gif;base64,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\") center center no-repeat;}/* Icons */@font-face { font-family: 'slick'; font-weight: normal; font-style: normal; src: url('./fonts/slick.eot'); src: url('./fonts/slick.eot?#iefix') format('embedded-opentype'), url('./fonts/slick.woff') format('woff'), url('./fonts/slick.ttf') format('truetype'), url('./fonts/slick.svg#slick') format('svg');}/* Arrows */.slick-prev,.slick-next { font-size: 0; line-height: 0; position: absolute; top: 50%; display: block; width: 20px; height: 20px; margin-top: -10px; padding: 0; cursor: pointer; color: transparent; border: none; outline: none; background: transparent;}.slick-prev:hover,.slick-prev:focus,.slick-next:hover,.slick-next:focus { color: transparent; outline: none; background: transparent;}.slick-prev:hover:before,.slick-prev:focus:before,.slick-next:hover:before,.slick-next:focus:before { opacity: 1;}.slick-prev.slick-disabled:before,.slick-next.slick-disabled:before { opacity: .25;}.slick-prev:before,.slick-next:before { font-family: 'slick'; font-size: 20px; line-height: 1; opacity: .75; color: white; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}.slick-prev { left: -25px;}[dir='rtl'] .slick-prev { right: -25px; left: auto;}.slick-prev:before { content: '←';}[dir='rtl'] .slick-prev:before { content: '→';}.slick-next { right: -25px;}[dir='rtl'] .slick-next { right: auto; left: -25px;}.slick-next:before { content: '→';}[dir='rtl'] .slick-next:before { content: '←';}/* Dots */.slick-slider { margin-bottom: 30px;}.slick-dots { position: absolute; bottom: -45px; display: block; width: 100%; padding: 0; list-style: none; text-align: center;}.slick-dots li { position: relative; display: inline-block; width: 20px; height: 20px; margin: 0 5px; padding: 0; cursor: pointer;}.slick-dots li button { font-size: 0; line-height: 0; display: block; width: 20px; height: 20px; padding: 5px; cursor: pointer; color: transparent; border: 0; outline: none; background: transparent;}.slick-dots li button:hover,.slick-dots li button:focus { outline: none;}.slick-dots li button:hover:before,.slick-dots li button:focus:before { opacity: 1;}.slick-dots li button:before { font-family: 'slick'; font-size: 6px; line-height: 20px; position: absolute; top: 0; left: 0; width: 20px; height: 20px; content: '•'; text-align: center; opacity: .25; color: black; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}.slick-dots li.slick-active button:before { opacity: .75; color: black;}</style><div class=\"body-inner\"><!-- nav --><section id=\"container-navigator\"></section><!-- switch --><section id=\"container-carousel\"></section><!-- list --><section id=\"container-productlist\"></section></div>");
        }
        return _$out_.join("");
    };
});