import React, {useState} from 'react';
import api from './services/api'
import './App.css';

import logo from './assets/logo.svg';

function App() {
  // criando a costante para armazenar o email do input
  const [email, setEmail] = useState('');

  // criando função para fazer um post na requisião
   async function handleSubmit (event) {
    event.preventDefault();

    // enviando um post para api
    const response = await api.post('/sessions', {
      email: email
    })

    console.log(response);
    
  }

  return (
    <div className="container">
      <img src={logo} alt=""/>

      <div className="content">
        <p>
          Ofereça spots para programadores e encontre talentos para sua empresa
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" id="email" 
            placeholder="Seu e-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className="btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
