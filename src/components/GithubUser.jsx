import { styled } from 'solid-styled-components'

const H2 = styled('h2')`
  color: red;
  font-family: monospace;
`
const UserCard = styled('div')`
  width: 80%;
  margin: auto;
`

const UserDetails = styled('p')`
  font-family: monospace;
  font-weight: bold;
`

const GithubUser = props => {
  console.log(props)
  return (
    <UserCard>
      <H2>Username: {props.user.login}</H2>
      <H2>Name: {props.user.name}</H2>
      <UserDetails>Location: {props.user.location}</UserDetails>
      {/* <a href={props.users.html_url}>Git Handle</a> */}
      <UserDetails>Followers: {props.user.followers}</UserDetails>

      <img src={props.user.avatar_url} alt="avatar" />
    </UserCard>
  )
}

export default GithubUser
