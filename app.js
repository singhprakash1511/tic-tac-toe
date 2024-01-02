let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let drawBtn = document.querySelector("#draw-btn");
let msgContainer =  document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let hero = document.querySelector(".hero");
let drawMsg = document.querySelector("#draw-msg");
let drawContainer = document.querySelector(".draw-container");

let turnX = true;
let count = 0;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach( (box) => {
    box.addEventListener("click", () => {
        if(turnX){
            box.innerHTML="X";
            box.style.color="green";
            turnX=false;
        }
        else{
            box.innerHTML="O";
            box.style.color="#b0413e";
            turnX = true;
        }
        box.disabled = true;
       count++;


       let isWinner = checkWinner();

       if (count === 9 && !isWinner) {
         gameDraw();
       }
    })
})

const disableBoxes = () => {
    for (let box of boxes ){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes ){
        box.disabled = false;
        box.innerText="";
    }
}

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide")
    drawContainer.classList.add("hide")
    hero.classList.remove("hide")
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    hero.classList.add("hide");
    disableBoxes();
}


const gameDraw = () => {
    drawMsg.innerText = `Game was a Draw & has no Winner`;
    drawContainer.classList.remove("hide");
    hero.classList.add("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;
        if(pos1Val !="" && pos2Val!="" && pos3Val!="" ){
            if(pos1Val===pos2Val&& pos2Val===pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }

    newBtn.addEventListener("click", resetGame);
    drawBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);

}