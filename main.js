var loggedIdeas = [];
var newIdea;


// Query Selectors

var saveButton = document.getElementById('save-button');
var deleteButton = document.getElementById('delete-button');
var starButton = document.getElementById('star-button');
var activeStarButton = document.getElementById('active-star');
var activeDeleteButton = document.getElementById('active-delete');
var showStarredButton = document.getElementById('ideas-starred');
var commentButton = document.querySelector('.comment-button');
var searchButton = document.getElementById('icon-search');
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var cardGrid = document.getElementById('card-grid');
var inputFields = document.querySelectorAll('textarea');
var starBorder = document.getElementById('star-border')
var ideaBoxes = document.querySelector(".idea-boxes")

//Event Listeners
titleInput.addEventListener('keydown', buttonDisable);
bodyInput.addEventListener('keydown', buttonDisable);
saveButton.addEventListener('click', saveNewIdea);
// deleteButton.addEventListener('click', deleteIdeaCard)

cardGrid.addEventListener('click', function(event){

  if(event.target.classList.contains('delete')) {
  var deleteThisCard = event.target.closest('.idea-boxes')
  deleteThisCard.remove()
    for(var i = 0; i < loggedIdeas.length; i++) {
      if (loggedIdeas[i].id === parseInt(deleteThisCard.id)) {
        loggedIdeas.splice(i, 1);
      }
    }
  }
})


//Event Handlers

function deleteIdeaCard() {
  var targetId = parseInt(event.target.parentNode.id)

  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].id === targetId) {
      loggedIdeas.splice(i, 1)
      // event.target.parentNode.remove()
      newIdea.deleteFromStorage()
    }
  }
  // }
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

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function createIdeaCard() {
  var retrievedIdea = localStorage.getItem('storedIdea');
  var parsedIdea = JSON.parse(retrievedIdea);
  cardGrid.innerHTML += `
    <section class="idea-boxes" id=${parsedIdea[parsedIdea.length - 1].id}>
          <header class="star-border" >
          <img id="active-star" class = 'active-star' src= assets/star-active.svg alt="star-active">
          <img id="active-delete" class = 'delete-active hidden' src= assets/delete-active.svg alt="delete-active">
          <img id = "star-button" class = 'star hidden' src= assets/star.svg alt="star">
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
