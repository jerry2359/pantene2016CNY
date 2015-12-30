function faceAnalysis( settings ){
	var webPath = 'http://test.agenda-bj.com.cn:8090';
	var api_key = 'f94488ea323f919860af56301cb54c6f';
	var api_secret = '-R-9WvP95GQeAIGUcbSRaRhwgyYOrc4x';
	
	var all_json;
	var all_data;
	var all_str;
	var face_id;
	var face_ht;
	var face_wd;
	
	var glassTF = false;
	var faceNum = 1;
	var eyeNum = 12;
	var noseNum = 1;
	var browNum = 1;
	var mouseNum = 1;

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
			callBack && callBack(initValue());
		    return;
		  }
		  //分析结果		  
		  all_json = result;
		  all_str = JSON.stringify(result, null, 2);
		  console.log(all_str);
		  
		  if(all_json.face.length==0){
			callBack && callBack(initValue());
		  	return;
		  }
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
		        		
		        		faceNum = disFn(all_data.contour_right9.x,all_data.contour_left9.x);
						eyeNum = disFn(all_data.left_eye_bottom.y,all_data.left_eye_top.y);
						noseNum = disFn(all_data.nose_contour_left1.y,all_data.nose_contour_lower_middle.y);
						browNum = disFn(all_data.left_eyebrow_lower_middle.y,all_data.left_eyebrow_upper_middle.y);
						//mouseNum = disFn(all_data.mouth_upper_lip_top.y,all_data.mouth_lower_lip_bottom.y);
						mouseNum = disFn(all_data.mouth_upper_lip_bottom.y,all_data.mouth_upper_lip_top.y);

						callBack && callBack({"glass":glassTF,"face":ratioFn(faceNum,6),"eyes":ratioFn(eyeNum*5,23),"nose":ratioFn(noseNum,6),"brows":ratioFn(browNum,6),"mouth":ratioFn(mouseNum*3,12)});
		        		/*return '{"glass":"'+glassTF+'","face":'+ratioFn(faceNum,6)+',"eyes":'+ratioFn(eyeNum,23)+',"nose":'+ratioFn(noseNum,6)+',"brows":'+ratioFn(browNum,6)+',"mouse":'+ratioFn(mouseNum,12)+'}';*/
            }
        });
	    });
	    
	    //差值判断
      function disFn(n1,n2){
      	var _re = Math.abs(Number(n1)-Number(n2));
      	return _re.toFixed(1);
      }
	    //比值计算
      function ratioFn(_value,_max){
      	var _num = 1;
      	if(_value<1){
      		_value = 1;
      	}
      	if(_value>_max){
      		_value = _max;
      	}
      	return Number(_value).toFixed(0);
      }
      
      function initValue(){
      	glassTF = false;
		faceNum = 1;
		eyeNum = 12;
		noseNum = 1;
		browNum = 1;
		mouseNum = 1;
      	return {"glass":glassTF,"face":ratioFn(faceNum,6),"eyes":ratioFn(eyeNum,23),"nose":ratioFn(noseNum,6),"brows":ratioFn(browNum,6),"mouth":ratioFn(mouseNum,12)};
      }
      
}
  	
      
      