const APP_ID = "c2ec6670c97ca9989ae048d710dcf731";
const DEFAULT_VALUE = "--";
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");

const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

class SpeechRecognitionApi {
  constructor(options) {
    const SpeechToText =
      window.speechRecognition || window.webkitSpeechRecognition;
    this.speechApi = new SpeechToText();
    this.speechApi.continuous = true;
    this.speechApi.interimResults = false;
    this.output = options.output
      ? options.output
      : document.createElement("div");
    console.log(this.output);
    this.speechApi.onresult = (event) => {
      console.log(event);
      var resultIndex = event.resultIndex;
      var transcript = event.results[resultIndex][0].transcript;
      console.log("transcript>>", transcript);
      console.log(this.output);
      this.output.textContent = transcript + "";
    };
  }
  init() {
    this.speechApi.start();
  }
  stop() {
    this.speechApi.stop();
  }
}

// window.onload = function () {
//   var speech = new SpeechRecognitionApi({
//     output: document.querySelector(".output"),
//   });

//   document.querySelector(".btn-start").addEventListener("click", function () {
//     speech.init();
//   });

//   document.querySelector(".btn-stop").addEventListener("click", function () {
//     speech.stop();
//   });
// };
// const StopBtn = document.querySelector(".btn-stop");
const btnShowModal = document.querySelector(".btn-show-modal");
const btnStart = document.querySelector(".btn-start");
const diagnosticPara = document.querySelector(".output");
const answerInput = document.getElementById("result-question")

function handleEvent(speechResult) {
  // answerInput.value = "";
  if (speechResult.includes("take me to youtube")) {
    // location.replace("https://www.youtube.com/")
    // window.location.replace("http://youtube.com/");
    window.location.href = "https://www.youtube.com/";
    answerInput.value = "";
  } else if (speechResult.includes("take me to facebook")) {
    // location.replace("https://www.facebook.com/profile.php?id=100012564199029")
    window.location.href =
      "https://www.facebook.com/profile.php?id=100012564199029";
    answerInput.value = "";
  } else if (speechResult.includes("take me to chrome")) {
    // location.replace("https://www.google.com/")
    window.location.href = "https://www.google.com/";
    answerInput.value = "";
  } else if (speechResult.includes("clear command")) {
    answerInput.value = "";

  } else if (speechResult.includes("take me to spotify")) {
    window.location.href = "https://www.spotify.com/vn-vi/";
    answerInput.value = "";
  } else if (speechResult.includes("what is the weather like today")) {

    btnShowModal.setAttribute('data-bs-toggle', 'modal');
    btnShowModal.setAttribute('data-bs-target', '#staticBackdrop');

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Ha Noi&appid=${APP_ID}&units=metric&lang=vi`
    ).then(async (res) => {
      const data = await res.json();
      console.log('[Search Input]', data);
      // cityName.innerHTML = data.name || DEFAULT_VALUE;
      weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
      weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

      sunrise.innerHTML =
        moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
      moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
      sunset.innerHTML =
        moment.unix(data.sys.sunset).format("H:mm") || DEFAULT_VALUE;
      humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
      windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;

      btnShowModal.click();
    });
  } else if(speechResult.includes("what day is it today")){
    btnShowModal.setAttribute('data-bs-toggle', 'modal');
    btnShowModal.setAttribute('data-bs-target', '#staticBackdrop2');
    btnShowModal.click();
  } 
  else if(speechResult.includes("what is the time")){
    btnShowModal.setAttribute('data-bs-toggle', 'modal');
    btnShowModal.setAttribute('data-bs-target', '#staticBackdrop3');
    btnShowModal.click();
  }
}

function clickHandler(event) {
  // console.log('Button Clicked');
  // console.log('Noi dung la ' + document.getElementById('result-question').value);
  // $('.btn-start').removeAttr('data-bs-toggle');



  btnStart.disabled = true;
  btnStart.textContent = 'Listening......';

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();


  recognition.onresult = function (event) {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = speechResult + '.';
    handleEvent(speechResult)
  }




  recognition.onspeechend = function () {
    recognition.stop();
    btnStart.disabled = false;
    btnStart.textContent = 'Start new command';
  }

  recognition.onerror = function (event) {
    btnStart.disabled = false;
    btnStart.textContent = 'Start new Command';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }

  recognition.onaudiostart = function (event) {
    //Fired when the user agent has started to capture audio.
    console.log('SpeechRecognition.onaudiostart');
  }

  recognition.onaudioend = function (event) {
    //Fired when the user agent has finished capturing audio.
    console.log('SpeechRecognition.onaudioend');
  }

  recognition.onend = function (event) {
    //Fired when the speech recognition service has disconnected.
    console.log('SpeechRecognition.onend');
  }

  recognition.onnomatch = function (event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    console.log('SpeechRecognition.onnomatch');
  }

  recognition.onsoundstart = function (event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    console.log('SpeechRecognition.onsoundstart');
  }

  recognition.onsoundend = function (event) {
    //Fired when any sound — recognisable speech or not — has stopped being detected.
    console.log('SpeechRecognition.onsoundend');
  }

  recognition.onspeechstart = function (event) {
    //Fired when sound that is recognised by the speech recognition service as speech has been detected.
    console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function (event) {
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
    console.log('SpeechRecognition.onstart');
  }


}

btnStart.addEventListener("click", clickHandler);




