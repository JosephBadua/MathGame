let countingScore = document.querySelector(`.timer`);
const easy = document.querySelector(`.box1`);
const medium = document.querySelector(`.box2`);
const hard = document.querySelector(`.box3`);
let firstAnswer = document.querySelector(`.first`);
let secondAnswer = document.querySelector(`.second`);
let thirdAnswer = document.querySelector(`.third`);
let operator = document.querySelector(`.operator`)
let allAnswers = document.querySelectorAll(`.answer`)
let mediumDifficulty = false;
let hardDifficulty = false;
//Add way to check if visiting user has already completed the difficulties


const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const biggerNumber = [...numbers, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let score = 0;

function displayAnswer(result){
    console.log(result)
    let compare = Math.floor(Math.random() * 3)
    if (compare == 0){
        firstAnswer.textContent = result - 1;
    secondAnswer.textContent = result + 1;
    thirdAnswer.textContent = result;
    } else if (compare == 1){
        firstAnswer.textContent = result - 1;
    secondAnswer.textContent = result
    thirdAnswer.textContent = result + 1;
    } else if (compare == 2){
        firstAnswer.textContent = result;
        secondAnswer.textContent = result + 1;
        thirdAnswer.textContent = result - 1;
    } else {
        firstAnswer.textContent = result;
        secondAnswer.textContent = result + 1;
        thirdAnswer.textContent = result - 1;
    }
    if (operator.textContent == "-" || hardDifficulty == true){
        allAnswers.forEach( button => button.addEventListener(`click`, handleAnswerHard, {once: true}));
    } else {
    allAnswers.forEach( button => button.addEventListener(`click`, handleAnswer, {once: true}));
    }
}


function handleAnswer(event){
    console.log(event)
    let a = parseInt(easy.textContent);
    let b = parseInt(medium.textContent);
    console.log(parseInt(event.target.innerText))
    if(parseInt(event.target.innerText) == (a + b)) {
        console.log(`yes`)
        event.toElement.classList.add(`correct`);
        hard.textContent = a + b
        score++;
        countingScore.textContent = `Score: ${score}`;
        console.log(score);
        if (score == 5 && mediumDifficulty == true){
            event.toElement.classList.remove(`correct`);
            allAnswers.forEach(button => button.classList.remove(`strike`))
            resetGameMedium()
        }  else if (score < 5 && mediumDifficulty == true){
            setTimeout(function(){
                event.toElement.classList.remove(`correct`);
                allAnswers.forEach(button => button.classList.remove(`strike`))
                hard.textContent = "";
                startEasy();
            }, 1000)
        } else if (score == 5){
            event.toElement.classList.remove(`correct`);
            allAnswers.forEach(button => button.classList.remove(`strike`))
            resetGameEasy()
        } else {
            setTimeout(function(){
                event.toElement.classList.remove(`correct`);
                allAnswers.forEach(button => button.classList.remove(`strike`))
                hard.textContent = "";
                startEasy();
            }, 1000)
        }
    } else {
        console.log(`no`)
        event.toElement.classList.add(`strike`);
    }
}

function handleAnswerHard(event){
    console.log(event)
    let a = parseInt(easy.textContent);
    let b = parseInt(medium.textContent);
    console.log(parseInt(event.target.innerText))
    if (operator.textContent == "+"){
        if(parseInt(event.target.innerText) == (a + b)) {
            console.log(`yes`)
            event.toElement.classList.add(`correct`);
            hard.textContent = a + b
            score++;
            countingScore.textContent = `Score: ${score}`;
            console.log(score);
            if (score == 5){
                resetGameHard()
            } else {
                setTimeout(function(){
                    event.toElement.classList.remove(`correct`);
                    allAnswers.forEach(button => button.classList.remove(`strike`))
                    hard.textContent = "";
                    startHard();
                }, 1000)
            }
        } else {
            console.log(`no`)
            event.toElement.classList.add(`strike`);
        }
    } else if (operator.textContent == "-"){
            if(parseInt(event.target.innerText) == (a - b)) {
                console.log(`yes`)
                event.toElement.classList.add(`correct`);
                hard.textContent = a - b
                score++;
                countingScore.textContent = `Score: ${score}`;
                console.log(score);
                if (score == 5){
                    resetGameHard()
                } else {
                    setTimeout(function(){
                        event.toElement.classList.remove(`correct`);
                        allAnswers.forEach(button => button.classList.remove(`strike`))
                        hard.textContent = "";
                        startHard();
                    }, 1000)
                }
            } else {
                console.log(`no`)
                event.toElement.classList.add(`strike`);
            }
        }
}

function resetGameEasy() {
    swal({
        title: "Good job!",
        text: "You got all the questions correct! Now try the harder difficulties!",
        icon: "success",
      });
    //POST TO ADD STAR
    demit();
    init();

};

function resetGameMedium() {
    mediumDifficulty = false;
    swal({
        title: "Good job!",
        text: "You got all the questions correct! Do you think you can take on Hard?",
        icon: "success",
      });
    //POST TO ADD STAR
    demit();
    init();

};

function resetGameHard() {
    hardDifficulty = false;
    swal({
        title: "Good job!",
        text: "You got all the questions correct! You completed the hardest difficulty! Good job!",
        icon: "success",
      });
    //POST TO ADD STAR
    demit();
    init();

};

function startEasy(){
    easy.removeEventListener(`click`, startEasy);
    medium.removeEventListener(`click`, startMedium);
    hard.removeEventListener(`click`, startHard);
    operator.textContent = "+"
    let a = numbers[Math.floor(Math.random() * numbers.length)];
    let b =  numbers[Math.floor(Math.random() * numbers.length)];
    let result;
    easy.textContent = a;
    medium.textContent = b;
    hard.textContent = "";
    result = a + b;
    console.log(result);
    displayAnswer(result)
}

function startMedium(){
    easy.removeEventListener(`click`, startEasy);
    medium.removeEventListener(`click`, startMedium);
    hard.removeEventListener(`click`, startHard);
    mediumDifficulty = true;
    operator.textContent = "+"
    let a = biggerNumber[Math.floor(Math.random() * biggerNumber.length)];
    let b =  biggerNumber[Math.floor(Math.random() * biggerNumber.length)];
    let result;
    easy.textContent = a;
    medium.textContent = b;
    hard.textContent = "";
    result = a + b;
    console.log(result);
    displayAnswer(result) 
}

function startHard(){
    easy.removeEventListener(`click`, startEasy);
    medium.removeEventListener(`click`, startMedium);
    hard.removeEventListener(`click`, startHard);
    hardDifficulty = true;
    let a = numbers[Math.floor(Math.random() * numbers.length)];
    let b =  numbers[Math.floor(Math.random() * numbers.length)];
    let middle;
    let result;
    hard.textContent = ""
    if (Math.random() < 0.5){
        operator.textContent = `+`
        middle = "+"
    } else {
        operator.textContent = `-`
        middle = "-"
    }
    easy.textContent = a;
    medium.textContent = b;
    if (middle == "-"){
        result = a - b;
        operator.textContent = "-";
    }
    if (middle == "+"){
        result = a + b
        operator.textContent = "+";
    };
    console.log(result);
    displayAnswer(result)
}


function init(){
    easy.addEventListener(`click`, startEasy, {once:true});
medium.addEventListener(`click`, startMedium, {once:true});
hard.addEventListener(`click`, startHard, {once:true});
score = 0;
countingScore.textContent = `Score: ${score}`
}

function demit(){
    easy.textContent = "Easy"
    medium.textContent = "Medium"
    hard.textContent = "Hard"
    operator.textContent = "+"
    allAnswers.forEach(div => div.textContent = "");

}


init();



