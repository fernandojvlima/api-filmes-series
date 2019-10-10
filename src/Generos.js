import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';



const Generos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const renderizaLinha = item => {
    return (<tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td><Button outline color="danger" onClick={() => deletaGenero(item.id)}>Deletar</Button>{' '}
        <Link to={"/generos/" + item.id}><Button outline color="secondary">Editar</Button></Link> </td>
    </tr>)
  }

  const deletaGenero = id => {
    axios
      .delete('/api/genres/' + id)
      .then(res => {
        const filtrado = data.filter(item => item.id !== id)
        setData(filtrado);
      })
  }


  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Gêneros</h1>
        <Button outline color="primary" tag={Link} to="/generos/novo">Novo gênero</Button>{' '}
        <Alert color="dark">
          Não foram encontrados gêneros cadastrados!
        </Alert>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Gêneros</h1>
      <Button outline color="primary" tag={Link} to="/generos/novo">Novo gênero</Button>{' '}
      <Table hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </Table>

      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default Generos;