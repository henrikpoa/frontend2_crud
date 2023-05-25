import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';

const url = 'http://localhost:8080/users';

function Home() {
  const [users, setUsers] = useState([]);
  const { data: items, httpConfig, loading, error} = useFetch(url);

  // 1 - resgatando dados  
  useEffect(() =>{
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    };

    fetchData();
  }, []);  

  const handleRemove = (id) => {
    httpConfig(id, 'DELETE');
    if (!error) {Swal.fire('Usuário Excluído')};
  };

  const showUserCreateBox = () => {
    Swal.fire({
      title: 'Criar Usuário',
      html:
        '<input id="id" type="hidden">' +
        '<input id="name" class="swal2-input" placeholder="Nome">' +
        '<input id="email" class="swal2-input" placeholder="Email">' +
        '<input id="phone" class="swal2-input" placeholder="Telefone">' +
        '<input id="password" class="swal2-input" placeholder="Senha">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    });   
  };

  const userCreate = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const user = {
      name, email, password, phone,
    };
        
    httpConfig(user, 'POST');
    if (!error) {Swal.fire('Usuário Criado')};
  };

  const showEditUserBox = (id) => {    
    console.log(id);
    const url = 'http://localhost:8080/users/'+id;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
        const objects = JSON.parse(this.responseText);        
        console.log(objects);
        console.log(objects.name);
        Swal.fire({
          title: 'Edit User',
          html:
            '<input id="id" type="hidden" value='+objects.id+'>' +
            '<input id="name" class="swal2-input" placeholder="Nome" value="'+objects.name+'">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="'+objects.email+'">' +
            '<input id="phone" class="swal2-input" placeholder="Telefone" value="'+objects.phone+'">' +
            '<input id="password" class="swal2-input" placeholder="Senha" value="'+objects.password+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })        
      }
    };
  };

  const userEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const user = {
      id, name, email, password, phone
    };   
    
    httpConfig(user, 'PUT');    
    if (!error) {Swal.fire('Usuário Atualizado')};
    
    user.id = '';
    user.name = '';
    user.email = '';
    user.password = '';
    user.phone = '';
  };

  return (
    <div className={styles.home}>   
      <h1>Lista de Usuários</h1>
      <button onClick={() => showUserCreateBox()}>Create</button>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ação</th>
        </tr>
      </thead>
      {!error && <tbody>
      {items && items.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td><button onClick={()=> handleRemove(user.id)}>Excluir</button>
          <button onClick={()=> showEditUserBox(user.id)}>Editar</button>
          </td>
          
        </tr>
      ))}
      </tbody>}
      </Table>
    </div>
  );
};

export default Home;