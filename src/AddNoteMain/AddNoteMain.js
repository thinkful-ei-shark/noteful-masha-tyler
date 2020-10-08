import React from 'react'
import Context from '../Context'

export default class AddNote extends React.Component {

  static contextType = Context;

  state = {
    name: {
      value: ''
    },
    content: {
      value: ''
    },
    folder: {
      value: ''
    },
    id: '',
    folderId: ''
  }

  updateName = (name) => {
    this.setState({name: {value: name}});
  }

  render() {
    return (
      <section className="create-note">
        <h2>Compose</h2>
        <form>
          <p>
            <label for="note-name">Name</label>
          </p>
          <p>
            <input type="text" id="note-name" name="note-name" placeholder="Enter the note name"
                onChange={((e)=>this.updateName(e.target.value))} />
          </p>
          <p>
            <label for="note-content">Content</label>
          </p>
          <p>
            <textarea id="note-content" name="note-content" placeholder="Enter content"></textarea>
          </p>
          <p>
            <label for="folder">Folder</label>
          </p>
          <p>
            <select id="folder" name="folder">
              <option>Select Folder</option>
              {this.context.folders.map(folder => 
                <option value={folder.id}>{folder.name}</option>
              )}
            </select>
          </p>
          <p>
            <button type="submit">Add Note</button>
          </p>
        </form>
      </section>
    )
  }
}