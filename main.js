var loggedIdeas = [];
var newIdea;


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

function littleButtons(event) {
  if (event.target.classList.contains('delete')) {
  var deleteThisCard = event.target.closest('.idea-boxes')
  console.log(event.target.id)
  deleteThisCard.remove()
    for(var i = 0; i < loggedIdeas.length; i++) {
      if (loggedIdeas[i].id === parseInt(deleteThisCard.id)) {
        loggedIdeas.splice(i, 1);
       newIdea.deleteFromStorage(deleteThisCard);
      }
    }
  } else if (event.target.classList.contains('star')) {
      var targetBox = event.target.closest('.idea-boxes')
      var activeStar = targetBox.querySelector('#active-star')
      var targetStar = targetBox.querySelector('#star-button')
        for (var i = 0; i < loggedIdeas.length; i++) {
          if (loggedIdeas[i].id === parseInt(targetBox.id)) {
              loggedIdeas[i].isStarred = !loggedIdeas[i].isStarred;
            toggleElement(targetStar);
            toggleElement(activeStar);
        }
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


function onPageLoad() {
  var retrievedIdea = localStorage.getItem('storedIdea');
  var parsedIdea = JSON.parse(retrievedIdea);
  for (var i = 0; i < parsedIdea.length; i++) {
    loggedIdeas.push(parsedIdea[i]);
    cardGrid.innerHTML += `
      <section class="idea-boxes" id=${parsedIdea[i].id}>
            <header class="star-border" >
            <img id="active-star" class = 'active-star star hidden' src= assets/star-active.svg alt="star-active">
            <img id = "star-button" class = 'star' src= assets/star.svg alt="star">
            <img id = "delete-button" class = 'delete' src= assets/delete.svg alt="delete">
            </header>
            <div class='idea-content'>
              <h1 class="card-title">${parsedIdea[i].title}</h1>
              <p>${parsedIdea[i].body}</p>
            </div>
            <footer class="comment-image">
              <img src=assets/comment.svg alt='Add comment button'>
              <h1>Comment</h1>
            </footer>
          </section>
          `
  }

}

function createIdeaCard() {
  var retrievedIdea = localStorage.getItem('storedIdea');
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
