import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddNoteMain from "../AddNoteMain/AddNoteMain";
import AddFolderMain from '../AddFolderMain/AddFolderMain.js';
import ErrorPage from '../ErrorPage/ErrorPage';
import cuid from 'cuid';

import Context from "../Context";
import "./App.css";

const baseURL = 'http://localhost:9090'

class App extends Component {
  deleteNote = (id) => {
    console.log(id);
    this.apiCall(`${baseURL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(data => {
      const newNotes = this.state.notes.filter((note) => note.id !== id);
      this.setState({ ...this.state, notes: newNotes });
    })
  };

  createNote = (event, noteData) => {
    event.preventDefault();
    const note = {
      id: cuid(),
      name: noteData.name.value,
      modified: new Date(Date.now()).toISOString(),
      folderId: noteData.folder.value,
      content: noteData.content.value
    }
    this.apiCall(`${baseURL}/notes`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'body': note
        },
        body: JSON.stringify(note)
      }).then(data => {
        this.setState({notes: [...this.state.notes, note]})
        console.log('create note', note)
      })
  }

  createFolder = (event, folderData) => {
    event.preventDefault();
    const folder = {
      id: cuid(),
      name: folderData.name.value
    }
    this.apiCall(`${baseURL}/folders`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    }).then(data => {
      this.setState({folders: [...this.state.folders, folder]})
      console.log('create folder', folder);
    })
  }

  apiCall(url, params) {
    return fetch(url, params)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    this.apiCall(`${baseURL}/folders`).then((data) =>
      this.setState({ ...this.state, folders: data })
    );

    this.apiCall(`${baseURL}/notes`).then((data) =>
      this.setState({ ...this.state, notes: data })
    );
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-note" component={AddNoteMain} />
        <Route path='/add-folder' component={AddFolderMain} />
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <ErrorPage>
          <Context.Provider
            value={{
              ...this.state,
              deleteNote: this.deleteNote,
              deleteFolder: this.deleteFolder,
              apiCall: this.apiCall,
              createNote: this.createNote,
              createFolder: this.createFolder,
              baseURL: baseURL
            }}
          >
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
            <header className="App__header">
              <h1>
                <Link to="/">Noteful</Link>{" "}
                <FontAwesomeIcon icon="check-double" />
              </h1>
            </header>
            <main className="App__main">{this.renderMainRoutes()}</main>
          </Context.Provider>
        </ErrorPage>
      </div>
    );
  }
}

export default App;
