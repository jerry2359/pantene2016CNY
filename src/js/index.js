/**
 * Created by LinJe on 2015/12/17.
 */
;(function( $ ) {

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


    //loading ui
    (function() {

        var oBox = $('.loading'),
            oBdo = oBox.find('bdo'),
            oEm = oBox.find('em');

        //选取body 延迟加载
        $('body').lazyLoading()
            .concat([
                '../img/common/face/1.png', '../img/common/face/2.png', '../img/common/face/3.png',
                '../img/common/face/4.png', '../img/common/face/5.png', '../img/common/face/6.png'
            ])
            .progress(function(percent) {
                oBdo.text(percent+'%');
                oEm.css('width', percent+'%');
            })
            .callBack(function() {
                oBox.fadeOut({'removeClass':'active'});
                homeModule.show();
            });

    })();


    //首页
    var homeModule = (function() {

        var oBox = $('#home'),
            oStart = oBox.find('.start');

        oStart.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            selectModule.show();
        });

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
            }
        }

    })();


    //选择图片
    var selectModule = (function() {

        var oBox = $('#select');

        return {
            'show': function() {
                oBox.fadeIn({'addClass':'active'});
                setTimeout(function() {
                    oBox.fadeOut({'removeClass':'active'});
                    previewModule.show();
                }, 2000);
            }
        }

    })();


    //预览
    var previewModule = (function() {

        var oBox = $('#preview'),
            oDressup = oBox.find('.dressup'),
            oTurnhairstyle = oBox.find('.turnhairstyle');

        //不够美，调一下
        oDressup.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            editModule.show();
        });

        //立刻换发型
        oTurnhairstyle.on('click', function() {
            oBox.fadeOut({'removeClass':'active'});
            hairstyleModule.show();
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

        //点击 上一页
        aPrev.on('click', function() {
            var $this = $(this),
                thisParent = $this.parent(),
                thisLi = thisParent.find('li'),
                thisIndex = Number(thisParent.attr('_index'));

            if ( !thisIndex ) {
                thisParent.attr('_index', 0);
            }

            thisIndex = thisIndex > 0 ? thisIndex-1 : thisLi.length-1;
            thisLi.removeClass().eq(thisIndex).addClass('active');
            thisParent.attr('_index', thisIndex);
        });

        //点击 下一页
        aNext.on('click', function() {
            var $this = $(this),
                thisParent = $this.parent(),
                thisLi = thisParent.find('li'),
                thisIndex = Number(thisParent.attr('_index'));

            if ( !thisIndex ) {
                thisParent.attr('_index', 0);
            }

            thisIndex = thisIndex < thisLi.length-1 ? thisIndex+1 : 0;
            thisLi.removeClass().eq(thisIndex).addClass('active');
            thisParent.attr('_index', thisIndex);
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
            oPortraitbox = oBox.find('.portraitbox'),
            aTypeImg = oBox.find('.type img'),
            typeLen = aTypeImg.length,
            oThisType = oBox.find('.thistype'),
            oAgain = oBox.find('.again'),
            oSave = oBox.find('.save'),
            oGift = oBox.find('.gift'),
            oLayerShare = oBox.find('.layer_share'),
            typeIndex = 0,
            typeTimer = null,
            shareTimer = null;

        function playType() {
            clearInterval(typeTimer);
            typeTimer = setInterval(function() {
                oPortraitbox.removeClass().addClass('portraitbox type'+(typeIndex+1));
                aTypeImg.removeClass().eq(typeIndex).addClass('show');
                typeIndex = typeIndex < typeLen-1 ? typeIndex+1 : 0;
            }, 1000);
        }

        function showShare() {
            clearTimeout(shareTimer);
            shareTimer = setTimeout(function() {
                oLayerShare.fadeIn({'addClass':'active'});
            }, 3000);
        }

        oThisType.on('click', function() {
            clearInterval(typeTimer);
            $(this).removeClass('active');
            oAgain.addClass('active');
            oSave.addClass('active');
            oGift.addClass('active');
            showShare();
            oBox.one('touchstart', function() {
                clearTimeout(shareTimer);
            });
        });

        oLayerShare.on('click', function() {
            $(this).fadeOut({'removeClass':'active'});
        });

        //点击再试一次
        oAgain.on('click', function() {
            $(this).removeClass('active');
            oSave.removeClass('active');
            oGift.removeClass('active');
            oThisType.addClass('active');
            playType();
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

})( Zepto );