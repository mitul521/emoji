Webcam.set({    
    width:350,
    height:350,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snap() {
    Webcam.snap(function(data){
        document.getElementById("result").innerHTML='<img id="pic" src="'+data+'"/>';
    });
} 
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier('',modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="the first prediction is"+prediction_1;
    speak_data2="the second prediction is"+prediction_2;
    utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterthis);
}
function check(){
    img=document.getElementById("pic");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
    if(error){
     console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
    speak();
if(results[0].label=="thumps up"){
    document.getElementById("update_emoji").innerHTML="&#128077;";
}    
if(results[0].label=="thumps down"){
    document.getElementById("update_emoji").innerHTML="&#128078;";
} 
if(results[0].label=="clapps"){
    document.getElementById("update_emoji").innerHTML="&#128079;";
}   
if(results[1].label=="thumps up"){
    document.getElementById("update_emoji2").innerHTML="&#128077;";
}    
if(results[1].label=="thumps down"){
    document.getElementById("update_emoji2").innerHTML="&#128078;";
} 
if(results[1].label=="clapps"){
    document.getElementById("update_emoji2").innerHTML="&#128079;";
}           
}
}