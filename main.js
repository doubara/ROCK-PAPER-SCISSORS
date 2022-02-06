
const rulesBtn = document.querySelectorAll('#rules--btn');
const rulesModal = document.querySelector('.rules__modal');
const choices = document.querySelectorAll('.picker__figure__img')
const pickerStatusTitle = document.querySelector('.picker__status__title')
const playAgain = document.querySelector('.picker__status__button')
const pickerStatus = document.querySelector('.picker__status')
const scoreBoard = document.querySelector('.score-board__score__number')

const validRules = ['Rock-Scissors', 'Scissors-Paper', 'Paper-Rock']
const pickerObj = {
  Rock: `<figure class="picker__figure rock my--pick">
          <img class="picker__figure__img" src="./images/icon-rock.svg" alt="" />
        </figure>`,
  Paper: `<figure class="picker__figure paper my--pick">
            <img class="picker__figure__img" src="./images/icon-paper.svg" alt="" />
          </figure>`,
  Scissors: `<figure class="picker__figure scissors my--pick">
              <img class="picker__figure__img" src="./images/icon-scissors.svg" alt="" />
            </figure>`,
  Empty: ``
}
let score = 0
function loadAllEventListeners(){
  rulesBtn.forEach(btn =>{
    btn.addEventListener('click', function(){
      rulesModal.classList.toggle('show--modal');
    })
  })
  
  choices.forEach(choice => {
    choice.addEventListener('click', (e)=>{
      const picked = choice.dataset?.choose
      checkValidRules(picked)
      openPicker(true)
      addMyPick(picked)
    })
  })
  playAgain.addEventListener('click', ()=>{
    openPicker(false)
    showStatus(false)
    addMyPick('Empty')
    addSystemPick('Empty', 0)
  })
};
loadAllEventListeners();
function checkValidRules(myChoice){
  let systemChoice;
  if (myChoice != undefined && isNaN(myChoice)){
    systemChoice = function(){
      const arr = ['Rock', 'Paper', 'Scissors']
      let randInt = Math.floor(Math.random() * 3)
      return arr[randInt]
    }
  }
  let systemValue = systemChoice()
  //calling the system picked value
  addSystemPick(systemValue, 2000)
 let choose = `${myChoice}-${systemValue}`
 if (myChoice === systemValue){
   draw()
   return
 }
 else {
   for (let i = 0; i<validRules.length;i++){
     if (choose === validRules[i]){
       score++
       win()
       return
     }
   }
 }
 lose()
 return false
}

/*Update Score Board*/
function updateScoreboard(){
  if (score < 10){
    scoreBoard.innerText = `0${score}`
  }
  else{
    scoreBoard.innerText = `${score}`
  }
}

function openPicker(isValid){
  const picker = document.querySelector('.picker')
  if (isValid){
    picker.classList.add('show--picker')
  }
  else picker.classList.remove('show--picker')
}
myPick = document.querySelector('.my--pick')
function addMyPick(pick){
  myPick.innerHTML = pickerObj[pick]
}
sysPick = document.querySelector('.sys--pick')
function addSystemPick(pick, time){
  setTimeout(()=>{
    sysPick.innerHTML = pickerObj[pick]
  }, time)
}
function win(){
  setTimeout(()=>{
    pickerStatusTitle.innerText = 'You Win'
    showStatus(true)
    updateScoreboard()
  }, 2500)
}
function lose(){
  setTimeout(() => {
    pickerStatusTitle.innerText = 'You Lose'
    showStatus(true)
    updateScoreboard()
  }, 2500)
}
function draw(){
  setTimeout(() => {
    pickerStatusTitle.innerText = 'Draw'
    showStatus(true)
    updateScoreboard()
  }, 2500)
}
function showStatus(isValid){
  if (isValid){
    if (!pickerStatus.classList.contains('show--status')) {
      pickerStatus.classList.add('show--status')
      /*playAgain.classList.add('show--status')*/
      myPick.classList.add('box-shadow')
    }
  }
  else {
    pickerStatus.classList.remove('show--status')
    /*playAgain.classList.remove('show--status')/*/
    myPick.classList.remove('box-shadow')
  }
}