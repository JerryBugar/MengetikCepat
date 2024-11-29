const testItem = document.getElementById("textDisplay");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const beg = document.getElementById("beg");
const pro = document.getElementById("pro");

var wordNo = 1;
var wordsSubmitted = 0;
var wordsCorrect = 0;
var timer = 30;
var flag=0;
var factor=2;
var seconds;
var difficulty=1;

displayTest(difficulty);

//on Input
inputItem.addEventListener('input', function(event){
  if(flag===0){
    flag=1;
    timeStart();
  }
  var charEntered = event.data;
  if(/\s/g.test(charEntered)){  //check if the character entered is a whitespace
    checkWord();
  }
  else{
    currentWord();
  }
});

//time selection
thirty.addEventListener("click",function(){
  timer = 30;
  factor = 2;
  limitColor(thirty,sixty);
  time.innerText = timer;
});
sixty.addEventListener("click",function(){
  timer = 60;
  factor = 1;
  limitColor(sixty, thirty);
  time.innerText = timer;
});

//difficulty Selection
beg.addEventListener("click",function(){
  difficulty = 1;
  displayTest(difficulty);
  limitColor(beg,pro);
});
pro.addEventListener("click",function(){
  difficulty = 2;
  displayTest(difficulty);
  limitColor(pro,beg);
});

//set the color of time and difficulty
function limitColor(itema,itemr ){
  itema.classList.add('yellow');
  itemr.classList.remove('yellow');
}

//restart the Test
restartBtn.addEventListener("click",function(){

  wordsSubmitted = 0;
  wordsCorrect = 0;
  flag=0;

  time.classList.remove("current");
  cw.classList.remove("current");
  time.innerText = timer;
  timeName.innerText = "Time";
  cw.innerText = wordsCorrect;
  cwName.innerText = "CW";
  inputItem.disabled = false;
  inputItem.value = '';
  inputItem.focus();

  displayTest(difficulty);
  clearInterval(seconds);
  limitVisible();
});

//start the timer countdown
function timeStart(){
  limitInvisible();
  seconds = setInterval(function() {
    time.innerText--;
    if (time.innerText == "-1") {
        timeOver();
        clearInterval(seconds);
    }
  }, 1000);
}

//diable textarea and wait for restart
function timeOver(){
  inputItem.disabled = true;
  restartBtn.focus();

  displayScore();
}

//set Limit visibility
function limitVisible(){
  thirty.style.visibility = 'visible';
  sixty.style.visibility = 'visible';
  beg.style.visibility = 'visible';
  pro.style.visibility = 'visible';
}
function limitInvisible(){
  thirty.style.visibility = 'hidden';
  sixty.style.visibility = 'hidden';
  beg.style.visibility = 'hidden';
  pro.style.visibility = 'hidden';
}

//display the score
function displayScore(){
  let percentageAcc = 0;
  if(wordsSubmitted!==0){
    percentageAcc = Math.floor((wordsCorrect/wordsSubmitted)*100);
  }

  time.classList.add("current");
  cw.classList.add("current");

  time.innerText = percentageAcc+"%";
  timeName.innerText = "PA";

  cw.innerText = factor*wordsCorrect;
  cwName.innerText = "WPM";
}

//check if the user is entering correcrt word
function currentWord(){
  const wordEntered = inputItem.value;
  const currentID = "word "+wordNo;
  const currentSpan = document.getElementById(currentID);
  const curSpanWord = currentSpan.innerText;

  if(wordEntered == curSpanWord.substring(0,wordEntered.length)){
    colorSpan(currentID, 2);
  }
  else{
    colorSpan(currentID, 3);
  }

}
//checks word entered
function checkWord(){
  const wordEntered = inputItem.value;
  inputItem.value='';

  const wordID = "word "+wordNo;
  const checkSpan = document.getElementById(wordID);
  wordNo++;
  wordsSubmitted++;

  if(checkSpan.innerText === wordEntered){
    colorSpan(wordID, 1);
    wordsCorrect++;
    cw.innerText=wordsCorrect;
  }
  else{
    colorSpan(wordID, 3);
  }

  if(wordNo>40){

    displayTest(difficulty);
  }
  else{
    const nextID = "word "+wordNo;
    colorSpan(nextID, 2);
  }
}

//color the words
function colorSpan(id, color){
  const span = document.getElementById(id);
  if(color === 1 ){
    span.classList.remove('wrong');
    span.classList.remove('current');
    span.classList.add('correct');
  }
  else if(color ===2){
    span.classList.remove('correct');
    span.classList.remove('wrong');
    span.classList.add('current');
  }
  else{
    span.classList.remove('correct');
    span.classList.remove('current');
    span.classList.add('wrong');
  }
}

//display the random words on screen
function displayTest(diff){
  wordNo = 1;
  testItem.innerHTML = '';

  let newTest = randomWords(diff);
  newTest.forEach(function(word, i){
    let wordSpan = document.createElement('span');
    wordSpan.innerText = word;
    wordSpan.setAttribute("id", "word " + (i+1));
    testItem.appendChild(wordSpan);
  });

  const nextID = "word "+wordNo;
  colorSpan(nextID, 2);
}

//Generate an array of random 50 words
function randomWords(diff){

  var topWords = ["kemampuan", "tentang", "atas", "menerima", "menurut", "akun", "across", "tindakan", "aktivitas", "sebenarnya", "alamat", "administrasi", "mengakui", "dewasa", "mempengaruhi", "setelah", "sekali", "melawan", "agen", "setuju", "bersama", "izinkan", "hampir", "sendiri", "sepanjang", "sudah", "juga", "meskipun", "selalu", "Amerika", "antara", "jumlah", "analisis", "dan", "hewan", "lain", "jawab", "siapa", "apa", "muncul", "menerapkan", "mendekati", "area", "berdebat", "sekitar", "tiba", "artikel", "seniman", "asumsikan", "serangan", "perhatian", "pengacara", "audiens", "penulis", "otoritas", "tersedia", "hindari", "jauh", "bayi", "kembali", "bola", "bank", "mengalahkan", "indah", "karena", "menjadi", "sebelum", "mulai", "perilaku", "di belakang", "percaya", "manfaat", "terbaik", "lebih baik", "antara", "di luar", "tagihan", "miliard", "hitam", "darah", "biru", "papan", "tubuh", "buku", "lahir", "keduanya", "istirahat", "membawa", "saudara", "anggaran", "membangun", "gedung", "bisnis", "panggil", "kamera", "kampanye"];


  var basicWords = ["a", "tentang", "di atas", "melintasi", "bertindak", "takut", "setelah", "sekali lagi", "umur", "sepakat", "udara", "semua", "sendiri", "sepanjang", "selalu", "saya", "jumlah", "sebuah", "dan", "marah", "lain", "jawab", "siapa", "muncul", "apel", "adalah", "area", "lengan", "tentara", "sekitar", "tiba", "seni", "sebagai", "bertanya", "di", "bibi", "pergi", "bayi", "kembali", "buruk", "tas", "bola", "bank", "dasar", "mandi", "menjadi", "kacang", "beruang", "tempat tidur", "bir", "sebelum", "mulai", "lonceng", "di bawah", "terbaik", "besar", "burung", "lahir", "sedikit", "gigit", "hitam", "berdarah", "blok", "darah", "tiup", "biru", "papan", "kapal", "tubuh", "didih", "tulang", "buku", "perbatasan", "lahir", "keduanya", "mangkuk", "kotak", "anak laki-laki", "cabang", "berani", "roti", "istirahat", "napas", "jembatan", "terang", "membawa", "saudara", "cokelat", "sikat", "membangun", "terbakar", "bis", "sibuk", "tetapi", "membeli", "oleh", "kue", "panggil", "bisa", "topi", "mobil", "kartu", "peduli", "membawa"];
  
  if(diff==1){
    wordArray = basicWords;
  }
  else{
    wordArray =topWords;
  }

  var selectedWords = [];
  for(var i=0;i<40;i++){
    var randomNumber = Math.floor(Math.random()*wordArray.length);
    selectedWords.push(wordArray[randomNumber]+" ");
  }
  return selectedWords;
}
