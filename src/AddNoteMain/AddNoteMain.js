import React from 'react'
import Context from '../Context'

export default class AddNote extends React.Component {

  static contextType = Context;

  state = {
    name: {
      value: '',
      touched: false
    },
    content: {
      value: '',
      touched: false
    },
    folder: {
      value: ''
    },
    id: ''
  }

  updateName = (name) => {
    this.setState({name: {value: name, touched:true}});
  }

  updateFolder = (folderId) => {
    this.setState({folder: {value: folderId,touched:true}})
  }

  updateContent = (content) => {
    this.setState({content: {value: content}})
  }

  render() {
    return (
      <section className="create-note">
        <h2>Compose</h2>
        <form>
          <p>
            <label htmlFor="note-title">Title</label>
          </p>
          <p>
            <input type="text" id="note-name" name="note-name" placeholder="Enter the note name"
                onChange={((e)=>this.updateName(e.target.value))} />
          </p>
          {this.state.name.touched &&<p>Test:
            {this.state.name.value}
          </p>}
          <p>
            <label htmlFor="note-content">Content</label>
          </p>
          <p>
            Error handling Content
          </p>
          <p>
            <textarea id="note-content" name="note-content" placeholder="Enter content" onChange={(e)=>this.updateContent(e.target.value)}></textarea>
          </p>
          <p>
            <label htmlFor="folder">Folder</label>
          </p>
          <p>
            <select id="folder" name="folder" onChange={(e)=>this.updateFolder(e.target.value)}>
              <option>Select Folder</option>
              {this.context.folders.map(folder => 
                <option key={folder.id} value={folder.id}>{folder.name}</option>
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