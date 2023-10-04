    // let MD5 = require("crypto-js/md5"); 

    // let PUBLIC_KEY = "9c275330f543532cccc32d2b2111c6e3";
    // let PRIVATE_KEY = "52c358d40f1080d12d695a6bb74d2dc18afa0150";

    //  let ts = new Date().getTime();s
    //  let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    //  console.log(MD5(hash).toString());
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");
let input = document.querySelector(".input-group-addon");

let superHero = [];
let favoriteHeroes = [];

searchBar.addEventListener("input", () => searchHeros(searchBar.value));

async function searchHeros(textSearched){

        if (textSearched.length == 0) {
            searchResults.innerHTML = ``;
            return;
       }

   const api = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${textSearched}&limit=10&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1`)
   .then(res => res.json()) //Converting the data into JSON format
   .then(data => showResults (data.data.results));
   
}




function showResults(heroList) {
    searchResults.innerHTML = ``;
    let count = 1;

    heroList.map(hero => {
        if (count <= 8) {
            // Check if the hero is in favorites
            const isHeroFavorite = isHeroInFavorites(hero.name);

            searchResults.innerHTML += `
                <li class="flex-row single-search-result">
                    <div class="flex-row img-info">
                        <img src="${hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension}" alt="">
                        <div class="hero-info">
                            <a class="character-info" href="about.html">
                                <span class="hero-name">${hero.name}</span>
                            </a>
                        </div>
                    </div>
                    <div class="flex-col buttons">
                    <button class="add-to-favorite ${isHeroFavorite ? 'added' : ''}" data-hero-name="${hero.name}">
                    ${isHeroFavorite ? "Remove from Favorites" : "Add to Favorite"}
                     </button>
              </div>
                    <div style="display:none;">
                        <span>${hero.name}</span>
                        <span>${hero.description}</span>
                        <span>${hero.comics.available}</span>
                        <span>${hero.series.available}</span>
                        <span>${hero.stories.available}</span>
                        <span>${hero.thumbnail.path + '/portrait_uncanny.' + hero.thumbnail.extension}</span>
                        <span>${hero.id}</span>
                        <span>${hero.thumbnail.path + '/landscape_incredible.' + hero.thumbnail.extension}</span>
                        <span>${hero.thumbnail.path + '/standard_fantastic.' + hero.thumbnail.extension}</span>
                    </div>
                </li>
            `;
                // Update the button when rendering
        const addButton = searchResults.querySelector(`.add-to-favorite[data-hero-name="${hero.name}"]`);
        updateFavoriteButton(hero.name, addButton, isHeroFavorite);
        }
        count++;
    });
  events();
}


// Check if a hero is in favorites
function isHeroInFavorites(heroName) {
    return favoriteHeroes.some(hero => hero.name === heroName);
}

// Function to update the "Add to Favorite" button text
function updateFavoriteButton(heroName, button, isHeroFavorite) {
    button.textContent = isHeroFavorite ? "Remove from Favorites" : "Add to Favorite";
    
    if (isHeroFavorite) {
        button.classList.add("added"); // Add the "added" class when in favorites
    } else {
        button.classList.remove("added"); // Remove the "added" class when not in favorites
    }
}
// Add a click event listener to the document to handle the "Add to Favorite" button
document.addEventListener("click", (event) => {
    const target = event.target;    
// Inside the click event listener for "Add to Favorite" button
if (target.classList.contains("add-to-favorite")) {   
    const heroInfoDiv = target.parentElement.parentElement.querySelector("div[style='display:none;']");
    const heroName = heroInfoDiv.querySelector("span:nth-child(1)").textContent;
    const isHeroFavorite = isHeroInFavorites(heroName);

    if (isHeroFavorite) {
        // Remove the hero from favorites
        favoriteHeroes = favoriteHeroes.filter(hero => hero.name !== heroName);
        localStorage.setItem('favorite-heroes', JSON.stringify(favoriteHeroes));
        updateFavoriteButton(heroName, target, false);
        alert(`${heroName} removed from favorites!`);
    } else {
        // Use the hero object from the clicked button's data attributes
        const hero = {
           
            name: heroInfoDiv.querySelector("span:nth-child(1)").textContent,
            description: heroInfoDiv.querySelector("span:nth-child(2)").textContent,
            comics: heroInfoDiv.querySelector("span:nth-child(3)").textContent,
            series: heroInfoDiv.querySelector("span:nth-child(4)").textContent,
            stories: heroInfoDiv.querySelector("span:nth-child(5)").textContent,
            thumbnail: {
                portrait: heroInfoDiv.querySelector("span:nth-child(6)").textContent,
                id: heroInfoDiv.querySelector("span:nth-child(7)").textContent,
                landscape: heroInfoDiv.querySelector("span:nth-child(8)").textContent,
                fantastic: heroInfoDiv.querySelector("span:nth-child(9)").textContent
                        },
                    };

        // Add the hero to favorites
        favoriteHeroes.push(hero);
        localStorage.setItem('favorite-heroes', JSON.stringify(favoriteHeroes));
        updateFavoriteButton(heroName, target, true);
        alert(`${heroName} added to favorites!`);
    }
}

});


function addInfoInLocalStorage() {

    // This function basically stores the data of character in localStorage.
    // When user clicks on the info button and when the info page is opened that page fetches the heroInfo and display the data  
    let heroInfo = {
         name: this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
         description: this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
         comics: this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
         series: this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
         stories: this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
         portraitImage: this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML,
         id: this.parentElement.parentElement.parentElement.children[2].children[6].innerHTML,
         landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML,
         squareImage: this.parentElement.parentElement.parentElement.children[2].children[8].innerHTML
    }
console.log("Inside addInfoInLocalStorage");


    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
    
}

function events() {

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage))
}

