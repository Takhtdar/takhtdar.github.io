import { initRouting } from "./Routing.js";
import { Database } from "./Database.js";
import { initBlog } from "./Blog.js";
import { initReview } from "./Review.js";


async function main() {
    await initRouting();
    initBlog();
    initReview();
    window.HeaderMenu = HeaderMenu;
    copyMailtoClipboard()
}

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

    const emailBtn = document.querySelector("#emailBox");
    const emailBtnContent = emailBtn.textContent;
    emailBtn.addEventListener("click", function(){
        navigator.clipboard.writeText(emailBtn.getAttribute("data"));
        emailBtn.textContent = "copied to clipboard!"
        emailBtn.style.backgroundColor = "lightgray"

        setTimeout(() => {
            emailBtn.textContent = emailBtnContent
            emailBtn.style.backgroundColor = "white"
        }, 1000);
    

        
    })
}

main();
