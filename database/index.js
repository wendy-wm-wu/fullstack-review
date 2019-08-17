const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: 'Number',
  repo_name: 'String',
  login: 'String',
  avatar_url: 'String',
  user_url: 'String',
  repos_url: 'String'
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (newRepo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  newRepo.forEach(repo => {
    var userRepo = new Repo({
      id: repo.id,
      repo_name: repo.name,
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
      user_url: repo.owner.user_url,
      repos_url: repo.owner.repos_url,
    });
    Repo.create({
      id: repo.id,
      repo_name: repo.name,
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
      user_url: repo.owner.user_url,
      repos_url: repo.owner.repos_url,
      unique: true,
    }, function (err, userRepo) {
      if (err) return handleError(err);
    });
  });
};

let find = (callback) => {
  Repo.find({})
  .sort({
    id: 'asc'
  })
  .limit(25).exec((err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, docs);
    }
  });
};

module.exports = {
  save: save,
  find: find,
}