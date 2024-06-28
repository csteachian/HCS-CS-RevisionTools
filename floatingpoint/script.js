let questions = [];
var checkON = true;
//console.log("Start of script");

function resetFields() {
  let sign = document.getElementById("sign");
  sign.innerHTML = 'sign<br/>';
  let input0 = document.createElement("input");
  input0.type = "text";
  input0.maxLength=1;
  input0.value = "_";
  sign.appendChild(input0);

  let mant = document.getElementById("mantissa");
  mant.innerHTML = 'mantissa<br/>';
  for (let i = 0; i < 15; i++) {  
    let input0 = document.createElement("input");
    input0.width = 1;
    input0.type = "text";
    input0.maxLength=1;
    input0.value = "_";
    mant.appendChild(input0);
  }

  let expo = document.getElementById("exponent");
  expo.innerHTML = 'exponent<br/>';
  for (let i = 0; i < 8; i++) {
    let input0 = document.createElement("input");
    input0.width = 1;
    input0.type = "text";
    input0.maxLength=1;
    input0.value = "_";
    expo.appendChild(input0);
  }
  
}

function displayQuestion() {
  //console.log("Start of displayQuestion");

    // Clear existing input fields
    resetFields();
    
    let question = questions[currentQuestion];
    
    document.getElementById("binaryvalue").textContent = question.binaryvalue;
  
    var div = document.getElementById("solutionModal");
    var iframe = div.getElementsByTagName("iframe")[0];
    iframe.src = "https://www.youtube.com/embed/" + question.video + "?enablejsapi=1";
    
  //console.log("End of displayQuestion");
  }

  function hideVideo() {
    // stop the video and reset
    var state = 'hide';
    var div = document.getElementById("solutionModal");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    div.style.display = state == 'hide' ? 'none' : '';
    func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
    
    var modal = document.getElementById("solutionModal");
    modal.style.display = "none";
  }

  function showVideo() {
    var modal = document.getElementById("solutionModal");
    modal.style.display = "block";
  }

  function checkAnswer() {
    //console.log("Start of checkAnswer");
    checkON = false;
    let inputs1 = document.querySelectorAll("#sign input");
    let inputs2 = document.querySelectorAll("#mantissa input");
    let inputs3 = document.querySelectorAll("#exponent input");
    
    let question = questions[currentQuestion];
    let valid1 = true;
    let valid2 = true; 
    let valid3 = true;
    
    if (inputs1[0].value != question.sign[0]) {
      valid1 = false;
      inputs1[0].className = "incorrect";
    } else {
      inputs1[0].className = "correct";
    }
    for (let i = 0; i < 15; i++) {  
      if (inputs2[i].value != question.mantissa[i]) {
        valid2 = false;
        inputs2[i].className = "incorrect";
      } else {
        inputs2[i].className = "correct";
      } 
    }
    for (let i = 0; i < 8; i++) {
      if (inputs3[i].value != question.exponent[i]) {
        valid3 = false;
        inputs3[i].className = "incorrect";
      } else {
        inputs3[i].className = "correct";
      }
    }
    
    if (valid1) {
      score++;  
    }
    if (valid2) {
      score++;
    }
    if (valid3) {
      score++;
    }
    
    document.getElementById("score").textContent = score;

    // After updating score

    
    //console.log("currentQuestion: "+currentQuestion);
    //console.log("questions.length: "+questions.length);
    if (currentQuestion >= (questions.length-1)) {

      // Remove question elements

      let finalScore = document.getElementById("divscore");
      //finalScore.innerHTML = '';
      //let finalScore = document.createElement("div");
      finalScore.innerHTML = `Final score: ${score} out of ${(questions.length*3)}`;

      if (score/questions.length > 0.9) {
        let congrats = document.createElement("div");
        congrats.textContent = "Congratulations, great job!";
        document.body.appendChild(congrats);
      }

      let divreset = document.getElementById("reset");
      divreset.innerHTML = '';
      let reset = document.createElement("button");
      reset.textContent = "RESET";
      reset.className = "button-87";
      reset.onclick = () => {
        window.location.reload();
      }
      divreset.appendChild(reset);

    } else {
      // hide check button
      document.getElementById("check").style.display = checkON?"block":"none";
      // show next question button & video solution button
      let nextButton = document.getElementById("nextQ");
      nextButton.style.display = checkON?"none":"block";
      let showVidButton = document.getElementById("showVid");
      showVidButton.style.display = checkON?"none":"block";
      //let nextButton = document.createElement("button");
      //nextButton.textContent = "Next Question";
      //document.body.appendChild(nextButton);

      nextButton.onclick = () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          checkON = true;
          document.getElementById("check").style.display = checkON?"block":"none";
          document.getElementById("nextQ").style.display = checkON?"none":"block";
          document.getElementById("showVid").style.display = checkON?"none":"block";
          displayQuestion();  
        }
      }
    }
    
    
    //console.log("End of checkAnswer");
  }

  let currentQuestion = 0;
//console.log("1");
  let score = 0;
//console.log("2");

  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      //console.log("3");
      questions = data;
      //console.log(data);
      //console.log("4");
      displayQuestion();
      //console.log("5");
    });
//console.log(questions);
//console.log("End of script");