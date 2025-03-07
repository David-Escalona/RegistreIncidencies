import { useState } from 'react';

function Registro() {
  const [email, setEmail] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [missatge, setMissatge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuaris = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
    const usuariExisteix = usuaris.some(usuari => usuari.email === email);

    if (usuariExisteix) {
      setMissatge('Aquest usuari ja està registrat.');
      return;
    }

    const nouUsuari = { email, contrasenya };
    usuaris.push(nouUsuari);
    localStorage.setItem('dades_usuaris', JSON.stringify(usuaris));

    setMissatge('Registre completat amb èxit!');
    setEmail('');
    setContrasenya('');
  };

  return (
    <div>
      <h2>Registre</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label>Contrasenya:</label>
        <input 
          type="password" 
          value={contrasenya} 
          onChange={(e) => setContrasenya(e.target.value)} 
          required 
        />

        <button type="submit">Registrar</button>
      </form>
      {missatge && <p>{missatge}</p>}
    </div>
  );
}

export default Registro;
