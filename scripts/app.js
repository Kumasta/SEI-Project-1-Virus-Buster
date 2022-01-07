function init(){


  //Grid variables
  const grid = document.querySelector('#grid')
  const width = 10
  const cellCount = width * width
  const cells = []

  //Player Char Varaibles
  const charClass = 'character'
  const startPosition = 94
  let charCurrentPosition = startPosition

  //Virus Variables
  const virusClass = 'virus'
  const virusStartPosition = 0
  let virusCurrentPosition = virusStartPosition

  //Fire shot Varaibles
  const fireClass = 'fire'
  const fireSpawnPostion = charCurrentPosition - 10
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
  function addVirus() {
    let randomNumber = Math.floor(Math.random() * width * 3) + 20
    if (randomNumber < 19) {
      randomNumber += 20
    }
    cells[randomNumber].classList.add(virusClass)
    virusCurrentPosition = randomNumber
    console.log(virusCurrentPosition)
  }

  function removeVirus(position) {
    cells[position].classList.remove(virusClass)
    virusCurrentPosition = null
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
    }
    addChar(charCurrentPosition)
  }

  //Function to spawn fire
  function fireShot(spawn){
    cells[spawn - 10].classList.add(fireClass)
    fireMovement = cells[spawn - 10].innerHTML
    fireMove(fireMovement)
  }

  //Fire movment function, will stop as it reaches the top row. 
  function fireMove(location) {
    const fireTime = setInterval(() => {
      cells[location].classList.remove(fireClass) //Removes previous image of fire
      cells[location - 10].classList.add(fireClass) //Add new image on new row above. 
      location -= 10
      if (location === virusCurrentPosition) {
        fireVirusCollision(location)
        clearInterval(fireTime)
      } else if (location < width) { //checks to see if it reaches the top row
        clearInterval(fireTime) //stops the Time Interval
        setTimeout(() => { //Waits one more interaval so you can see the fire on teh last row.
          cells[location].classList.remove(fireClass)
        }, 1000 / 10)
      } 
    }, 1000 / 10)   
  }
  
  function fireVirusCollision(location) {
    removeVirus(location)
    cells[location].classList.remove(fireClass)
  }
  

  //Linking keyboard presses to function:
  window.addEventListener('keyup', movementAndFire)

  //Set up fucntions
  makegrid(charCurrentPosition)
  addVirus()
}


window.addEventListener('DOMContentLoaded', init)