import React from 'react';
import fetch from 'node-fetch';

class DogApi extends React.Component {
  constructor() {
    super()
    this.state = {
      dogUrl: '',
    }
  }
  async buscaDog(url) {
    const requestHead = { headers: { Accept: 'application/json'} };
    const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random', requestHead);
    const requestObject = await requestReturn.json();
    this.setState({ dogUrl: requestObject });
  }
  
  componentDidMount() {
    this.buscaDog();  
  }

  renderDog() {
    return (
      <img src={this.state.dogUrl} alt="dog lindo"/>
    )
  }

  render() {
    const { dogUrl } = this.state;
    const renderLoading = <span>Loading...</span>
    return(
      <div>
        { dogUrl ? <img src={ dogUrl.message } alt="dog lindo" /> : renderLoading }
      </div>
    );
  }
}

export default DogApi;
