const CIRCLE_CLASS='circle'
const X_CLASS='x'
const cellElements=document.querySelectorAll('[info-cell]')
const winningTextMessage=document.querySelector('[winning-display]')
const winningMessageElement=document.getElementById('win-message')
const restartButton=document.getElementById('restart')
const board=document.getElementById('board');
let Xturn
const WINNING_COMBINATIONS=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,,7],[2,5,8],[2,4,6],[0,4,8]]
startgame()
restartButton.addEventListener('click',startgame)
function startgame(){
    Xturn=false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleclick)
        cell.addEventListener('click',handleclick,{ once :true})
    })
    setboardHoverclass()
    winningMessageElement.classList.remove('show')
}

function handleclick(e){
  const cell=e.target
  const currentClass=Xturn?X_CLASS:CIRCLE_CLASS
  placeMark(cell,currentClass)
  if(checkWin(currentClass)){
    endGame(false)
  }
  else if(isDraw()){
      endGame(true)
  }
  else{
    Swapturns()
    setboardHoverclass()
  }

}
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS)    })
}
function endGame(draw){
    if(draw){
        winningTextMessage.innerText = "Draw!"
    }
    else{
        winningTextMessage.innerText = `${Xturn ? "X's" : "O's"} Wins!`
    }
    winningMessageElement.classList.add('show')

}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function Swapturns(){
    Xturn = !Xturn;
}
function setboardHoverclass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(Xturn)
    {
        board.classList.add(X_CLASS)
    }
    else{
        board.classList.add(CIRCLE_CLASS)
    }
}
function checkWin(currentClass){
   return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}