import Vue from 'vue';
import Axios from 'axios';
import {
	cookie,
	ConfirmPlugin
} from 'vux'
Vue.use(ConfirmPlugin)

const MYURL = 'http://m.miningcircle.com'
const MYLOGIN = 'http://member.miningcircle.com/login'

//时间转换为6-15
export function getTime(timeStamp) {
	var date = new Date()
	date.setTime(timeStamp)
	var m = date.getMonth() + 1
	var d = date.getDate()
	return m + '-' + d
}

//时间转换为2018-6-15
export function getTime1(timeStamp) {
	var date = new Date()
	date.setTime(timeStamp)
	var y = date.getFullYear()
	var m = date.getMonth() + 1
	var d = date.getDate()
	return y + '-' + m + '-' + d
}
//时间转换为2018-6-15 9:01
export function getTime2(timeStamp) {
	var date = new Date()
	date.setTime(timeStamp)
	var y = date.getFullYear()
	var m = date.getMonth() + 1
	var d = date.getDate()
	var h = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute
}

//export function getTime3(timeStamp) {
//            var date = new Date(timeStamp);
//            var y = date.getFullYear();
//            var m = date.getMonth() + 1;
//            m = m < 10 ? ('0' + m) : m;
//            var d = date.getDate();
//            d = d < 10 ? ('0' + d) : d;
//            var h = date.getHours();
//            h = h < 10 ? ('0' + h) : h;
//            var minute = date.getMinutes();
//            var second = date.getSeconds();
//            minute = minute < 10 ? ('0' + minute) : minute;
//            second = second < 10 ? ('0' + second) : second;
//            return y + '-' + m + '-' + d + ' ' + ' ' + h + ':' + minute + ':' + second;
//        }

export function judgmentEquipment() {

	var ua = navigator.userAgent.toLowerCase()
	var u = navigator.userAgent
	//	是否在微信浏览器中打开
	var isWXBrowder = ua.match(/MicroMessenger/i) == 'micromessenger'
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export function ShareTip() {
	//分享到新浪微博

	ShareTip.prototype.sharetosina = function(title, url, picurl)

	{
		var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url +
			'&content=utf-8&sourceUrl=' + url + '&pic=' + picurl
		window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
	}
	//分享到QQ空间
	ShareTip.prototype.sharetoqqzone = function(title, url, picurl, summary) {
		var p = {
			url: url,
			showcount: '1',
			/*是否显示分享总数,显示：'1'，不显示：'0' */
			desc: '',
			/*默认分享理由(可选)*/
			summary: summary,
			/*分享摘要(可选)*/
			title: title,
			/*分享标题(可选)*/
			site: '',
			/*分享来源 如：腾讯网(可选)*/
			pics: picurl,
			/*分享图片的路径(可选)*/
			style: '203',
			width: 98,
			height: 22
		};
		var s = [];
		for (var i in p) {
			s.push(i + '=' + encodeURIComponent(p[i] || ''));
		}
		var content = s.join('&')
		window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + content)
	}

};

//调app方法
export function getAppShare(url, title, imageUrl, content, platform) {
	var ua = navigator.userAgent.toLowerCase()
	var u = navigator.userAgent
	var params = {
		"url": url,
		"title": title,
		'imageUrl': imageUrl,
		'content': content,
		"platform": platform,
	}
	params = JSON.stringify(params)
	//				oswebkit.callApp("SHARE", params)
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		//					alert("微信浏览器")
	} else if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
		adwebkit.callApp("SHARE", params)
	} else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
		oswebkit.callApp("SHARE", params)
	} else {
		//					alert("其他浏览器")
	}
}

//调app返回上一页方法
export function lastPage() {
	if (isDevice() == 'adr') {
		adwebkit.callApp("BACK", '');
	} else if (isDevice() == 'ios') {
		oswebkit.callApp("BACK", '');
	} else {
		window.history.go(-1)
	}
}

//调app登录方法
export function appLogin() {
	Vue.$vux.alert.show({
		title: '提示',
		content: '您当前尚未登录,点击确定去登陆！',
		onShow() {

		},
		onHide() {
			if (isDevice() == 'adr') {
				adwebkit.callApp("LOGIN", "登录的参数");
			} else if (isDevice() == 'ios') {
				oswebkit.callApp("LOGIN", "登录的参数");
			} else {
				window.location.href = MYLOGIN
			}
		}

	})
}

//调app去首页的方法
export function goHomeApp() {
	if (isDevice() == 'adr') {
		adwebkit.callApp("INDEX", '');
	} else if (isDevice() == 'ios') {
		oswebkit.callApp("INDEX", '');
	} else {

		window.location.href = MYURL + "/home?newpage=newpage"
	}
}

export function isDevice() {
	var ua = navigator.userAgent.toLowerCase()
	var u = navigator.userAgent
	var wxDevice = ua.match(/MicroMessenger/i) == 'micromessenger' //微信浏览器
	var appDevice = u.indexOf('/mcapp') >= 0 //app设备
	var adrDevice = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //安卓设备
	var iosDevice = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios设备
	if (wxDevice) {
		return '微信浏览器'
	} else if (appDevice) {
		if (adrDevice) {
			return 'adr'
		} else if (iosDevice) {
			return 'ios'
		}
	} else {
		return "其他浏览器"
	}

}

export function isBrowser() {
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		return "iosBS"
	} else if (/(Android)/i.test(navigator.userAgent)) {

		return "adrBS"
	} else {
		return "其他"
	}
}

//export function appPay(userId,orderNo,amount) {
////	alert(userId,orderNo,amount)
//	if(isDevice() == 'adr') {
//		var params = {'userId':userId,'orderNo':orderNo,'amount':amount}
//		params = JSON.stringify(params)
//		adwebkit.callApp("FYPAY", params);
//	}
//}

export function toPhone(tel) {
	if (isDevice() == 'adr') {
		var params = '{"tel":' + tel + '}'
		adwebkit.callApp("CALL", params)
	} else {
		window.location.href = "tel:" + tel
	}
}


//分享
export function wxShare(getUrl, url, title, imgUrl, desc, golink) {
	var ua = navigator.userAgent.toLowerCase();
	var isWeixin = ua.indexOf('micromessenger') != -1;
	var title = title;
	var imgUrl = imgUrl;
	var desc = desc;
	var golink = golink;
	if (isWeixin) {
		Axios.get(getUrl, {
				params: {
					url: encodeURI(url),
				}
			})
			.then(res => {
				if (res.data.success) {
					var obj = res.data.data;
					wx.config({
						signature: obj.signature,
						appId: obj.appId,
						url: obj.url,
						nonceStr: obj.nonceStr,
						timestamp: obj.timestamp,
						jsApiTicket: obj.jsApiTicket,
						jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
					});
					wx.ready(function() {
						wx.onMenuShareTimeline({
							title: title,
							link: golink,
							imgUrl: imgUrl,
							success: function() {
								// 用户确认分享后执行的回调函数
								alert('分享到朋友圈成功');
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
								alert('你没有分享到朋友圈');
							}
						});
						wx.onMenuShareAppMessage({
							title: title,
							desc: desc,
							link: golink,
							imgUrl: imgUrl,
							trigger: function(res) {
								// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
							},
							success: function(data1) {
								console.log('成功', data1)
								alert('分享给朋友成功');
							},
							cancel: function(data2) {
								console.log('取消：', data2)
								alert('你没有分享给朋友');
							},
							fail: function(res) {
								alert(JSON.stringify(res));
							}
						});
					});
					wx.error(function(res) {});
				} else {
					alert(res.data.errMsg)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}
}

//act getcookie
export function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
}
//act setcookie
export function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/;domain=.miningcircle.com";
}
