import React, { useState } from 'react';
import logo from './logo.svg';
import githubAPI from './services/github';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState('false');
  const [gists, setGists] = useState([]);

  const handleInput = ({ target }) => {
    console.log('input: ', target.value);
    setUsername(target.value);
  };

  const handleSubmit = () => {
    return githubAPI.getGists(username)
      .then(res => {
        console.log('res, ', res);
        setGists(res);
      })
      .catch(err => {
        console.log('catching error, ', err)
        setGists([]);
      })
  }

  const gistsList = gists.map((gist, index) => {
    console.log('gist, index ', gist, index)
    return <li key={index}>{gist.id}</li>
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Gists for: {username}</p>
        <input type="text" value={username} onChange={e => handleInput(e)}/>
        <input type="button" value="Get Gists..." onClick={handleSubmit}></input>
        {gists.length ?
          <ul>
            {gistsList}
          </ul> : null
        }
      </header>
    </div>
  );
}

export default App;
