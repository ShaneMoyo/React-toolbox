import React, { useState } from 'react';
import logo from './logo.svg';
import githubAPI from './services/github';
import moment from 'moment'
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState('false');
  const [gists, setGists] = useState([]);
  const [gistDetail, setGistDetail] = useState(null);

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
        setGists({});
      })
  }

  const handleShowGistDetail = (id) => {
    return githubAPI.getGists(username)
      .then(res => {
        console.log('res, ', res);
        setGists(res);
      })
      .catch(err => {
        console.log('catching error, ', err)
        setGists([]);
      })
    setGistDetail(id);
  }

  const gistsList = Object.entries(gists).map(entry => {
    console.log('gist, index ', entry)
    const gistID = entry[0];
    const gist = entry[1];
    const date = moment(gist.created_at). format('YYYY-MM-DD');
    const files = gist.files;
    const fileList = Object.entries(files).map((file, index) => {
      return (
        <li key={index} className="file">
          <a href={file[1].raw_url}>{file[0]}</a>
        </li>
      )
    })
    return (
      <li className="gist" key={gistID} onClick={e => handleShowGistDetail(gistID)}>
        <a >{gist.description} - {date} </a>
        {gistDetail ===  gistID ?
          <ul>
            {fileList}
          </ul> : null
        }
      </li>
      )
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Gists for: {username}</p>
        <input type="text" value={username} onChange={e => handleInput(e)}/>
        <input type="button" value="Get Gists..." onClick={handleSubmit}></input>
        {Object.entries(gists).length ?
          <ul>
            {gistsList}
          </ul> : null
        }
      </header>
    </div>
  );
}

export default App;
