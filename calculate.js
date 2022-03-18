const http = require('http');
const fs = require('fs');
const mariaConn = require('./db_conn');

const app = http.createServer(function(request,response){
  var url = request.url;
    if(url == '/'){
      url = '/index.html';
    }
    if(url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});

app.listen(3000);

mariaConn((conn) => {
  conn.query(
    "SELECT * from product"
  );
  conn.release();
});

function fetchPage(name, mer){
  fetch(name).then(function(response){
    response.text().then(function(text){
    document.querySelector('content').innerHTML = text;
    if(name=='kcal'){
        document.title = "칼로리 계산기"
        document.getElementById("kcalBtn").addEventListener("click", cal_MER);
    }
    else if (name=='feed') {
      document.title = "급여량 계산기"
      if(mer){
        document.getElementById("kcalInfo").value = mer;
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
    weight.focus();
    return;
  }
  else if(weight<2){                    //체중 2kg 미만 시 RER식
    var rer = 70*(weight*0.75)
  }
  else{                                //체중 2kg 이상 시 RER식
    var rer = 30*(weight*0.75)
  }

  if(!feature){                       //특이사항 미입력
    alert("냥이 특이사항을 선택해주세요");
    feature.focus();
    return;
  }

  mer = (rer*weight).toFixed(1)
  document.getElementById("mer").innerHTML = `${mer} 칼로리 냠냠`;
  document.getElementById("goFeedBtn").style.display = 'block';
}
