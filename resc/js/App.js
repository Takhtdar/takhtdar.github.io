import { initRouting } from "./Routing.js";
import { Database } from "./Database.js";
import { initBlog } from "./Blog.js";
import { initReview } from "./Review.js";


async function main() {
    await initRouting();
    initBlog();
    initReview();
    listenToEvents();
    window.HeaderMenu = HeaderMenu;
    copyMailtoClipboard()


    /* Switch #Selfie image, when screen width < 1350   */
}


function listenToEvents() {
    // let mainSections = ["Header", "Blog", "Reviews"];
    let mainSections = ["Header", "Contact"];


    function up(section) {
        if (section == "Header") {
            rscrollToSection("Blog");
            return;
        }

        let nav = document.querySelector(`#${section} nav.fullScreen`);
        nav.classList.add("hiddenNav");
        setTimeout(() => {
            nav.style.display = 'none'; // Hides it completely after animation
        }, 300);
    }

    function down(section) {
        document
            .querySelector(`#${section} nav.fullScreen`)
            .classList.remove("hiddenNav");
    }

    mainSections.forEach((section) => {
        listenToScroll(section);
        listenToTouch(section, up, down);
    });
}



function listenToScroll(element) {
    let navbar = document.querySelector(`#${element} nav.fullScreen`);

    document.getElementById(element).addEventListener("wheel", function (event) {

        if (event.deltaY > 0) {
            if (element == "Header") {
                rscrollToSection("Blog");
                return;
            }
            if(!(element == "Header" || element == "Contact"))
            navbar.classList.add("hiddenNav"); 

        } else if (event.deltaY < 0) {
            if(element == "Contact"){
                rscrollToSection("Reviews");
                return
            }
            navbar.classList.remove("hiddenNav"); 
        }
    });
}

function listenToTouch(section, onTouchUp, onTouchDown) {
    let startY = 0;
    let isSwiping = false;

    document.getElementById(section).addEventListener("touchstart", (event) => {
        startY = event.touches[0].clientY; // Get the initial touch position
        isSwiping = false; // Reset on each new touch
    });

    document.getElementById(section).addEventListener("touchmove", (event) => {
        const currentY = event.touches[0].clientY;
        const distance = currentY - startY;

        if (distance > 100 && !isSwiping) {
            onTouchDown(section);
            console.log("Gesture: Scroll Down");
            isSwiping = true;
        } else if (distance < -100 && !isSwiping) {
            onTouchUp(section);
            isSwiping = true;
        }
    });
}


// add scroll to top to contact to reviews!





function HeaderMenu() {
    switchhideHeaderSidebarMenu();
}



function switchhideHeaderSidebarMenu() {
    let sidebar = document.querySelector("#Header .sidebar");
    let img = document.querySelector("#HeaderBurgur img");

    if (sidebar.style.display != "flex") {
        sidebar.style.display = "flex";
        img.src = "/resc/assets/img/close.png";
    } else {
        sidebar.style.display = "none";
        img.src = "/resc/assets/img/more.png";
    }
}

function copyMailtoClipboard(){

    const emailBtn = document.querySelector("#emailBox > button:nth-child(2)");
    const emailBtnContent = emailBtn.textContent;
    emailBtn.addEventListener("click", function(){
        navigator.clipboard.writeText(emailBtn.getAttribute("data"));
        emailBtn.textContent = "copied to clipboard!"
        emailBtn.style.backgroundColor = "darkseagreen"

        setTimeout(() => {
            emailBtn.textContent = emailBtnContent
            emailBtn.style.backgroundColor = "white"
        }, 2000);
    

        
    })
}

main();
