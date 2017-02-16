window.onload = function() {

  function rando_num(min, max) {
    return Math.random() * (max - min) + min;
  }

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  var field = window;
  var fairy = document.getElementsByClassName("demo-dot");
  var fairylist = [];
  for(var i = 0; i < fairy.length; i++) {
    fairylist.push({
      fairy: fairy[i], 
      R: 50+(Math.random()* 300),
      time:  (Math.random() * 150),
      x: (Math.random() * window.innerWidth),
      y: (Math.random() * window.innerHeight),
      blink: false,
      fade: false,
      change_r: Math.round(Math.random()),
      circle: Math.round(Math.random()),
      circle_speed: Math.round(Math.random()*3),
      circle_angle: Math.round(Math.random()*360),
      size: Math.round(Math.random()*50)
    });
    fairylist[i].fairy.style.width = fairylist[i].size+"px";
    fairylist[i].fairy.style.height = fairylist[i].size+"px";
    fairylist[i].fairy.style.borderRadius = fairylist[i].size/2+"px";
    if(fairylist[i].circle_speed === 0) fairylist[i].circle_speed = 1;
  }

  var duration = 4; // seconds
  var gridSize = 100; // pixels

  var start = null;
  var stretchFactor;

  var cy = window.innerHeight / 2;
  var cx = window.innerWidth / 2;

  var R = 300;
  var variation;

//make different fairies on different patterns

function update_variation() {
  //increase or decrease R
  //make sure to decrease or reset after a threshold - it getting larger will make it go 'faster'
  //550 is a good stop - some percent of the screen?
  //currently going to get stuck between those very quickly V
  if(R <= cx/2) {
    R += Math.floor((Math.random() * 1.1));
  } else {
    R -= Math.floor((Math.random() * 1.1));
  }
}

function step(timestamp)
{
  if(start === null) {
    start = timestamp;
    stretchFactor = 1 + (Math.random() * 3);
  }
  for(var j = 0; j < fairylist.length; j++) {
    fairylist[j].time += 0.05+(Math.random() * 0.03);

    cx = fairylist[j].x;
    cy = fairylist[j].y;

    if(fairylist[j].circle == 1) {
      fairylist[j].circle_angle+=fairylist[j].circle_speed;
      if (fairylist[j].circle_angle>360) fairylist[j].circle_angle = 0;
      x = cx + fairylist[j].R * Math.cos(fairylist[j].circle_angle * Math.PI / 180);
      y = cy + fairylist[j].R * Math.sin(fairylist[j].circle_angle * Math.PI / 180);
    } else {

      if(fairylist[j].change_r == 1) {
        if (fairylist[j].R < 300) {
          fairylist[j].R += 1+(Math.random()*10);
        }
      }

      x = cx + fairylist[j].R * Math.cos(fairylist[j].time);
      y = cy + fairylist[j].R * Math.sin(fairylist[j].time) * Math.cos(fairylist[j].time);

    }
    fairylist[j].fairy.style.left = x+"px";
    fairylist[j].fairy.style.bottom = y+"px";

  }

  requestAnimationFrame(step);
}

requestAnimationFrame(step);

};