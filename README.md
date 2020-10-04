<p align="center">
  <a href="https://the-mute-bow.com/">
    <img src="https://the-mute-bow.com/pwa/img/icon/icon1024.png" alt="App" width="165" height="165">
  </a>
</p>

<h3 align="center">The Mute Bow</h3>

<p align="center">
  A mobile pixel-art game made with web thecnologies.
  <br>
  <a href="https://the-mute-bow.com/"><strong>Main Website</strong></a>
  <br>
  <br>
  <a href="https://the-mute-bow.com/">Playstore</a>
  ·
  <a href="https://the-mute-bow.com/pwa/">Web app</a>
  ·
  <a href="https://github.com/the-mute-bow/the-mute-bow/blob/master/README.md">Licence</a>
  ·
  <a href="https://iconejey.github.io/">Other projects</a>
</p>

<p align="center">
  <img src="https://iconejey.github.io/img/the-mute-bow.gif"/>
</p>

## Change log

### **0.0.49**

-   `Sheep` dialog (Meh).

**[ main site ]**

-   Bottom background image.
-   Characters highlight on hover with `'strat'` mode like presentation.

### **0.0.48**

-   Weapon disabling.
-   Strat target order changed to `[null -> place -> player]`.
-   Player can't move `Human` on `'strat'` mode if `Human.event` is not null.

### **0.0.47**

-   Changed Shabyn skin and hair color.
-   Continued chapter 1 script.
-   Started chapter 1 code.
-   Added `'tv-snow.gif'`.
-   Added `'reload'` link on `'error'` screen.
-   `'tv-snow.gif'` shown while mission image not loaded.

### **0.0.46**

-   `game.fog_map` and dark background colors are both `#202124`.
-   `'message'` alert icon not shown on `'strat'` mode.
-   `Creature.aura` is no longer visible to prevent player from seing them on `'strat'` mode.
-   High vision

### **0.0.45**

-   Init shop only if player has coins.
-   Chapter 1 in game & script writing.
-   Rename Scott to Piet.

### **0.0.44**

**[ main site ]**

-   Google Play button.
-   Styling for mobile devices.
-   QR code.
-   lang and lang-pwa coockies.
-   lang button.

### **0.0.43**

**[ main site ]**

-   Added play button that links to `./pwa`.

### **0.0.42**

-   Soundtrack starts on `'title'` screen.
-   Shop for arrow, stamina, mana and damage bonuses.

**[ main site ]**

-   Google search console and indexation in search results.

### **0.0.41**

-   Added `'title'` mode.
-   Chapter title on start.
-   Better homing for level 3 `Arrow`.
-   Added `'stop-sign'` screen if an ad blocker is used.

### **0.0.40**

-   Added `'coins'` coockie.
-   Feminine version for french death screen.
-   `Creature.die()` drops 0 to 5 coins.
-   game.coins and counter on screen.

### **0.0.39**

-   Better homing for level 3 `Arrow`.
-   mana drop rate set to 10%.
-   hidden load bar on lunch.
-   Better mind control for level 2 `Arrow`.
-   Fixed `Human.event` not being called on touch.
-   Any `Human` death triggers death screen with `'Name is dead.'`.

### **0.0.38**

-   Now using `href="./"` to reload the page via a link.
-   French version of `'coockie'` screen sets `'lang'` coockie to `'#fr'`.
-   Better aiming / shooting logic.
-   `Arrow` look like wood sticks when spawned by `Tree.die()`.
-   blue head and trail color for special `Arrow`.
-   `Creature.die()` has 25% chances to drop mana.
-   `Game.player` can harvest mana drops.
-   Level 2 `Arrow` follows `Game.player.look`. (beta)
-   Level 3 `Arrow` tracks `Creature`. (beta)

### **0.0.37**

-   Resolved service worker problem.
-   Revisited `Human` alert icons.
-   Added `'stamina-use'` alert icon.
-   Shorter `Human.autoAim()` range and added `Human.aim_distance`.
-   Mission button will reappear if `'mission'` screen is interrupted.
-   Added `'coockie'`, `'update-ready'` and `'update-done'` screens.

### **0.0.36**

-   Added `'Still in development'` warn sign on `'loading'` screen.
-   Added `'mission'` screen.
-   Added `game.mission`.
-   Added `game.initPauseButton()` and `game.initDevOverlays()` to lighten chapters.
-   Added mission button to trigger `'mission'` screen with `game.mission` as data.
-   if specified, fixed scale for `Overlay`, `OverText` and `Button`, else `game.scale` is used.

### **0.0.35**

-   Link to main website on `'android'` screen.
-   French version for `#dialog-next` link.
-   Bug fix for dialog black screen.
-   Dialog character name shown in title case.
-   Old version of the game host on https://the-mute-bow.com/old/.
-   Weapons (axe, bow and fence) now have their own imgage folder.
-   `House` and `Fence` classes.
-   `game.variant`.
-   `game.soundtrack` no longer interrupted by `game.dialog`.
-   Added `icon-mana#` from 0 to 4 for `Human.alert`.
-   Modified `icon-stamina-green` and `icon-stamina-red`.
-   Limited dtime to 100ms max.

### **0.0.34**

-   Creation of the main website and moved the app in the pwa folder.
-   Better adaptation of `fog_map` for low-performance devices.
-   Dialog display.

### **0.0.33**

-   [the-mute-bow.github.io](https://the-mute-bow.github.io/) redirects to [the-mute-bow.com](https://the-mute-bow.com/).
-   Modified `'pause'` button.
-   Allies' events triggered by touch if any.
-   `forTouch()` checks mobs in foot order.

### **0.0.32**

-   Custom domain: [the-mute-bow.com](https://the-mute-bow.com/)
-   Fixed `Sheep` eat grass animation bug.
-   `Creature` can attack and kill `Sheep`.
-   Added `'wool'` color for `Particle`.
-   `Arrow` spread wool when hitting a `Sheep`.
-   Added `WalkEvent`.
-   [ ] Google AdSence test 2.

### **0.0.31**

-   Added `Sheep` class.
-   Added `Mob` class to link `Human` and `Sheep`.
-   `Sheep` walk cycle.
-   `Sheep` eat grass animation.
-   `Sheep` stop eating grass when `Human` nearby.
-   Added `Sheep` images to cache.
-   Corrected `'./img/mobs'` path name.

### **0.0.30**

-   `'#dev'` mode allows non-android devices.
-   `'#dev-nfs'` mode disables fullscreen.
-   Allies shoot `Arrow` at `Game.entitites.creatures` if any of them is purchasing a `Human`.
-   Randomized allies shoot direction to decrease precision.

### **0.0.29**

-   `img.src` shown on loading screen in dev mode.
-   `'icon-stamina-green'` and `'icon-stamina-green'` for `Human.alert` when stamina empty or full.
-   `'icon-noamo'` is now red to differenciate from `'icon-plus'`.
-   No pause mode when player killed.
-   Axe attack toward creatures and trees.
-   Tree cut draw.
-   Tree damage particles.
-   Tree dying spawns 6-10 arrows.
-   Fixed knockback.
-   No `Human` ghost draw if Eliot is dead.

### **0.0.28**

-   `Creature.target` is set to random coordinates around the `Human` who hit it with an `arrow`.
-   Changed how `setScreen()` data works for `'error'` ans `'loading'`.
-   Loading bar.
-   [ ] Google AdSence test. [Failed]

### **0.0.27**

-   `Creature` are faster.
-   `Entity` and `Particle` are filtered to keep only the ones on screen before sorting.
-   Larger `Human` hitbox (making `Creatures` easier to hit with `Arrow`).
-   Limited `Game.best_perf` to 16.6 (60fps).
-   `Game.best_perf` determined from `Game.average_dtime`.
-   `Human.view_ditance` determined from `Human.health.val`.
-   _You are dead_ pause screen with a `Button` to get back to `'menu'` page.

### **0.0.26**

-   `Human` axe hit and special animations.
-   `Entity` drawed only if `Entity.onScreen()` is `true`.
-   Better collision algorithm.

### **0.0.25**

-   Joysticks apearance now depends on screen height.
-   Sheep sprites.
-   New Icon.
-   More info on `'error'` screen and new `'error.gif'`.
-   Modified `'loading.gif'`.
-   Displaying version on gif sceens.
-   Dev mode when `location.hash` set to `'#dev'`.

### **0.0.24**

-   More white in `'blood'` color.
-   `Creature` die if their health is below 0.
-   Added missing images to cache.
-   `'error'` screen.
-   `Game.loadIMG` fail triggers `'error'` screen.
-   `Game.player.view_distance` is no longer set to 24 when chased by a `Creature.`
-   `Creature` hit `Human` on colision.
-   Hitting `Human` decreases its `view_distance`.
-   If `Human.view_distance` is lower than 12, `Human` dies.
-   No drawing for health, stamina and mana anymore.

### **0.0.23**

-   `Game.event_map`.
-   Fog appears when `Creature` nearby.
-   `'chap2'` starts with `Humans` in front of the house.
-   If a `Human` is a `Creature`'s target, the player's view distance is set to 24 and the soundtrack switches to `'tense-ambience.mp3'`, and this effect goes when all humans get lost by Creatures.
-   If a `Creature` gets hit by an `Arrow` then `Creature.health.val` goes down according to the `Arrow`'s speed.

### **0.0.22**

-   New app icon.
-   Night soundtrack replaced by `'night-ambience.mp3'`.
-   Night soundtrack is set to `'dark-ambience.mp3'` when fog is on.
-   Removed `'nature-ambience.mp3'`.
-   Nicer and more efficient fog for low performance devices.
-   `Game.player` can only see `Creature`'s aura when there is no fog.

### **0.0.21**

-   `game.fog_map` won't remember light pixels (less RAM consumption) and will use screen borders.
-   Multiple `Human` can see in `game.fog_map`.
-   Test for a new app icon.
-   `'rain-piano.mp3'` is now the night soundtrack.

### **0.0.20**

-   Larger `Human` aura.
-   Stronger `Human` shoot.
-   `game.fog_map`.
-   `game.fog_map.pix_size` now adaptative to device performances.

### **0.0.19**

-   `Human` aura.
-   `Creature` dark aura.
-   `Creature` exclam alert and hunting `Human` if too close.
-   `Creature` stops hunting if human too far

### **0.0.18**

-   Text overlays.
-   Pause text.
-   Fps counter.
-   `Creature` entities.
-   `Arrow` trails.
-   `Human.stamina.val` goes up faster.

### **0.0.17**

-   `'pause'` mode now sets `game.speed` to 0.1.
-   Fixed `'menu2-button'` && `'pause-button'` cache error.
-   Fixed `Arrow` not getting stuck in solids.
-   Fixed `Human.sprites['bow-aim']` always drawed in front of `Human.sprites.main`.

### **0.0.16**

-   `'pause'` mode.
-   Quit / resume / pause buttons.

### **0.0.15**

-   `game.player` aims with right joystick.
-   `Human` look where they aims if `Human.stamina.val > 0`.
-   Bow aim draw for `Human` instances.
-   `Particle` and `Trail` classes.
-   Line drawing.
-   `Arrow` shooting and drawing.
-   `Arrow` get stuck in the ground by gravity.
-   Shooting `Arrow` drains `Human.stamina` and costs 1 wood.
-   _No amo_ and _plus_ icons.

### **0.0.14**

-   Screenshot of `game.can` via command line with `game.screenshot()`.
-   Bigger map for `menu` and `chap1`.
-   Added language button to `'menu'` page.
-   `game.player.weapon` hold draw.
-   `'-night'` variant for `Human`.
-   New app icon.
-   Updated cache file list.

### **0.0.13**

-   Beta weapon selection with buttons via right `'tap'` event.
-   `Human.alert` and weapon indication.

### **0.0.12**

-   Fixed button opacity problem.
-   Overlays.
-   Title on menu screen
-   Added sounds to cache.

### **0.0.11**

-   Borders on touch surface to prevent unwanted touches.
-   fade apearing for buttons.
-   Click sound for buttons.
-   Game soundtrack.

### **0.0.10**

-   Left special move chaged from dodge/boost to sprint.
-   True menu and chap1 pages.
-   Buttons and game events.

### **0.0.9**

-   Human footsteps.
-   `'strat'` game mode with left tap.
-   `game.speed = 0.1` in strategy mode.
-   Everything darkens in strategy mode except Humans.
-   Strategy mode allows to make `Human` instances to follow `game.player`'s movements of to go/stay at a `(x, y)` position.

### **0.0.8**

-   Hard colisions with `Entity` and `Tree` instances.
-   Soft colisions with other `Human` instances.
-   Dicreased `cam.h`.

### **0.0.7**

-   `Human` walk cycle.
-   Scott got a new haircut.
-   Left `'special'` touch gives a speed boost to player and drains stamina.

### **0.0.6**

-   Fixed game crash caused by `'special'` touch event detection.
-   Fixed service worker version.
-   Added `menu.js` images to cache storage.

### **0.0.5**

-   Trees with animation.
-   Tree calc.
-   Entities are now drawed acording to `Entity.getFeet().y`.
-   Entities now have shadows.
-   [x] Test for `viewport-fit=cover` in `viewport` meta tag.

### **0.0.4**

-   Better camera system and transitions with `game.cam.target` and `game.cam.targ_h`.
-   Using `game.cam.h` to calculate `game.scale`.
-   Black screen with animation through `game.cam`.
-   Humans with four characters: Eliot, Karmen, Lea and Scott.
-   Use of a `Human` instance for `game.cam.target`.
-   `game.player` is now a `Human` instance and moves thanks to the left joystick.

### **0.0.3**

-   Resolved _turn the screen_ page not displaying after loading the page.
-   Added French version for update pop up.
-   View centered on `game.cam` coordinates.
-   Cookies now last 2 years.
-   Added `'tap'` and `'drag'` touch events.
-   Added joysticks' logic and graphics.
-   Added Licence.
