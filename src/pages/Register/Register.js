import styles from './Register.module.css';

import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';

const url = 'http://localhost:8080/users';

const Register = () => {
  const [users, setUsers] = useState([]);

  const { data: items, httpConfig, loading, error} = useFetch(url);

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const[phone, setPhone] = useState("");
  const[errorRegister, setErrorRegister] = useState("");
  
  // add users
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorRegister('');

    const user = {
      name, email, password, phone, confirmPassword,
    };

    if(password !== confirmPassword) {
      setErrorRegister("As senhas precisam ser iguais!");
      return;
    };
   
    httpConfig(user, 'POST');

    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setConfirmPassword('');
  };
  
    
  return (
  <div className={styles.register}>
    <h1>Cadatro de Usuário</h1>
    <form onSubmit={handleSubmit}>
    <label>
        <span>Nome:</span>
        <input 
          type="text" 
          name='name' 
          value={name}
          onChange={(e)=> setName(e.target.value)} 
          required 
          placeholder='Nome do usuário'/>
      </label>
      <label>
        <span>E-mail:</span>
        <input 
          type="email" 
          name='email' 
          value={email}
          required 
          onChange={(e)=> setEmail(e.target.value)}
          placeholder='E-mail do usuário'/>
      </label>
      <label>
        <span>Senha:</span>
        <input 
          type="password" 
          autoComplete='passord'
          name='password' 
          value={password}
          required 
          onChange={(e)=> setPassword(e.target.value)}
          placeholder='Insira a sua senha'/>
      </label>
      <label>
        <span>Confirmação de senha:</span>
        <input 
        type="password" 
        autoComplete='passord'
        name='confirmPassword' 
        value={confirmPassword}
        required 
        onChange={(e)=> setConfirmPassword(e.target.value)}
        placeholder='Confirme a sua senha'/>
      </label>      
      {loading && <button disabled className='btn'>Aguardar</button>}
      {!loading && <button className='btn'>Cadastrar</button>}
      {errorRegister && <p className='error'>{errorRegister}</p>}
    </form>
    </div>
  );
};

export default Register;