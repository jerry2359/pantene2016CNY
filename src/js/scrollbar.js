/**
 * Created by LinJe on 2015/11/10.
 * 基于zepto的自定义滚动条插件
 */
;(function( $, window, document, undefined ) {

    $.extend($.fn, {
        'vScrollbar': function( settings ) {
            var defs = {
                'scrollEle':'.scrollWrap',
                'scrollBarEle': '.scrollBar',
                'scrollHandleEle': '.scrollHandle',
                'scrollBar': false,
                'easeSpeed': 5
            };

            $.extend(defs, settings);

            var $this = $(this),
                scrollEle = $this.find(defs.scrollEle),
                scrollBarEle = $this.find(defs.scrollBarEle),
                scrollHandleEle = $this.find(defs.scrollHandleEle),
                scrollBar = defs.scrollBar,
                winHeight = parseInt($this.css('height')),
                scrollHeight = undefined,
                scrollBarH = parseInt(scrollBarEle.css('height')) - parseInt(scrollHandleEle.css('height')),
                easeSpeed = defs.easeSpeed,
                startY = 0, distance = 0, oldDistance = 0,
                disBox = [],
                timerScrollH = null, timerScrollOut = null;

            if ( !$.fn.animate ) {
                var styleNode = document.createElement('style');
                styleNode.type = 'text/css';
                styleNode.innerHTML = defs.scrollEle+'.scrollTransition{-webkit-transition:300ms all ease-out;transition:300ms all ease-out;}';
                document.getElementsByTagName('head')[0].appendChild(styleNode);
            }

            var setTranslate = function( $obj, y ) {
                    var transVal = 'translateY('+ y +'px)';
                    $obj.css({'-webkit-transform':transVal, 'transform':transVal});
                },
                getHandleDis = function() {
                    return Math.abs(distance/scrollHeight * scrollBarH);
                },
                setHandle = function() {
                    setTranslate(scrollHandleEle, getHandleDis());
                },
                slowAction = function( $obj, target ) {
                    var transVal = 'translateY('+ target +'px)';
                    if ( $.fn.animate ) {
                        $obj.animate({'-webkit-transform':transVal, 'transform':transVal}, 300, 'ease-out');
                    } else {
                        $obj.addClass('scrollTransition').css({'-webkit-transform':transVal, 'transform':transVal});
                    }
                },
                rangeDistance = function() {
                    if ( distance > 0 ) {
                        distance = 0;
                    } else if ( distance < scrollHeight ) {
                        distance = scrollHeight < 0 ? scrollHeight : 0;
                    }
                },
                getScrollH = function( callBack ) {
                    clearInterval(timerScrollH);
                    clearTimeout(timerScrollOut);
                    timerScrollH = setInterval(function() {
                        var tmpScrollH = scrollEle.get(0).scrollHeight;
                        if ( !scrollHeight ) {
                            if ( tmpScrollH > winHeight ) {
                                scrollHeight = winHeight - tmpScrollH;
                            }
                        } else {
                            clearInterval(timerScrollH);
                            clearTimeout(timerScrollOut);
                            callBack && callBack();
                        }
                    }, 100);
                    timerScrollOut = setTimeout(function() {
                        clearInterval(timerScrollH);
                        $(window).on('load', function() {
                            scrollHeight = winHeight - scrollEle.get(0).scrollHeight;
                            callBack && callBack();
                        });
                    }, 10000);
                };


            getScrollH();

            $this.on('touchstart', function(ev) {
                disBox = [];
                oldDistance = distance;
                startY = ev.changedTouches[0].pageY;
                scrollEle.removeClass('scrollTransition');
            });

            $this.on('touchmove', function(ev) {
                var moveY = ev.changedTouches[0].pageY;

                distance = moveY - startY + oldDistance;
                rangeDistance();

                if ( distance != oldDistance ) {
                    setTranslate(scrollEle, distance);
                    scrollBar && setHandle();
                    disBox.push(moveY);
                }
                ev.preventDefault();
            });

            $this.on('touchend', function(ev) {
                var len = disBox.length,
                    speed = (disBox[len-1]-disBox[len-2]) * easeSpeed; //设置滚动的缓动灵敏度倍数

                if ( typeof speed == 'number' && speed === speed ) {
                    distance += speed;
                    rangeDistance();
                    slowAction(scrollEle, distance);
                    scrollBar && slowAction(scrollHandleEle, getHandleDis());
                }
            });

            //重置滚动区域
            $this.resize = function() {
                startY = 0;
                distance = 0;
                oldDistance = 0;
                scrollHeight = undefined;
                getScrollH(function() {
                    setTranslate(scrollEle, distance);
                    scrollBar && setHandle();
                });
            };

            return $this;
        }
    });

})( Zepto, window, document );
