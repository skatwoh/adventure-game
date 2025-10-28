let texturePacker = require("free-tex-packer-core");
const {readFileSync} = require("node:fs");
let fs = require('fs');
let path = require('path');

let options = {
    textureName: "dragon",
    width: 1024,
    height: 1024,
    fixedSize: false,
    padding: 2,
    allowRotation: true,
    detectIdentical: true,
    allowTrim: true,
    exporter: "Pixi",
    removeFileExtension: true,
    prependFolderName: false
};

let images = [];

const outputDir = './src/game/assets/sprites/atlas';

// Source frames
const d1 = readFileSync("./src/game/assets/images/gen/dragon1.png");
const d2 = readFileSync("./src/game/assets/images/gen/dragon2.png");
const d3 = readFileSync("./src/game/assets/images/gen/dragon3.png");
const d4 = readFileSync("./src/game/assets/images/gen/dragon4.png");
const d5 = readFileSync("./src/game/assets/images/gen/dragon5.png");
const d6 = readFileSync("./src/game/assets/images/gen/dragon6.png");

// Map to Phaser-friendly naming like other NPCs
// Idle (use d3), Walking loop (use d2/d4). Same frames for all directions for now
const directions = ["up", "right", "down", "left"];
directions.forEach((dir) => {
    images.push({ path: `dragon_idle_${dir}_01.png`, contents: d3 });
    images.push({ path: `dragon_walking_${dir}_01.png`, contents: d2 });
    images.push({ path: `dragon_walking_${dir}_02.png`, contents: d4 });
});

// Optional breathing/shine frames to enrich idle cycle if wanted later
images.push({ path: `dragon_idle_extra_01.png`, contents: d1 });
images.push({ path: `dragon_idle_extra_02.png`, contents: d5 });
images.push({ path: `dragon_idle_extra_03.png`, contents: d6 });


texturePacker(images, options, (files, error) => {
    if (error) {
        console.error('Packaging failed', error);
    } else {
        for(let item of files) {
            fs.writeFileSync(path.join(outputDir, item.name), item.buffer);
            console.log('Created:', item.name);
        }
    }
});