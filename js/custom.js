$(document).ready(function(){
    $.getScript("js/fade.js", function(){
        fadeIn(iBase.Id('start-page'));        
    });

     $.getScript("js/facebook_wrapper.js", function(){
    });
});

function press_enter(box_id,button){
  $('#'+box_id).on('keyup keypress', function(e) {
    var key = window.event ? e.keyCode : e.which;  
    if (key == 13) {
      $('#'+button_id[button]).click(); 
    }  
  });
}



var answer = {};

var page_id = [
  "start-page",
  "profile-name",
  "profile-fb-name",
  "profile-grade",
  "profile-message",
  "first-question",
  "second-question",
  "third-question"
  
]

var button_id = [
  "start-page-button",
  "profile-name-button",
  "profile-fb-name-button",
  "profile-grade-button",
  "profile-message-button",
  "first-question-button",
  "second-question-button",
  "third-question-button"
]

var grade_array=[
  "在校生","準大一","準碩一"
]

var grade_mapping_array=[
  "系所","高中","大學"
]

var first_answer_array = ["喜歡","不喜歡"];
var second_answer_array = ["吧檯","拖延","店家"];
var third_answer_array = ["什麼是好咖啡","如何煮出好喝的咖啡"];

var user_name;
var grade;
var now_page;
var user_nick_name;


function add_page_links_nav(counter,offset){
    var pretext =  document.getElementById("page_links_nav").innerHTML;
    document.getElementById("page_links_nav").innerHTML = pretext+"<li><input type=\"button\" id=\"page_nav_"+(counter-offset+1)+"\" onclick=\"fading(null,"+ counter + ")\"></input></li>";
}


function fading(from,to){

  if(from == null){
    from = now_page;
  }
  $('#'+button_id[from]).prop('disabled', true);

  $('#page_nav_'+from).removeClass('active');
  fadeOut(iBase.Id(page_id[from]),20,0,function(){
    if(to < button_id.length){
      fadeIn(iBase.Id(page_id[to]),20,null);
      $('#'+button_id[from]).prop('disabled', false);
      now_page = to;
      $('#page_nav_'+to).addClass('active');

    }
    
  });
}




function change_page(from,to){

  switch(from){
    case 0:
      custom_login(function(name,facebookid){
        if(name != null && facebookid != null){
          answer['name'] = name;
          user_name = name;
          user_nick_name = user_name.substring(1);
          answer['facebookid'] = facebookid;
          fading(from,5);

          var length = page_id.length;
          for(var i=5;i<length;i++){
            add_page_links_nav(i,to);
          }

        }else{
          fading(from,to);

          var length = page_id.length;
          for(var i=to;i<length;i++){
            add_page_links_nav(i,to);
          }
        }
        
      });
      break;
    case 1:
      if( !$('#name').val() ) {
        $('#name').addClass('warning');
        document.getElementById("name").placeholder = "請輸入姓名";
        return;
      };

      answer['name'] = $('#name').val();
      user_name = $('#name').val();
      user_nick_name = user_name.substring(1);
      iBase.Id('profile-fb-name-plugin_name').innerText  = user_name;
      fading(from,to);
      break;
    case 2:
      if( !$('#fbname').val() ) {
        $('#fbname').addClass('warning');
        document.getElementById("fbname").placeholder = "請輸入 facebook 名稱";
        return;
      };

      iBase.Id('profile-grade-plugin_name').innerText = user_nick_name;
      answer['fbname'] = $('#fbname').val();
      fading(from,to);
      break;
    case 3:
      grade = $('input[name="gender-grade"]:checked').val();
      answer['grade'] = grade_array[grade];
      iBase.Id('profile-message-plugin_name').innerText = user_nick_name;
      iBase.Id('profile-message-plugin_question').innerText = grade_mapping_array[grade];
      fading(from,to);
      break;
    case 4: 
      if( !$('#message').val() ) {
        $('#message').addClass('warning');
        document.getElementById("message").placeholder = "不可為空";
        return;
      };
      answer['message'] = $('#message').val();
      fading(from,to);
      break;
    case 5:
      answer['first_answer'] = first_answer_array[$('input[name="gender1"]:checked').val()];
      fading(from,to);
      break;
    case 6:
      if($('input[name="gender2"]:checked').val() == 3){
        if( !$('#second_question_other').val() ) {
          $('#second_question_other').addClass('warning');
          document.getElementById("second_question_other").placeholder = "不可為空";
          return;
        }else{
          answer['second_answer'] = $('#second_question_other').val();
        }
      }else{
        answer['second_answer'] = second_answer_array[$('input[name="gender2"]:checked').val()];
      }
      
      fading(from,to);
      break;
    // case 7:
    //   answer['third_answer'] = $('input[name="gender3"]:checked').val();
    //   fading(from,to);
    //   break;
 
  }

  
}




function checkfull(callback){
  var isnotfull = false;
  checkLoginState(function(flag){
    if(flag){
      if(answer.first_answer == undefined){
        fading(null,5);
        isnotfull = true;
      }else if(answer.second_answer == undefined){
        fading(null,6);
        isnotfull = true;
      }else if(answer.third_answer == undefined){
        fading(null,7);
        isnotfull = true;
      }
    }else{
      if(answer.name== undefined){
        fading(null,1);
        isnotfull = true;
      }else if(answer.fbname == undefined){
        fading(null,2);
        isnotfull = true;
      }else if(answer.grade == undefined){
        fading(null,3);
        isnotfull = true;
      }else if(answer.message == undefined){
        fading(null,4);
        isnotfull = true;
      }else if(answer.first_answer == undefined){
        fading(null,5);
        isnotfull = true;
      }else if(answer.second_answer == undefined){
        fading(null,6);
        isnotfull = true;
      }else if(answer.third_answer == undefined){
        fading(null,7);
        isnotfull = true;
      }
    }
    callback(isnotfull);
  })
}

function submit(){
  if($('input[name="gender3"]:checked').val() == 2){
    if( !$('#third_question_other').val() ) {
      $('#third_question_other').addClass('warning');
      document.getElementById("third_question_other").placeholder = "不可為空";
      return;
    }else{
      answer['third_answer'] = $('#third_question_other').val();
    }
  }else{
    answer['third_answer'] = third_answer_array[$('input[name="gender3"]:checked').val()];
  }
  
  $('#'+button_id[now_page]).prop('disabled', true);
  checkfull(function(flag){
    console.log("flag"+flag);
    if(!flag){
      Sendresult(function(){
        from = now_page;
        $('#page_nav_'+from).removeClass('active');
        fadeOut(iBase.Id(page_id[from]),20,0,function(){
          fadeIn(iBase.Id('thank-page'),20,null);
          $('#'+button_id[from]).prop('disabled', false);
        });
        fadeOut(iBase.Id('page_links_nav'),20,0,null);
      });
    }else{
      $('#'+button_id[now_page]).prop('disabled', false);
    }
  })
}

var google_script_url = "https://script.google.com/macros/s/AKfycbzkiet3Bvvr_BC1V7kxFOowBejrDMreD9nI9FKY3mLwx_35Qe0l/exec";

function Sendresult(callback){

  var keyset = Object.keys(answer);
  var offset = "?" + keyset[0] + "=" + answer[keyset[0]];
  

  for(var i=1;i<keyset.length;i++){
    offset = offset + "&" + keyset[i] + "=" + answer[keyset[i]];
  }

  console.log(offset);

  $.ajax({
    url: google_script_url+offset, 
    type: "GET",   
    dataType: 'jsonp',
    cache: false,
    success: function(response){
        console.log("success" + response);                        
        google_doc_result(callback,response);
    },
    error: function(response){
        console.log(response);
        $('#'+button_id[now_page]).prop('disabled', false);
    }   
  });
}



function google_doc_result(callback,result){
  if(result == "same_name"){
     iBase.Id('thank-page-title-text').innerText = "好像有人填過了，或有人同名同姓";
     var prehtml = iBase.Id('thank-page-subtitle-text').innerHTML;
      iBase.Id('thank-page-subtitle-text').innerHTML = "請與<a href=\"https://www.facebook.com/NCUcafeclub\">粉絲團</a>聯絡，由專人會為您服務 </br>"+prehtml;
  }else if(result == "same_facebookid"){
     iBase.Id('thank-page-title-text').innerText = user_nick_name+"，你已經填過了";
     var prehtml = iBase.Id('thank-page-subtitle-text').innerHTML;
      iBase.Id('thank-page-subtitle-text').innerHTML = "請與<a href=\"https://www.facebook.com/NCUcafeclub\">粉絲團</a>聯絡，由專人會為您服務 </br>"+prehtml;
  }
  callback();
}






/**
 * Make a X-Domain request to url and callback.
 *
 * @param url {String}
 * @param method {String} HTTP verb ('GET', 'POST', 'DELETE', etc.)
 * @param data {String} request body
 * @param callback {Function} to callback on completion
 * @param errback {Function} to callback on error
 */
function xdr(url, method, data, callback, errback) {
    var req;
    
    if(XMLHttpRequest) {
        req = new XMLHttpRequest();

        if('withCredentials' in req) {
            req.open(method, url, true);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
            req.onerror = errback;
            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status >= 200 && req.status < 400) {
                        callback(req.responseText);
                    } else {
                        errback(new Error('Response returned with non-OK status'));
                    }
                }
            };
            req.send(data);
        }
    } else if(XDomainRequest) {
        req = new XDomainRequest();
        req.open(method, url);
        req.onerror = errback;
        req.onload = function() {
            callback(req.responseText);
        };
        req.send(data);
    } else {
        errback(new Error('CORS not supported'));
    }
}