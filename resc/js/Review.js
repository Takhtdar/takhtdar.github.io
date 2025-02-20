import { Database } from './Database.js'



export async function initReview() {
    await initReviewNavbar();

    // set default selected category,  
    setReviewTOC(document.querySelectorAll("#Reviews nav ul li")[1].innerHTML)
    document.querySelectorAll("#Reviews nav ul li")[1].classList.add("active");

    let menuBar = document.querySelector("#Reviews > nav:nth-child(1) > ul:nth-child(1) > li:nth-child(5)");
    menuBar.addEventListener("click", ReviewsMenu);;

    let Reviews = document.querySelector("#Reviews > nav:nth-child(1) > ul:nth-child(1) > li:nth-child(1)");

    Reviews.addEventListener("click", function(){
        // on click on Reviews do something. 
        // we need to hide #contentReview and show aside simple as that!
    });
}

async function initReviewNavbar() {
    // on desktop (huge screen.)
    let pageTitle = document.querySelectorAll("#Reviews nav ul li")[0];
    // on mobile! (and tablets? who knows!)
    let ReviewCat = document.querySelectorAll("#Reviews #ReviewCat ul li")[0];

    // let titles = await getReviewsFromDatabase();
    let categories = (await Database.getInstance()).reviews;

    for (let category in categories) {
        let item = document.createElement("li");
        item.classList.add("sm-hide");
        item.innerText = category;
        item.setAttribute("data-category", category);
        item.addEventListener("click", function() {
            let category = item.getAttribute("data-category");
            setReviewTOC(category);
        });
        
        // Insert the original
        pageTitle.parentNode.insertBefore(item, pageTitle.nextSibling);
        // Clone and insert again for smartphone! (super smart!)
        let clonedItem = item.cloneNode(true);
        clonedItem.addEventListener("click", function() { 
            let category = clonedItem.getAttribute("data-category");
            setReviewTOC(category);
        });

        ReviewCat.parentNode.insertBefore(clonedItem, ReviewCat.nextSibling);
    }
}

async function setReviewTOC(category) {

    // clear Review TOC
    let TOCParent = document.getElementById("ReviewToC").querySelectorAll("li");
    if (TOCParent.length > 1) {TOCParent.forEach((item, index) => { if (index !== 0) item.remove(); });}
        
    // fetch list of available categories
    let content = (await Database.getInstance()).reviews;
    let activeCat = content[category];
    console.log(content)

    // remove .active and find user selected category and set it active in both desktop and phone!  
    const uls = [
        document.querySelector("#Reviews nav ul"), 
        document.querySelector("#Reviews #ReviewCat ul") 
    ];
    uls.forEach(ul => {
        ul.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        const liIndex = Array.from(ul.querySelectorAll("li")).findIndex(
            li => li.textContent.trim() === category
        );
        if (liIndex !== -1) {
            ul.querySelectorAll("li")[liIndex].classList.add("active");
        }
    });


    // list posts under selected category and select first post on there! 
    let TOC = document.querySelectorAll("#Reviews div.container aside div.tableOfContent ul ")[1];
    for (let i = ((activeCat.length) - 1); i >= 0; i--) {

        let item = document.createElement("li");
        item.classList.add("shadow");
        item.innerText = activeCat[i].title;

        item.setAttribute("data-title", activeCat[i].title);
        item.setAttribute("data-version", activeCat[i].version);
        item.setAttribute("data-filename", activeCat[i].filename);
        item.setAttribute("data-category", category);
        


        item.addEventListener("click", function(event) {
            showReview(
                event.currentTarget,
                item.getAttribute("data-version"), 
                item.getAttribute("data-title"), 
                item.getAttribute("data-filename"),
                item.getAttribute("data-category"));
                
        });
        TOC.appendChild(item);
    }


    /*
    check url to see if user came from external/direct link to view a review! my reviews. :D
    https://example.com/Reviews/Post
    and if so activate the li/post and category of that content! this break because I don't want to pass
    a varibale into this function when I click on a category! say the user is not coming from url so 
    don't execute this but if I wanted to solve it, if I cared! I put all of this well not all of this
    did like this if(!beingCalledFromCategoryLinkOnWebPage) return; but i don't know why I don't do it
    and instead I write comments! :D 


    const match = window.location.pathname.match(/\/Reviews\/?([^\/]*)/);
    const filename = match ? decodeURIComponent(match[1]) : null; // Decode the filename
    console.log("filename: " + filename)
    if(filename){
        for (let category in content) {
            if (content[category].some(item => item.filename === filename)) {
                document.querySelectorAll("#Reviews nav.fullScreen ul li").forEach(li => {
                    if (li.textContent.trim() === category) {
                        if(!li.classList.contains("active")){
                            li.click()
                        }
                    }
                });


            }
        }
    
        document.querySelectorAll("#ReviewToC li").forEach(li => {
            if (li.textContent.trim() === filename) {
                li.classList.add("active");
            }
        });

    }
    */


    // TOC.getElementsByTagName("li")[1].click();

}

function removeActiveClassFromAllReviewsTableElements() {
    // need optimizing... maybe add a variable
    let TOCParent = document.querySelectorAll("#Reviews div.container aside div.tableOfContent ul")[1];
    let TOC = TOCParent.querySelectorAll("li");
    if (TOC.length > 1) {
        TOC.forEach((item, index) => {
            if (index !== 0) item.classList.remove("active"); 
        });
    }
}


export async function showReview(currentElement, version, title, filename, category ) {

    console.log("title" + title + " : " + currentElement)
    if(filename === "undefined" ) {return}

    removeActiveClassFromAllReviewsTableElements()
    if(currentElement !== "undefined") currentElement.classList.add("active");
    window.history.pushState('', 'unUsed', `/Reviews/${category}/${title}`);


/**
 * show table of content on mobile screen Reviews section instead of noting! 
 * in case user enter from /Reviews Okay
 * in case user enter from /Reviews/The Godfather 1 not okay instead of showing table content show post! on small screen!
 * check category before selecting to be sure it's not already active!
 */

    let content = await Database.fetchMarkdownData(filename, version);
    var converter = new showdown.Converter(),
    text      = content,
    html      = converter.makeHtml(text);
    document.getElementById("contentReview").innerHTML = html;

    setTimeout(() => {
        document.getElementById('contentReview').scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }, 100);

    // in case screen was small hide menu (which is shown by defualt)!
    // and only if user was here to see a post!
    if ((/\/Reviews\/.+/.test(window.location.pathname)) &&
    (document.body.clientWidth < 1350)
    ) {
        ReviewsMenu(); // Only show the menu if there's no specific post in the URL
    }
}

function ReviewsMenu() {
    // maybe refactor it later! or maybe not! don't know don't care!
    let aside = document.querySelector("#Reviews .container aside");
    let contentReview = document.querySelector("#Reviews .container #contentReview");
    let category = document.querySelector("#ReviewCat");

    // Use computed style to check display property
    let contentDisplay = window.getComputedStyle(contentReview).display;

    if (contentDisplay == "flex") {
        contentReview.style.display = "none";
        aside.style.display = "flex";
        category.classList.remove("displaynone");
    } else {
        contentReview.style.display = "flex";
        aside.style.display = "none";
        category.classList.add("displayflex");
    }

}

export async function RouteToReview(category, title) {
    // Fetch the database instance
    let db = await Database.getInstance();

    console.log("category, title" + category + ", " + title)
    // Validate if the category exists
    if (!db["reviews"] || !db["reviews"][category]) {
        console.error(`Category "${category}" not found in reviews.`);
        return;
    }

    // Search for the item by title in the given category
    const item = db["reviews"][category].find(entry => entry.title === title);

    if (!item) {
        console.error(`Title "${title}" not found in category "${category}".`);
        return;
    }

    // Extract the details from the item
    const { version, filename } = item;

    // Call showReview with the extracted data
    showReview("undefined", version, title, filename, category);
}
