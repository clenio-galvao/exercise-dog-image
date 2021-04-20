import React from 'react';
import fetch from 'node-fetch';

class DogApi extends React.Component {
  constructor() {
    super()

    this.buscaDog = this.buscaDog.bind(this);
    this.salvaDog = this.salvaDog.bind(this);
    this.renderDog = this.renderDog.bind(this);
    this.mudaName = this.mudaName.bind(this);

    this.state = {
      dogObj: '',
      loading: true,
      terrier: false,
      dogName: '',
      keyLocal: 0,
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
        // localStorage.setItem('urlDog', dogUrl);
        alert(`Vem aí um lindo: ${dogUrl.split('/')[4]}`)
      }
    })
  }

  salvaDog(event) {
    event.target.innerText = 'Dog Salvo';
    console.log(this.state.dogName)
    this.setState(({ dogObj, keyLocal }) => ({[keyLocal]: keyLocal + 1}),
      localStorage.setItem(keyLocal, dogObj.message))
  }

  mudaName(event) {
    this.setState({dogName: event.target.value})
  }

  renderDog() {
    return (
      <div>
        <form>
          <img src={this.state.dogObj.message} alt="dog lindo"/>
          <input type="text" placeholder="Dê um nome ao doginho" onChange={this.mudaName}></input>
          <button type="button" onClick={this.buscaDog}>Buscar novo Dog</button>
          <button type="button" onClick={this.salvaDog}>Salvar Dog</button>
        </form>
      </div>
    )
  }

  componentDidMount() {
    
      this.buscaDog();
    
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
