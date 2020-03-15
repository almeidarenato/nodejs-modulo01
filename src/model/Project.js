class Project {
  constructor({ id, title }) {
    this.id = id;
    this.title = title;
    this.tasks = [];
  }
  getProject() {
    return {
      id: this.id,
      title: this.title,
      tasks: this.tasks
    };
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
}

module.exports = Project;
