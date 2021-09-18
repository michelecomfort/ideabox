var loggedIdeas = [];
var newIdea = new Idea();
var retrievedIdea = localStorage.getItem('storedIdea');
var parsedIdea = JSON.parse(retrievedIdea);
var favorites = []


// Query Selectors

var saveButton = document.getElementById('save-button');
var deleteButton = document.getElementById('delete-button');
var starButton = document.querySelector('.star');
var activeStarButton = document.querySelector('.active-star');
var activeDeleteButton = document.getElementById('active-delete');
var showStarredButton = document.getElementById('ideas-starred');
var showAllButton = document.getElementById('show-all');
var commentButton = document.querySelector('.comment-button');
var searchButton = document.getElementById('icon-search');
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var cardGrid = document.getElementById('card-grid');
var inputFields = document.querySelectorAll('textarea');
var starBorder = document.getElementById('star-border')
var ideaBoxes = document.querySelector(".idea-boxes")

//Event Listeners
window.addEventListener('load', onPageLoad);
titleInput.addEventListener('keydown', buttonDisable);
bodyInput.addEventListener('keydown', buttonDisable);
saveButton.addEventListener('click', saveNewIdea);
cardGrid.addEventListener('click', littleButtons);
showStarredButton.addEventListener('click', showFavorites);
showAllButton.addEventListener('click', showAllCards);

function littleButtons(event) {
  if (event.target.classList.contains('delete')) {
    deleteCard(event)
  } else if (event.target.classList.contains('star')) {
    redStar(event)
  }
}

function deleteCard(event) {
  var deleteThisCard = event.target.closest('.idea-boxes')
  deleteThisCard.remove()
  for(var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].id === parseInt(deleteThisCard.id)) {
      newIdea.deleteFromStorage();
      loggedIdeas.splice(i, 1);
      }
    }
  }


function redStar(event) {
  var targetBox = event.target.closest('.idea-boxes')
  var activeStar = targetBox.querySelector('#active-star')
  var targetStar = targetBox.querySelector('#star-button')
    for (var i = 0; i < loggedIdeas.length; i++) {
      if (loggedIdeas[i].id === parseInt(targetBox.id)) {
          loggedIdeas[i].isStarred = !loggedIdeas[i].isStarred;
        toggleElement(targetStar);
        toggleElement(activeStar);
        newIdea.saveToStorage(loggedIdeas)
    }
  }
}

function createNewIdea() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  newIdea = new Idea(userTitle, userBody);
  loggedIdeas.push(newIdea);
  newIdea.saveToStorage(loggedIdeas);
  clearInput()
}

function clearInput() {
  titleInput.value = "";
  bodyInput.value = "";
}

saveButton.disabled = true;

function buttonDisable() {
  if (titleInput.value === '' && bodyInput.value === '') {
    saveButton.disabled = true;
  } else if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
  }
}


function toggleElement(element) {
  element.classList.toggle('hidden')
}

function showFavorites() {
  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].isStarred === true) {
      favorites.push(loggedIdeas[i])
    }
  }
  renderCards(favorites)
  toggleElement(showStarredButton)
  toggleElement(showAllButton)
}

function showAllCards() {
  renderCards(loggedIdeas);
  toggleElement(showAllButton);
  toggleElement(showStarredButton);
}

function renderCards (list) {
  cardGrid.innerHTML = ''
  for (var i = 0; i < list.length; i++) {
    if(list === parsedIdea) {
    loggedIdeas.push(list[i]);
  }
  
    cardGrid.innerHTML += `
      <section class="idea-boxes" id=${list[i].id}>
            <header class="star-border" >
            <img id="active-star" class = 'active-star star hidden' src= assets/star-active.svg alt="star-active">
            <img id = "star-button" class = 'star' src= assets/star.svg alt="star">
            <img id = "delete-button" class = 'delete' src= assets/delete.svg alt="delete">
            </header>
            <div class='idea-content'>
              <h1 class="card-title">${list[i].title}</h1>
              <p>${list[i].body}</p>
            </div>
            <footer class="comment-image">
              <img src=assets/comment.svg alt='Add comment button'>
              <h1>Comment</h1>
            </footer>
          </section>
          `
  }
}

function onPageLoad() {
  if(parsedIdea) {
    renderCards(parsedIdea)
  }
}

function createIdeaCard() {
  var retrievedIdea = localStorage.getItem("storedIdea");
  var parsedIdea = JSON.parse(retrievedIdea);
  renderCards(parsedIdea)
}
function createIdeaCard() {
  var retrievedIdea = localStorage.getItem("storedIdea");
  var parsedIdea = JSON.parse(retrievedIdea);
  cardGrid.innerHTML += `
    <section class="idea-boxes" id=${parsedIdea[parsedIdea.length - 1].id}>
          <header class="star-border" >
          <img id="active-star" class = 'active-star star hidden' src= assets/star-active.svg alt="star-active">
          <img id = "star-button" class = 'star' src= assets/star.svg alt="star">
          <img id = "delete-button" class = 'delete' src= assets/delete.svg alt="delete">
          </header>
          <div class='idea-content'>
            <h1 class="card-title">${parsedIdea[parsedIdea.length - 1].title}</h1>
            <p>${parsedIdea[parsedIdea.length - 1].body}</p>
          </div>
          <footer class="comment-image">
            <img src=assets/comment.svg alt='Add comment button'>
            <h1>Comment</h1>
          </footer>
        </section>
        `
};


function saveNewIdea() {
  createNewIdea();
  createIdeaCard();
  buttonDisable();
}
