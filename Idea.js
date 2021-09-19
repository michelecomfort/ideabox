class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.isStarred = false;
  }

  saveToStorage(savedIdeas) {
    var ideaToStore = savedIdeas;
    var stringifyIdea = JSON.stringify(ideaToStore);
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
    this.isStarred = true;
  }

}
