import React from 'react';
import fetch from 'node-fetch';

class DogApi extends React.Component {
  constructor() {
    super()

    this.buscaDog = this.buscaDog.bind(this);
    this.salvaDog = this.salvaDog.bind(this);
    this.renderDog = this.renderDog.bind(this);

    this.state = {
      dogObj: undefined,
      savedDogs: [],
      loading: true,
      terrier: false,
    }
  }

  async buscaDog() {
    this.setState({loading: true}, async () => {
      const requestHead = { headers: { Accept: 'application/json'} };
      const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random', requestHead);
      const requestObject = await requestReturn.json();
      if (requestObject.message.includes('terrier')) {
        this.setState({ dogObj: '', terrier: true, loading: false, })
      } else {
        this.setState({ 
          dogObj: requestObject,
          loading: false,
          terrier: false,
        });
        const dogUrl = this.state.dogObj.message;
        localStorage.setItem('urlDog', dogUrl);
        alert(`Vem aí um lindo: ${dogUrl.split('/')[4]}`)
      }
    })
  }

  salvaDog() {
    this.setState(({ savedDogs, dogObj }) => ({
      savedDogs: [...savedDogs, dogObj]
    }))

    this.buscaDog();
  }
  
  componentDidMount() {
    this.buscaDog();
  }

  renderDog() {
    return (
      <div>
        <img src={this.state.dogObj.message} alt="dog lindo"/>
        <button type="button" onClick={this.salvaDog}>Buscar novo Dog</button>
      </div>
    )
  }

  render() {
    const { loading, terrier } = this.state;
    const renderLoading = <span>Loading...</span>
    return(
      <div>
        { loading ? renderLoading : this.renderDog() }
        <p>{terrier ? 'Imagem indisponível: Animal violento!!' : false}</p>
      </div>
      
    );
  }
}

export default DogApi;
