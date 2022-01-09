function init(){
  //DOM Elements
  const start = document.querySelector('#start-button')
  const reset = document.querySelector('#reset-button')
  const livesSpan = document.querySelector('#live-counter')
  const score = document.querySelector('#score')
  let scoreNumber = 0

  //Grid variables
  const grid = document.querySelector('#grid')
  const width = 15
  const cellCount = width * width
  const cells = []
  
  //Player Char Varaibles
  const charClass = 'character'
  const startPosition = 217 //Must be on the bottom line (210 - 224)
  let charCurrentPosition = startPosition
  const fireSpeed = 15 // (1000 / num) How fast fire moves up the grid

  //Lives variables
  const startLives = 3
  let lives = startLives 
  livesSpan.innerText = ('💉').repeat(startLives)

  //Virus Variables
  const virusClass = 'virus'
  const virusFireClass = 'virusFire'
  // Change values below to change virus settings
  const virusStartPosition = 17
  const virusLinesNumber = 2
  const virusEnemyAmount = 10

  //?? How to update the speed value?
  let diffuculty = 2//??
  // let speed = 1 - (diffuculty / 10) //??
  console.log(diffuculty)//??

  let virusCurrentPositionArray = []
  let direction = 1 //right

  //Fire shot Varaibles
  const fireClass = 'fire'
  const fireSpawnPostion = charCurrentPosition - width
  let fireMovement = fireSpawnPostion

  //Grid generate function
  function makegrid() {
    for (let i = 0; i < cellCount; i++) {
      const gridCell = document.createElement('div')
      gridCell.innerHTML = i
      grid.appendChild(gridCell)
      cells.push(gridCell)
    }
  }

  //Add & Remove character functions
  function addChar(position){
    cells[position].classList.add(charClass)
  }
  function removeCha(position) {
    cells[position].classList.remove(charClass)
  }

  //VIRUS FUNCTIONS:
  //Add Viruses
  function addVirusStart(position) {
    for (let i = 0; i < virusEnemyAmount; i++) {
      for (let y = 0; y < virusLinesNumber; y++) {
        cells[position + width * y + i].classList.add(virusClass) 
        virusCurrentPositionArray.push(position + width * y + i)
      }
    }
    console.log('Virus Positons:', virusCurrentPositionArray)
  }

  //Remove Viruses + add score   
  function removeVirus(position) {
    cells[position].classList.remove(virusClass)
    const collided = virusCurrentPositionArray.indexOf(position)
    virusCurrentPositionArray.splice(collided, 1)
  
    scoreNumber += 1000
    score.innerHTML = scoreNumber
    cells[position].innerHTML = '<img src="/Assets/BoomGIF3.gif" alt="Boom GIF">'
    setTimeout(() => {
      cells[position].innerHTML = null
    }, 500)
  }

  //Virus Movment > virus-fire
  function VirusMovement() {
    const movementInterval = setInterval(() => {
      virusCurrentPositionArray.forEach(position => {
        cells[position].classList.remove(virusClass)
      })
      virusCurrentPositionArray = virusCurrentPositionArray.map(position => position + direction)
      virusCurrentPositionArray.forEach(position => {
        cells[position].classList.add(virusClass)
      })

      if (virusCurrentPositionArray[virusCurrentPositionArray.length - 1] % width === width - 1) {
        direction *= -1
        moveLineDown()
      } else if (virusCurrentPositionArray[0] % width === 0){
        direction *= -1
        moveLineDown()
      } if (virusCurrentPositionArray.length === 0) {
        clearInterval(movementInterval)
        gameFinished()
      }
      // console.log(1000)//??
    }, 1000) //??
  }

  //Virus Move down a line
  function moveLineDown() {
    setTimeout(() => {
      virusCurrentPositionArray.forEach(position => {
        cells[position].classList.remove(virusClass)
      })
      virusCurrentPositionArray = virusCurrentPositionArray.map(position => position + width)
      virusCurrentPositionArray.forEach(position => {
        cells[position].classList.add(virusClass)
      })  
    }, 500)
  }

  //Virus fire function
  function virusFire() {
    setInterval(() => { // Runs as the page loads as of now. Will run when start button is pushed
      if (virusCurrentPositionArray.length > 0) { //Checks to see if a virus is still on the grid
        const randomVirusToFire = virusCurrentPositionArray[Math.floor(Math.random() * virusCurrentPositionArray.length)]  //Pull a postion number from the virus array
        cells[randomVirusToFire].classList.add(virusFireClass)
        virusFireMovement(randomVirusToFire)
      }
    }, 1000 * 2) 
  }

  function virusFireMovement(location) {
    const virusFireInterval = setInterval(() => {
      cells[location].classList.remove(virusFireClass)
      cells[location + width].classList.add(virusFireClass)
      location += width
      // console.log('V fire:', location)
      if (cells[location].classList.value === 'character virusFire' || cells[location].classList.value === 'emptyCharacter character virusFire') {
        console.log('Player hit')
        chaHit(location)
        cells[location].classList.remove(virusFireClass)
        cells[location].classList.add('character')
        console.log(cells[location].classList)
        clearInterval(virusFireInterval)
        removeCha(location)
        //?? NEED a function for loosing lives. 
      } else if (location >= width * width - width) {
        clearInterval(virusFireInterval)
        setTimeout(() => { //Waits one more interaval so you can see the fire on the last row.
          cells[location].classList.remove(virusFireClass)
        }, 1000 / 3)
      }
    }, 1000 / 3)
  }

  //Player hit events
  function chaHit(location) {
    lives -= 1
    livesSpan.innerText = ('💉').repeat(lives)
    if (lives <= 0) {
      setTimeout(() => {
        window.alert('Game Over!') 
      }, 1000)
    }
    cells[location].innerHTML = '<img src="/Assets/BoomGIF4.gif" alt="Boom GIF">'
    setTimeout(() => {
      cells[location].innerHTML = null
    }, 500)
  }
  
  //Function to move character and fire 
  function movementAndFire(event) {
    const key = event.keyCode 
    const left = 37
    const right = 39
    const fire = 32
    removeCha(charCurrentPosition)
    if (key === right && charCurrentPosition % width !== width - 1) {
      charCurrentPosition++
    } else if (key === left && charCurrentPosition % width !== 0) {
      charCurrentPosition--
    } else if (key === fire) {
      fireShot(charCurrentPosition)
      charImageChange()
    }
    addChar(charCurrentPosition)
  }

  //Function to spawn fire
  function fireShot(spawn){
    cells[spawn - width].classList.add(fireClass)
    fireMovement = cells[spawn - width].innerHTML
    fireMove(fireMovement)
  }

  //Fire movment function, will stop as it reaches the top row. 
  function fireMove(location) {
    const fireTime = setInterval(() => {
      cells[location].classList.remove(fireClass) //Removes previous image of fire
      cells[location - width].classList.add(fireClass) //Add new image on new row above. 
      location -= width
      // console.log('Virus Location:', cells[location].className, cells[location].innerHTML)
      if (cells[location].className === 'virus fire' || cells[location].className === 'virus virus fire') { //Checks to see if atile has both the virus && fire class. 
        fireVirusCollision(location)
        clearInterval(fireTime)
      } else if (location < width) { //checks to see if it reaches the top row
        clearInterval(fireTime) //stops the Time Interval
        setTimeout(() => { //Waits one more interaval so you can see the fire on the last row.
          cells[location].classList.remove(fireClass)
        }, 1000 / fireSpeed)
      } 
    }, 1000 / fireSpeed)   
  }
  
  //Fire hits a virus
  function fireVirusCollision(location) {
    removeVirus(location)
    cells[location].classList.remove(fireClass)
  } 

  //Character animation for fire
  function charImageChange() {
    const animationPosition = charCurrentPosition
    cells[animationPosition].classList.add('emptyCharacter')
    setTimeout(() => {
      cells[animationPosition].classList.remove('emptyCharacter')
    }, 50)
  }

  function gameFinished() {
    window.alert(`You won the game!\n Final score:${scoreNumber}`)
  }

  //Set up fucntions
  function startUpGame(event) {
    addVirusStart(virusStartPosition)
    diffuculty += 1 //??
    console.log('Dificulty', diffuculty)//??
    VirusMovement()//??
    start.disabled = true//??
    addChar(charCurrentPosition)
    virusFire()
  }
  makegrid() 

  //Button Events
  start.addEventListener('click', startUpGame)
  window.addEventListener('keyup', movementAndFire)

  //Function that stops spacebar scrolling the window down
  window.addEventListener('keydown', (e) => {  
    if (e.keyCode === 32 && e.target === document.body) {  
      e.preventDefault()
    }  
  })
}


window.addEventListener('DOMContentLoaded', init)