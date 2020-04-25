export default {
  async getGists(username) {
    console.log(' api: ');
    let gists = await fetch("https://api.github.com/users/shanemoyo/gists")
      .then(res => res.json())
      

    console.log('gists api: ', gists)
    return gists
  },
  getGistDetail() {

  }
}
