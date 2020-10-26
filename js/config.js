require.config({
        baseUrl: './js/',
        paths: {
            'jquery': ['http://qiye.ejianyuntong.com/adm_public/mobile/js/jquery-1.11.3.min']
        },
        urlArgs: "v=1"
    })

//返回顶部
define('img', ['jquery'], function($) {
	$(function(){
		$('img').bind('click',function(){
			return false;
		})
	})
})
require(['img']);
//rem
!function(win, option) {
	function isPc() {
		var uaInfo = navigator.userAgent;
		var agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
		var flag = true;
		for ( var i = 0; i < agents.length; i++ ) {
		  if (uaInfo.indexOf(agents[i]) > 0) {
			flag = false;
			break;
		  }
		}
		return flag;
	  }
	if(isPc()){
		var $html = document.getElementsByTagName('html');
		$html[0].style.maxWidth = '1036px';
		$html[0].style.margin = '0 auto';
	}
	var count = 0, 
		designWidth = option.designWidth, 
		designHeight = option.designHeight || 0, 
		designFontSize = option.designFontSize || 20, 
		callback = option.callback || null,
		root = document.documentElement,
		body = document.body,
		rootWidth, newSize, t, self;
		//root.style.width = '100%';
	//返回root元素字体计算结果
	
	function _getNewFontSize() {
	  var scale = designHeight !== 0 ? Math.min(win.innerWidth / designWidth, win.innerHeight / designHeight) : win.innerWidth / designWidth;
	  return parseInt( scale * 10000 * designFontSize ) / 10000;
	}
	!function () {
	  rootWidth = root.getBoundingClientRect().width;
	  self = self ? self : arguments.callee;
	  //如果此时屏幕宽度不准确，就尝试再次获取分辨率，只尝试20次，否则使用win.innerWidth计算
	  if( rootWidth !== win.innerWidth &&  count < 20 ) {
		win.setTimeout(function () {
		  count++;
		  self();
		}, 0);
	  } else {
		newSize = _getNewFontSize();
		//如果css已经兼容当前分辨率就不管了
		if( newSize + 'px' !== getComputedStyle(root)['font-size'] ) {
		  root.style.fontSize = Math.round(newSize) + "px";
		  if(isPc() && window.innerWidth > 1036){
			 var px = Math.round(newSize)>20?20:Math.round(newSize);
			 root.style.fontSize = px + "px"; 
		  }
		  return callback && callback(newSize);
		};
	  };
	}();
	//横竖屏切换的时候改变fontSize，根据需要选择使用
	win.addEventListener("resize", function() {
	  clearTimeout(t);
	  t = setTimeout(function () {
		self();
	  }, 50);
	}, false);
	}(window, {
	designWidth: 750, 
	designFontSize: 20
});

