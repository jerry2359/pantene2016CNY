function faceAnalysis( settings ){
	var webPath = 'http://test.agenda-bj.com.cn:8090';
	var api_key = 'f94488ea323f919860af56301cb54c6f';
	var api_secret = '-R-9WvP95GQeAIGUcbSRaRhwgyYOrc4x';
	
	var err_code = 0;
	var err_msg = "";
	var hasTF = false;
	var glassTF = false;
	var genderNum = 0;
	
	var all_json;
	var all_data;
	var all_str;
	var face_id;
	var face_ht;
	var face_wd;

	var faceNum = 3;
	var eyeNum = 8;
	var noseNum = 3;
	var browNum = 3;
	var mouseNum = 5;

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
			callBack && callBack(initValue());
		    return;
		  }
		  //分析结果		  
		  all_json = result;
		  all_str = JSON.stringify(result, null, 2);
		  console.log(all_str);
		  
		  if(all_json.face.length==0){
		  	hasTF = false;
			callBack && callBack(initValue());
		  	return;
		  }
		  hasTF = true;
		  all_data = all_json.face[0].attribute;
		  face_id = all_json.face[0].face_id;
		  //alert("face_id=="+face_id);
	  		
	  		if(all_data.glass){
		  		if(all_data.glass.value=="Dark"||all_data.glass.value=="Normal"){
		  			glassTF = true;
		  		}else{
		  			glassTF = false;
		  		}
	  		}
	  		console.log("all_data.glass=="+all_data.glass+","+glassTF);
	  		
	  		genderNum = (all_data.gender.value=="Male"?1:2);
	  
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
		        		
		        		faceNum = disFn(all_data.contour_right9.x,all_data.contour_left9.x)/face_wd;
						eyeNum = disFn(all_data.left_eye_bottom.y,all_data.left_eye_top.y)/face_ht;
						noseNum = disFn(all_data.nose_contour_left1.y,all_data.nose_contour_lower_middle.y)/face_ht;
						browNum = disFn(all_data.left_eyebrow_left_corner.x,all_data.left_eyebrow_right_corner.x)/face_wd;
						mouseNum = disFn(all_data.mouth_upper_lip_bottom.y,all_data.mouth_lower_lip_top.y)/face_ht;

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
      function ratioFn(_number,_maxValue,_smallest,_biggest){
      	if(_number<_smallest){
      		_number = _smallest;
      	}
      	if(_number>_biggest){
      		_number = _biggest;
      	}
      	var _value = Math.round((_number-_smallest)/(_biggest-_smallest) * _maxValue);
      	if(_value<1){
      		_value = 1;
      	}
      	if(_value>_maxValue){
      		_value = _maxValue;
      	}
      	return Number(_value).toFixed(0);
      }
      
      function initValue(){
      	glassTF = false;
		faceNum = 3;
		eyeNum = 8;
		noseNum = 3;
		browNum = 3;
		mouseNum = 5;
		console.log("此为默认值");
      	return valueFn();
      }
      
      function valueFn(){
      	return {"err_code":err_code,"err_msg":err_msg,"has":hasTF,"gender":genderNum,"glass":glassTF,"face":ratioFn(faceNum,6,0.2,0.33),"eyes":ratioFn(eyeNum,23,0.036,0.11),"nose":ratioFn(noseNum,6,0.31,0.39),"brows":ratioFn(browNum,6,0.05,0.09),"mouth":ratioFn(mouseNum,12,0.034,0.098)};
      }
}
  	
      
      