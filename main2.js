
let disp = "0";   //電卓に表示される数字（記号前）
let disp2 = "0";　　//電卓に表示される数字（記号後）
let flag = 0;　　　　//場合分け

const calc = (val) => {
  if (val>=0 && val<=9) {　　//電卓に表示する数列
    if(flag == 0 ) {
      disp = val;
      disp2 = "0";
      flag = 1;　　　　　　　//０＋数字で送る
    }else {
      disp = disp + val;
      disp = parseFloat(disp);　//続けて数字入力されたら表示
    }
  }
  else if(val == "C") {　　//クリア
    disp = "0";
    disp2 ="0";
    flag =0;
  }
  else {
    if(disp) {
      switch(flag) {　　　//計算
        case 1 :
          disp2 = parseFloat(disp2) + parseFloat(disp);　　
          break;
        case 2 :
          disp2 = parseFloat(disp2) - parseFloat(disp);
          break;
        case 3 :
          disp2 = parseFloat(disp2) * parseFloat(disp);
          break;
        case 4 :
          disp2 = parseFloat(disp2) / parseFloat(disp);
          break;
      }
    }
    if(val == "=") {　　//swichを抜けて
      flag = 0;
      disp = disp2;            //計算結果を置き換えて記憶
    } else if(val == "+") {
      flag = 1;
      disp = "";
    } else if(val == "-") {
      flag = 2;
      disp = "";
    } else if(val == "*") {
      flag = 3;
      disp = "";
    } else if(val == "/") {
      flag = 4;
      disp = "";
    }
  }
  
  document.form1.disp.value = disp;　　//HTMLの情報取得、表示
}




