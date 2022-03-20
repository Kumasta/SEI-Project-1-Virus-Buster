### General Assembly Project-1: Web Browser Game
# --Virus-Buster--
A Space Invader type game themed around killing Covid virus cells.  
### Project Link : https://kumasta.github.io/SEI-Project-1-Virus-Buster/

![Overveiw](https://github.com/Kumasta/Images-Gifs/blob/main/Screenshot%202022-02-02%20at%2015.59.56.jpeg?raw=true)

## Table of Contents

- [Brief](#brief)
- [Concept](#concept)
- [Built With](#built-with)
- [Approach](#approach)
  - [Planning](#planning)
    - [Wire Frame](#wire-frame)
    - [Sudo Code](#sudo-code)
    - [Checklist](#checklist)
   - [Day to day breakdown](#day-to-day-breakdown)
- [Challenges](#challenges)
- [Future Improvments](#future-improvements)
- [Main Takeaways](#main-takeaways)
- [Contact](#contact)


## Brief
My first project built from the ground up priamlry using vanilla Javacript. Virus buster is a riff on the classic game Space Invaders.
The criteria was to choose a classic game from the acades and replacate the game as a browser game using Javascript. Our time from was 9 days and we had to work solo.


## Concept
I choose to do space invaders and the MVP was that the player should be able to clear at least one wave of aliens and score should be displayed at the end of the game. With extra goals being the page should be responsive, each wave get more difficult and a persistant leaderboard saved in local storage. For the theme I went with covid-19 and vaccines to replace the aliens and player.  


## Built With
This project was built using standard code of the following languages:

* HTML5
* CSS
* JavaScript

## Approach

### Planning
##### Wire Frame
Before sign off I created a wire frame of how I thought the layout would be, compared to the final game, the layout has a few differences but overal kept the layout of the individual componenents. Some functionality like lines of enemys moving in different dirrections did not make it into the final game. 
![Space](https://user-images.githubusercontent.com/94964514/158641422-21f8cdd3-2881-4f4e-92cc-8edbe7c00eba.png)

##### Sudo Code
Wrote some sudo coding notes to give me a rough idea of the order I need to work on parts.
<img width="1048" alt="image" src="https://user-images.githubusercontent.com/94964514/158662710-93157149-d6fc-4874-b348-751f5cbb4417.png">

##### Checklist
Early on in development I figured I needed to make a check list of things to do do and to also help me visualise what order to to them. There a couple features I did not implement that would be added in future versions. 

![image](https://user-images.githubusercontent.com/94964514/158663610-c747fa3f-5c7c-48d8-b2fa-a4d931d0f925.png)
![image](https://user-images.githubusercontent.com/94964514/158663701-246e89b2-391f-4466-a0f4-d41567aa60e4.png)


### Day to day breakdown

#### Day 1
Started off with making the base HTML, CSS and JavaScript files.  Then making a 10 x 10 grid and finding first draft image assets for the play, enemy and the projectile. First features to implement where players start position and movement. As per the game movement was limited to the bottom line with no need of up to down movement. Next was adding in an enemy sprite at random positions that would disappear and reappear on the right input. Then I worked on the player projectile that will spawn 1 tile above the player and move up a tile every set interval. character sprites are displayed by changing the class of the tile to one where that background image of the sprite is set, collision was added by checking the class of the tile and if two different classes matched. 

By the end of first day of coding I ended up with this:       
![ezgif-2-f66bde661b](https://user-images.githubusercontent.com/94964514/158664426-db4b410a-769a-403d-ba51-bc9715decbbd.gif)

#### Day 2
I started off on this day making the grid size to 15 x 15 to give the game smoother movement and have more enemies on screen. (I tried 20 but I felt that was too big) I had to adjust initial starting settings to account for the bigger grid size. In the. HTML structure I added a game controller banner that would house a button to start/reset the game, show score and number of lives the player has. The next main stage was to get the enemy to move from one side of the grid to the other. I made a choice to carry this out with a line of enemies instead of just one as I thought it would be best to figure out early how the wall detection code works for a line rather than just one. I had the start button spawn a line of enemies and created a collision test for each one to be hit and removed from the grid. For the line movement After much thought and trial and error I came up with my solution to move the line as one  and then had to check if the last one in the array of coordinates hit a wall and reverse the direction. At this stage, a line can move and reverse direction and be destroyed by the player and added to the score with each hit. I added more rows of enemies and updated the styling and a window alert when all the enemies were gone. At this stage I had achived MVP!
     

By the end of second day of coding I ended up with this:          
![ezgif-7-566eab3279](https://user-images.githubusercontent.com/94964514/158666443-09bf62bc-828a-4232-9ab1-356cc75c1f55.gif)

#### Day 3
Start of this day I fixed a visual bug where a line would reach the end and not visually go down a line and then move across, instead it looked as if they would move 1 tile diagonally in the opposite direction, this was because the set interval for moving down and across was set to the same time, so I shorten the down movement and then it moves across. Next stage was for the enemies to fire back. Very similar to the player fire function except a random enemy is chosen to fire back anywhere in the array at set intervals. Other additions include, big visual updates, GIF effects for collisions, dynamic live counter, and others.  

By the end of third day of coding I ended up with this:     
![ezgif-2-bbdafa8320](https://user-images.githubusercontent.com/94964514/158783370-c213d39a-dd51-4e4b-b1b8-43c7676bbed4.gif)


#### Day 4  
This day was the start of working on loose situations for the player. The main hurdle to overcome was to stop enemy movement and fire set intervals when they either make the player all their lives or reach the bottom row. Giving the reset button more specific functionality to reset variables to the initial settings. 
By the end of forth day of coding I ended up with this:     
![95B88E64-501A-4306-B7D2-E3D3B7FE5610](https://user-images.githubusercontent.com/94964514/158783946-9da4d152-1bbd-4b76-939d-b8215e71f8ef.png)

#### Day 5
A big bug I came across was my conditional test for the enemy reaching the last line. My initial test was to use the last enemy position in the array but in certain cases it may have been an enemy in the line above and not the bottom row. At this stage I was not familiar with spreading an array to make an independent copy to sort by lowest to highest So I made a manual test by checking if each of the bottom row tiles had a virus class. Smaller additions include adding a big bonus for clearing a round and disabling the start button when a round is ongoing. After the hotfix, I started to add scaling difficulty based on the level number and speed of enemy movement and fire speed as well as number in a line and how many lines there are in a level. The foundation of a leader board was also made in the HTML structure. 

Start of day 5 was the begining bug fixes, gerenral refinements and adding extras.
![EF20421C-2810-4EB1-824B-A7DEF0BA5E89](https://user-images.githubusercontent.com/94964514/158784081-f98255e0-4dcf-4f48-9bc2-1f2389af29d0.png)

#### Day 6
Today I worked on the sound effects of the game and background music. I made a sounds bank library object and several audio 'channels' in the HTML with <audio> tags. The game over screen now is now updated to show the players score and the current high score, at this stage the score is not saved in local storage.
![219D97EE-5F7F-4B57-8AF8-B1D022F84180](https://user-images.githubusercontent.com/94964514/158784253-5336f2c6-43cc-459b-a696-6da47f87915c.png)

#### Day 7
Last full day of coding for this project. Nearly all time was spent on learning how to utilise local storage for the leaderboard. At page load, the high score array of objects (contains key/values for player name and score) is taken from local storage. Next the array is sorted by score value and in a table tag in the HTML. a new row item is appended for each score. Any time the player finishes a game they are prompted to enter the name for the leaderboard table. The table is wiped and the list is sorted again with the new obj added. The local storage is updated and the new leaderboard is created. 

![0488C5B5-74A7-4CED-ABA3-45D6DAD2B8F7](https://user-images.githubusercontent.com/94964514/158784325-a6229777-debb-436a-a75d-f5fadc8a939e.png)

#### Day 8
By the end of the week the game looked like this and we presented our project to the course group. 
![gif](https://github.com/Kumasta/Images-Gifs/blob/main/virus-buster-2.gif?raw=true)
  
  
## Challenges 
- This was the first project of the course and the first time we followed a plan made by ourselves. There was a big feeling of nervousness and uncertainty  going into the project that had to be overcome. 
- Being still new to JavaScript, there were many functions and methods I was not familiar with yet like array/object spreading that would have helped a lot for certain parts of the game.
  
## Future Improvements 
- Adding variation to the enemies like design and features/habits.
- Making the leaderboard true global with a simple database and API requests.
- fine tune last line enemy test with a sorted spread array. 

  
## Main Takeaways 
As stated in the challenges, I went into this project with a lot of unease but I am so glad I went through the process as I was able to apply what I had learnt and also learned so much more. It was a real big confidence boost and made me excited to go into the next project. 

  
## Contact

Social - https://www.linkedin.com/in/mayur-kumar-dev/

email - mayurkumardev@googlemail.com

Game Link: [https://github.com/your_username/repo_name](https://kumasta.github.io/Virus-Buster/)

Git repo: https://github.com/Kumasta/Virus-Buster

<p align="right">(<a href="#general-assembly-project-1-web-browser-game">back to top</a>)</p>

