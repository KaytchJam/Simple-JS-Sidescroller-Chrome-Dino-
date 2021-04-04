# Simple JS Sidescroller: Chrome-Dino-
Tried recreating the chrome dinosaur game by memory &amp; with JS canvas.

### Task List

- [x] Added collision between Player, spike, and floor
- [x] Make spikes speed up over time
- [ ] Added a highscore counter
- [ ] Added random spike spawning & spike variants

### Thought Process:

Adding this so that I can go back and understand why I made certain decisions if I ever look back at this.

```javascript
if (player.x + (player.w/2) >= spike.x - spike.w && player.x + player.w/2 <= spike.x + spike.w) { 
        if (player.y + player.h >= Math.abs((5/4) * (spike.x - (player.x + (player.w/2)))) + spike.y ) {
            hit++;
        }
}
```

The above code is a way of checking how close the player is to the midpoint of a spike obstactle, as well as check the height of the player as compared to the height of the spike at a given point. The first condition of the nested if ` player.x + (player.w / 2) >= spike.x - spike.w` checks if the center of the dinosaur sprite is past the leftmost point of the spike, whereas the second condition ` player.x + (player.w / 2) <= spike.x + spike.w ` checks if the center of the dinosaur sprite isn't past the leftmost point of the spike. 
