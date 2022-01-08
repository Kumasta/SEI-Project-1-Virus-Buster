function init(){
  //DOM Elements
  const start = document.querySelector('#start-button')

  //Grid variables
  const grid = document.querySelector('#grid')
  const width = 15
  const cellCount = width * width
  const cells = []
  

  //Player Char Varaibles
  const charClass = 'character'
  const startPosition = 217 
  let charCurrentPosition = startPosition

  //Virus Variables
  const virusClass = 'virus'
  const virusStartPosition = 33
  //Add number of virus lines varaibles to ramp up difficulty e.g. const virusLineNumber = 1
  // Use this in a for loop in addVirus() function
  // const virusSpeed = 1000 :::: Varaible to change the speed of virus line movement 
  let virusCurrentPositionArray = []
  let direction = 1

  //Fire shot Varaibles
  const fireClass = 'fire'
  const fireSpawnPostion = charCurrentPosition - width
  let fireMovement = fireSpawnPostion

  //Grid generate function
  function makegrid(charCurrentPosition) {
    for (let i = 0; i < cellCount; i++) {
      const gridCell = document.createElement('div')
      gridCell.innerHTML = i
      grid.appendChild(gridCell)
      cells.push(gridCell)
    }
    addChar(charCurrentPosition)
  }

  //Add & Remove character functions
  function addChar(position){
    cells[position].classList.add(charClass)
  }
  function removeCha(position) {
    cells[position].classList.remove(charClass)
  }

  //Add/Remove Virus
  function addVirusStart(position) {
    for (let i = 0; i < 8; i++) {
      cells[position + i].classList.add(virusClass)
      // cells[position + width + i].classList.add(virusClass)
      virusCurrentPositionArray.push(position + i)
      // virusCurrentPositionArray.push(position + width + i)
      // virusCurrentPositionArray.sort((a, b) => {
      //   return b - a
      // })
      // console.log('Virus Positons:', virusCurrentPositionArray)
    }
  }
  function removeVirus(position) {
    cells[position].classList.remove(virusClass)
    // virusCurrentPosition = null // Change this into a function that will slice out the array index of that position
  }

  //Virus Movment
  function VirusMovement() {
    const rightWall = virusCurrentPositionArray[virusCurrentPositionArray.length - 1] % width !== width - 1
    console.log(virusCurrentPositionArray[virusCurrentPositionArray.length - 1] % width)
    const leftWall = virusCurrentPositionArray[0] % width !== 0


    const moveRight = setInterval(() => {
      console.log('Move from', virusCurrentPositionArray)
      virusCurrentPositionArray.forEach(position => {
        cells[position].classList.remove(virusClass)
      })
      virusCurrentPositionArray = virusCurrentPositionArray.map(position => position + direction)
      virusCurrentPositionArray.forEach(position => {
        cells[position].classList.add(virusClass)
      })

      if (virusCurrentPositionArray[virusCurrentPositionArray.length - 1] % width === width - 1) {
        direction *= -1
      } else if (virusCurrentPositionArray[0] % width === 0){
        direction *= -1
      }
    }, 1000)
  }
  
  console.log(44 % 15)


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
      if (cells[location].className === 'virus fire') { //Checks to see if atile has both the virus && fire class. 
        fireVirusCollision(location)
        clearInterval(fireTime)
      } else if (location < width) { //checks to see if it reaches the top row
        clearInterval(fireTime) //stops the Time Interval
        setTimeout(() => { //Waits one more interaval so you can see the fire on teh last row.
          cells[location].classList.remove(fireClass)
        }, 1000 / 20)
      } 
    }, 1000 / 20)   
  }
  
  function fireVirusCollision(location) {
    removeVirus(location)
    cells[location].classList.remove(fireClass)
  }
  

  //Linking keyboard presses to function:
  window.addEventListener('keyup', movementAndFire)

  //Set up fucntions
  function startUpGame() {
    addVirusStart(virusStartPosition)
    VirusMovement()
    // console.log('Start Tiles:', cells) 
  }

  //Button Events
  start.addEventListener('click', startUpGame)
  
  makegrid(charCurrentPosition) 

}


window.addEventListener('DOMContentLoaded', init)