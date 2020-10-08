import React from 'react'

export default class ErrorPage extends React.Component {
  state = {
    error: null
  }
  static getDerivedStateFromError(error) {
    console.log(error);
    return {error};
  }
  render() {
    if (this.state.error) {
      return (
        <section className='error-page'>
          <h2>Something seems to have gone wrong</h2>
          <p>Try refreshing the page!</p>
        </section>
      )
    }
    return this.props.children;
  }
}