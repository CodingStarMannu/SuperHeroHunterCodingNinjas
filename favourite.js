
function removeFavoriteSuperhero(event) {
    // Check if the clicked element is the "Remove from Favorites" button
    if (event.target.classList.contains("remove-favorite")) {
        // Retrieve the superhero's name from the data-id attribute
        const superheroName = event.target.getAttribute("data-id");

        // Find the index of the superhero with the matching name in the favoriteHeroes array
        const index = favoriteHeroes.findIndex((hero) => hero.name === superheroName);

        // If the superhero is found in favorites, remove it
        if (index !== -1) {
            favoriteHeroes.splice(index, 1);

            // Update local storage with the modified favoriteHeroes array
            localStorage.setItem("favorite-heroes", JSON.stringify(favoriteHeroes));

            // Re-render the favorite superheroes on the page
            displayFavoriteSuperheroes();
        }
    }
}

// Add a click event listener to the document and delegate the handling to the removeFavoriteSuperhero function
document.addEventListener("click", removeFavoriteSuperhero);

// Function to display favorite superheroes on the favorite page
function displayFavoriteSuperheroes() {
    // Get the reference to the container where you want to display favorites
    const favoritesContainer = document.querySelector(".favorites-container");

    // Get the favorite heroes from local storage using the correct key
    favoriteHeroes = JSON.parse(localStorage.getItem("favorite-heroes")) || [];

    // Clear the existing content in the container
    favoritesContainer.innerHTML = "";

    // Loop through the favoriteHeroes array and create HTML for each superhero
    favoriteHeroes.forEach((hero) => {
        // Create a card or element to display each superhero
        const heroCard = document.createElement("div");
        heroCard.classList.add("favorite-hero-card");

        // Customize how the superhero information is displayed
        heroCard.innerHTML = `
            <div class="hero-info">
                    <span class="hero-name">${hero.name}</span>
            </div>
            <img src="${hero.thumbnail.portrait}" alt="">
            <span class="comics">Comics : ${hero.comics}</span>
            <span class="series">Series : ${hero.series}</span>
            <span class="stories">Stories : ${hero.stories}</span>
            <button class="btn remove-favorite" data-id="${hero.name}">Remove from Favorites</button>
        `;
        console.log(hero);

        // Add the hero card to the favorites container
        favoritesContainer.appendChild(heroCard);
    });
}

// Call the displayFavoriteSuperheroes function to initially populate the favorites page
displayFavoriteSuperheroes();


