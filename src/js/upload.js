    /**
     * 获得base64
     * @param {Object} o
     * @param {Number} [o.width] 图片需要压缩的宽度
     * @param {Number} [o.height] 图片需要压缩的高度，为空则会跟随宽度调整
     * @param {Number} [o.quality=0.8] 压缩质量，不压缩为1
     * @param {Number} [o.mixsize] 上传图片大小限制
     * @param {Number} [o.type] 上传图片格式限制
     * @param {Function} [o.before(blob)] 处理前函数,this指向的是input:file
     * @param {Function} o.success(obj) 处理后函数
     * @param {Function} o.error(obj) 处理后函数
     * @example
     *
     * $('#test').UploadImg({
            url : '/upload.php',
            width : '320',
            //height : '200',
            quality : '0.8', //压缩率，默认值为0.8
            // 如果quality是1 宽和高都未设定 则上传原图
            mixsize : '1',
            //type : 'image/png,image/jpg,image/jpeg,image/pjpeg,image/gif,image/bmp,image/x-png',
            before : function(blob){
                //上传前返回图片blob
                $('#img').attr('src',blob);
            },
            error : function(res){
                //上传出错处理
                $('#img').attr('src','');
                $('#error').html(res);
            },
            success : function(res){
                //上传成功处理
                $('#imgurl').val(res);
            }
        });
     */

    ;(function( $ ) {

        $.fn.UploadImg = function(o){
            this.change(function(){
                var file = this.files['0'];
                //console.log(file);
                //$('#error').html(file.type);
                if(file.size && file.size > o.mixsize){
                    o.error('大小超过限制');
                    this.value='';
                }else if(o.type && o.type.indexOf(file.type) < 0){
                    o.error('格式不正确');
                    this.value='';
                }else{
                    var URL = URL || webkitURL;
                    var blob = URL.createObjectURL(file);
                    o.before(blob);
                    _compress(blob,file);
                    this.value='';
                }
            });

            function _compress(blob,file){
                var img = new Image();
                img.src = blob;
                img.onload = function(){
                    var thisImg = this;
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var w = 0;
                    var h = 0;
                    var orientation = null;

                    //获取照片方向角属性，用户旋转控制
                    EXIF.getData(file, function() {
                        // alert(EXIF.pretty(this));
                        EXIF.getAllTags(this);
                        //alert(EXIF.getTag(this, 'Orientation'));
                        orientation = EXIF.getTag(this, 'Orientation');

                        if(!o.width && !o.height && o.quality == 1){
                            w = thisImg.width;
                            h = thisImg.height;
                        }else{
                            w = o.width || thisImg.width;
                            h = o.height || w/thisImg.width*thisImg.height;
                        }
                        $(canvas).attr({width : w, height : h});
                        ctx.drawImage(thisImg, 0, 0, w, h);
                        var base64 = canvas.toDataURL(file.type, (o.quality || 0.8)*1 );

                        //修复ios5+ drawImage画面扭曲 和旋转角度
                        if( navigator.userAgent.match(/iphone/i) ) {
                            //alert('旋转度：'+orientation);
                            var mpImg = new MegaPixImage(thisImg);
                            mpImg.render(canvas, { maxWidth: w, maxHeight: h, quality: o.quality || 0.8, orientation: orientation });
                            base64 = canvas.toDataURL(file.type, o.quality || 0.8 );
                        }

                        // 修复android
                        if( navigator.userAgent.match(/Android/i) ) {
                            var encoder = new JPEGEncoder();
                            base64 = encoder.encode(ctx.getImageData(0,0,w,h), o.quality * 100 || 80 );
                            //alert(base64);
                        }

                        //_ajaximg(base64,file.type);
                        //console.log(file.type);
                        base64ToPic(base64, file.type);
                    });
                };
            }

            //根据base64合成图片，返回一张图
            function base64ToPic( base64, type ) {
                $.ajax({
                    type: 'post',
                    dataType: 'text',
                    url: o.url,
                    data: {
                        'Ext': type,
                        'base64str': base64
                    },
                    success: function (imgUrl) {
                        o.success(imgUrl);
                    },
                    error: function(res) {
                        o.error(res.msg);
                        //alert('服务器无响应');
                    }
                });
            }

            /*function _ajaximg(base64,type,file){
             $.post(o.url,{base64:base64,type:type},function(res){
             var res = eval('(' + res + ')');
             if(res.status == 1){
             o.error(res.msg);
             }else{
             o.success(res.imgurl);
             }
             console.log(res);
             });

             }*/
        };

    })( jQuery );

