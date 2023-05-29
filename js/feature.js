//Consts
const root = document.documentElement;
const wrapper = document.querySelector(".wrapper");
const experienceSec = document.getElementById("experience");
const fullImgViewSec = document.getElementById("fullImgView");


//CSS Variable

root.addEventListener("mousemove", e => {
    root.style.setProperty('$pageYOffset', window.pageYOffset + "px");
    root.style.setProperty('$innerHeight', window.innerHeight + "px");
});

// hyperlink
let links = document.querySelectorAll(".link");
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        window.open(link.href, '_blank');
        console.log(link.href);
    });
});

//lock screen
function disableScroll() {
    // Get the current page scroll position
    scrollTop = wrapper.scrollTop;
    scrollLeft = wrapper.scrollLeft;

    // if any scroll is attempted,set this to the previous value
    wrapper.onscroll = function () {
        wrapper.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    wrapper.onscroll = function () { };
}

var crrZ = 0;

//open image in full view
var previewImgs = document.querySelectorAll(".previewImg");
previewImgs.forEach((preImg) => {
    preImg.addEventListener('click', (e) => {
        //create fullView
        var fullView = document.createElement("div");
        fullView.classList.add("fullImgView");
        console.log(fullView.classList);

        var fullImg = document.createElement("img");
        fullImg.src = preImg.src;
        fullImg.alt = preImg.alt;
        fullView.appendChild(fullImg);

        var description = document.createElement("p");
        description.innerHTML = preImg.alt;
        fullView.appendChild(description);

        var closeButton = document.createElement("img");
        closeButton.src = 'images/closeButton.png';
        closeButton.classList.add("closeButton");
        fullView.appendChild(closeButton);

        fullImgViewSec.appendChild(fullView);

        var newZ = crrZ + 1;
        crrZ = newZ;
        fullView.style.zIndex = newZ.toString();

        document.body.classList.add('no-scroll');
        disableScroll();
        closeButton.addEventListener('click', (e) => {
            crrZ = newZ - 1;
            fullView.remove();
            enableScroll();
        });
    });
});


//open page
var pageTriggers = document.querySelectorAll(".pageTrigger");
pageTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
        var num = getClassIndex(trigger, "pageTrigger");
        let openID = trigger.classList[num + 1];
        let page = document.getElementById(openID);
        page.classList.remove("hidden");

        var newZ = crrZ + 1;
        crrZ = newZ;
        page.style.zIndex = newZ.toString();

        document.body.classList.add('no-scroll');
        var openPosition = wrapper.scrollTop;
        disableScroll();

        var closeButton = document.createElement("img");
        closeButton.src = 'images/closeButton.png';
        closeButton.classList.add("closeButton");
        page.appendChild(closeButton);
        closeButton.addEventListener('click', (e) => {
            page.classList.add("hidden");
            page.style.zIndex = "0";
            crrZ = newZ - 1;
            enableScroll();
            wrapper.scrollTop= openPosition;
        });
    });
});

function getClassIndex(node, classname) {
    var num = 0;
    for (var i = 0; i < node.classList.length; i++) {
        if (node.classList[i] === classname) {
            return num;
        }
        num++;
    }
    return -1;
}

//show div in sequence
function showInSequence_fade(nodes, time) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.opacity = '0';
    }

    let delay = 0;
    nodes.forEach(node => {
        delay = delay + time;
        setTimeout(function () {
            fadeInEffect(node, delay)
        }, delay);
    });

}

function disappearInSequence_fade(nodes, time) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.opacity = '1';
    }

    let delay = 0;
    nodes.forEach(node => {
        delay = delay + time;
        setTimeout(function () {
            fadeOutEffect(node, delay)
        }, delay);
    });

}
function fadeInEffect(fadeTarget, time) {
    var opacity = 0;
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 0;
        }
        if (fadeTarget.style.opacity >= 1) {
            clearInterval(fadeEffect);
        }
        opacity = opacity + 0.01;
        fadeTarget.style.opacity = opacity;

    }, time / 100);
}
function fadeOutEffect(fadeTarget, time) {
    var opacity = 1;
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity <= 0) {
            clearInterval(fadeEffect);
        }
        opacity = opacity - 0.01;
        fadeTarget.style.opacity = opacity;

    }, time / 100);
}







