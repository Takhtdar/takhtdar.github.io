

// function menu(){
//     let burgurIcon = "fa fa-regular fa-bars";
//     let closeIcon = "fa fa-regular fa-times";
//     let icon = document.getElementsByClassName("burgur")[0].children[0].attributes["Class"];
//     icon.value == burgurIcon ? (icon.value = closeIcon, showMenu()) : (icon.value = burgurIcon, closeMenu());
// }

// function swapMenu(MenuID) {

//     if(MenuID == 1){
//         let navStyle = document.getElementsByTagName("nav")[MenuID].style;
//         navStyle.display == ""  ? navStyle.display = "flex" : navStyle.display = "";
//     }

//     if(MenuID == 3 ){

//     }

//     if(MenuID == 4){
//         let navbar = document.getElementsByTagName("nav")[MenuID].style;


//         navbar.display == ""  ? navbar.display = "flex" : navbar.display = "";
//         navbar.width = "100%";
//         navbar.marginLeft = "15px";

//     }

// }

// document.querySelectorAll('.sidebar')[0].addEventListener('click', function(event) {
//     if (event.target.tagName === 'A') {
//         swapMenu(1);
//     }
// });






// window.navigation.addEventListener("navigate", (event) => {

//     let summary = document.getElementsByClassName("summary");
//     for(let i=0; summary.length > i; i++)
//         summary[i].classList.add("animateSummary");
// })

// function showPost() {
//     id = window.location.hash.split("-")[1];
//     readTextFile("content").then(data => {
//         let content = JSON.parse(data);

//         for(let i = 0; i < content.length; i++ ){
//             if (content[i]["id"] == id){
//                 console.log(content[i]["content"]);
//                 let summary = document.getElementsByClassName("summary");
//                 for(let i=0; summary.length > i; i++)
//                     summary[i].style.display = "none";
        
//                 document.getElementsByClassName("OnePostTitle")[0].innerHTML = content[i]['title'];
//                 document.getElementsByClassName("OnePostContent")[0].innerHTML = content[i]['content'];
//                 document.getElementsByClassName("OnePost")[0].style.display = "block";
//             }
//         }
//     });

//     closeManuscriptsMenu();
//     swapIcon();
// }


// function openManuscriptsMenu(){
//     // display all elements to none in research element
//     let summary = document.getElementsByClassName("summary");
//     for(let i=0; summary.length > i; i++)
//         summary[i].style.display = "none";
//     document.getElementsByClassName("posts")[0].classList.add("displayflex") ;
//     document.getElementsByClassName("posts")[0].classList.remove("displaynone") ;

//     readTextFile("content").then(data => {showContentMan(JSON.parse(data));});


//     // after select a title close menu and show content

// }

// function showContentMan(data){
//     let table = document.getElementsByClassName("posts")[0];
//     for(let i=0; i < data.length; i++) {
//         let newNode = document.createElement('a');
//         newNode.innerHTML = data[i]["title"];
//         newNode.href = `#read-${data[i]["id"]}`;
//         table.append(newNode);
//     }
// }


// function closeManuscriptsMenu(){
//     let summary = document.getElementsByClassName("summary");
//     for(let i=0; summary.length > i; i++)
//         summary[i].style.display = "flex";
//     document.getElementsByClassName("posts")[0].classList.add("displaynone") ;
//     document.getElementsByClassName("posts")[0].classList.remove("displayflex") ;

//     let table = document.getElementsByClassName("posts")[0].innerHTML = "";


// }


// function swapIcon(){
//     let burgurIcon = "fa fa-regular fa-bars icon";
//     let closeIcon = "fa fa-regular fa-times icon";
//     let icon = document.getElementsByClassName("icon")[1].attributes["Class"];
//     icon.value == burgurIcon ? (icon.value = closeIcon, openManuscriptsMenu()) : (icon.value = burgurIcon, closeManuscriptsMenu());

    
// }


// function readTextFile(filename){
//     return fetch(`resc/docs/${filename}.txt`)
//     .then(response => response.text())
//     .catch(error => {
//         console.error('Error:', error);
//         document.getElementById('about').innerText = 'Error loading the file.';
//     });
// }

// function getContents(){
//     readTextFile("about").then(data => {document.getElementById("about").innerHTML = data;});
//     readTextFile("content").then(data => {showContentTable(JSON.parse(data));});
    

// }



// function showContentTable(data){
//     let table = document.getElementById("contentTable");

//     for(let i=0; i < data.length; i++) {
//         let newNode = document.createElement('a');
//         newNode.innerHTML = data[i]["title"];
//         newNode.href = `#read-${data[i]["id"]}`;
//         table.append(newNode);
//     }


// }


function describe(text) {

    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = text;
    tooltip.style.opacity = 1; // Make sure it's visible
    tooltip.style.zIndex = 10; // Make sure it's visible


    const icons = document.querySelectorAll('#Icons img');

    icons.forEach((icon) => {
        icon.style.opacity =  "0"; // Toggle opacity
      });



  }
  
  function clearTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.opacity = 0; // Reset visibility
    tooltip.style.zIndex = -10; // Make sure it's visible

    const icons = document.querySelectorAll('#Icons img');
    icons.forEach((icon) => {
        icon.style.opacity = "1"; // Toggle opacity
      });


  }
