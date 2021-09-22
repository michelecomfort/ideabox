var loggedIdeas = [];
var newIdea = new Idea();

// Query Selectors
var saveButton = document.getElementById('saveButton');
var deleteButton = document.getElementById('deleteButton');
var showStarredButton = document.getElementById('showStarredIdeas');
var showAllButton = document.getElementById('showAllIdeas');
var searchButtonInput = document.getElementById('searchInput');
var titleInput = document.getElementById('titleInput');
var bodyInput = document.getElementById('bodyInput');
var cardGrid = document.getElementById('cardGrid');
var inputFields = document.querySelectorAll('textarea');
var starBorder = document.getElementById('starBorder');
var ideaCards = document.querySelector('.idea-cards');
saveButton.disabled = true;

//EventListeners
window.addEventListener('load', onPageLoad);
titleInput.addEventListener('keydown', disableSaveButton);
bodyInput.addEventListener('keydown', disableSaveButton);
saveButton.addEventListener('click', saveNewIdea);
cardGrid.addEventListener('click', deleteAndFavButtons);
showStarredButton.addEventListener('click', showFavorites);
showAllButton.addEventListener('click', showAllCards);
searchButtonInput.addEventListener('keyup', filterIdeas);

function onPageLoad() {
  showSavedCards();
}

function disableSaveButton() {
  if (titleInput.value === '' && bodyInput.value === '') {
    saveButton.disabled = true;
  } else if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
  }
}

function createNewIdea() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  newIdea = new Idea(userTitle, userBody);
  loggedIdeas.push(newIdea);
  newIdea.saveToStorage(loggedIdeas);
  clearInput();
}

function clearInput() {
  titleInput.value = '';
  bodyInput.value = '';
}

function createIdeaCard() {
  var retrievedIdea = localStorage.getItem("storedIdea");
  var storedIdeas = JSON.parse(retrievedIdea);
  renderCards(storedIdeas);
}

function renderCards(list) {
  cardGrid.innerHTML = '';
  var star;
  for (var i = 0; i < list.length; i++) {
    if (!list[i].isStarred) {
      star = 'assets/star.svg';
    } else {
      star = 'assets/star-active.svg';
    }
    cardGrid.innerHTML += `
      <section class='idea-cards' id=${list[i].id}>
        <header id='starBorder' class='star-border'>
          <img id='active-star' class = 'active-star star hidden' src= assets/star-active.svg alt='star-active'>
          <img id='star-button' class='star' src=${star} alt='star'>
          <img id='deleteButton' class='delete' src=assets/delete.svg alt='delete'>
        </header>
        <div class='idea-content'>
          <h1 class='card-title'>${list[i].title}</h1>
          <p>${list[i].body}</p>
        </div>
        <footer class='comment-image'>
          <img src=assets/comment.svg alt='Add comment button'>
          <h1>Comment</h1>
        </footer>
      </section>`
  }
}

function deleteAndFavButtons(event) {
  if (event.target.classList.contains('delete')) {
    deleteCard(event);
  } else if (event.target.classList.contains('star')) {
    toggleRedStar(event);
  }
}

function deleteCard(event) {
  var deleteThisCard = event.target.closest('.idea-cards');
  var parentId = Number(event.target.parentNode.parentNode.id);
  deleteThisCard.remove();
  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].id === parseInt(deleteThisCard.id)) {
      newIdea.deleteFromStorage(parentId);
      loggedIdeas.splice(i, 1);
    }
  }
}

function toggleRedStar(event) {
  var targetBox = event.target.closest('.idea-cards');
  var activeStar = targetBox.querySelector('#active-star');
  var targetStar = targetBox.querySelector('#star-button');
  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].id === parseInt(targetBox.id)) {
      loggedIdeas[i].isStarred = !loggedIdeas[i].isStarred;
      toggleElement(targetStar);
      toggleElement(activeStar);
    }
    if (loggedIdeas[i].isStarred === true && !loggedIdeas.includes(loggedIdeas[i])) {
      loggedIdeas[i].updateIdea();
    }
  }
  newIdea.saveToStorage(loggedIdeas);
}

function toggleElement(element) {
  element.classList.toggle('hidden');
}

function showFavorites() {
  var retrievedIdea = localStorage.getItem("storedIdea");
  var storedIdeas = JSON.parse(retrievedIdea);
  loggedIdeas = storedIdeas;
  var starredIdeas = [];
  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].isStarred === true && !starredIdeas.includes(loggedIdeas[i])) {
      starredIdeas.push(loggedIdeas[i]);
    }
  }
  toggleElement(showStarredButton);
  toggleElement(showAllButton);
  renderCards(starredIdeas);
}

function showSavedCards() {
  var retrievedIdea = localStorage.getItem("storedIdea");
  var storedIdeas = JSON.parse(retrievedIdea);
  if (storedIdeas) {
    loggedIdeas = storedIdeas;
    renderCards(loggedIdeas);
  }
}

function filterIdeas() {
  var searchCards = searchButtonInput.value.toLowerCase();
  cardGrid.innerHTML = '';
  var matchedIdea = [];
  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].title.toLowerCase().includes(searchCards) || loggedIdeas[i].body.toLowerCase().includes(searchCards)) {
      matchedIdea.push(loggedIdeas[i]);
    }
  }
  renderCards(matchedIdea);
}

function showAllCards() {
  renderCards(loggedIdeas);
  toggleElement(showAllButton);
  toggleElement(showStarredButton);
}

function saveNewIdea() {
  createNewIdea();
  createIdeaCard();
  disableSaveButton();
}
