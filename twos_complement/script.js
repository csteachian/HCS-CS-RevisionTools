let questions = [];
var checkON = true;
//console.log("Start of script");

function displayQuestion() {
  //console.log("Start of displayQuestion");

    // Clear existing input fields
    
    let question = questions[currentQuestion];
    
    document.getElementById("decimal").textContent = question.decimal;
    
    let row1 = document.getElementById("row1");
    let row2 = document.getElementById("row2");
    let row3 = document.getElementById("row3");
    let rowh = document.getElementById("rowheader");
    row1.innerHTML = '';
    row2.innerHTML = ''; 
    row3.innerHTML = '';
    rowh.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
      let input0 = document.createElement("input")
      input0.type = "text";
      input0.maxLength=0;
      input0.value = 2**(7-i);
      input0.className = "rowheader";
      input0.readOnly = true;
      
      let input1 = document.createElement("input");
      input1.type = "text";
      input1.maxLength = 1;
      input1.value = 0;
      
      let input2 = document.createElement("input");
      input2.type = "text";
      input2.maxLength = 1;  
      input2.value = 0;
      
      let input3 = document.createElement("input");
      input3.type = "text";
      input3.maxLength = 1;
      input3.value = 0;
        
      rowh.appendChild(input0);
      row1.appendChild(input1);
      row2.appendChild(input2);  
      row3.appendChild(input3);
    }
  //console.log("End of displayQuestion");
  }

  function checkAnswer() {
    //console.log("Start of checkAnswer");
    checkON = false;
    let inputs1 = document.querySelectorAll("#row1 input");
    let inputs2 = document.querySelectorAll("#row2 input");
    let inputs3 = document.querySelectorAll("#row3 input");
    
    let question = questions[currentQuestion];
    let valid1 = true;
    let valid2 = true; 
    let valid3 = true;
    
    for (let i = 0; i < 8; i++) {
      if (inputs1[i].value != question.row1[i]) {
        valid1 = false;
        inputs1[i].className = "incorrect";
      } else {
        inputs1[i].className = "correct";
      }
      
      if (inputs2[i].value != question.row2[i]) {
        valid2 = false;
        inputs2[i].className = "incorrect";
      } else {
        inputs2[i].className = "correct";
      } 
        
      if (inputs3[i].value != question.row3[i]) {
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
      // show next question button
      let nextButton = document.getElementById("nextQ")
      nextButton.style.display = checkON?"none":"block";
      //let nextButton = document.createElement("button");
      //nextButton.textContent = "Next Question";
      //document.body.appendChild(nextButton);

      nextButton.onclick = () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
          checkON = true;
          document.getElementById("check").style.display = checkON?"block":"none";
          document.getElementById("nextQ").style.display = checkON?"none":"block";
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