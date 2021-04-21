
const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset =document.getElementById("reset");


//経過時間を保存・更新するための変数（単位：ミリ秒＝1000分の1秒）　タイマーが走っている時間
let elapsedTime;
//スタートボタンを押した時の基準を変数定義
let startTime;
//タイマーのID　タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
let timerId;
//タイマーをストップ→再開させたら０になるのを避ける、以前ストップしたタイミングまでの計測時間
let timeToAdd = 0;


//ミリ秒の表示ではなく、分や秒に直すための関数　floor →小数点以下切り捨て
const updateTimeText = () => {
 let hou = Math.floor(elapsedTime/(1000*60*60));
 let min = Math.floor(elapsedTime/(1000*60));  //1分＝1000ミリ秒＊60秒
 let sec = Math.floor((elapsedTime%(1000*60))/1000); //1分に満たなかったミリ秒のうち，秒となったもの,ミリ秒なので１０００で割る
 let ms = elapsedTime%1000; //1000ミリ秒で割った数のあまり

// ゼロパディング
  hou = `0${hou}`.slice(-2);
  min = `0${min}`.slice(-2);
  sec = `0${sec}`.slice(-2);
  ms = `0${ms}`.slice(-2);
  
   timer.textContent = `${hou}:${min}:${sec}:${ms}`;　　　//表示
};

 

//経過時間の管理と計算
const countUp = ()=> {
    timerId = setTimeout(() => { 　　　　　　　　　　　　　　 　//timerIdはsetTimeoutの返り値？
        elapsedTime = Date.now() - startTime + timeToAdd;　　　　//タイマーが走っていた時間＝タイマーが走っていた時間ー現在時刻＋starおした時刻
        updateTimeText();
        countUp();　　　　　　　　　　　　　　　　　　　　　　　//10ミリ秒毎に計算？
    },10);　　　　　　　　　　　　　　　　　　　　　　　　　　　//１０ミリ秒後に始める？
};


//クリック時のイベント
$('#start').click(function() {
   startTime = Date.now();　　　　//現在時刻取得
    countUp();
    start.disabled = true;　　　　//2回押すと誤作動、させないように
    stop.disabled = false;  
});


$('#stop').click(function() {
    clearTimeout(timerId);　　　　　　　　　//タイマーを止める
    timeToAdd += Date.now() - startTime;　　//０からの再スタート回避、過去のスタート時間からストップ時間までの経過時間を足す
    start.disabled = false;
    stop.disabled = true;
});

$('#reset').click(function() {
    elapsedTime = 0;
    timeToAdd = 0;
    updateTimeText();　　　　　　　//０になったタイムを表示
});