document.addEventListener("DOMContentLoaded", function () {
    const infoContainer = document.getElementById("info-container");
    const favoriteButton = document.querySelector(".add-to-fav-btn");

    // Get hero info from local storage
    const heroInfo = JSON.parse(localStorage.getItem("heroInfo"));
    const favoriteHeroes = JSON.parse(localStorage.getItem("favorite-heroes")) || [];

    // Check if the displayed superhero is in your favorites
    const isHeroInFavorites = favoriteHeroes.some((hero) => hero.name === heroInfo.name);

   

    // Update the page title
    document.title = `${heroInfo.name} | SuperHero Hunter`;

    // Display hero information
    infoContainer.innerHTML = `
    <div class="flex-row hero-name"><h1>SuperHero Info</h1></div>
        <div class="flex-row hero-name">${heroInfo.name}</div>
        <div class="flex-row hero-img-and-more-info">
            <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">
            <img style="display:none;" id="landscapeImage" src="${heroInfo.landscapeImage}" alt="">
            <div class="flex-col more-info">
                <div class="flex-row id">
                    <b>ID:</b><span>${heroInfo.id}</span>
                </div>
                <div class "flex-row comics">
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
       
    `;

     // Update the "Add to Favorites" button text based on whether the hero is in favorites
    favoriteButton.textContent = isHeroInFavorites ? "Remove from Favorites" : "Add to Favorites";

    // Add an event listener to the "Add to Favorites" button
    favoriteButton.addEventListener("click", function () {
        if (isHeroInFavorites) {
            // Remove the hero from favorites
            const updatedFavorites = favoriteHeroes.filter((hero) => hero.name !== heroInfo.name);
            localStorage.setItem("favorite-heroes", JSON.stringify(updatedFavorites));
            favoriteButton.textContent = "Add to Favorites";
        } else {
            // Add the hero to favorites
            favoriteHeroes.push(heroInfo);
            localStorage.setItem("favorite-heroes", JSON.stringify(favoriteHeroes));
            favoriteButton.textContent = "Remove from Favorites";
        }
        // Toggle the isHeroInFavorites flag
        isHeroInFavorites = !isHeroInFavorites;
    });
});


