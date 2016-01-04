/**
 * Created by LinJe on 2015/12/17.
 */
;(function( $, jQuery, undefined ) {

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


    //判断是否是微信客户端
    var isWeixin = (function() {
        return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
    })();


    //loading ui
    (function() {

        var oBox = $('.loading'),
            oEm = oBox.find('em'),
            oBdo = oEm.find('bdo'),
            oP = oBox.find('p'),
            oI = oBox.find('i'),
            oFlowerArea = oBox.find('.flowerArea');

        //选取body 延迟加载
        $('body').lazyLoading()
            .concat([
                '../img/common/face/1.png', '../img/common/face/2.png', '../img/common/face/3.png',
                '../img/common/face/4.png', '../img/common/face/5.png', '../img/common/face/6.png'
            ])
            .progress(function(percent) {
                oI.addClass('active');
                oP.text(percent+'%');
                oBdo.css('width', percent+'%');
            })
            .callBack(function() {
                //oBox.fadeOut({'removeClass':'active'});
                //homeModule.show();
                //oFlowerArea.removeClass('active');
            });

    })();


    //监视窗口高度
    (function() {

        var oWrap = $('#wrap');

        function listenWindow() {
            $(window).height() <= 1150 ? oWrap.addClass('lt1150') : oWrap.removeClass('lt1150');
        }

        listenWindow();
        $(window).on('resize', listenWindow);

    })();


    //首页
    var homeModule = (function() {

        var oBox = $('#home'),
            oStart = oBox.find('.start');

        oStart.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            selectModule.show();
            //添加哈希管理
            //hashModule.addHash('select');
        });

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            }
        }

    })();


    //选择图片
    var selectModule = (function() {

        var oBox = $('#select'),
            oFileUpload = jQuery('.inp_fileToUpload'),
            oWeixinUpload = oBox.find('.weixinUpload');

        oFileUpload.removeClass('active');
        oWeixinUpload.removeClass('active');
        isWeixin ? oWeixinUpload.addClass('active') : oFileUpload.addClass('active');

        oFileUpload.live("change", function () {//现在这个已经适用于多个file表单。
            ajaxFileUpload({'file_id':jQuery(this).attr("id"), 'callBack':function(data) {
                var newUrl = data;
                if ( data.indexOf('http://pantenecny.agenda-bj.com.cn') == -1 ) {
                    newUrl = 'http://pantenecny.agenda-bj.com.cn' + data;
                }
                //$('#urltest').val(newUrl);
                //alert('服务器上的图片地址：'+newUrl);
                faceAnalysis({'img_url':newUrl, 'callBack':function(faceData) {
                    //$('#urltest').val(JSON.stringify(faceData));
                    setPortrait({'data':faceData, 'callBack':function() {
                        oBox.fadeOut({'removeClass':'active'});
                        previewModule.show();
                        //添加哈希管理
                        //hashModule.addHash('preview');
                    }});
                }});
            }});
        });

        oWeixinUpload.on('click', function() {
            requestServer.select({'callBack': function(data) {
                //$('#urltest').val(data);
                //alert('服务器上的图片地址：'+data);
                faceAnalysis({'img_url':data, 'callBack':function(faceData) {
                    //$('#urltest').val(JSON.stringify(faceData));
                    setPortrait({'data':faceData, 'callBack':function() {
                        oBox.fadeOut({'removeClass':'active'});
                        previewModule.show();
                        //添加哈希管理
                        //hashModule.addHash('preview');
                    }});
                }});
            }});
        });



        //根据返回的人脸数据设定头像五官
        /*{
            'face': 3,
            'eyes': 18,
            'nose': 5,
            'brows': 6,
            'mouth': 1
         }*/
        function setPortrait( settings ) {
            //所有头像
            var aPortraitbox = $('.portraitbox'),
                facePortrait = aPortraitbox.find('.face'),
                eyesPortrait = aPortraitbox.find('.eyes'),
                nosePortrait = aPortraitbox.find('.nose'),
                mouthPortrait = aPortraitbox.find('.mouth'),
                browsPortrait = aPortraitbox.find('.brows'),
                data = settings.data,
                callBack = settings.callBack;

            //alert(JSON.stringify(data));
            facePortrait.attr('src', '../img/common/face/'+ data.face +'.png');
            if ( data.glass ) {
                eyesPortrait.attr('src', '../img/common/eyes/24.png');
            } else {
                eyesPortrait.attr('src', '../img/common/eyes/'+ data.eyes +'.png');
            }
            nosePortrait.attr('src', '../img/common/nose/'+ data.nose +'.png');
            mouthPortrait.attr('src', '../img/common/mouth/'+ data.mouth +'.png');
            browsPortrait.attr('src', '../img/common/brows/'+ data.brows +'.png');
            callBack && callBack();
        }

        //上传照片
        function ajaxFileUpload( settings ) {
            jQuery.ajaxFileUpload({
                url: '/uploadpic.ashx', //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: settings.file_id, //文件上传域的ID
                dataType: 'json', //返回值类型 一般设置为json
                success: function (data, status)//服务器成功响应处理函数
                {
                    if (data.error == 0) {
                        //输出在服务器的图片地址 data.url
                        //alert('服务器上的图片地址：'+data.url);
                        settings.callBack && settings.callBack(data.url);
                    } else {
                        alert(data.message);
                    }
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                    alert(e);
                }
            });
            return false;
        }

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
                /*setTimeout(function() {
                    oBox.fadeOut({'removeClass':'active'});
                    previewModule.show();
                }, 2000);*/
            }
        }

    })();

    //test
    //selectModule.show();


    //预览
    var previewModule = (function() {

        var oBox = $('#preview'),
            aBtn = oBox.find('ol.btns li'),
            oDressup = aBtn.eq(0),
            oTurnhairstyle = aBtn.eq(1);

        //不够美，调一下
        oDressup.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            editModule.show();
            //添加哈希管理
            //hashModule.addHash('edit');
        });

        //立刻换发型
        oTurnhairstyle.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            hairstyleModule.show();
            //添加哈希管理
            //hashModule.addHash('hairstyle');
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


        //$this = $(this),
        //thisParent = $this.parent(),
        function prevMethod( thisParent ) {
            var thisLi = thisParent.find('li'),
                thisIndex = Number(thisParent.attr('_index'));

            if ( !thisIndex ) {
                thisParent.attr('_index', 0);
            }

            thisIndex = thisIndex > 0 ? thisIndex-1 : thisLi.length-1;
            thisLi.removeClass().eq(thisIndex).addClass('active');
            thisParent.attr('_index', thisIndex);
        }

        function nextMethod( thisParent ) {
            var thisLi = thisParent.find('li'),
                thisIndex = Number(thisParent.attr('_index'));

            if ( !thisIndex ) {
                thisParent.attr('_index', 0);
            }

            thisIndex = thisIndex < thisLi.length-1 ? thisIndex+1 : 0;
            thisLi.removeClass().eq(thisIndex).addClass('active');
            thisParent.attr('_index', thisIndex);
        }

        oPanel.on('touchmove', function(ev) {
            ev.preventDefault();
        });

        //上一页
        aPrev.on('click', function() {
            prevMethod($(this).parent());
        });
        allUl.on('swipeRight', function() {
            prevMethod($(this));
        });

        //下一页
        aNext.on('click', function() {
            nextMethod($(this).parent());
        });
        allUl.on('swipeLeft', function() {
            nextMethod($(this));
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
            //添加哈希管理
            //hashModule.addHash('hairstyle');
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
            oShareIcon = oBox.find('.shareIcon'),
            oFlower = oBox.find('.flower'),
            oPortraitbox = oBox.find('.portraitbox'),
            aTypeImg = oBox.find('.type img'),
            oTextImg = oBox.find('.text img'),
            typeLen = aTypeImg.length,
            oThisType = oBox.find('.thistype'),
            aBtnThree = oBox.find('ol.btns'),
            oAgain = aBtnThree.find('li').eq(0),
            oSave = aBtnThree.find('li').eq(1),
            oGift = aBtnThree.find('li').eq(2),
            oLayerShare = oBox.find('.layer_share'),
            oCanvasArea = oBox.find('.canvasArea'),
            oScreenshot = oBox.find('.screenshot'),
            oLayerName = oBox.find('.layer_name'),
            allowSelect = true,
            typeIndex = -1,
            typeTimer = null,
            shareTimer = null,
            nameTimer = null;

        function playType() {
            clearInterval(typeTimer);
            typeTimer = setInterval(function() {
                typeIndex = typeIndex < typeLen-1 ? typeIndex+1 : 0;
                oPortraitbox.removeClass().addClass('portraitbox type'+(typeIndex+1));
                aTypeImg.removeClass().eq(typeIndex).addClass('show');
            }, 100);
        }

        function showShare(time) {
            clearTimeout(shareTimer);
            shareTimer = setTimeout(function() {
                oLayerShare.fadeIn({'addClass':'active'});
            }, time);
        }

        function showLayerName(time) {
            clearTimeout(nameTimer);
            nameTimer = setTimeout(function() {
                oLayerName.fadeIn({'addClass':'active'});
            }, time);
        }

        //dataURL转blob
        function dataURLtoBlob(dataurl, callBack) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            try {
                callBack && callBack({'blob':new Blob([u8arr], {type:mime})});
            } catch (err) {
                callBack && callBack({'error':err});
            }
        }

        //根据base64合成图片，返回一张png图
        function base64ToPic( base64 ) {
            var result = null;

            $.ajax({
                type: 'post',
                dataType: 'text',
                url: 'http://pantenecny.agenda-bj.com.cn/home/about',
                async: false,
                data: {
                    'base64str': base64
                },
                success: function (msg) {
                    result = msg;
                },
                error: function(err) {
                    alert('服务器无响应');
                }
            });

            return result;
        }

        //美图秀秀分享数据处理方法
        function serialize(params){
            if(typeof params == "object"){
                var str = [];
                for(var i in params){
                    str.push(i+"="+params[i]);
                }
                return str.join("&");
            }else if(typeof params == "string"){
                return params;
            }else{
                return "";
            }
        }

        //生成分享icon
        function generateShareIcon() {
            oTextImg.removeClass();
            html2canvas(oScreenshot.get(0)).then(function(canvas) {
                oShareIcon.addClass('active').html('<img src="'+ canvas.toDataURL() +'" width="750"/>');

                html2canvas(oShareIcon.get(0)).then(function(canvas2) {
                    //本地测试不允许调用微信分享
                    var sUrl = document.URL;

                    oShareIcon.removeClass('active');
                    if ( sUrl.indexOf('localhost:63342') == -1 ) {
                        var imgUrl = base64ToPic(canvas2.toDataURL());
                        if ( sUrl.indexOf('meitu.html') != -1 ) {
                            //美图秀秀设置分享图文
                            //设置分享到微信好友
                            $('#shareWeixin').attr('href', 'mtcommand://share?'+serialize({
                                type: 'weixin',
                                content: encodeURIComponent('已经有10万人与潘婷共同预见自己2016年女神新发型'),
                                imageurl: imgUrl,
                                link: encodeURIComponent('http://pantenecny.agenda-bj.com.cn/html/')
                            }));

                            //设置分享到微信朋友圈
                            $('#shareWeixinCircle').attr('href', 'mtcommand://share?'+serialize({
                                type: 'weixincircle',
                                content: encodeURIComponent('已经有10万人与潘婷共同预见自己2016年女神新发型'),
                                imageurl: imgUrl,
                                link: encodeURIComponent('http://pantenecny.agenda-bj.com.cn/html/')
                            }));
                            //alert($('#shareWeixin').attr('href'));
                            //alert($('#shareWeixinCircle').attr('href'));
                        } else if ( sUrl.indexOf('camera360.html') != -1 ) {

                            //camera360分享配置
                            //初始化分享图文及link
                            window.pgResetShare && window.pgResetShare({'imgUrl':imgUrl, 'reurl':'http://wqs.jd.com/event/brand/pantingyaoyiyao/index.shtml'});

                        } else {
                            //微信客户端设置分享图文
                            isWeixin && wxConfig && wxConfig({'wx_imgUrl':imgUrl, 'reurl':'http://wqs.jd.com/event/brand/pantingyaoyiyao/index.shtml'});
                        }
                    }
                });
            });
        }

        //使用html2canvas api
        function html2CanvasAPI( callBack ) {
            oTextImg.removeClass().eq(typeIndex).addClass('show');

            html2canvas(oScreenshot.get(0)).then(function(canvas) {
                var createUrl = null, canvasDataUrl = canvas.toDataURL();

                dataURLtoBlob(canvasDataUrl, function(msg) {
                    if ( !msg.error ) {
                        //支持本地h5解析二进制数据
                        var blob = msg.blob,
                            URL = window.URL || window.webkitURL;

                        createUrl = URL.createObjectURL(blob);
                    } else {
                        //不支持本地h5解析二进制数据，采用服务器解析数据
                        createUrl = base64ToPic(canvasDataUrl);
                    }
                });

                //生成分享图标
                generateShareIcon();

                oCanvasArea.addClass('active').html('<img src="'+ createUrl +'"/>');
                callBack && callBack();
            });
        }

        //监视花瓣掉落完毕，隐藏父节点
        oFlower.find('img').eq(0).on('webkitAnimationEnd animationEnd', function() {
            oFlower.removeClass('active');
            //oCanvasArea.addClass('active');
        });

        //点击就这发型
        oThisType.on('click', function() {
            if ( !allowSelect ) return;

            allowSelect = false;
            clearInterval(typeTimer);
            oThisType.parent().removeClass('active');
            html2CanvasAPI(function() {
                oFlower.addClass('active'); //播放花瓣掉落场景
                aBtnThree.addClass('active');
                showLayerName(2000);
                showShare(15000);
                /*oBox.one('touchstart', function() {
                    //clearTimeout(shareTimer);
                    showShare(20000);
                });*/
            });
        });

        oLayerShare.on('click', function() {
            $(this).fadeOut({'removeClass':'active'});
        });

        //点击再试一次
        oAgain.on('click', function() {
            clearTimeout(nameTimer);
            clearTimeout(shareTimer);
            aBtnThree.removeClass('active');
            oThisType.parent().addClass('active');
            oCanvasArea.removeClass('active').html('');
            oTextImg.removeClass();
            playType();
            allowSelect = true;
            //wxConfig && wxConfig({'wx_imgUrl':'http://pantenecny.agenda-bj.com.cn/share/img/share.png', 'reurl':''});
        });

        //点击抢限量礼盒
        oGift.on('click', function() {
            location.href = 'http://wqs.jd.com/event/brand/pantingyaoyiyao/index.shtml';
        });

        oSave.on('touchstart', function() {
            return false;
        });

        //输入昵称 关闭按钮
        oLayerName.find('i').on('click', function() {
            oLayerName.fadeOut({'removeClass':'active'});
        });

        //输入昵称 完成
        oLayerName.find('span').on('click', function() {
            oLayerName.fadeOut({'removeClass':'active'});
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

    //test
    //$('#hairstyle').fadeIn({'addClass':'active'});
    hairstyleModule.show();


    //location.hash设置、只兼容微信的后退后能
    var hashModule = (function() {

        var oSelect = $('#select'),
            oPreview = $('#preview'),
            oEdit = $('#edit'),
            oHairstyle = $('#hairstyle'),
            stack = []; // page stack


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

})( Zepto, jQuery );