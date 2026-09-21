// resc/js/Blog.js
import { Database } from './Database.js'

let areWeInsideABlogPostListeningForBackButton = false; 

export async function initBlog() {
    console.log("Initializing Blog!");

    // show post summaries and set the blog table of content
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

    // Blog Title on CLick, show main Blog window!
    document.querySelector("#Blog aside span").addEventListener("click", function(){
        showBlog();
        if(areWeInsideABlogPostListeningForBackButton){
            window.removeEventListener("popstate", handleBackClick);
        }
    });
}

export async function showBlogPost(PostID) {
    console.log("showing blog post!");

    if(PostID === "undefined"){return}
    window.addEventListener("popstate", handleBackClick);
    areWeInsideABlogPostListeningForBackButton = true;

    let db = await Database.getInstance();
    let filename = db.blog.find(post => post.id == PostID).filename;
    let version = db.blog.find(post => post.id == PostID).version;

    let summaryPostHolder = document.querySelector("#summaryPostHolder");
    summaryPostHolder.classList.add("displayflex");
    summaryPostHolder.classList.remove("displaynone");

    window.history.pushState('', 'unUsed', '/Blog/Read/' + PostID);

    let content = await Database.fetchMarkdownData(filename, version);
    var converter = new showdown.Converter(),
        text = content,
        html = converter.makeHtml(text);

    document.getElementsByTagName("article")[0].innerHTML = html;

    // Add bottom navigation link for Mobile
    const backNav = document.createElement("div");
    backNav.className = "post-bottom-nav";
    backNav.innerHTML = `<button class="shadow back-to-toc-btn">&larr; Back to all posts</button>`;
    backNav.querySelector("button").addEventListener("click", () => {
        showBlog();
        document.getElementById("Blog").scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementsByTagName("article")[0].appendChild(backNav);

    // Hide Hero Header for full reading immersion
    document.getElementById("Header").classList.add("displaynone");

    // Hide Post Summaries so only the Article is visible
    document.querySelectorAll("div.postSummary").forEach(summary => {
        summary.style.display = "none";
    });

    // Display the Article
    let article = document.getElementsByTagName("article")[0];
    article.classList.remove("displaynone");
    article.classList.add("displayflex");

    // Scroll gracefully to the top of the blog section
    setTimeout(() => {
        document.getElementById("Blog").scrollIntoView({ behavior: 'instant' });
    }, 10);
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

function showBlog() {
    console.log("showing Blog main window!");
    
    // Restore Hero Header
    document.getElementById("Header").classList.remove("displaynone");

    // Hide the article
    let article = document.querySelector("#summaryPostHolder article");
    article.classList.remove("displayflex");
    article.classList.add("displaynone");

    // Show the summaries
    document.querySelectorAll(".postSummary").forEach(element => {
        element.style.display = "flex";
    });

    window.history.pushState('', 'unUsed', '/Blog');
    
    setTimeout(() => {
        document.getElementById("Blog").scrollIntoView({ behavior: 'smooth' });
    }, 10);
}

function handleBackClick() {
    showBlog(); 
    window.removeEventListener("popstate", handleBackClick); 
    areWeInsideABlogPostListeningForBackButton = false;
}
