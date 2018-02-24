const env = process.env.ENVIROMENT

const callbackURL = () => {
  if(env === 'develop') {
    return 'http://127.0.0.1:3000';
  }
  if(env === 'production') {
    return 'https://ironranked.herokuapp.com';
  }
}

module.exports = callbackURL
