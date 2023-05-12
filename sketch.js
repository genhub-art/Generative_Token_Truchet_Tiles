const palette = ['Indian Red', 'Light Coral', 'Light Salmon', 'Dark Orange', 'Tomato', 'Sandy Brown', 'Blanched Almond', 'Dark Sea Green', 'Green Yellow', 'Poweder Blue', 'Cornflower Blue', 'Black'];
const background_palette = ['Black', 'Ivory', 'Light Blue', 'Light Green', 'Light Pink', 'Light Yellow', 'White']
function randm(min = 0, max = 1) { return rand() * (max - min) + min; }

const gridSize = Math.floor(randm(3, 40));
const color1 = palette[Math.floor(randm(0, palette.length))];
const color2 = palette[Math.floor(randm(0, palette.length))];
const color3 = palette[Math.floor(randm(0, palette.length))];
const color_background = background_palette[Math.floor(randm(0, background_palette.length))];
const rs = Array(gridSize * gridSize).fill(0).map(() => randm(0, 1));


function setup() {
  createCanvas(windowWidth, windowHeight);
  window.metadata = () => {return {
    name: `Truchet Tiles #${token_id}`,
    description: `Truchet tiles made of tiles with two quarter circles on an ${gridSize}x${gridSize} grid, colored in ${color1.toLowerCase()}, ${color2.toLowerCase()}, and ${color3.toLowerCase()} on a ${color_background.toLocaleLowerCase()} background.`,
    image: canvas.toDataURL("image/png"),
    attributes: [
      {trait_type: "Grid Size", value: gridSize},
      {trait_type: "Color 1", value: color1},
      {trait_type: "Color 2", value: color2},
      {trait_type: "Color 3", value: color3},
      {trait_type: "Background Color", value: color_background},
    ],
    properties: {
      "Grid Size": gridSize,
      "Color 1": color1,
      "Color 2": color2,
      "Color 3": color3,
      "Background Color": color_background,
    }
  }}
  console.log(metadata());
  draw_tiles();
}

function draw_tiles() {
  clear();
  const tileSize = max(width, height) / gridSize;
  background(color_background.replace(" ", ""));
  let transparent = color("white");
  transparent.setAlpha(0);
  fill(transparent)
  strokeCap(SQUARE);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x = i * tileSize;
      const y = j * tileSize;

      if (rs[i * gridSize + j] < 0.5) {
        drawTile1(x, y, tileSize, color3, tileSize/3);
        drawTile1(x, y, tileSize, color2, tileSize/5);
        drawTile1(x, y, tileSize, color1, tileSize/10);
      } else {
        drawTile2(x, y, tileSize, color3, tileSize/3);
        drawTile2(x, y, tileSize, color2, tileSize/5);
        drawTile2(x, y, tileSize, color1, tileSize/10);
      }
    }
  }
}


function drawTile1(x, y, size, color, weight) {
  strokeWeight(weight);
  stroke(color.replace(" ", ""));

  arc(x, y, size, size, 0 - 0.03, HALF_PI + 0.03);
  arc(x + size, y + size, size, size, PI - 0.03, PI + HALF_PI + 0.03);
}

function drawTile2(x, y, size, color, weight) {
  strokeWeight(weight);
  stroke(color.replace(" ", ""));
  arc(x + size, y, size, size, HALF_PI - 0.03, PI+0.03);
  arc(x, y + size, size, size, PI + HALF_PI - 0.03, 2 * PI+0.03);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  draw_tiles();
}