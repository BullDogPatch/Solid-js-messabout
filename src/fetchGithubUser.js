import axios from 'axios'

export const fetchGithubUser = async username => {
  const { data } = await axios.get(`https://api.github.com/users/${username}`)
  return data
}
