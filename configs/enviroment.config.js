const env = process.env.ENVIROMENT

const callbackURL = () => {
  if(env === 'develop') {
    console.log('Retorno callbackURL local')
    return 'http://127.0.0.1:3000';
  }
  if(env === 'production') {
    console.log('Retorno callbackURL production')
    return 'https://ironranked.herokuapp.com/';
  }
}

module.exports = callbackURL
