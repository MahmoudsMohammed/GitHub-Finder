"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.getElementById('input'), profile = document.getElementById('profile-info'), repos = document.getElementById('repos-container'), message = document.getElementById('alert');
// Add Event Listener
input.addEventListener('keyup', (e) => {
    // If there is no input
    if (e.target.value === '') {
        repos.style.display = 'none';
        profile.style.display = 'none';
        message.style.display = 'none';
    }
    else {
        // take input and make request for this user data
        Conection.conect(e.target.value).then((data) => {
            if (data.userDate.message === 'Not Found') {
                message.style.display = 'block';
            }
            else {
                message.style.display = 'none';
                UI.displayProfile(data.userDate);
                UI.displayRepos(data.reposData);
            }
        });
    }
});
// Conection Class
class Conection {
    static conect(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield fetch(`https://api.github.com/users/${user}?client_id=7c66f7eced0d99fa8e4c&client_secret=da05d6bba9168e2a3570693e09d1e5b2cb3b9655`);
            let repos = yield fetch(`https://api.github.com/users/${user}/repos?
      per_page=5&client_id=7c66f7eced0d99fa8e4c&client_secret=da05d6bba9168e2a3570693e09d1e5b2cb3b9655`);
            let userDate = yield users.json();
            let reposData = yield repos.json();
            return { userDate, reposData };
        });
    }
}
// UI Class
class UI {
    static displayProfile(data) {
        let contant = `
    <div class="card p-3">
    <div class="row">
      <div class="col-md-3">
        <img
          src="${data.avatar_url}"
          alt=""
          class="img-fluid mb-3"
        />

      <a href="${data.html_url}" target="_blank" class="text-light text-decoration-none w-100 btn btn-primary">View Profile</a>
      </div>
      <div class="col-md-9 mt-3">
        <div class="mb-4 d-flex justify-content-center flex-wrap gap-2">
          <span class="badge text-bg-secondary p-2">Public Repos: ${data.public_repos}</span>
          <span class="badge text-bg-danger p-2">Public Gists: ${data.public_gists}</span>
          <span class="badge text-bg-success p-2">Followers: ${data.followers}</span>
          <span class="badge text-bg-warning p-2">Following: ${data.following}</span>
        </div>
        <ul class="list-group">
          <li class="list-group-item">Company: ${data.company}</li>
          <li class="list-group-item">
            Website/Blog: ${data.blog}
          </li>
          <li class="list-group-item">Location: ${data.location}</li>
          <li class="list-group-item">
            Member Since: ${data.created_at}
          </li>
        </ul>
      </div>
    </div>
  </div>
    `;
        profile.innerHTML = contant;
        profile.style.display = 'block';
    }
    static displayRepos(data) {
        if (data.length > 0) {
            let content = '';
            data.forEach((e) => {
                content += `
      <div class="card p-3 mb-2">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="${e.html_url}" target="_blank">${e.name}</a>
        <div class="mt-3 mt-sm-0 d-flex">
          <span class="badge text-bg-warning p-2 me-1">Stars: ${e.stargazers_count}</span>
          <span class="badge text-bg-danger p-2 me-1">Watchers: ${e.watchers_count}</span>
          <span class="badge text-bg-dark p-2 me-1">Forks: ${e.forks_count}</span>
        </div>
      </div>
    </div>
      `;
            });
            repos.innerHTML =
                `<h2 class="page-heading my-3">Latest Repos</h2>` + content;
            repos.style.display = 'block';
        }
        else {
            repos.innerHTML =
                `<h2 class="page-heading my-3">Latest Repos</h2>` +
                    `<p class="alert alert-warning">This User Has No Repos To Display</p>`;
            repos.style.display = 'block';
        }
    }
}
