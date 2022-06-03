class SpeechRecognitionApi{
    constructor(options) {
        const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
        this.speechApi = new SpeechToText();
        this.speechApi.continuous = true;
        this.speechApi.interimResults = false;
        this.output = options.output ? options.output : document.createElement('div');
        console.log(this.output)
        this.speechApi.onresult = (event)=> { 
            console.log(event);
            var resultIndex = event.resultIndex;
            var transcript = event.results[resultIndex][0].transcript;

            console.log('transcript>>', transcript);
            console.log(this.output)
            this.output.textContent = transcript;

            
        }
    }
    init(){
        this.speechApi.start();
    }
    stop(){
        this.speechApi.stop();
    }
}

const speechRecognition = new SpeechRecognitionApi();
export {speechRecognition};