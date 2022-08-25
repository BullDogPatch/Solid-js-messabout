import { createSignal, onMount, createEffect } from 'solid-js'
import axios from 'axios'
import { styled } from 'solid-styled-components'
import GithubUser from './components/GithubUser'

const MainHeader = styled('h1')`
  font-family: monospace;
`
const Button = styled('button')`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const Input = styled('input')`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || 'palevioletred'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`

const AppWrapper = styled('div')`
  font-family: sans-serif;
  text-align: center;
  margin: auto;
`

function App() {
  const [user, setUser] = createSignal('bulldogpatch')
  const [searchText, setSearchText] = createSignal('')

  onMount(async () => {
    const { data } = await axios.get(`https://api.github.com/users/${user()}`)
    setUser(data)
  })

  const fetchGithubUser = () => {
    axios
      .get(`https://api.github.com/users/${searchText()}`)
      .then(({ data }) => {
        setUser(data)
        setSearchText('')
      })
  }

  const handleChanges = e => {
    setSearchText(e.target.value)
  }

  return (
    <AppWrapper>
      <MainHeader>Github User Search</MainHeader>
      <Input
        type="text"
        value={searchText()}
        onInput={handleChanges}
        placeholder="Search for User"
      />
      <Button onClick={fetchGithubUser}>Fetch User</Button>

      <GithubUser user={user()} />
    </AppWrapper>
  )
}

// class App extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       user: [],
//       searchText: '',
//     }
//   }

//   componentDidMount() {
//     console.log('cDM')
//     axios.get('https://api.github.com/users/bulldogpatch').then(res => {
//       console.log(res)
//       this.setState({
//         user: res.data,
//       })
//     })
//   }

//   handleChanges = e => {
//     this.setState({
//       searchText: e.target.value,
//     })
//   }

//   fetchGitHubUser = e => {
//     axios
//       .get(`https://api.github.com/users/${this.state.searchText}`)
//       .then(res => {
//         this.setState({
//           user: res.data,
//         })
//       })
//       .catch(err => {
//         console.log('Need a username', err)
//       })
//   }

//   render() {
//     // console.log('render', this.render)
//     return (
//       <AppWrapper>
//         <MainHeader>Github User Search</MainHeader>
//         <Input
//           type="text"
//           value={this.state.searchText}
//           onChange={this.handleChanges}
//           placeholder="Search for User"
//         />
//         <Button onClick={this.fetchGitHubUser}>Fetch User</Button>

//         <GithubUser users={this.state.user} />
//       </AppWrapper>
//     )
//   }
// }
export default App
