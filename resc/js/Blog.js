import { Database } from './Database.js'

let areWeInsideABlogPostListeningForBackButton = false; 


export async function initBlog() {
    console.log("Initializing Blog!");

    // show post summaries and set the blog table of content
    // in case user enter from /Blog/Read/id hide post summaries after creation!
    let path = ((new URL(window.location.href)).pathname)
    const database = await Database.getInstance();
    database.blog.forEach(({ title, id, summary }) => {
        setAsideTitles(title, id);
        createPostSummaryTemplate(title, id, summary);
        if ((path.startsWith('/Blog') && /\d+\/?$/.test(path))) {
            document.querySelectorAll("div.postSummary").forEach(summary => {
                summary.style.display = "none";
            });
        }
    });

    // listen to aside that only be shown when user start to read a blog post, and when clicked
    // show the side bar, for table of content
    document.getElementById("asideOpenButton").addEventListener("click", function(){
        document.querySelector("section#Blog .container aside").style.display = "flex";
        document.querySelector("section#Blog .container #asideOpenButton").style.display = "none";
    });

    // Blog Title on CLick, show main Blog window!
    document.querySelector("#Blog ul li ").addEventListener("click", function(){
        showBlog();
        if(areWeInsideABlogPostListeningForBackButton){
            window.removeEventListener("popstate", handleBackClick);
        }});
    document.querySelector("#Blog > nav:nth-child(1) > ul:nth-child(1) > li:nth-child(3)").addEventListener("click", switchTOConMobile)

}

export async function showBlogPost(PostID) {
    console.log("showing blog post!");

    document.getElementById("Blog").scrollIntoView();
    if(PostID === "undefined"){return}
    window.addEventListener("popstate", handleBackClick);
    areWeInsideABlogPostListeningForBackButton = true;

    /* 
    first function in case user enters from /Blog/Read/id
    Get Post ID as input then convert it into file name, using map
    in database! then fetch content of file and show it using
    showdonw Library! a markdown parser! 
    

    called from clicked on post Summary, button, or URL trigger
    for now we use Showdown js library but might later write our own parser
    
    */
    


    let db = await Database.getInstance();
    let filename = db.blog.find(post => post.id == PostID).filename;
    let version = db.blog.find(post => post.id == PostID).version;


    let summaryPostHolder = document.querySelector("#summaryPostHolder");
    summaryPostHolder.classList.add("displayflex");
    summaryPostHolder.classList.remove("displaynone");

    window.history.pushState('', 'unUsed', '/Blog/Read/' + PostID);

    let content = await Database.fetchMarkdownData(`/resc/blog/${filename}.md`, version);
    var converter = new showdown.Converter(),
        text = content,
        html = converter.makeHtml(text);

    document.getElementsByTagName("article")[0].innerHTML = html;
    document.querySelector("section#Blog .container #asideOpenButton").style.display = "flex";

    document.querySelectorAll("div.postSummary").forEach(summary => {
        summary.style.display = "none";
    });



    document.querySelector("section#Blog .container aside").style.display = "none";

    let article = document.getElementsByTagName("article")[0];
    article.classList.remove("displaynone");
    article.classList.add("displayflex");

}

function createPostSummaryTemplate(title, id, summary) {
    const postSummary = document.createElement("div");
    postSummary.classList.add("postSummary", "shadow");
    postSummary.setAttribute("data-id", id);

    postSummary.innerHTML = `
            <h4>${title}</h4>
            <p>${summary}</p>
    `;
    document.getElementById("summaryPostHolder").appendChild(postSummary);
    
    postSummary.addEventListener("click", function() {
        let postId = postSummary.getAttribute("data-id");
        showBlogPost(postId);
    });

}

function setAsideTitles(title, id) {
    let item = document.createElement("li");
    item.innerText = title;
    item.setAttribute("data-id", id);
    document.querySelector("#tableOfContent ul").appendChild(item);

    item.addEventListener("click", function() {
        let postId = item.getAttribute("data-id");
        showBlogPost(postId); 
    });


}


/* ReFactor this! */
function switchTOConMobile() {
    let aside = document.querySelector("#Blog aside").style;
    if (aside.display != "flex") {
        aside.display = "flex";
        document.getElementById("summaryPostHolder").classList.add("displaynone");
        document.getElementsByTagName("article")[0].classList.add("displaynone");
        document.getElementById("summaryPostHolder").classList.remove("displayflex");
        document.getElementsByTagName("article")[0].classList.remove("displayflex");
    } else {
        aside.display = "none";
        document.getElementById("summaryPostHolder").classList.add("displayflex");
        document.getElementsByTagName("article")[0].classList.add("displayflex");
        document.getElementById("summaryPostHolder").classList.remove("displaynone");
        document.getElementsByTagName("article")[0].classList.remove("displaynone");
    }
}


function showBlog() {
    console.log("showing Blog main window!")

    let article = document.querySelector("#summaryPostHolder article");
    article.classList.remove("displayflex");
    article.classList.add("displaynone");

    let asideOpenButton = document.querySelector("#asideOpenButton");
    asideOpenButton.style.display = "none";

    document.querySelectorAll(".postSummary").forEach(element => {
        element.style.display = "flex";
    });

    document.querySelector("aside").style.display = "flex";

    window.history.pushState('', 'unUsed', '/Blog');
    document.getElementById("Blog").scrollIntoView();

}





function handleBackClick() {
    showBlog(); 
    window.removeEventListener("popstate", handleBackClick); // Remove the listener
    areWeInsideABlogPostListeningForBackButton = false;
}