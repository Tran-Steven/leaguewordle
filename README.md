<p align="center">
<img src= "https://github.com/Tran-Steven/leaguewordle/blob/master/leaguewordle-frontend/src/assets/images/league-of-wordle.png?raw=true"
     width="50%"
     height="50%"
     alt="Logo of the game that says League of Wordle"
     />
  </br>
  </br>
  <h2 align ="center">
  A version of Wordle but with League of Legends Champions
  </h2>
  </p>


<p align="center">
The word bank contains all of the current League of Legends champions and gives hints if you are close to the target champion. </br>You have 5 tries to guess the correct champion. Every incorrect guess produces hints showing which traits were correct or wrong.
  <br>
  <br>
You can play the game here:
https://leaguewordle.herokuapp.com/
<h2></h2>
</p>


**_Built with: React, Node.js_**


<h2></h2>
          <div>
          <p align="center">
          <img src="https://user-images.githubusercontent.com/64705534/184717268-d5abdaa5-5b40-41d5-9950-0541583049e0.png" height="50%" width="50%"/>
          </p>
     <img src="https://user-images.githubusercontent.com/64705534/184621631-53fafab3-09a2-416b-8bb0-11832fbc5d8f.png" height="90%" width="90% alt="Image with text:"Responsive Design" and a picture of various devices with the website pulled up."/>
   <img src="https://user-images.githubusercontent.com/64705534/184618377-9c79f5cd-6df5-4c6b-a70a-737bb235e576.png" height="100%" width="100%" alt="Picture of a laptop showcasing dark mode with text on the right saying: "Dark Mode""/>
     </div><h2></h2>
     
     

## Champion List and Attributes
The Champion & their respective attributes are taken from the [League of Legends Fandom Wiki Page](https://leagueoflegends.fandom.com/wiki/List_of_champions) as an HTML table and then converted to a JSON file.

<br>

#### The original JSON file format


| **Champion** 	| **Classes** 	| **Release Date** 	| **Last Changed** 	| Blue Essence  	| **RP** 	|
|:---:	|:---:	|:---:	|:---:	|:---:	|:---:	|
| **Aatrox**<br>The Darkin Blade 	| Juggernaut 	| 2013-06-13 	| V12.14 	| 4800 	| 880 	|


#### The restructured JSON file format


| **Champion** 	| **Description** 	| **Classes** 	| **Release Year** 	| **Last Changed** 	| **Blue Essence** 	| **RP** 	|
|:---:	|:---:	|:---:	|:---:	|:---:	|:---:	|---	|
| Aatrox 	| The Darkin Blade 	| Juggernaut 	| 2013 	| V12.14 	| 4800 	| 880 	|

<br>

The restructured file is made to be easily broken into strings to compare and produce hints. 
The JSON file used to form the Word Bank and hints is available to read and download in the repository under the file name [champions.json](https://github.com/Tran-Steven/leaguewordle/blob/master/leaguewordle-frontend/src/data/champions.json)
<br><br><br><br>


Restructure changes done by [@Darren-Tham](https://github.com/Darren-Tham) [^1]


<h2></h2>

## Hints

Hints are displayed under the input bar only if the player's guess is wrong. It compares the guessed champion's attributes to the correct champion and produces a visual showing which attribute is correct, incorrect, or if the guessed attribute is lower or higher compared to the correct champion.


### Correct:       <img src="https://raw.githubusercontent.com/Tran-Steven/leaguewordle/1407a9383b55907b2c6eeb92f33a36526bddc1f9/leaguewordle-frontend/src/assets/images/svg/checkmark.svg" height="4%" width="4%" alt="a checkmark icon">


### Incorrect:         <img src="https://raw.githubusercontent.com/Tran-Steven/leaguewordle/1407a9383b55907b2c6eeb92f33a36526bddc1f9/leaguewordle-frontend/src/assets/images/svg/wrong.svg" height="4%" width="4%" alt="An incorrect/wrong symbol (an X with a circle around it)">


### Higher:        <img src="https://raw.githubusercontent.com/Tran-Steven/leaguewordle/1407a9383b55907b2c6eeb92f33a36526bddc1f9/leaguewordle-frontend/src/assets/images/svg/higher.svg" height="4%" width="4%" alt="An Up Arrow icon">

### Lower:       <img src="https://raw.githubusercontent.com/Tran-Steven/leaguewordle/1407a9383b55907b2c6eeb92f33a36526bddc1f9/leaguewordle-frontend/src/assets/images/svg/down-svg.svg" height="4%" width="4%" alt="A Down Arrow icon">
<h2></h2>

## The Four Attributes Used


#### Blue Essence Amount 

<img src="https://static.wikia.nocookie.net/leagueoflegends/images/2/24/Hextech_Crafting_Blue_Essence.png/revision/latest?cb=20181204125617" width="20%" height="20%"/>

If the guessed Champion's Blue Essence amount is equal to the correct Champion's Blue Essence amount, it will be shown as correct. If the guess is wrong, a hint will be shown to the player if the Blue Essence value is lower or higher.

Blue Essence values are between [ 450 BE, 1350 BE, 3150 BE, 4800 BE and 6300 BE ] 

Please note that new Champion's initial increased Blue Essence cost (7800 BE) will not be included but rather defaulted to the normal price of 6300 BE.


#### Riot Point Amount

<img src="https://static.wikia.nocookie.net/leagueoflegends/images/0/00/RP_icon.png/revision/latest/smart/width/250/height/250?cb=20191120141937" width="8%" height="8%"/>

If the guessed Champion's RP amount is equal to the correct Champion's RP amount, it will be shown as correct. If it is wrong, it will give a hint to the player if the RP value is lower or higher.

Riot Point values are between [ 260 RP, 585 RP, 790 RP, 880 RP and 975 RP ] 


#### Release Year

If the guessed Champion's release year is equal to the correct Champion's release year, it will be shown as correct. If it is wrong, it will give a hint to the player if the release year is lower or higher.

The current range is between the years [ 2009 - 2022 ]

#### Classes

If the guessed Champion's class is equal to the correct Champion's class, it will be shown as correct. If not, an incorrect icon will appear.

The current list of classes are:

[  Artillery, Assassin, Catcher, Diver, Skirmisher, Battlemage, Burst, Enchanter, Warden, Juggernaut, Marksman, Specialist and Vanguard ] 

<h2></h2>

## Champion Images
Using Riot's [Data Dragon tarball](https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html), which included the Champion icons and loading images, the player guessed champion icon is displayed if the guess is wrong.

The image file names were structured in Riot's tarball as "Ahri_0, Ahri_1, Ahri_2" ... "Alistar_0, Alistar_1..." which was not ideal. This is due to the need of only the base skin (as of right now) and the need to simplify the file name to make it easier to conditionally render based on player guess submissions.


By creating an [image/file parser](https://github.com/Tran-Steven/python-imageparser) in Python, the non-base images were removed (files that did not contain "_0" in its file name) and images were renamed to be all uppercase and removed the "_0" from the end of the file name.

This kept a consistent and easily accessible image name which could be called and changed upon player guess submission.

<h2></h2>

### Acknowledgements

[^1]:

     [@Darren-Tham](https://github.com/Darren-Tham) Huge thanks to Darren for restructuring the JSON file and helping me out at the start of this project!
     
     
