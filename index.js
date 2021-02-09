const axios = require('axios')
const url = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@'

module.exports = {
  getRecentPosts: async function (username) {
    if (typeof username !== "string") throw new TypeError("username must be of type string")
    
    if (username.startsWith('@')) username = username.substr(1)

    return await axios.get(url + username).then(res => {
      return res.data.items
    }).catch(error => {
      return {
        status: "error",
        message: `User ${username} does not exist.`
      }
    })
  },
  getRecentPost: async function (username, post) {
    if (typeof username !== "string") throw new TypeError("username must be of type string")
    if (!Number.isInteger(post)) throw new TypeError("post must be of type integer")
    if (post < 0 || post >= 10) throw new TypeError("post must be between 0 and 9 inclusively")

    if (username.startsWith('@')) username = username.substr(1)

    return await axios.get(url + username).then(res => {
      return res.data.items[post]
    }).catch(error => {
      return {
        status: "error",
        message: `User ${username} does not exist.`
      }
    })
  }
} 