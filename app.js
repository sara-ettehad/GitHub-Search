const API_URL = "https://api.github.com/users/";

const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.querySelector("#username");

const peapleList = document.querySelector("#profiles")

btnSearch.addEventListener("click", (event) => {
  // console.log({ input: inputSearch.value });

  let searchTerm = inputSearch.value;

  if (!searchTerm) {
    alert("Please enter username");
    return;
  }

  // 2 req: Sync / Async
  fetch(API_URL + searchTerm, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      render(data);
    });
});

// function getUser(username) {}

function render(data) {
  const { avatar_url, login, public_repos, following, followers, location, name, bio } = data;
  const li = document.createElement("li");
  li.classList.add("profiles");
  const markup = `
    <div class='profile-github'>
        <div class='profile-github-grid1'>
            <figure>
                <img class='profile-icon' src='${avatar_url}' alt = 'profile'>
            </figure>
        </div>
        
        <div class='profile-github-grid2'>
            <div class='profile-header'>
                <h2 class='name' data-name=${name}>
                    <var>${name}</var>
                </h2>
                <p class='user-name' data-username=${login}>
                    <span>@</span>
                    <var>${login}</var>
                </p>
            </div>    
            <div class='peaple-info'>
                <div class='profile-info-column1'>
                    <div class='profile-info-row1-grid'>
                        <var>${public_repos}</var>
                        <span>posts</span>
                    </div>
                    <div class='profile-info-row1-grid'>
                        <var>${followers}</var>
                        <span>followers</span>
                    </div>
                    <div class='profile-info-row1-grid'>
                        <var>${following}</var>
                        <span>followings</span>
                    </div>
                </div>
                <div class='profile-info-column2'>
                    <var>${location}</var>
                </div>
                <div class='profile-info-column3'>
                    <var>${bio}</var>
                </div>
            </div>
        </div>
    </div>
  `;
  li.innerHTML = markup;
  peapleList.appendChild(li);
  message.innerText = "";
  
}
