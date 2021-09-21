class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.isStarred = false;
  }

  saveToStorage(loggedIdeas) {
    var stringifyIdea = JSON.stringify(loggedIdeas);
    localStorage.setItem("storedIdea", stringifyIdea);
  }

  deleteFromStorage(parentId) {
    var retrievedIdea = localStorage.getItem("storedIdea");
    var storedIdeas = JSON.parse(retrievedIdea);
    for (var i = 0; i < storedIdeas.length; i++) {
      if (storedIdeas[i].id === parentId) {
        storedIdeas.splice(i, 1);
      }
    }
    this.saveToStorage(storedIdeas)
  }

  updateIdea() {
    var retrievedIdea = localStorage.getItem("storedIdea");
    var storedIdeas = JSON.parse(retrievedIdea);
    for (var i = 0; i < storedIdeas.length; i++) {
      if (storedIdeas[i].id === this.id) {
        storedIdeas[i].isStarred =!storedIdeas[i].isStarred;
      }
    }
    this.saveToStorage(storedIdeas)
}
}
