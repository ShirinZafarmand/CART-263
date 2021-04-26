/**
Desperately Seeking Sadness++
Shirin Zafarmand
in this game there is a funeral urn hidden inside one of the semmingly piles of poo. at the begining the golden poo which hides the funeral urn moves for a second. the
user needs to find the funeral urn ehich was moving among ather piles.
*/

"use strict";

let config={
  type:Phaser.AUTO,
  width: 1000,
  height:600,
  physics:{
    default:`arcade`
  },
  scene: [Boot, Play]
};

let game= new Phaser.Game(config);
