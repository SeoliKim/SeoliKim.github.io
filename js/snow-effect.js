

/** Set Canvas **/
let ctx;
let canvas;
let bounding;
let pageWidth;
let pageHeight;
document.addEventListener('DOMContentLoaded', function(){
  /* get page size */
  pageWidth = document.documentElement.scrollWidth;
  pageHeight = document.documentElement.scrollHeight;
  document.getElementById("snow").style.height = (pageHeight)  + "px";
  document.getElementById("snoweffect").style.height = (pageHeight)   + "px";

  /* create canvas element */
  canvas = document.getElementById("snoweffect-canvas");
  /* set size canvas */
  canvas.width = document.documentElement.scrollWidth;
  canvas.height = document.documentElement.scrollHeight;
  
  bounding = canvas.getBoundingClientRect();
  ctx = canvas.getContext('2d');

  // Call moveParticles function
  requestAnimationFrame(moveParticles);
}); 

function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

/** Snow Particle Base **/
function Particle(size, color, posx, posy){
  //size: max size 
  this.radius = 2+Math.random()* size;
  // position 
  this.x = posx; 
  this.y = posy;
  // color 
  this.color = {};
  this.color = color;
  this.color = hexToRgb(color);
  // opacity- always randomize opacity 
  this.opacity = Math.random() * 1;
  this.velbase = {x: 0,y: 1}; 
};

/** Draw snow particles */
Particle.prototype.draw = function() {
  var p = this;
  var opacity = p.opacity;
  var color_value = 'rgba('+p.color.r+','+p.color.g+','+p.color.b+','+opacity+')';
  ctx.fillStyle = color_value;
  const circle = new Path2D();
  circle.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
  ctx.fill(circle);
};

//hold all particles
var particles = [];

/** update particles location */
moveParticles = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < particles.length; i++){
    var p = particles[i];
    var ms = 5* Math.random();  
    var vx = p.velbase.x;
    var vy = p.velbase.y;
    p.x += vx * ms;
    p.y += vy * ms;
    if(p.x<=0 || p.x >=pageWidth || p.y<=0 || p.y >=pageHeight){
      console.log("remove paricle");
      particles.splice(i, 1); 
    }else{
      p.draw();
    }
  }
  
  window.requestAnimationFrame(moveParticles);
}


/** Snow Effect on Botton **/
const snowButtons = document.querySelectorAll(".snowbutton"); //Get buttons that needs snow effect
snowButtons.forEach((snowbutton)=> { 
    let intervalId;
    snowbutton.addEventListener('mouseenter', (e) => {
      const x = Math.floor( (e.pageX - bounding.left) / bounding.width * canvas.width );
      const y = Math.floor( (e.pageY - bounding.top) / bounding.height * canvas.height );
      
      intervalId = setInterval(() => {
        generateButtonSnowEffect(x,y, snowbutton.offsetWidth, snowbutton.offsetHeight);
      }, 2000);
    });

    snowbutton.addEventListener('mousemove', function(e){
      // Get cursor position relative to the button
      const rect = snowbutton.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Set custom properties to update button color
      snowbutton.style.setProperty('--x', `${x}px`);
      snowbutton.style.setProperty('--y', `${y}px`);
    });

    snowbutton.addEventListener('mouseleave', () => {
      clearInterval(intervalId);
    }); 
});

generateButtonSnowEffect= function(mx, my, rw, rh){
  console.log("mouse"+ mx + ", " + my+ "rect: "+ rw + " , "+ rh);
  for(var i = 0; i < Math.random()*10+10; i++) {
    var posx = mx + rw*Math.random()/4-rw*Math.random()/2;
    var posy= my - rh*Math.random()-rh*1.5;
    console.log("pos"+ posx + ", " + posy);
    particles.push(new Particle(5, "#ffffff", posx, posy));
  }
}


