# Simple JS Sidescroller: Chrome-Dino-
Tried recreating the chrome dinosaur game by memory &amp; with JS canvas. There are probably way more efficient ways of doing this but it was fun trying to recreate it.

### Task List

- [x] Added collision between Player, spike, and floor
- [x] Make spikes speed up over time
- [ ] Added a highscore counter
- [ ] Added random spike spawning & spike variants

### Thought Process:

#### Collision Detection

Adding this so that I can go back and understand why I made certain decisions if I ever look back at this. This is also a good way at practicing my explaining skills as a side benefit lol.

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
