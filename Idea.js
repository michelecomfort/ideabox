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

  deleteFromStorage() {
    var retrievedIdea = localStorage.getItem("storedIdea");
    var parsedIdea = JSON.parse(retrievedIdea);
    for (var i = 0; i < parsedIdea.length; i++) {
      if (parsedIdea[i].id === this.id) {
        parsedIdea.splice(i, 1);
      }
    }
    this.saveToStorage(parsedIdea)
  }

  updateIdea() {
    this.isStarred = true;
  }

}
