function faceAnalysis( settings ){
	var webPath = 'http://test.agenda-bj.com.cn:8090';
	var api_key = 'f94488ea323f919860af56301cb54c6f';
	var api_secret = '-R-9WvP95GQeAIGUcbSRaRhwgyYOrc4x';
	
	//错误提示
	var err_code = 0;
	var err_msg = "";
	//是否有脸
	var hasTF = false;
	//是否带镜
	var glassTF = false;
	//是否黑超
	var glassStr = "";
	//性别（1男2女）
	var genderNum = 0;
	
	//数据
	var all_json;
	var all_data;
	var all_str;
	var face_id;
	var face_ht;
	var face_wd;

	//五官取值
	var faceNum = 3;
	var eyeNum = 8;
	var browNum = 3;
	var noseNum = 3;
	var mouseNum = 5;
	
	//下巴宽度9
	var faceWd9 = 0;
	//下巴宽度6
	var faceWd6 = 0;
	//下巴斜度
	var faceBd = 0;
	
	//眉毛厚度
	var browHt = 0;
	//眉毛弯度(偏上为负)
	var browBd = 0;
	
	//眼球高度
	var eyeHt = 0;
	//眼睛弯度(偏上为负)
	var eyeBd = 0;
	
	//鼻子宽度
	var noseWd = 0;
	//鼻子弧度(偏左为负)
	var noseBd = 0;
	
	//嘴内高度
	var mouseHt = 0;
	//嘴唇厚度
	var lipHt = 0;

	var api = new FacePP(api_key,api_secret);

	var img_url = settings.img_url;
	var callBack = settings.callBack;

	api.request('detection/detect', {
		  url: img_url,
		  mode:"oneface",
		  attribute:["gender","age","race","smiling","glass"]
		}, function(err, result) {
		  if (err) {
		  	//分析有误
		    console.log(err+"\n"+result.error);
		    err_code = 1;
		    err_msg = result.error;
		    alert(result.error);
			//callBack && callBack(initValue());
		    return;
		  }
		  //分析结果		  
		  all_json = result;
		  all_str = JSON.stringify(result, null, 2);
		  console.log(all_str);
		  
		  if(all_json.face.length==0){
		  	hasTF = false;
		  	//alert("别淘气，让我看到你的脸！");
			callBack && callBack(initValue());
		  	return;
		  }
		  hasTF = true;
		  all_data = all_json.face[0].attribute;
		  face_id = all_json.face[0].face_id;
		  //alert("face_id=="+face_id);
	  		genderNum = (all_data.gender.value=="Male"?1:2);
	  		if(genderNum!=1){
	  			//alert("这是男人的照片，请上传妹子的美照噢！");
	  			//return;
	  		}
	  		
	  		if(all_data.glass){
		  		if(all_data.glass.value=="Dark"||all_data.glass.value=="Normal"){
		  			glassStr = all_data.glass.value;
		  			glassTF = true;
		  		}else{
		  			glassTF = false;
		  		}
	  		}
	  		console.log("all_data.glass=="+all_data.glass+","+glassTF);
	  		
	      //text2.innerHTML = all_str;
	      
	      face_ht = (all_json.face[0].position.height).toFixed(1);
	      face_wd = (all_json.face[0].position.width).toFixed(1);
	      
	      //详细分析
		  	myLab.ajax({
            type: 'post',
            url: 'http://api.faceplusplus.com/detection/landmark?api_secret='+api_secret+'&api_key='+api_key+'&face_id='+face_id+'&type=83p',
            dataType: 'text',
            success: function (data) {
                console.log(data);
		        		
		        		all_json = JSON.parse(data);
		        		all_data = all_json.result[0].landmark;
		        		
		        		//下巴宽度
		        		faceNum = disFn(all_data.contour_right9.x,all_data.contour_left9.x)/face_wd;
		        		//眉毛厚度
						browNum = disFn(all_data.left_eyebrow_upper_middle.y,all_data.left_eyebrow_lower_middle.y)/face_ht;
		        		//眼球高度
						eyeNum = disFn(all_data.left_eye_bottom.y,all_data.left_eye_top.y)/face_ht;
						//鼻子高度
						noseNum = disFn(all_data.nose_contour_left1.y,all_data.nose_contour_lower_middle.y)/face_ht;
						//嘴内高度
						mouseNum = disFn(all_data.mouth_upper_lip_bottom.y,all_data.mouth_lower_lip_top.y)/face_ht;
						
						//下巴宽度69
						faceWd6 = disFn(all_data.contour_right6.x,all_data.contour_left6.x)/face_wd;
						faceWd9 = faceNum;
		        		
		        		//下巴斜度
		        		faceBd = faceWd6/faceWd9;
						
						//眉毛宽度
						browHt = disFn(all_data.left_eyebrow_left_corner.x,all_data.left_eyebrow_right_corner.x)/face_wd;
						//眉毛弯度(偏上为负)
						browBd = (all_data.left_eyebrow_left_corner.y-all_data.left_eyebrow_lower_middle.y)/face_ht;
	
						//眼球高度
						eyeHt = eyeNum;
						//眼睛弯度(偏上为负)
						eyeBd = (all_data.left_eye_left_corner.y-all_data.left_eye_center.y)/face_ht;
	
						//鼻子宽度
						noseWd = disFn(all_data.nose_left.x,all_data.nose_right.x)/face_wd;
						//鼻子弧度(偏左为负)
						noseBd = (all_data.nose_tip.x-all_data.nose_contour_lower_middle.x)/face_wd;
	
						//嘴内高度
						mouseHt = mouseNum;
						//嘴唇厚度
						lipHt = disFn(all_data.mouth_lower_lip_bottom.y,all_data.mouth_lower_lip_top.y)/face_ht;

						callBack && callBack(valueFn());
            }
        });
	    });
	    
	    //差值判断
      function disFn(n1,n2){
      	var _re = Math.abs(Number(n1)-Number(n2));
      	return _re.toFixed(1);
      }
      
	    //比值计算
      function ratioFn(_num,value_max,num_min,num_max,value_init){
      	if(_num<num_min){
      		_num = num_min;
      	}
      	if(_num>num_max){
      		_num = num_max;
      	}
      	var _value = 0;
      	_value = Math.round((_num-num_min)/(num_max-num_min) * value_max);
		if(_value<1){
      		_value = 1;
      	}
      	if(_value>value_max){
      		_value = value_max;
      	}
      	return Number(Number(_value).toFixed(0))+value_init-1;
      }
      
      //脸谱逻辑(类别、总数、当前弧度、弧度最小值、弧度最大值、当前厚度、厚度最小值、厚度最大值)
      function facialFn(_num,value_max,num_min,num_max,_type,_bd,bd_min,bd_max){
      	var value_init = 1;
      	if(_type=="face"){
      		//面部长宽比
      		//var face_lt = disFn(all_data.contour_chin.y,all_data.left_eyebrow_upper_middle.y)/disFn(all_data.contour_right1.x,all_data.contour_left1.x);
      		var _faceNum = ratioFn(_num,12,num_min,num_max,1);
      		if(_faceNum<=3){
      			_faceNum = 3;
      		}
      		if(_faceNum>=5&&_faceNum<=6){
      			_faceNum = 6;
      		}
      		if(_faceNum>6){
      			_faceNum = 12;
      		}
      		return _faceNum;
      	}else if(_type=="brow"){
      		var _browNum = 17;
      		if(_bd<0){
      			//上挑眉
      			_browNum = ratioFn(_num,6,num_min,num_max,1);
      			if(_browNum==4||_browNum==5){
      				_browNum = 3;
      			}
      			return _browNum;
      		}else{
      			/*if(_bd>0.05){
      				//弯眉
      				return ratioFn(_bd,3,bd_min,bd_max,23);
      			}else{
      				//正常眉
      				return ratioFn(_num,16,num_min,num_max,7);
      			}*/
      			//正常眉
      			_browNum = ratioFn(_num,8,num_min,num_max,7);
      			return _browNum;
      		}
      	}else if(_type=="eye"){
      		if(glassTF){
      			//戴镜
      			if(genderNum==2){
      				if(glassStr=="Dark"){
      					return 41;
      				}else{
      					return 40;
      				}
      			}else{
      				if(glassStr=="Dark"){
      					return 45;
      				}else{
      					return 43;
      				}
      			}
      		}else{
      			if(_num<0.06){
      				//闭眼
      				return ratioFn(_num,3,num_min,0.06,1);
      			}else{
      				var eye_num = 17;
      				if(_bd<-0.01){
      					//上挑眼
      					eye_num = ratioFn(_num,8,num_min,num_max,30);
      				}else{
      					//正常眼
      					eye_num = ratioFn(_num,26,num_min,num_max,4);
      				}
      				if(eye_num==30||eye_num==31){
      					eye_num = 32;
      				}
      				if(eye_num==36||eye_num==37){
      					eye_num = 34;
      				}
      				if(eye_num==5){
      					eye_num = 6;
      				}
      				return eye_num;
      			}
      		}
      	}else if(_type=="nose"){
      		if(_bd<-0.03){
      			//左偏鼻
      			return ratioFn(_num,3,num_min,num_max,19);
      		}else if(_bd>0.03){
      			//右偏鼻
      			return ratioFn(_num,7,num_min,num_max,1);
      		}else{
      			//正常鼻
      			return ratioFn(_num,10,num_min,num_max,8);
      		}
      	}else if(_type=="mouse"){
      		if(_num<0.022){
      			//闭嘴
      			return ratioFn(_bd,10,bd_min,bd_max,3);
      		}else{
      			if(lipHt<0.08){
      				//薄唇
      				return ratioFn(_num,9,num_min,num_max,13);
      			}else{
      				//厚唇
      				return ratioFn(_num,6,num_min,num_max,24);
      			}
      		}
      	}
      	return ratioFn(_num,value_max,num_min,num_max,value_init);
      }
      
      function initValue(){
      	glassTF = false;
		faceNum = 4;
		eyeNum = 17;
		noseNum = 12;
		browNum = 17;
		mouseNum = 13;
		console.log("此为默认值");
      	//return valueFn();
    	return {"err_code":err_code,"err_msg":err_msg,"has":hasTF,"gender":genderNum,"glass":glassTF,"face":faceNum,"brows":browNum,"eyes":eyeNum,"nose":noseNum,"mouth":mouseNum};
      }
      
      function valueFn(){
      	//return {"err_code":err_code,"err_msg":err_msg,"has":hasTF,"gender":genderNum,"glass":glassTF,"face":ratioFn(faceNum,6,0.2,0.33),"brows":ratioFn(browNum,6,0.05,0.09),"eyes":ratioFn(eyeNum,23,0.036,0.11),"nose":ratioFn(noseNum,6,0.31,0.39),"mouth":ratioFn(mouseNum,12,0.034,0.098)};
      
      	return {"err_code":err_code,"err_msg":err_msg,"has":hasTF,"gender":genderNum,"glass":glassTF,"face":facialFn(faceNum,16,0.2,0.32,'face',faceBd,2.5,3.1),"brows":facialFn(browNum,22,0.03,0.07,'brow',browBd,-0.02,0.09),"eyes":facialFn(eyeNum,37,0.036,0.11,'eye',eyeBd,-0.019,0.019),"nose":facialFn(noseNum,21,0.31,0.39,'nose',noseBd,-0.04,0.04),"mouth":facialFn(mouseNum,28,0.034,0.098,'mouse',lipHt,0.058,0.1)};
      }
}
  	
      
      