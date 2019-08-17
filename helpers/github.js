const request = require('request');
const config = require('../config.js');

//the reason why the paramater needs to include a callback is because we are passing the result from this to a different function, esp since we are using error-first callback on the server side to deal with routing

let getReposByUsername = (user, callback) => {
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, (error, response) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

}

module.exports.getReposByUsername = getReposByUsername;