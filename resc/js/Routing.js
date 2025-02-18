import { showBlogPost } from "./Blog.js";
import { showReview } from './Review.js'


export async function initRouting() {
    console.log("init Routing")
    // this function trigger first in case of user entering website from root "/"
    // Now I am thinking why I didn't used OOP instead of creating a function to 
    // act as constructor for each module! weird! ah who cares. xd 
    // in case user directed from 404 page to root. we read their request.
    await ProcessGetRequest();
    // later change window.rscrollToSection to  Window.Routing.ScrollToSection across all files!
    window.rscrollToSection = rscrollToSection;
}

async function ProcessGetRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(`urlParams:${urlParams}`)

    if (urlParams.has('section') &&
    ["Blog", "Reviews", "Contact"].includes(urlParams.get('section'))
    ) {
        let section = urlParams.get('section');
        rscrollToSection(section);
        window.history.pushState('', 'unUsed', `${section}/`);

        // in case section was a blog or review and user requested to read a post!
        // hopefully the order of conditions work just fine! 'has' before 'get'! 
        if(["Blog", "Reviews"].includes(section) &&
        urlParams.has('func') && (urlParams.get('func')) && urlParams.has('id') 
        ){
            switch (section){
                case "Blog": await showBlogPost(urlParams.get('id')); break;
                case "Reviews": await showReview(urlParams.get('func'), urlParams.get('id')); break; 
            }
        }
    }
    else {
        window.history.pushState('', 'unUsed', "/");
    }
}


export function route() {
    // first function in case of user entering website from NONE /
    let section = String(location.href.split("/")[3]);
    // got : header, projects, blog, reviews, or contact 
    console.log(`route: we are moving to: ${section}`);

    switch (section) {
        case "Header": window.location.href = location.origin; break;
        //case "Header": headerRoutes(); break;
        // case "Projects": projectsRoutes(); break;
        case "Blog":
        case "Reviews": 

            let parameters = "?";
            let [, , , , func, id] = window.location.href.split("/");
            console.log(`Routing to: ${section}, func:${func}, id: ${id} `)
            parameters = parameters.concat(`section=${section}&func=${func}&id=${id}`)
            window.location.href = location.origin + parameters;

            /*
            make domain.com/Blog/read/1 into domain.com/?section=Blog&func=read&id=1
            then ProcessGetRequest be called as page get refreshed 
            and process the get parameters!
            [] to do: modify this function, there is no need for func parameter
            as it a blog and... and people don't comment! long live E-Mail 
            Also I think not that be important xd 

            in case ID or func didn't have been set! "undefined" would be set it's string!
            */
            break;
        case "Contact": 
        window.location.href = location.origin + "?section=Contact";
        break;

        default:
            location.href = location.origin;
    }
}


function rscrollToSection(section) {
    window.history.pushState('', 'unUsed', '/' + section);
    document.getElementById(section).scrollIntoView();
}

