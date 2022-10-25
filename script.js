

//  TASKS 1
let mainEl = document.querySelector("main");        // 1.0
mainEl.style.backgroundColor = 'var(--main-bg)';    // 1.1
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";           // 1.2
mainEl.classList.add("flex-ctr");                   // 1.3




//  TASKS 2
let topMenuEl = document.querySelector("#top-menu");    // 2.0
topMenuEl.style.height = "100%";                        // 2.1
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'; // 2.2
topMenuEl.classList.add("flex-around");                 // 2.3




//  TASKS 3
// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

let aEl;
for(let count = 0; count < menuLinks.length; count++) { // 3.1
    aEl = document.createElement('a');                  // 3.1a <a></a>
    aEl.setAttribute('href', menuLinks[count].href);    // 3.1b <a href='/about'></a>
    aEl.textContent = menuLinks[count].text;            // 3.1c <a href='/about'>about</a>
    topMenuEl.append(aEl);
}




//  TASKS 4
let subMenuEl = document.getElementById("sub-menu");    // 4.0
subMenuEl.style.height = '100%';                        // 4.1
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'; // 4.2
subMenuEl.classList.add('flex-around');                 // 4.3
subMenuEl.style.position = 'absolute';                  // 4.4
subMenuEl.style.top = '0';                              // 4.5




//  TASKS 5
let topMenuLinks = topMenuEl.querySelectorAll('a');     // 5.1a
let showingSubMenu = false;                             // 5.1b

function handleClick(evt) {                             // 5.2b
    evt.preventDefault();                               // 5.2c
    
    let clickedLink = evt.target;
    if(clickedLink.tagName !== "A") {                   // 5.2d
        return;
    } else {
        console.log(clickedLink);                       // 5.2e
        
        if(clickedLink.classList.contains('active')) {  
            clickedLink.classList.remove('active');     // 5.3.1
            showingSubMenu = false;                     // 5.3.2
            subMenuEl.style.top = '0';                  // 5.3.3
            return;                                     // 5.3.4
        }

        topMenuLinks.forEach(function(aLink) {          // 5.4
            aLink.classList.remove('active')
        });

        clickedLink.classList.add('active');            // 5.5


        function buildSubMenu(linkObject) {                     // 5.7.1b
            subMenuEl.innerHTML = '';                           // 5.8.1
            linkObject.subLinks.forEach(function(subLinkObj) {  // 5.8.2
                let link = document.createElement('a');         // 5.8.2.1
                link.setAttribute('href', subLinkObj.href);     // 5.8.2.2
                link.textContent = subLinkObj.text;             // 5.8.2.3
                subMenuEl.append(link);                         // 5.8.2.3
            });
        }




        //  TASKS 6
        subMenuEl.addEventListener('click', function(subLinkEvt) {  // 6.0.1
            subLinkEvt.preventDefault();                            // 6.0.2
            let subMenuClickedLink = subLinkEvt.target;
            if(subMenuClickedLink.tagName !== "A") {                // 6.0.3
                return;                                             
            } else {
                console.log(subMenuClickedLink);                    // 6.0.4

                showingSubMenu = false;                             // 6.1.1
                subMenuEl.style.top = '0';                          // 6.1.2

                topMenuLinks.forEach(function(aLink) {              // 6.2
                    aLink.classList.remove('active')
                });

                mainEl.innerHTML = `<h1>${subMenuClickedLink.textContent}</h1>`;    // 6.3
            }
        }, {once: true});


        let linkObj = menuLinks.find(function(aLinkObj) {         // 5.6b
            return aLinkObj.text === clickedLink.textContent;
        });
        console.log(linkObj);

        if(clickedLink.getAttribute('href') === "#") {  // 5.6a
            showingSubMenu = true;
            console.log(showingSubMenu);
            buildSubMenu(linkObj);                      // 5.7.1a
            subMenuEl.style.top = '100%';               // 5.7.2a
        } else {
            showingSubMenu = false;
            console.log(showingSubMenu);
            subMenuEl.style.top = '0';                  // 5.7.2b
        }

    }
    
    mainEl.innerHTML = `<h1>${clickedLink.textContent}</h1>`;   // 6.4
}

topMenuEl.addEventListener('click', handleClick);       // 5.2a