/** Global Function */
function replace(hide, show) { //pass string 
  document.querySelector(hide).style.display = "none";
  document.querySelector(show).style.display = "block";
}

window.onload = function () {
  // Scroll to the top of the page on page load
  wrapper.scrollTo(0, 0);
}


/** navbar */
const navbarBrand = document.querySelector(".navbar-brand");
const brandnames = navbarBrand.querySelectorAll(".name");
const message = navbarBrand.querySelector(".message");
navbarBrand.addEventListener("mouseover", function (event) {
  brandnames.forEach((n) => {
    n.style.display = "none";
  });
  message.style.display = "flex";
});
navbarBrand.addEventListener('mouseleave', () => {
  brandnames.forEach((n) => {
    n.style.display = "inline-flex";
  });
  message.style.display = "none";
});


/** Skill Section */
const defaultPage = document.querySelector("#skill > .default");
const skillPages = document.querySelectorAll("#skill > .detail"); //Get all detail pages
const skillButtons = document.querySelectorAll("#skill > .default button"); //Get all skill buttons 
skillButtons.forEach((skillbutton) => {
  skillbutton.addEventListener("click", function (event) {
    const buttonCategory = skillbutton.classList[0]; // Get the category of the button that was clicked

    skillPages.forEach((page) => {
      if (page.classList.contains(buttonCategory)) { // If the section has the same category as the button that was clicked  
        defaultPage.style.display = "none"; // Close the default Page
        page.style.display = "inline-grid"; // Open the corresponded page 
        var skillCards = page.querySelectorAll(".card");
        showInSequence_fade(skillCards, 300);
      }
    });
  });
});
const returnButtons = document.querySelectorAll("#skill > .detail button"); //Get all return buttons 
returnButtons.forEach((returnbutton) => {
  returnbutton.addEventListener("click", function (event) {
    const buttonCategory = returnbutton.classList[0]; // Get the category of the button that was clicked

    skillPages.forEach((page) => {
      if (page.classList.contains(buttonCategory)) { // If the section has the same category as the button that was clicked 
        defaultPage.style.display = "block" // Open the default Page
        page.style.display = "none"; // Closed the corresponded page 
      }
    });
  });
});


/** Experience Section */
const track = document.querySelector("#experience .scrollbar .track");
const scrollbar = document.querySelector("#experience .scrollbar");
const timeline = document.querySelector("#experience .timeline");
const timeline_breakpoints = timeline.querySelectorAll('.timeline-breakpoint');
const experienceCardDefault = document.querySelector("#experience .detail .defaultPage");
const experienceCards = document.querySelectorAll("#experience .card");

timeline.addEventListener("scroll", function (event) {
  let trackLength = (timeline.scrollTop) / (timeline.scrollHeight - timeline.clientHeight) * 100;
  track.style.height = trackLength + "%";
  checkOnTimeBreakpoint();
});

function checkOnTimeBreakpoint() {
  for (let i = 0; i < timeline_breakpoints.length; i++) {
    const timeline_breakpoint = timeline_breakpoints[i];
    let totalHeight = timeline.offsetHeight;
    let rect = timeline_breakpoint.getBoundingClientRect();
    let parentRect = timeline.getBoundingClientRect();
    let visibleHeight = Math.min(rect.bottom, parentRect.bottom) - Math.max(rect.top, parentRect.top);
    if (visibleHeight > totalHeight / 2) {
      let showYear = timeline_breakpoint.classList[1];
      if (showYear === "defaultPage") {
        experienceCardDefault.classList.remove("hidden");
      } else {
        experienceCardDefault.classList.add("hidden");
      }
      var showYearNum = parseInt(showYear);
      showExperienceCard(showYearNum);
      break;
    }
  }
}



function showExperienceCard(showYear) {
  let delay = 0;
  experienceCards.forEach(experienceCard => {
    var cardYear;
    let cardYearGroup = experienceCard.classList[1];
    let startYear = parseInt(cardYearGroup.slice(0, 4));
    let endYear = parseInt(cardYearGroup.slice(4));
    for (cardYear = startYear; cardYear <= endYear; cardYear++) {
      if (cardYear === showYear) {
        let crrDisplay = experienceCard.style.display;
        if (crrDisplay === "none" || crrDisplay === "") {
          experienceCard.style.display = "inline-block";
          experienceCard.style.bottom = '-100vh'; // slide the div to its position
          delay = delay + 200;
          setTimeout(function () {
            experienceCard.style.bottom = '0';
          }, delay);
          break;
        }

      } else {
        experienceCard.style.display = "none";
      }

    }

  });
}


/** 
function updateKnots(holderX, holderY){
  const trackX = track.getBoundingClientRect().left;
  const trackY = track.getBoundingClientRect().bottom;
  const knotsNum = 4;
  const nodes = [];
  //get position of 5 nodes 
  for(let j =0;j<=knotsNum;j++) { //4 knots, 5 nodes
      const node  = {
        x:(holderX-trackX)/(knotsNum-1)*j+trackX,
        y:(holderY-trackY)/(knotsNum-1)*j+trackY,
        xvel: 0,
        yvel: 0,
      };
    nodes.push(node);
  } 
  //update knots position
  var startX = trackX;
  var startY = trackY; 
  var toX =0;
  var toY=0;
  for (let i = 0; i < knots.length; i++) {
    knots[i].style.left = startX + "px";
    knots[i].style.top = startY + "px";
    toX = nodes[i + 1].x;
    toY = nodes[i + 1].y;
    console.log("knots start pos: " + startX + " , " + startY);
    var angle = getRotateAngel(startX, toX, startY, toY);
    knots[i].style.transform = 'rotate(' + angle + 'rad);';
    startX = toX;
    startY = toY;
  }
}

function getRotateAngel(x1, x2, y1, y2){
  var x = x2-x1;
  var y = y2-y1;
  var angle = Math.atan2(y,x);
  return angle;
}

const holder = document.querySelector("#experience .scrollbar .holder");
dragHolder(holder); 

function dragHolder() {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    holder.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = holderDrag;
    }
  
    function holderDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      holder.style.top = (holder.offsetTop - pos2) + "px";
      holder.style.left = (holder.offsetLeft - pos1) + "px";
      //update knots
      updateKnots((holder.offsetLeft - pos1), (holder.offsetTop - pos2));
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
*/



