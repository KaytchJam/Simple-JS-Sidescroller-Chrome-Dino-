# Simple JS Sidescroller: Chrome-Dino-
Tried recreating the chrome dinosaur game by memory &amp; with JS canvas. There are probably way more efficient ways of doing this but it was fun trying to recreate it.

### Task List:

- [x] Added collision between Player, spike, and floor
- [x] Make spikes speed up over time
- [x] Added a highscore counter
- [ ] Added random spike spawning & spike variants

### Thought Process:

Adding this so that I can go back and understand why I made certain decisions if I ever look back at this. This is also a good way at practicing my explaining skills as a side benefit lol.

#### Collision Detection

```javascript
if (player.x + (player.w/2) >= spike.x - spike.w && player.x + player.w/2 <= spike.x + spike.w) { // Conditional 1 & 2
        if (player.y + player.h >= Math.abs((5/4) * (spike.x - (player.x + (player.w/2)))) + spike.y ) { // Conditional 3
            hit++;
        }
}
```

The above code is a way of checking how close the player is to the midpoint of a spike obstacle, as well as check the height of the player as compared to the height of the spike at a given point. The first condition of the nested if ` player.x + (player.w / 2) >= spike.x - spike.w` checks if the center of the dinosaur sprite is past the leftmost point of the spike, whereas the second condition ` player.x + (player.w / 2) <= spike.x + spike.w ` checks if the center of the dinosaur sprite isn't past the rightmost point of the spike. 

![Diagram of Conditional 1 & 2](https://github.com/KaytchJam/Simple-JS-Sidescroller-Chrome-Dino-/blob/main/readme-assets/poorlydrawndiagram.png?raw=true)

The next part of this is "conditional 3" which is the following if statement:  `if (player.y + player.h >= Math.abs((5/4) * (spike.x - (player.x + (player.w/2)))) + spike.y )`. The function compares the y-values of the player and the spike at a given x value. Getting the player y value was simply done through calling the `player.y` variable and adding it by its height, whereas getting the y value at every point of the spike was done through the following absolute value function `Math.abs((5/4)*(spike.x - (player.x + (player.w/2)))) + spike.y`, which is better explained through this function on [Desmos](https://www.desmos.com/calculator/17d28venxe).

![Image of the Desmos Graph Linked Above](https://github.com/KaytchJam/Simple-JS-Sidescroller-Chrome-Dino-/blob/main/readme-assets/spike_graph.PNG?raw=true)

Since the Y-axis of the JS Canvas is inverted (Y increases as you go down along the canvas), there was no need to multiply the function by negative 1. Through this, I was able to get the Y value at every point of the spike and compare it to the current Y value (taking height into consideration) of the player. If the Y value of the spike is less than that of the player at `spike.x - (player.x + player.w/2)` then they have collided, and a hit has occured.

``` javascript
if (player.y + player.h >= floor.y) { // Checks if player is on ground & keeps them grounded
        player.free = false;
        player.y = floor.y - player.h
}

if (player.y + player.h < floor.y) { // Check if the player is in the air
        player.free = true;
}
```

The following lines of code check if the player is on the ground or in the air respectively. The first if statement checks if the `player.y + player.h` is greater than or equivalent to the y-value of the floor or not. If it's true, the `free` variable is set to false (indicating that the player is not airborne), and the player's y-value is set equal to that of the floor. This ensures that no matter what speed the player approaches the ground, they will never go past it. Additionally, we now have a state that can let us differentiate between when the player is in the air or on the ground ( `free` ) which will be important for the next section.

#### Gravity & Air Movement

Air movement is done through the `jump()` function, the `free` variable, the `fastfall` variable, and the `player.grav` variables. 

``` javascript
function jump() {
    if (!player.free) {
        player.dy = -player.speed; // player.speed = 15
    }
}

function playerPosition() {
    player.y += player.dy; // each frame player.dy is being added to player.y

    if (player.free) {
        player.dy += player.grav; // player.grav = .75
    }
}
```

The `jump()` function is straightforward, and works by setting `player.dy = (-1) * player.speed; `. This new `player.dy` value is now equal to *-15* , and is "added" to our `player.y` value each frame through the `playerPosition()` function. As said earlier, since the y-axis of the JS canvas is inverted, subtracting from our y-values makes us go up and adding to our y-value makes us go down instead. In the **collision detection** section, it was established that the `free` function checks if the user is in the air or on the ground. Using this, we can add a form of gravity to the player when they're in the air. The if-statement in `playerPosition()` does just this; it first checks if the player is "free" (in the air), and if they are, every frame the constant `player.grav` will be added to `player.dy` and take the player downwards. 

In a similar fashion, `fastfall()` makes use of the `free` state to identify when it can be used or not. 

``` javascript
function fastFall() {
    if (player.free) { // If the player is in the air, they can fast fall
        player.dy += 20
    }
}
```
When holding down when `free`, you'll immediately boost downwards. Functionally, it works the same as the the gravity mentioned before, where a constant is added to `player.dy` for however long they're in the air. In this case, however, the difference between `grav` and `ffall` is substantial, with the grav constant being *.75* and the ffall constant being *20*.
