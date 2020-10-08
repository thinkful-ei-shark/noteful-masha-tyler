import React from 'react';
import Context from '../Context';

export default class AddFolderMain extends React.Component {
  static contextType = Context;

  state = {
    name: {
      value: '',
      touched: false
    }
  }

  updateName = (name) => {
    this.setState({name: {value: name, touched: true}})
  }

  validateFolder = () => {
    if(!this.state.name.value) return 'Folder Name Required'
  }

  render() {
    return(
      <section className='AddFolderMain'>
        <h2>Compose Folder</h2>
        <form onSubmit={(e) =>{
          this.context.createFolder(e, this.state);
          this.props.history.push('/');
        }}>
          <p>
            <label htmlFor='folder-name'>Name of Folder</label>
          </p>
          <p>
            <input type='text' name='folder-name' id='folder-name' placeholder='Folder Name' value={this.state.name.value} onChange={(e)=>this.updateName(e.target.value)} />
          </p>
          {this.state.name.touched&&<p>
            {this.validateFolder()}
          </p>}
          <button type='submit' disabled={this.validateFolder()}>Add Folder</button>
        </form>
      </section>
    )
  }
}