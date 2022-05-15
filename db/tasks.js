class Tasks {
  constructor(tasks) {
    this.tasks = tasks;

    tasks.remove({});
  }

  async getAll() {
    return this.tasks.find();
  }

  async addTasks({data}) {
    console.log(data)
    const tasks = data.map(link => ({link}));
    return this.tasks.insert(tasks);
  }

  async deleteTask({id}) {
    return this.tasks.remove({_id: id});
  }

  async startNewGame() {
    return this.tasks.remove({});
  }
}


module.exports = {
  Tasks
};
