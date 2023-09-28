document.addEventListener("DOMContentLoaded", function () {
    const infoContainer = document.getElementById("info-container");
    const favoriteButton = document.querySelector(".add-to-fav-btn");

    // Get hero info from local storage
    const heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

    // Check if the hero is in favorites
    const favoritesCharacterIDs = new Map(
        JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
    );

    // Check if the hero is in favorites
    const isHeroFavorite = heroInfo && heroInfo.id ? favoritesCharacterIDs.has(heroInfo.id) : false;

     // Update the page title
     document.title = `${heroInfo.name} | SuperHero Hunter`;

    // Display hero information
    infoContainer.innerHTML = `
        <div class="flex-row hero-name">${heroInfo.name}</div>
        <div class="flex-row hero-img-and-more-info">
            <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">
            <img style="display:none;" id="landscapeImage" src="${heroInfo.landscapeImage}" alt="">
            <div class="flex-col more-info">
                <div class="flex-row id">
                    <b>ID:</b><span>${heroInfo.id}</span>
                </div>
                <div class="flex-row comics">
                    <b>Comics:</b><span>${heroInfo.comics}</span>
                </div>
                <div class="flex-row series">
                    <b>Series:</b><span>${heroInfo.series}</span>
                </div>
                <div class="flex-row stories">
                    <b>Stories:</b><span>${heroInfo.stories}</span>
                </div>
            </div>
        </div>
        <div class="flex-col hero-description">
            <b>Description:</b>
            <p>${heroInfo.description != "" ? heroInfo.description : "No Description Available"}</p>
        </div>
        <div style="display:none;">
            <span>${heroInfo.name}</span>
            <span>${heroInfo.portraitImage}</span>
            <span>${heroInfo.landscapeImage}</span>
            <span>${heroInfo.id}</span>
            <span>${heroInfo.comics}</span>
            <span>${heroInfo.series}</span>
            <span>${heroInfo.stories}</span>
            <span>${heroInfo.squareImage}</span>
            <span>${heroInfo.description}</span>
        </div>
        <button class="add-to-fav-btn">${isHeroFavorite ? "Remove from Favorites" : "Add to Favorites"}</button>
    `;

    // Add event listener to the "Add to Favorites" button
    favoriteButton.addEventListener("click", () => {
        if (isHeroFavorite) {
            // Remove hero from favorites
        console.log("Button clicked");

            removeFromFavorites(heroInfo, favoritesCharacterIDs, favoriteButton);
        } else {
            // Add hero to favorites
            addToFavorites(heroInfo, favoritesCharacterIDs, favoriteButton);
        }
        isHeroFavorite = !isHeroFavorite; // Toggle favorite status
    });
});

// Function to add hero to favorites
function addToFavorites(heroInfo, favoritesCharacterIDs, favoriteButton) {
    const favoritesArray = JSON.parse(localStorage.getItem("favouriteCharacters")) || [];
    favoritesArray.push(heroInfo);

    favoritesCharacterIDs.set(heroInfo.id, true);
    localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));
    localStorage.setItem("favouriteCharacters", JSON.stringify(favoritesArray));

    favoriteButton.textContent = "Remove from Favorites";
}

// Function to remove hero from favorites
function removeFromFavorites(heroInfo, favoritesCharacterIDs, favoriteButton) {
    const favoritesArray = JSON.parse(localStorage.getItem("favouriteCharacters")) || [];

    const index = favoritesArray.findIndex((hero) => hero.id === heroInfo.id);
    if (index !== -1) {
        favoritesArray.splice(index, 1);
    }

    favoritesCharacterIDs.delete(heroInfo.id);
    localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));
    localStorage.setItem("favouriteCharacters", JSON.stringify(favoritesArray));

    favoriteButton.textContent = "Add to Favorites";
}
