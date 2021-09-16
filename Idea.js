class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.isStarred = false;
  }
  saveToStorage(newIdea) {
    var ideaToStore = newIdea;
    var stringifyIdea = JSON.stringify(ideaToStore);
    localStorage.setItem('storedIdea', stringifyIdea);
  }
  deleteFromStorage() {
    localStorage.removeItem('storedIdea');
  }
  updateIdea() {
    this.isStarred = true;
  }
}
