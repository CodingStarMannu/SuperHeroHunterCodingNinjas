document.addEventListener("DOMContentLoaded", () => {
    // Get the superhero name from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const superheroName = urlParams.get("name");

    // Check if a superhero name is provided in the URL
    if (superheroName) {
        // Fetch superhero details using an API or from your data source
        // Replace the following URL with the actual API endpoint or data source
        const apiUrl = `https://https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${textSearched}&limit=10&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f?ts=1/${superheroName}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((superheroData) => {
                // Update the page content with superhero details
                displaySuperheroDetails(superheroData);
            })
            .catch((error) => {
                console.error("Error fetching superhero data:", error);
            });
    } else {
        console.error("Superhero name not provided in the URL.");
    }
});

function displaySuperheroDetails(superheroData) {
    // Get references to the elements where you want to display superhero details
    const superheroNameElement = document.querySelector(".hero-name");
    const superheroDescriptionElement = document.querySelector(".hero-description");
    const superheroComicsElement = document.querySelector(".hero-comics");
    const superheroSeriesElement = document.querySelector(".hero-series");
    const superheroStoriesElement = document.querySelector(".hero-stories");
    const superheroImageElement = document.querySelector(".hero-image");

    // Update the elements with superhero data
    superheroNameElement.textContent = superheroData.name;
    superheroDescriptionElement.textContent = superheroData.description;
    superheroComicsElement.textContent = `Comics: ${superheroData.comics}`;
    superheroSeriesElement.textContent = `Series: ${superheroData.series}`;
    superheroStoriesElement.textContent = `Stories: ${superheroData.stories}`;
    superheroImageElement.src = superheroData.thumbnail;

    // Add any additional logic for displaying superhero details here
}
