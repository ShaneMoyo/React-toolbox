export default {
  getGists(username) {
    console.log(' api: ');
    return fetch(`https://api.github.com/users/${username}/gists`)
      .then(res => {
        console.log('res1: ', res)
        if(res.status === 200) {
          return res.json()
        } else {
          throw new Error("github api error");
        }
      })
  },
  getGistDetail() {

  }
}
