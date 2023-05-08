

let colors = ["blue","red","green","yellow","orange","purple","pink","black","white","brown","grey","cyan","magenta"];
let color = colors[Math.floor((rand()*colors.length))];
let radius = 30 + Math.floor(rand()*300);

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  window.metadata = () => ({
    name:`Circle #${token_id}`,
    description: `This is a ${color} circle with a radius of ${radius}.`,

    image: canvas.elt.toDataURL("image/png"),
    properties: {
      "Color": color,
      "Radius": radius
    },
    attributes: [
      {
        trait_type: "Color",
        value: color,
      },
      {
        display_type: "number",
        trait_type: "Radius",
        value: radius,
      },
    ]
  })
  console.log(metadata());
}


function draw() {
  background("ivory");
  stroke(0);
  fill(color);
  circle(width/2,height/2,radius);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

