class Users {
  constructor(users) {
    this.users = users;

    this.users.remove({});
  }

  async getAll() {
    return this.users.find();
  }

  async logIn(user) {
    if (!user.name) user.name = 'Anonymous';

    user.picked = null;
    return this.users.insert(user);
  }

  async pickCard({id, picked}) {
    return this.users.update({_id: id}, {$set: {picked}});
  }

  async deleteUser({id}) {
    return this.users.remove({_id: id});
  }

  async nullResults() {
    return this.users.update({}, {$set: {picked: null}}, {multi: true});
  }

  async startNewGame() {
    return this.users.remove({});
  }
}


module.exports = {
  Users
};
