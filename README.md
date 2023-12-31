# GitHub-Finder

GitHub Finder Project Using the GitHub API to Display the User Data and Recently Created Repositories.

## Table of contents

- [Overview](#overview)
  - [The GitHub-Finder features](#the-GitHub-Finder-features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The GitHub-Finder features

Users should be able to:

- Search for a user to get his data like account image, profile link, company, etc.
- See the alert if there is no user with this name.
- Get the user's latest created repositories data.
- See a message if this user has no repositories to display.

### Screenshot

- Desktop view

![](static/screen.jpeg)

### Links

- Live Site URL : [GitHub-Finder](https://mahmoudsmohammed.github.io/Number-Guesser/)

## My process

### Built with

- HTML 5
- Bootstrap 5
- TypeScript
- JavaScript

### What I learned

- How structure the project files.
- Using Git and Github.
- Use Bootstrap Classes and Built-in Components Efficiently.
- Use TypeScript Which Makes it Easy To Debug The Code.
- Fetch Data From API, Extract Data from API, and Use API Data in The App.
- Using Classes to Organize the Code (OOP Architecture).
- How to Manipulate the DOM.

```Js
// Conection Class
class Conection {
  static async conect(user: string) {
    let users = await fetch(
      `https://api.github.com/users/${user}?client_id=7c66f7eced0d99fa8e4c&client_secret=da05d6bba9168e2a3570693e09d1e5b2cb3b9655`
    );
    let repos = await fetch(
      `https://api.github.com/users/${user}/repos?
      per_page=5&client_id=7c66f7eced0d99fa8e4c&client_secret=da05d6bba9168e2a3570693e09d1e5b2cb3b9655`
    );
    let userDate = await users.json();
    let reposData = await repos.json();
    return { userDate, reposData };
  }
}
```

## Author

- Linkedin - [Mahmoud Sayed](https://www.linkedin.com/in/mahmoud-sayed-b85536217/)
- Codewars - [@MahmoudsMohammed](https://www.codewars.com/users/MahmoudsMohammed)
