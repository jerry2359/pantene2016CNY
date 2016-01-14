/**
 * Created by LinJe on 2015/11/26.
 * H5 Animation 动画框架
 * 依赖 zepto.js
 */
;(function( $, window, document, undefined ) {

    //用于html中的标签，此标签保存了所有的动画数据
    var animateTag = 'data-animate',
        autoRenderTag = 'data-autoRender',
        styleTag = document.createElement('style'),
        styleStr = '';

    //生成的唯一动画存储到缓存中，确保其唯一性
    var cacheAnimation = {};

    /**
     * 基础模板
     * 可在模板的基础上调整动画细节
     */
    var template = {
        'animationDefs': {
            'duration': 1000,
            'function': 'ease',
            'fillMode': 'both',
            'infinite': false,
            'alternate': false
        },

        //滑动效果
        'slide': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        },

        //淡出效果
        'fadeIn': {
            'defs': {
                'startX': 0,
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0,
                'startOpacity': 0,
                'targetOpacity': 1
            },
            'style': '@-webkit-keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: #targetOpacity#;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }\n\
                        @keyframes #animationClass# {\n\
                            0% {\n\
                                opacity: #startOpacity#;\n\
                                -webkit-transform: translate3d(#startX#, #startY#, #startZ#);\n\
                                transform: translate3d(#startX#, #startY#, #startZ#);\n\
                            }\n\
                            100% {\n\
                                opacity: #targetOpacity#;\n\
                                -webkit-transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                                transform: translate3d(#targetX#, #targetY#, #targetZ#);\n\
                            }\n\
                        }'
        }
    };

    //扩展模板
    $.extend(template, {
        'fadeInLeft': {
            'defs': {
                'startX': '-100%',
                'startY': 0,
                'startZ': 0,
                'targetX': 0,
                'targetY': 0,
                'targetZ': 0
            },
            'style': template.fadeIn.style
        }
    });

    //定义基础对象原型
    var superBase = function() {
        var _this = this;
        _this.defs = {};
        _this.styleInfo = {};
        $.extend(_this.defs, template.animationDefs);
    };

    superBase.prototype.handleStyle = function( style, animationClass ) {
        var _this = this,
            newStyle = style.replace(/(#\w+#)/g, function($0) {
                var attr = $0.replace(/#/g, '');
                return attr != 'animationClass' ? _this.defs[attr] : animationClass;
            });

        return newStyle;
    };

    superBase.prototype.getStyle = function() {
        return this.styleInfo;
    };

    superBase.prototype.addAnimate = function( opts ) {
        var _this = this,
            defs = _this.defs,
            animationName = opts.animation,
            animationClass = animationName,
            curTemplate = template[animationName],
            duration,
            timingFunction,
            fillMode,
            infinite,
            alternate,
            delay;

        $.extend(defs, curTemplate.defs); //合并默认参数
        $.extend(defs, opts.details); //动画数据参数覆盖默认参数

        //console.log(defs);
        duration = defs.duration;
        timingFunction = defs.function;
        fillMode = defs.fillMode;
        delay = defs.delay;
        infinite = defs.infinite ? '-webkit-animation-iteration-count:infinite; animation-iteration-count:infinite;\n' : '';
        alternate = defs.alternate ? '-webkit-animation-direction:alternate; animation-direction:alternate;\n' : '';
        delay = delay ? '-webkit-animation-delay:'+delay+'ms; animation-delay:'+delay+'ms;\n' : '';

        //console.log(curTemplate);

        $.each(defs, function(attr, key) {
            animationClass += key;
        });

        //为兼容css样式命名书写规范，分别处理%号、贝塞尔格式、去掉 "."
        animationClass = animationClass.replace(/\%|\.|\(.+\)/g, function($0) {
            var result;
            if ( $0.indexOf('%') == -1 ) {
                result = $0.replace(/\(|\)|\,|\s|\./g, '');
            } else if ( $0.indexOf('.') != -1 ) {
                result = '';
            } else {
                result = 'percent';
            }
            return result;
        });

        _this.styleInfo = {
            'animationClass': animationClass,
            'style': '\n' + _this.handleStyle(curTemplate.style, animationClass) +
                            '\n.active>.'+ animationClass +' {\n\
                                -webkit-animation-name: '+ animationClass +';\n\
                                animation-name: '+ animationClass +';\n\
                                -webkit-animation-timing-function: '+ timingFunction +';\n\
                                animation-timing-function: '+ timingFunction +';\n\
                                -webkit-animation-duration: '+ duration +'ms;\n\
                                animation-duration: '+ duration +'ms;\n\
                                -webkit-animation-fill-mode: '+ fillMode +';\n\
                                animation-fill-mode: '+ fillMode +';\n\
                                '+ infinite + alternate + delay +'\n\
                            }'
        };

        return _this;
    };

    superBase.prototype.resetConfig = function(){
        var _this = this;
        _this.defs = {};
        _this.styleInfo = {};
        $.extend(_this.defs, template.animationDefs);
    };

    //字符串转json数据
    superBase.prototype.strToJson = function(str){
        return (new Function("return " + str))();
    };

    //模板继承扩展
    superBase.prototype.extendTemplate = function( newTemplate ) {
        $.extend(template, newTemplate);
        return this;
    };

    /**
     * 动画渲染
     * 1、获取页面中所有动画数据
     * 2、添加动画样式
     * 3、渲染到每个标签的class上
     */
    superBase.prototype.render = function() {
        var _this = this, $context, children;

        $context = arguments.length > 1 ? $(arguments[0], arguments[1]) : $(arguments[0]);
        children = $context.find('['+ animateTag +']');
        $($context.concat(children)).each(function() {
            _this.resetConfig();

            var thisTag = $(this),
                dataAnimate = _this.strToJson(thisTag.attr(animateTag)),
                styleInfo,
                animationClass,
                style;

            //console.log(template.animationDefs);
            if ( dataAnimate ) {
                styleInfo = _this.addAnimate(dataAnimate).getStyle();
                animationClass = styleInfo.animationClass;
                style = styleInfo.style;

                thisTag.addClass(animationClass);
                if ( !cacheAnimation[animationClass] ) {
                    styleStr += style;
                    cacheAnimation[animationClass] = style;
                }
            };
        });

        styleTag.innerHTML = styleStr;
        $(styleTag).remove();
        $('head').append(styleTag);

        return _this;
    };


    var baseAnimate = new superBase();

    //公开对外方法
    window.jerryAnimate = function() {
        if ( arguments.length != 0 ) {
            if ( arguments.length > 1 ) {
                baseAnimate.render(arguments[0], arguments[1]);
            } else {
                baseAnimate.render(arguments[0]);
            }
        }
        return baseAnimate;
    };

    jerryAnimate.template = template;


    //是否自动渲染动画
    $(document).ready(function() {
        $('body').find('['+ autoRenderTag +']').each(function() {
            var thisScript = $(this);
            if ( thisScript.attr(autoRenderTag) == 'true' ) {
                jerryAnimate('body').render();
                return;
            };
        });
    });

})( Zepto, window, document );