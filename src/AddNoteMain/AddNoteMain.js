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
      value: '',
      touched: false
    },
    id: ''
  }

  updateName = (name) => {
    this.setState({ name: { value: name, touched: true } });
  }

  updateFolder = (folderId) => {
    this.setState({ folder: { value: folderId, touched: true } })
  }

  updateContent = (content) => {
    this.setState({ content: { value: content, touched: true} })
  }

  validateName = () => {
    if (!this.state.name.value.trim()) return 'Error: must have name';
  }

  validateContent = () => {
    if (!this.state.content.value.trim()) return 'Error: must have content';
  }

  validateFolder = () => {
    if (!this.state.folder.value) return 'Error: must select folder';
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
            <input type="text" id="note-name" name="note-name" placeholder="Enter the note name" value={this.state.name.value}
              onChange={((e) => this.updateName(e.target.value))} />
          </p>
          {
            this.state.name.touched &&
            <p>
              {this.validateName()}
            </p>
          }
          <p>
            <label htmlFor="note-content">Content</label>
          </p>
          <p>
            <textarea id="note-content" name="note-content" placeholder="Enter content" onChange={(e) => this.updateContent(e.target.value)}></textarea>
          </p>
          {
            this.state.content.touched &&
            <p>
              {this.validateContent()}
            </p>
          }
          <p>
            <label htmlFor="folder">Folder</label>
          </p>
          <p>
            <select id="folder" name="folder" onChange={(e) => this.updateFolder(e.target.value)}>
              <option value=''>Select Folder</option>
              {this.context.folders.map(folder =>
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              )}
            </select>
          </p>
          {
            this.state.folder.touched &&
            <p>
              {this.validateFolder()}
            </p>
          }
          <p>
            <button disabled = {
              this.validateName() ||
              this.validateContent() ||
              this.validateFolder()
            }
              type="submit">Add Note
            </button>
          </p>
        </form>
      </section>
    )
  }
}