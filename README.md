# Mission to Mars

###### I've been obsessed with space travel since I was a kid. In the dawn of what seems to be a new era of space exploration, I'm starting a new era in my career. With Mission to Mars, my first application that combines HTML, CSS, JS and DOM Manipulation, I wanted to make an homage to both my deep interest in space and this new beginning.

## The Game

###### Three hundred years after the establishment of the first colony on the Moon, humankind is ready to get to the next frontier: Mars. However, the new Mars Landing rocket is very expensive, and it will require a huge amount of the ultra-rare space mineral Iridium to be funded. 

### Instructions

###### Use the arrow keys to help Major Tom travel through space in search of Iridium rocks. Each rocket part has a cost of $1,000,000. If this amount is collected, it will be inmediately invested in the construction of the rocket.

###### Avoid the meteorites!

## How it works

###### The basic setup consists of two HTML canvas interacting with each other, the "Game Window" and the "Mission Control". In the Mission Control, the user can see the current budget amount (each collision with an *Iridium* element adds $100.000) and the progress of the rocket construction. Every time the budget reaches $1.000.000, it will reset to 0 and a part of the rocket is going to display in the Mission Control Canvas. 

### The Classes

###### There are three classes in this code: *Astronaut* (which contains all the functionality of the main character), *Meteorite* (creates the meteorite objects in different rotations depending on the position on the y axis and random 'x' position outside the canvas) and *Iridium* (extends from Meteorite).

### Collision Detection

###### Since most of the meteorites are drawn rotated, the 'x' and 'y' points are not the same for every element. Invisibile objects were created to simulate the *impact area*, both on the Astronaut class and the Meteorite Class. These invisible objects move along the images, but are actually placed where the collision should be detected -the main part of the meteorite and the main aprt of the body of the astronaut-. The collision detection actually happens in these invisible objects.

### Difficulty Levels

###### After each of the rocket parts is successfully built, the game will become increasingly more difficult (both by lowering the frequency in whic the meteorites are created and by increasing their speed).

### Mission Accomplished

###### The game is completed after the tip of the rocket is built (level 5). 
