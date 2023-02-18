const container = document.querySelector(".container");
let card;
let noOfEpisodes;
let characterRole;
let characterName;
let characterSpecies;
let characterLocation;
async function showInfo() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  let data = await response.json();

  if (!response.ok) {
    throw new Error(`There is an Error Morty!`);
  }
  data.results = await data.results.filter(
    (person) => person.status == "Alive"
  );

  for (const character of data.results) {
    const episodeCount = character.episode.length;
    if (episodeCount > 25) {
      character.role = "Main character";
    } else {
      character.role = "Side character";
    }
    card = document.createElement("div");
    noOfEpisodes = document.createElement("p");
    characterRole = document.createElement("p");
    characterName = document.createElement("h1");
    characterSpecies = document.createElement("p");
    characterLocation = document.createElement("p");

    card.classList.add("card");
    characterName.classList.add("character-name");
    characterSpecies.classList.add("character-species");
    characterLocation.classList.add("character-location");
    characterRole.classList.add("character-role");
    noOfEpisodes.classList.add("no-of-episodes");

    characterName.innerHTML = ` ${character.name}`;
    characterSpecies.innerHTML = `<span>Species:</span> ${character.species}`;
    characterLocation.innerHTML = `<span>Location:</span> ${character.location.name}`;
    characterRole.innerHTML = `<span>Role:</span> ${character.role}`;
    noOfEpisodes.innerHTML = `<span># of Episodes:</span> ${character.episode.length}`;

    card.appendChild(characterName);
    card.appendChild(characterSpecies);
    card.appendChild(characterLocation);
    card.appendChild(characterRole);
    card.appendChild(noOfEpisodes);

    container.appendChild(card);
  }
}
showInfo();

function searchItem() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let byName = document.getElementsByClassName("character-name");
  let hideCard = document.getElementsByClassName("card");

  for (i = 0; i < byName.length; i++) {
    if (!byName[i].innerHTML.toLowerCase().includes(input)) {
      hideCard[i].style.display = "none";
    } else {
      hideCard[i].style.display = "";
    }
  }
}

// function searchItem() {
//   let input = document.getElementById("searchbar").value;
//   input = input.toLowerCase();
//   if (!characterName.innerHTML.toLowerCase().includes(input)) {
//     card.style.display = "none";
//     console.log("OKAY");
//   } else {
//     card.style.display = "flex";
//     console.log(" notOKAY");
//   }
// }
