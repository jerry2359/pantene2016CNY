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


    var faceIndex = 1;

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
                //alert('服务器无响应');
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

    //loading ui
    var loadingModule = (function() {

        var oBox = $('.loading'),
            oEm = oBox.find('em'),
            oBdo = oEm.find('bdo'),
            oP = oBox.find('p'),
            oI = oBox.find('i'),
            oFlowerArea = oBox.find('.flowerArea');

        function startLoad( selector, callBack, goHome ) {
            //选取body 延迟加载
            oBox.removeAttr('style').fadeIn({'addClass':'active', 'time':0});
            $(selector).lazyLoading({'concat':false})
                .progress(function(percent) {
                    oI.addClass('active');
                    oP.text(percent+'%');
                    oBdo.css('width', percent+'%');
                })
                .callBack(function() {
                    oBox.fadeOut({'removeClass':'active', 'callBack':function() {
                        oI.removeClass('active');
                        oP.text('0%');
                        oBdo.removeAttr('style');
                    }});
                    goHome && homeModule.show();
                    oFlowerArea.removeClass('active');
                    callBack && callBack();
                    //ClickEvent('P1.0', 1);
                });
        }

        startLoad('body', undefined, true);

        //test
        //oBox.hide();

        return {
            'startLoad': startLoad
        }

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
            ClickEvent('BUT_1.0_Start');
            //添加哈希管理
            //hashModule.addHash('select');
        });

        return {
            'hide': function() {
                oBox.fadeOut({'removeClass':'active'});
            },
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            }
        }

    })();


    //选择图片
    var selectModule = (function() {

        var oBox = $('#select'),
            oFileUpload = jQuery('.inp_fileToUpload'),
            oWeixinUpload = oBox.find('.weixinUpload'),
            oHandleResult = oBox.find('.handleResult'),
            oFileReaderArea = oBox.find('.fileReaderArea'),
            oFileshot = oFileReaderArea.find('.fileshot'),
            oResultLi = oHandleResult.find('li'),
            oThisImg = oResultLi.eq(0),
            oResultWeixinUpload = oResultLi.eq(1),
            uploadImgUrl = '';

        var dialog = $("#dialog");
        var diaBtn = $("#diaBtn");
        var diaText = $("#diaText");

        oFileUpload.removeClass('active');
        oWeixinUpload.removeClass('active');
        if ( isWeixin ) {
            if ( (window.screen.width > 320 && navigator.userAgent.match(/iphone/i)) || navigator.userAgent.match(/Android/i) ) {
                oWeixinUpload.addClass('active');
                oResultLi.eq(2).hide();
            } else {
                oFileUpload.addClass('active');
                oResultWeixinUpload.hide();
            }
        } else {
            oFileUpload.addClass('active');
            oResultWeixinUpload.hide();
        }

        //普通ajax上传
        /*oFileUpload.live("change", function () {//现在这个已经适用于多个file表单。
            handleAjaxUpload(jQuery(this).attr("id"), jQuery(this));
            ClickEvent('BUT_2.0_upload');
        });*/
        oFileUpload.UploadImg({
            url : 'http://pantenecny.agenda-bj.com.cn/home/about1',
            width : '750',
            //height : '200',
            quality : '0.6', //压缩率，默认值为0.8
            // 如果quality是1 宽和高都未设定 则上传原图
            mixsize : '10000000',
            //type : 'image/png,image/jpg,image/jpeg,image/pjpeg,image/gif,image/bmp,image/x-png',
            before : function(blob){
                //$('#img').attr('src',blob);
                //alert(blob);
                ClickEvent('BUT_2.0_upload');
            },
            error : function(res){
                /*$('#img').attr('src','');
                $('#error').html(res);*/
            },
            success : function(imgUrl){
                uploadImgUrl = imgUrl;
                showResultPage(uploadImgUrl);
            }
        });

        //相机页 微信上传
        oWeixinUpload.on('click', function() {
            handleWeixinUpload();
            ClickEvent('BUT_2.0_upload');
        });

        //结果页 微信上传
        oResultWeixinUpload.on('click', function() {
            handleWeixinUpload();
            //ClickEvent('BUT_2.0_upload');
        });

        //弹窗确定按钮
        diaBtn.on('click', function() {
            previewModule.hide();
            selectModule.show();
            oHandleResult.removeClass('active');
            dialog.hide();
        });

        //结果页 就这个
        oThisImg.on('click', handleResult);


        //处理上传结果
        function handleResult() {
            var oCartoon = $('#preview .cartoon'),
                oFlowerArea = oCartoon.find('.flowerArea');

            $('#preview .picArea').css('background-image', 'url("'+ uploadImgUrl +'")');
            oFlowerArea.addClass('active');
            oBox.fadeOut({'removeClass':'active'});
            previewModule.show();
            faceAnalysis({'img_url':uploadImgUrl, 'callBack':function(faceData) {

                if ( faceData.err_code ) {
                    dialog.show();
                    diaText.text(faceData.err_msg);
                    return;
                }
                if ( !faceData.has ) {
                    dialog.show();
                    diaText.text('别淘气，让我看到你的脸');
                    return;
                }
                /*if ( faceData.gender == 1 ) {
                 alert('请上传女生头像');
                 previewModule.hide();
                 selectModule.show();
                 oHandleResult.removeClass('active');
                 return;
                 }*/

                setPortrait({'data':faceData, 'callBack':function() {
                    setTimeout(function() {
                        oCartoon.find('.load').removeClass('active');
                        oFlowerArea.removeClass('active');
                        $('.cartoon .content').addClass('active');
                    }, 1000);
                }});
            }});
        }


        ///////////////处理普通ajax上传//////////////////
        function handleAjaxUpload( fileId, file ) {//jQuery(this).attr("id")
            //如果支持h5本地FileReader，则用本地功能压缩成base64再传到服务器
            if( false && typeof FileReader != 'undefined' && file ) {
                var file = file.get(0).files[0],
                    reader = new FileReader();

                reader.onload = function(ev) {
                    //DataURL ==> this.result
                    alert('监测到本地FileReader');
                    oFileshot.html('<img src='+ this.result +' width="750"');
                    html2canvas(oFileshot.get(0)).then(function(canvas) {
                        uploadImgUrl = base64ToPic(canvas.toDataURL());
                        showResultPage(uploadImgUrl);
                    });
                };
                reader.readAsDataURL(file);
            } else {
                ajaxFileUpload({'file_id':fileId, 'callBack':function(data) {
                    uploadImgUrl = data;
                    if ( data.indexOf('http://pantenecny.agenda-bj.com.cn') == -1 ) {
                        uploadImgUrl = 'http://pantenecny.agenda-bj.com.cn' + data;
                    }
                    //alert('服务器上的图片地址：'+uploadImgUrl);
                    showResultPage(uploadImgUrl);
                }});
            }
        }

        /*function handleAjaxUpload( fileId, file ) {//jQuery(this).attr("id")
            //如果支持h5本地FileReader，则用本地功能压缩成base64再传到服务器
            if( false && typeof FileReader != 'undefined' && file ) {
                var file = file.get(0).files[0],
                    reader = new FileReader();

                reader.onload = function(ev) {
                    //DataURL ==> this.result
                    alert('监测到本地FileReader');
                    oFileshot.html('<img src='+ this.result +' width="750"');
                    html2canvas(oFileshot.get(0)).then(function(canvas) {
                        uploadImgUrl = base64ToPic(canvas.toDataURL());
                        showResultPage(uploadImgUrl);
                    });
                };
                reader.readAsDataURL(file);
            } else {
                ajaxFileUpload({'file_id':fileId, 'callBack':function(data) {
                    uploadImgUrl = data;
                    if ( data.indexOf('http://pantenecny.agenda-bj.com.cn') == -1 ) {
                        uploadImgUrl = 'http://pantenecny.agenda-bj.com.cn' + data;
                    }
                    //alert('服务器上的图片地址：'+uploadImgUrl);
                    showResultPage(uploadImgUrl);
                }});
            }
        }*/

        ///////////////处理微信上传//////////////////
        function handleWeixinUpload() {
            requestServer.select({'callBack': function(data) {
                //alert('服务器上的图片地址：'+data);
                uploadImgUrl = data;
                showResultPage(uploadImgUrl);
            }});
        }

        ///////////////处理上传之后的结果页//////////////////
        function showResultPage( imgUrl ) {
            var newImg = new Image();

            newImg.onload = function() {
                //oHandleResult.css('background-image', 'url("'+ imgUrl +'")').addClass('active'); //显示上传结果页
                handleResult(); //直接跳转到预览页
            };
            newImg.onerror = function() {
                alert('处理失败，请重新上传');
            };
            newImg.src = imgUrl;
        }



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
            eyesPortrait.attr('src', '../img/common/eyes/'+ data.eyes +'.png');
            nosePortrait.attr('src', '../img/common/nose/'+ data.nose +'.png');
            mouthPortrait.attr('src', '../img/common/mouth/'+ data.mouth +'.png');
            browsPortrait.attr('src', '../img/common/brows/'+ data.brows +'.png');
            faceIndex = data.face;
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
                ClickEvent('P2.0', 1);
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
            ClickEvent('BUT_3.0_Face');
            //添加哈希管理
            //hashModule.addHash('edit');
        });

        //立刻换发型
        oTurnhairstyle.on('click', function() {
            hairstyleModule.inserType(function() {
                //ui load complete
                oBox.fadeOut({'removeClass':'active'});
                homeModule.hide();
                hairstyleModule.show();
            });
            ClickEvent('BUT_3.0_hair');
            //添加哈希管理
            //hashModule.addHash('hairstyle');
        });

        return {
            'hide': function() {
                oBox.fadeOut({'removeClass':'active'});
            },
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
                ClickEvent('P3.0', 1);
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
            facePortrait = aPortraitbox.find('.face'),
            eyesPortrait = aPortraitbox.find('.eyes'),
            nosePortrait = aPortraitbox.find('.nose'),
            mouthPortrait = aPortraitbox.find('.mouth'),
            browsPortrait = aPortraitbox.find('.brows');

        //切换 四官
        var aTabCode = ['BUT_4.0_Face', 'BUT_4.0_Eye', 'BUT_4.0_Nose', 'BUT_4.0_Mouth', 'BUT_4.0_Eyebrow'];
        aTabLi.on('click', function() {
            var index = $(this).index();
            oTabBox.removeClass().addClass('tab'+(index+1));
            allUl.removeClass('active').eq(index).addClass('active');
            ClickEvent(aTabCode[index]);
        });

        function prevMethod( thisParent ) {
            var thisLi = thisParent.find('li'),
                thisIndex = Number(thisParent.attr('_index'));

            if ( !thisIndex ) {
                thisParent.attr('_index', 0);
            }

            thisIndex = thisIndex > 0 ? thisIndex-1 : thisLi.length-1;
            thisLi.removeClass().eq(thisIndex).addClass('active');
            thisParent.attr('_index', thisIndex);
            ClickEvent('BUT_4.0_Pre');
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
            ClickEvent('BUT_4.0_Next');
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

            if ( thisImgSrc.indexOf('face') != -1 ) {
                //脸型
                facePortrait.attr('src', thisImgSrc);
            } else if ( thisImgSrc.indexOf('eyes') != -1 ) {
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
        //获取脸型id号
        allUl.eq(0).find('li i').each(function(index, elem) {
            $(elem).on('click', function() {
                faceIndex = index + 1;
            });
        });

        //点击完成
        oComplete.on('click', function() {
            hairstyleModule.inserType(function() {
                //ui load complete
                oBox.fadeOut({'removeClass':'active'});
                homeModule.hide();
                hairstyleModule.show();
            });
            ClickEvent('BUT_4.0_Done');
            //添加哈希管理
            //hashModule.addHash('hairstyle');
        });

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
                ClickEvent('P4.0', 1);
            }
        }

    })();


    //选择发型
    var hairstyleModule = (function() {

        var oBox = $('#hairstyle'),
            oShareIcon = oBox.find('.shareIcon'),
            oFlower = oBox.find('.flower'),
            oPortraitbox = oBox.find('.portraitbox'),
            oType = oBox.find('.type'),
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
            oLayerNameInput = oLayerName.find('input'),
            oSignName = oBox.find('.sign_name'),
            oReload = $('#reload'),
            oReloadFlowerArea = oReload.find('.flowerArea'),
            allowSelect = true,
            allowSetName = true,
            typeIndex = -1,
            typeTimer = null,
            shareTimer = null,
            nameTimer = null,
            oSignNameStr = '';

        function insertType( callBack ) {
            var str = '';

            for ( var i = 1; i < 25; i ++ ) {
                if ( i != 1 ) {
                    str += '<img src="../img/hairstyle/type/style'+ i +'/'+ faceIndex +'.png">';
                } else {
                    str += '<img class="show" src="../img/hairstyle/type/style'+ i +'/'+ faceIndex +'.png">';
                }
            }

            oReload.fadeIn({'addClass':'active'});
            oReloadFlowerArea.addClass('active');
            oType.html(str).lazyLoading({'concat':false}).callBack(function() {
                oReload.fadeOut({'removeClass':'active', 'callBack':function() {
                    oReloadFlowerArea.removeClass('active');
                }});
                callBack && callBack();
            });
        }

        function playType() {
            //$('#testIndex').html('脸型：'+faceIndex+'，发型：1');
            clearInterval(typeTimer);
            typeTimer = setInterval(function() {
                typeIndex = typeIndex < typeLen-1 ? typeIndex+1 : 0;
                oPortraitbox.removeClass().addClass('portraitbox face'+faceIndex+' type'+(typeIndex+1));
                aTypeImg.removeClass().eq(typeIndex).addClass('show');
                //$('#testIndex').html('脸型：'+faceIndex+'，发型：'+(typeIndex+1));
            }, 100);
        }

        function showShare(time) {
            if ( location.href.indexOf('meitu.html') != -1 ) return;
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
            if( navigator.userAgent.match(/Android/i) || location.href.indexOf('camera360.html') != -1 ) {
                callBack && callBack({'error':'暂不建议安卓使用blob作为保存图'});
            } else {
                callBack && callBack({'blob':new Blob([u8arr], {type:mime})});
            }
        }

        //生成分享icon
        function generateShareIcon() {
            //oTextImg.removeClass();
            html2canvas(oScreenshot.get(0)).then(function(canvas) {
                oShareIcon.addClass('active').html('<img src="'+ canvas.toDataURL() +'" width="750"/>');

                html2canvas(oShareIcon.get(0)).then(function(canvas2) {
                    //本地测试不允许调用微信分享
                    var sUrl = document.URL;

                    oShareIcon.removeClass('active');
                    if ( sUrl.indexOf('localhost:63342') == -1 ) {
                        var imgUrl = base64ToPic(canvas2.toDataURL()),
                            shareTitle = oSignNameStr != '' ? oSignNameStr+'在这里抽中了属于她的2016新发型！' : '今年有没有新恋情新事业？换个发型就知道！还能赢机票！';

                        if ( sUrl.indexOf('meitu.html') != -1 ) {
                            //美图秀秀设置分享图文
                            //设置分享到微信好友
                            $('#shareWeixin').attr('href', 'mtcommand://share?'+serialize({
                                type: 'weixin',
                                content: encodeURIComponent(shareTitle),
                                imageurl: imgUrl,
                                link: encodeURIComponent('http://pantenecny.agenda-bj.com.cn/version3/html/index.html')
                            }));

                            //设置分享到微信朋友圈
                            $('#shareWeixinCircle').attr('href', 'mtcommand://share?'+serialize({
                                type: 'weixincircle',
                                content: encodeURIComponent(shareTitle),
                                imageurl: imgUrl,
                                link: encodeURIComponent('http://pantenecny.agenda-bj.com.cn/version3/html/index.html')
                            }));
                            //alert($('#shareWeixin').attr('href'));
                            //alert($('#shareWeixinCircle').attr('href'));
                        } else if ( sUrl.indexOf('camera360.html') != -1 ) {

                            //camera360分享配置
                            //初始化分享图文及link
                            window.pgResetShare && window.pgResetShare({
                                'imgUrl':imgUrl,
                                'title': shareTitle,
                                'link': 'http://pantenecny.agenda-bj.com.cn/version3/html/index.html',
                                'reurl':'http://wqs.jd.com/event/brand/pantingyaoyiyao/index.shtml'
                            });

                        } else {
                            //微信客户端设置分享图文
                            isWeixin && wxConfig && wxConfig({
                                'wx_imgUrl': imgUrl,
                                'wx_title': shareTitle,
                                'reurl': 'http://wqs.jd.com/event/brand/pantingyaoyiyao/index.shtml'
                            });
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

                oCanvasArea.html('<img src="'+ createUrl +'"/>');
                callBack && callBack();
            });
        }

        //监视花瓣掉落完毕，隐藏父节点
        oFlower.find('img').eq(0).on('webkitAnimationEnd animationEnd', function() {
            oFlower.removeClass('active');
            oTextImg.removeClass();
            oCanvasArea.addClass('active');
            //生成分享图标
            generateShareIcon();
            showShare(5000);
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
                meituShareModule.showIcon();
                ClickEvent('P6.0', 1);
                //showLayerName(4000);
                /*oBox.one('touchstart', function() {
                    //clearTimeout(shareTimer);
                    showShare(20000);
                });*/
            });
            ClickEvent('BUT_5.0_Done');
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
            oSignName.removeClass('active').html('');
            meituShareModule.hideIcon();
            playType();
            allowSelect = true;
            allowSetName = true;
            oSignNameStr = '';
            ClickEvent('BUT_6.0_Again');
            ClickEvent('P5.0', 1);
            //wxConfig && wxConfig({'wx_imgUrl':'http://pantenecny.agenda-bj.com.cn/share/img/share.png', 'reurl':''});
        });

        //点击抢限量礼盒
        oGift.on('click', function() {
            ClickEvent('BUT_6.0_Gift');
            setTimeout(function() {
                location.href = 'http://wqs.jd.com/event/brand/pantingyaoyiyao/index.shtml';
            }, 200);
        });

        oSave.on('touchstart', function() {
            return false;
        });

        //输入昵称 关闭按钮
        oLayerName.find('i').on('click', function() {
            showShare(8000);
            oLayerName.fadeOut({'removeClass':'active'});
        });

        //输入昵称 完成
        oLayerName.find('span').on('click', function() {
            if ( !allowSetName ) return;
            allowSetName = false;
            oSignNameStr = oLayerNameInput.val();
            oSignName.text(oSignNameStr).addClass('active');
            setTimeout(function() {
                html2CanvasAPI(function() {
                    oLayerName.fadeOut({'removeClass':'active'});
                    showShare(8000);
                    //生成分享图标
                    generateShareIcon();
                });
            }, 500);
        });

        return {
            'hide': function() {
                oBox.fadeOut({'removeClass':'active'});
            },
            'show': function() {
                aTypeImg = oBox.find('.type img');
                typeLen = aTypeImg.length;
                //$('#testIndex').html('脸型：'+faceIndex+'，发型：1');
                oBox.fadeIn({'addClass':'active', 'callBack':playType});
                ClickEvent('P5.0', 1);
            },
            'inserType': insertType
        }

    })();

    //test
    //$('#hairstyle').fadeIn({'addClass':'active'});
    /*$('.loading').hide();
    faceIndex = 7;
    $('#hairstyle .portraitbox').removeClass().addClass('portraitbox type'+faceIndex);
    hairstyleModule.inserType(function() {
        homeModule.hide();
        hairstyleModule.show();
        $('#hairstyle .portraitbox .type img').removeClass().eq(faceIndex-1).addClass('show');
    });*/


    //美图分享图层
    var meituShareModule = (function() {

        if ( location.href.indexOf('meitu.html') == -1 ) {
            return {
                'show': function() {
                },
                'hide': function() {
                },
                'showIcon': function() {
                },
                'hideIcon': function() {
                }
            }
        }

        var oBox = $('#meitu_share_layer'),
            oIcon = $('.meitu_share_icon'),
            shareTitle = '今年有没有新恋情新事业？换个发型就知道！还能赢机票！',
            shareImgUrl = 'http://pantenecny.agenda-bj.com.cn/share/img/share.png',
            shareLink = 'http://pantenecny.agenda-bj.com.cn/version3/html/index.html';

        //设置默认分享文案
        $('#shareWeixin').attr('href', 'mtcommand://share?'+serialize({
            type: 'weixin',
            content: encodeURIComponent(shareTitle),
            imageurl: shareImgUrl,
            link: encodeURIComponent(shareLink)
        }));

        //设置分享到微信朋友圈
        $('#shareWeixinCircle').attr('href', 'mtcommand://share?'+serialize({
            type: 'weixincircle',
            content: encodeURIComponent(shareTitle),
            imageurl: shareImgUrl,
            link: encodeURIComponent(shareLink)
        }));

        //点击分享icon打开弹层
        oIcon.on('click', function() {
            oBox.fadeIn({'addClass':'active'});
        });

        //关闭
        oBox.find('.close').on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
        });

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            },
            'hide': function() {
                oBox.fadeOut({'removeClass':'active'});
            },
            'showIcon': function() {
                oIcon.fadeIn({'addClass':'active'});
            },
            'hideIcon': function() {
                oIcon.fadeOut({'removeClass':'active'});
            }
        }

    })();


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