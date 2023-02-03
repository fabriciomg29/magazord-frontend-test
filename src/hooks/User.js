const GIT_USER = 'fabriciomg29'

const User = {
  getGitUser: async () => {
    const URL_USER = `https://api.github.com/users/${GIT_USER}`

    const response = await fetch(URL_USER);
    const person = await response.json()

    return person
  },
  getGitRepos: async () => {
    const URL_REPOS = `https://api.github.com/users/${GIT_USER}/repos`

    const response = await fetch(URL_REPOS);
    const repos = await response.json()

    return repos
  },
  getGitStarred: async () => {
    const URL_STARRED = `https://api.github.com/users/${GIT_USER}/starred`

    const response = await fetch(URL_STARRED);
    const starred = await response.json()

    return starred
  }
}

export default User