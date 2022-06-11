const API_URL = "https://api.github.com/users/";


const inputSearch = document.querySelector("#username-input");
const searchBtn = document.getElementById("search-button");
const containerEl = document.querySelector(".container");
const profileEl = document.querySelector(".profiles");


const avatarEl = document.getElementById("profile-icon");
const nameEl = document.getElementById("name");
const idEl = document.getElementById("user-name");
const followerEl = document.getElementById("profile-follower");
const followingEl = document.getElementById("profile-following");
const repoEl = document.getElementById("profile-repo");
const bioEl = document.getElementById("profile-bio");
const locationEl = document.getElementById("profile-location");




  function functionality() {
    let searchTerm = inputSearch.value;

    if (!searchTerm) {
      alert("Please enter username");
      return;
    }

    fetch(API_URL + searchTerm, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then((profiles) => {
        if (profiles.message) {
          containerEl.classList.remove("show-state");
        } else{
            containerEl.classList.add("show-state");

            avatarEl.setAttribute("src", profiles.avatar_url);
            profiles.hireable ? containerEl.classList.add("hireable") : "";
            nameEl.textContent = profiles.name;
            idEl.textContent = `@${profiles.login}`;
            followerEl.textContent = profiles.followers;
            followingEl.textContent = profiles.following;
            repoEl.textContent = profiles.public_repos;
            

            locationEl.textContent = profiles.location;
            profiles.location
            ? locationEl.parentElement.classList.remove("p-none")
            : locationEl.parentElement.classList.add("p-none");

            bioEl.textContent = profiles.bio;
            profiles.bio
            ? bioEl.classList.remove("profile-sm")
            : bioEl.classList.add("profile-sm");
        }
    })    
    .catch((e) => {
        console.log(e);
    });

};


document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") functionality();
  });
  searchBtn.addEventListener("click", functionality);
