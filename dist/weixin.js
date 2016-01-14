// JavaScript Document

//---------------------------------------[ wx ]

var appid = 'wx9cdb5a3b9fbfb37e'; //wx9cdb5a3b9fbfb37e
var url = document.location.href;

function wxConfig( settings ) {

    var defs = {
        'wx_title': '今年有没有新恋情新事业？换个发型就知道！还能赢机票！',
        'wx_desc': '',
        'wx_link': 'http://pantenecny.agenda-bj.com.cn/version3/html/index.html',
        'wx_imgUrl': 'http://pantenecny.agenda-bj.com.cn/share/img/share.png',
        'reurl': ''
    };

    if ( settings ) {
        for ( var attr in defs ) {
            if ( typeof settings[attr] != 'undefined' ) {
                defs[attr] = settings[attr];
            }
        }
    }

    //wx_title, wx_desc, wx_link, wx_imgUrl, reurl
    var wx_title = defs.wx_title,
        wx_desc = defs.wx_desc,
        wx_link = defs.wx_link,
        wx_imgUrl = defs.wx_imgUrl,
        reurl = defs.reurl;

    myLab.ajax({
        type: 'GET',
        url: 'http://test.agenda-bj.com.cn:8082/api/GetJsShareScript?appid=' + appid + '&url=' + encodeURIComponent(url) + '&callback=mycallback',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data);
            wx.config({
                debug: false,
                appId: appid,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'getNetworkType',
                     'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'onVoicePlayEnd',
                    'uploadVoice',
                    'downloadVoice'
                ]
            });
        }
    });

    //ready
    wx.ready(function () {
        //wx.showOptionMenu();
        // 2.1 监听"分享给朋友"，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
            title: wx_title,
            desc: wx_desc,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
		if(reurl!="")
		{
			window.location.href=reurl;
		}
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });

        // 2.2 监听"分享到朋友圈"按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
            title: wx_title,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
		if(reurl!="")
		{
			window.location.href=reurl;
		}
            },
            cancel: function (res) {

            },
            fail: function (res) {
            }
        });

        // 2.3 监听"分享到QQ"按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareQQ({
            title: wx_title,
            desc: wx_desc,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            complete: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });

        // 2.4 监听"分享到微博"按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareWeibo({
            title: wx_title,
            desc: wx_desc,
            link: wx_link,
            imgUrl: wx_imgUrl,
            trigger: function (res) {
            },
            complete: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        });



    });

}

wxConfig();

// 5 图片接口
// 5.1 拍照、本地选图
var images = {
    localId: '',
    serverId: ''
};

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var requestServer = {

    'select': function ( settings ) {
        var callBack = settings.callBack;
        //alert(1);
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
            //sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                //alert(res.localIds[0]);
                images.localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                //document.getElementById("img1").src = images.localId;
                //上传开始
                //alert(images.localId);
                wx.uploadImage({
                    localId: images.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        //alert(res.serverId);
                        images.serverId = res.serverId; // 返回图片的服务器端ID
                        //alert(images.serverId);
                        //下载开始
                        myLab.ajax({
                            type: 'post',
                            url: '/home/Download?serverId=' + images.serverId,
                            dataType: 'text',
                            success: function (data) {
                                //"返回文件地址：" + data;
                                //alert('上传成功' + data);
                                callBack && callBack(data);
                            }
                        });
                        //下载结束
                    }
                });
                //上传结束

            }
        });

    }

};

