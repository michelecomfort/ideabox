var loggedIdeas = [];
// var idea = new Idea(titleInput.value, bodyInput.value);

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


//Event Handlers

function createNewIdea() {
  var userTitle = titleInput.value;
  var userBody = bodyInput.value;
  var newIdea = new Idea(userTitle, userBody);
  loggedIdeas.push(newIdea);
}

function saveNewIdea() {
  createNewIdea();
}
