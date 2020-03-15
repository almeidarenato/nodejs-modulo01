const Project = require("../model/Project");
const projects = [];
class ProjectsController {
  index(req, res) {
    return res.json(projects);
  }
  store(req, res) {
    const newproject = req.body;
    const project = new Project(newproject);
    console.log(newproject.id);
    console.log(project.getProject());
    projects.push(project.getProject());
    return res.json(projects);
  }
  update(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    projects.map(project => {
      if (project.id == id) {
        project.title = title;
      }
    });
    return res.json(projects);
  }
  destroy(req, res) {
    const { id } = req.params;
    projects.map((project, index) => {
      if (project.id == id) projects.splice(index, 1);
    });

    return res.status(200).send();
  }
  addtask(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    projects.map(project => {
      if (project.id == id) project.tasks.push(title);
    });
    return res.status(200).json(projects);
  }
}

module.exports = new ProjectsController();
