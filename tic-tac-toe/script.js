const boxes=document.querySelectorAll('.box');
const user1=document.querySelector('.user1');
const user2=document.querySelector('.user2');
const newBtn=document.querySelector('#new-game');
const resetBtn=document.querySelector('#reset');

const winnerPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];
let user0=true;
let user="User2";

user1.addEventListener('click',()=>{
    user0=false;
    user="User1";
    userHighlight();
})
user2.addEventListener('click',()=>{
    user0=true;
    user="User2";
    userHighlight()
})

const userHighlight=()=>{
    if(user0){
        user2.classList.add('highlight');
        if(user1.classList.contains('highlight'))   user1.classList.remove('highlight');
    }
    else{
        user1.classList.add('highlight');
        if(user2.classList.contains('highlight'))   user2.classList.remove('highlight');
    }
}

const disableBox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const checkWinner=()=>{
    for(let pattern of winnerPatterns){
        let var1pos=boxes[pattern[0]].innerText;
        let var2pos=boxes[pattern[1]].innerText;
        let var3pos=boxes[pattern[2]].innerText;
        if(var1pos!=""&&var2pos!=""&&var3pos!=""){
            if(var1pos==var2pos&&var2pos==var3pos){
                disableBox();
                (var1pos=='X')?(user='User1'):(user='User2');
                document.querySelector('.winner').innerText=user;
                document.querySelector('.msg-box').style.display='block';
                resetBtn.style.display='none';
                newBtn.style.display='block';
            }
        }
    }
}

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        console.log('clicked');
        if(user0){
            box.innerText='O';
            user0=!user0;
        }else{
            box.innerText='X';
            user0=!user0;
        }
        box.disabled=true;
        checkWinner();
        userHighlight();
        user1.disabled=true;
        user2.disabled=true;
    })
})

userHighlight();

resetBtn.addEventListener('click',()=>{
    enableBox();
    user1.disabled=false;
    user2.disabled=false;
    userHighlight();
});
newBtn.addEventListener('click',()=>{
    enableBox();
    user1.disabled=false;
    user2.disabled=false;
    userHighlight();
    resetBtn.style.display='block';
    newBtn.style.display='none';
    document.querySelector('.msg-box').style.display='none';
    document.querySelector('.winner').innerText="";
});