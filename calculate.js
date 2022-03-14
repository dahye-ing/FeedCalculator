var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);

function fetchPage(name, mer){
  fetch(name).then(function(response){
    response.text().then(function(text){
    document.querySelector('content').innerHTML = text;
    if(name=='kcal'){
        document.getElementById("kcalBtn").addEventListener("click", cal_MER);
    }
    else if (name=='feed') {
      if(mer){
        document.getElementById("kcalInfo").value = mer.toFixed(1);
      }
    }
    })
  });
}

function cal_MER(){
  let weight = document.getElementById("weight").value;
  let feature = document.getElementById("feature").value;

  if(weight<0 || !weight){               //몸무게 미입력
    alert("냥이 몸무게를 입력해주세요");
    return;
  }
  else if(weight<2){                    //체중 2kg 미만 시 RER식
    rer = 70*(weight*0.75)
  }
  else{                                //체중 2kg 이상 시 RER식
    rer = 30*(weight*0.75)
  }

  if(!feature){                       //특이사항 미입력
    alert("냥이 특이사항을 선택해주세요");
    return;
  }

  mer = rer*weight
  document.getElementById("mer").innerHTML = mer.toFixed(1)+'칼로리 냠냠';
  document.getElementById("goFeedBtn").style.display = 'block';
}
