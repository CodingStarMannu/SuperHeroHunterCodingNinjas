    // let MD5 = require("crypto-js/md5"); 

    // let PUBLIC_KEY = "9c275330f543532cccc32d2b2111c6e3";
    // let PRIVATE_KEY = "52c358d40f1080d12d695a6bb74d2dc18afa0150";

    //  let ts = new Date().getTime();
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
  console.log(api);
   
}

function showResults(heroList){


    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    if(favouritesCharacterIDs == null){
         // If we did't got the favouritesCharacterIDs then we iniitalize it with empty map
         favouritesCharacterIDs = new Map();
    }
    else if(favouritesCharacterIDs != null){
         // If the we got the favouritesCharacterIDs in localStorage then parsing it and converting it to map
         favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
    }
    searchResults.innerHTML = ``;
    let count = 1;

    heroList.map(hero => {
        
    if(count <= 8){
    searchResults.innerHTML += `
    <li class="flex-row single-search-result">
    <div class="flex-row img-info">
         <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
         <div class="hero-info">
              <a class="character-info" href="./about.html">
                   <span class="hero-name">${hero.name}</span>
              </a>
         </div>
    </div>
    <div class="flex-col buttons">
    <!-- <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button> -->
    <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
</div>
    <div style="display:none;">
         <span>${hero.name}</span>
         <span>${hero.description}</span>
         <span>${hero.comics.available}</span>
         <span>${hero.series.available}</span>
         <span>${hero.stories.available}</span>
         <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
         <span>${hero.id}</span>
         <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
         <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
    </div>
</li> 
    `}
    count++;
})
}



searchResults.addEventListener("click", (event) =>{

    const target = event.target;
    console.log(target);

    if(target.classList.contains("add-to-favorite")){

        
        const heroInfoDiv = target.parentElement.parentElement.querySelector("div[style='display:none;']");

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

          favoriteHeroes.push(hero);
          localStorage.setItem('favorite-hero-list',JSON.stringify(favoriteHeroes));
          console.log("inside hero");
          console.log(favoriteHeroes);


          alert(`${hero.name} added to favorites!`);
    }
});




