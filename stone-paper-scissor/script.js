const choices=document.querySelectorAll('.choice');
const userScore=document.querySelector('#user-score');
const compScore=document.querySelector('#comp-score');
const msg=document.querySelector('.msg-container');
const counter=document.querySelector('#counter');

window.addEventListener('load',()=>{
    for(let i=10;i<=100;i++){
        let option=document.createElement('option');
        option.value=i;
        option.innerText=i;
        counter.append(option);
    }
})

let limit=10;
let count=0;
counter.addEventListener('change',(e)=>{
    console.log(e.target.value);
    limit=e.target.value;
})

const refreshGame=()=>{
    limit=10;
    count=0;
    msg.innerText='Play Your turn';
    msg.style.backgroundColor="rgb(1, 43, 134)";
    choices.forEach(choice=>choice.disabled=false);
    document.querySelector('.again').style.visibility='hidden';
    counter.disabled=false;
    userScore.innerText=0;
    compScore.innerText=0;
}

document.querySelector('.again').addEventListener('click',()=>refreshGame())

const checkLimit=(arg1,arg2=10)=>{
    if(arg1===arg2){
        let uScore=Number.parseInt(userScore.innerText);
        let cScore=Number.parseInt(compScore.innerText);
        if(uScore==cScore){
            msg.innerText="Game has been Draw.";
        }
        else if(uScore>cScore){
            msg.innerText="User win the Game.";
        }
        else{
            msg.innerText="Computer wun the Game.";
        }
        msg.style.backgroundColor="rgb(1, 43, 134)";
        choices.forEach((choice)=>(choice.disabled=true));
        document.querySelector('.again').style.visibility='visible';
    }
}

const getCompChoice=()=>{
    let Options=["rock","paper","scissor"];
    let randomIdx=Math.floor(Math.random()*3);   
    return Options[randomIdx];
}

const drawGame=()=>{
    console.log('Game is draw');
    msg.innerText="This turn was draw. Play again";
    msg.style.backgroundColor="rgb(1, 43, 134)";
}

const displayWinner=(userWin)=>{
    if(userWin){
        userScore.innerText=Number.parseInt(userScore.innerText)+1;
        console.log("User Win.");
        msg.innerText="You win this turn.";
        msg.style.backgroundColor="green";
    }
    else{
        compScore.innerText=Number.parseInt(compScore.innerText)+1;
        console.log("Computer win.");
        msg.innerText="You lose this turn.";
        msg.style.backgroundColor="rgb(245, 22, 22)";
    }
}

const playGame=(userChoice)=>{
    console.log(count+1);
    // console.log("User Choice",userChoice);
    const compChoice=getCompChoice();
    // console.log("Computer choice",compChoice);
    if(userChoice===compChoice){
        drawGame();
    }
    else{
        let userWin=true;
        if(userChoice=='rock'){
            //"paper" "scissors"
            userWin= compChoice==="paper" ? false : true;
        }
        else if(userChoice=='paper'){
            //"rock" "scissors"
            userWin= compChoice==="scissors"?false:true;
        }
        else {
            //"rock" "paper"
            userWin= compChoice==="rock"?false:true;
        }
        displayWinner(userWin);
    }
    checkLimit(++count,limit);
}

choices.forEach((choice)=>{
    choice.addEventListener('click',()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    })
})