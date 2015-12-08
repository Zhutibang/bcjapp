(function(){define(["require","exports","module","react","./components/MainPage/main"],function(e){return function(e,t,a){var i,n;return n=e("react"),i=e("./components/MainPage/main"),n.render(n.createElement(i,{}),document.getElementById("container")),{}}}(this))}).call(this),define("./components/MainPage/main",["require","exports","module","react","../Carousel/main","../Navigator/main","../ProductList/main"],function(e,t,a){var i=e("react"),n=e("../Carousel/main"),o=e("../Navigator/main"),r=e("../ProductList/main"),s=i.createClass({displayName:"MainPage",getInitialState:function(){return{}},render:function(){return i.createElement("div",{"class":"body-inner"},i.createElement("section",{id:"container-navigator",style:{position:"fixed",top:"0",left:"0",right:"0",zIndex:"9999"}},i.createElement(o,null)),i.createElement("section",{style:{paddingTop:"40px"}},i.createElement("section",{id:"container-carousel"},i.createElement(n,null)),i.createElement("section",null,i.createElement(r,null))))}});a.exports=s}),define("./components/Carousel/main",["require","exports","module","react","app","jquery","slick"],function(e,t,a){var i=e("react"),n=e("app"),o=e("jquery"),r=(e("slick"),i.createClass({displayName:"Carousel",getInitialState:function(){return{advertisements:this.props.advertisements||[]}},componentDidMount:function(){this.fetchData()},fetchData:function(){n.ajax.get({url:"/bcj/api/v1/carousel.json",success:function(e){this.setState({advertisements:e}),o(".your-class").slick({arrows:!1,accessibility:!1,fade:!0,speed:700,cssEase:"linear",slidesToShow:1,centerMode:!0,centerPadding:"60px",autoplay:!0,autoplaySpeed:2e3})}.bind(this),error:function(){n.alerts.alert("网络繁忙，获取轮播广告失败")}})},handleImgClick:function(e){location.href=e.link},render:function(){var e={height:340*window.screen.availWidth/720+"px"};return i.createElement("div",{className:"your-class",style:{overflowX:"hidden"}},this.state.advertisements.map(function(t){return i.createElement("img",{style:e,src:t.img,onClick:this.handleImgClick.bind(this,t),key:t.img,alt:t.title})}.bind(this)))}}));a.exports=r}),define("./components/Navigator/main",["require","exports","module","react","app","./main.less"],function(e,t,a){var i=e("react"),n=(e("app"),e("./main.less")),o=i.createClass({displayName:"Navigator",getInitialState:function(){return{displayMore:this.props.displayMore||!1,activeTab:this.props.activeTab||"zuixintemai"}},handleSwitch:function(){this.setState({displayMore:!this.state.displayMore})},handleTabClick:function(e,t){this.setState({displayMore:!1,activeTab:e}),$(window).trigger("navigator-tab-change",e)},handleMoreTabClick:function(e,t){this.setState({activeTab:"",displayMore:!1}),$(window).trigger("navigator-tab-change",e)},render:function(){return i.createElement("div",null,i.createElement("style",{type:"text/css",dangerouslySetInnerHTML:{__html:n.render()}}),i.createElement("header",{className:"navigator"},i.createElement("section",{className:"navigator-basic"},i.createElement("nav",null,i.createElement("div",{className:"tabs-wrapper"},i.createElement("div",{className:"tabs"},i.createElement("a",{className:"zuixintemai"===this.state.activeTab?"tab active":"tab",onClick:this.handleTabClick.bind(this,"zuixintemai")},"最新"),i.createElement("a",{className:"shumawenti"===this.state.activeTab?"tab active":"tab",onClick:this.handleTabClick.bind(this,"shumawenti")},"数码"),i.createElement("a",{className:"chaoliunvzhuang"===this.state.activeTab?"tab active":"tab",onClick:this.handleTabClick.bind(this,"chaoliunvzhuang")},"女装"),i.createElement("a",{className:"xingnanfuzhuang"===this.state.activeTab?"tab active":"tab",onClick:this.handleTabClick.bind(this,"xingnanfuzhuang")},"男装"),i.createElement("a",{className:"xiebaopeishi"===this.state.activeTab?"tab active":"tab",onClick:this.handleTabClick.bind(this,"xiebaopeishi")},"鞋包"))),i.createElement("div",{className:"btn-switch",onClick:this.handleSwitch},i.createElement("div",{className:"icon "+(this.state.displayMore?"icon-arrows-up":"icon-arrows-down"),style:{position:"absolute",top:"41%",left:"31%",right:"0",bottom:"0",width:"31px",height:"16.5px",zoom:".6"}})))),i.createElement("section",{className:"navigator-more "+(this.state.displayMore?"":"undisplay")},i.createElement("ul",null,i.createElement("li",{onClick:this.handleMoreTabClick.bind(this,"wentiyule")},"文体娱乐"),i.createElement("li",{onClick:this.handleMoreTabClick.bind(this,"jujiashenghuo")},"\b居家生活"),i.createElement("li",{onClick:this.handleMoreTabClick.bind(this,"kekoumeishi")},"\b可口美食"),i.createElement("li",{onClick:this.handleMoreTabClick.bind(this,"hufumeizhuang")},"护肤美妆")))))}});a.exports=o}),define("./components/Navigator/main.less",["require","exports","module"],function(e,t,a){t.render=function(){var e=[];return e.push(".undisplay { display: none;}.navigator .navigator-basic { height: 53px; background: #FDE000;}.navigator .navigator-basic nav { position: relative;}.navigator .navigator-basic nav .tabs-wrapper .tabs { font-size: 1rem; padding-top: 8px; line-height: 2.7rem; color: #414143;}.navigator .navigator-basic nav .tabs-wrapper .tabs .tab { display: inline-block; width: 17%; text-align: center;}.navigator .navigator-basic nav .tabs-wrapper .tabs .active { color: black; border-bottom: 4px solid black;}.navigator .navigator-basic nav .btn-switch { z-index: 1500; position: absolute; right: 0; top: 0; width: 15%; height: 100%; text-align: center; font-size: 1.2rem;}.navigator .navigator-more { position: absolute; top: 53px; left: 0; right: 0; bottom: 0; background: rgba(19, 19, 19, 0.6); z-index: 20000;}.navigator .navigator-more ul { margin: 0; padding: 0; background: #FFFFFF;}.navigator .navigator-more ul li { width: 25%; display: inline-block; text-align: center; border-bottom: 1px solid gainsboro; border-right: 1px solid gainsboro; height: 53px; padding-top: 15px;}"),e.join("")}}),define("./components/ProductList/main",["require","exports","module","react","app","lazyload"],function(e,t,a){var i=e("react"),n=e("app"),o=(e("lazyload"),i.createClass({displayName:"ProductList",getInitialState:function(){return{products:this.props.products||[]}},componentDidMount:function(){this.fetchData("zuixintemai"),$(window).on("navigator-tab-change",function(e,t){this.fetchData(t)}.bind(this))},componentWillUnmount:function(){$(window).off("navigator-tab-change")},fetchData:function(e){n.ajax.get({url:"/bcj/api/v1/{type}.json".replace("{type}",e),success:function(e){this.setState({products:e}),$("img.lazy").lazyload({effect:"fadeIn"})}.bind(this),error:function(){n.alerts.alert("网络繁忙，获取产品列表失败")}})},handleItemClick:function(e){location.href="bcj://"+e.link},render:function(){return i.createElement("div",null,i.createElement("section",{style:{background:"#FFFFFF"}},this.state.products.map(function(e){return i.createElement("div",{style:{position:"relative",padding:"5px",borderBottom:"1px solid gainsboro"},onClick:this.handleItemClick.bind(this,e)},i.createElement("div",{style:{height:"100px",width:"100px"}},i.createElement("img",{className:"lazy","data-original":e.img,style:{width:"100%",height:"100%"}})),i.createElement("div",{style:{top:"0",right:"0",bottom:"0",position:"absolute",left:"105px",padding:"10px"}},i.createElement("div",{style:{display:"inline-block",fontSize:"0.93rem",marginTop:".4rem",position:"absolute",top:"2%"}},i.createElement("div",{style:{overflow:"hidden"}},i.createElement("span",{className:"天猫"===e.tag?"icon icon-tmall":"icon icon-taobao",style:{display:"inline-block",marginRight:"4px",padding:"1px",height:"25px",width:"44px",zoom:"0.6",verticalAlign:"middle"}}),e.title)),i.createElement("div",{style:{fontSize:"1.4rem",color:"red",marginTop:".4rem",position:"absolute",top:"30%"}},"￥",e.price,i.createElement("span",{className:"icon icon-baoyou",style:{display:"inline-block",zoom:"0.6",verticalAlign:"middle",marginLeft:"10px",marginTop:"-0.2rem",height:"32px",width:"64px"}})),i.createElement("div",{style:{color:"gray",fontSize:"0.8rem",marginTop:".4rem",position:"absolute",top:"70%"}},i.createElement("del",null,"￥",e.raw_price))))}.bind(this))))}}));a.exports=o});