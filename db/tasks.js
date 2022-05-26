class Tasks {
  constructor(tasks) {
    this.tasks = tasks;

    tasks.remove({});
  }

  async getAll() {
    const tasks = await this.tasks.find();
    tasks.sort((a, b) => a.result - b.result);

    return tasks;
  }

  async addTasks({data}) {
    const tasks = data.map(link => ({link, result: null}));
    return this.tasks.insert(tasks);
  }

  async addTaskResult({id, result}) {
    return this.tasks.update({_id: id}, {$set: {result}});
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
