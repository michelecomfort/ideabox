class Idea {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.isStarred = false;
  }
  saveToStorage(idea) {
    var ideaToStore = idea;
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
