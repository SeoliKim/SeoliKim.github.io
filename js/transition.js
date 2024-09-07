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
document.getElementById("tab-all").addEventListener("click", () => updateCardsByFilter("card"));
document.getElementById("tab-work").addEventListener("click", () => updateCardsByFilter("work"));
document.getElementById("tab-project").addEventListener("click", () => updateCardsByFilter("project"));
document.getElementById("tab-ai").addEventListener("click", () => updateCardsByFilter("ai"));
document.getElementById("tab-software").addEventListener("click", () => updateCardsByFilter("software"));

const allCards= Array.from(document.querySelectorAll("#experience .card"));
let cards= allCards;

const cardsPerPage =4; 
let currentPage = 0;
let totalPages = Math.ceil(cards.length / cardsPerPage);

function updateCardsByFilter(filter) {
  allCards.forEach(el => el.style.display = "none");
  cards = allCards.filter(element => element.classList.contains(`${filter}`));
  currentPage = 0;
  totalPages = Math.ceil(cards.length / cardsPerPage);
  showCardPage(currentPage);
}

function showCardPage(page) {
  cards.forEach((card, index) => {
    if (index >= page * cardsPerPage && index < (page + 1) * cardsPerPage) {
      card.style.display = "block";
      if (index % 2 === 0) {
        card.style.borderColor = "rgb(59, 177, 255)";  // Even index
    } else {
      card.style.borderColor = "rgb(255, 59, 137)";   // Odd index
    }
    } else {
      card.style.display = "none";
    }
  });

  document.getElementById("left-arrow").disabled = page === 0;
  document.getElementById("right-arrow").disabled = page === totalPages - 1;
}

// Show the first page on load
showCardPage(currentPage);

document.getElementById("left-arrow").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    showCardPage(currentPage);
  }
});

document.getElementById("right-arrow").addEventListener("click", () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    showCardPage(currentPage);
  }
});


