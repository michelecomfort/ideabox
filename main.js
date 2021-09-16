var loggedIdeas = [];
var newIdea;

// Query Selectors

var saveButton = document.querySelector('.save-button');
var deleteButton = document.getElementById('delete-button');
var starButton = document.getElementById('star-button');
var activeStarButton = document.getElementById('active-star');
var activeDeleteButton = document.getElementById('active-delete');
var showStarredButton = document.getElementById('ideas-starred');
var commentButton = document.querySelector('.comment-button');
var searchButton = document.getElementById('icon-search');
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');

//Event Listeners

saveButton.addEventListener('click', saveNewIdea);
//Event Handlers

function createNewIdea() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  newIdea = new Idea(userTitle, userBody);
  loggedIdeas.push(newIdea);
  newIdea.saveToStorage();
  // clearInput()
}

function saveNewIdea() {
  // event.preventDefault();
  createNewIdea();
  // newIdea.saveToStorage();
  // saveNewIdea();
  // var storedLocally = JSON.stringify(newIdea);
  // localStorage.setItem('storedIdeaCards', storedLocally);
  //will need json somewhere in here;
}

function clearInput() {
  titleInput.value = "";
  bodyInput.value = "";
  show(saveButton);
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function createIdeaCard(element, htmlContainer){
  htmlContainer.innerHTML += `
    <section class="idea-boxes" id=${element.id}>
          <header class="star-border" id=${element.id}>
          <img id="active-star" class = 'active-star' src= assets/star-active.svg alt="star-active">
          <img id="active-delete" class = 'delete-active hidden' src= assets/delete-active.svg alt="delete-active">
          <img id = "star-button" class = 'star hidden' src= assets/star.svg alt="star">
          <img id = "delete-button" class = 'delete' src= assets/delete.svg alt="delete">
          </header>
          <div class='idea-content'>
            <h1 class="card-title">${element.title}</h1>
            <p>${element.body}</p>
          </div>
          <footer class="comment-image">
            <img src=assets/comment.svg alt='Add comment button'>
            <h1>Comment</h1>
          </footer>
        </section>
        `
      };
