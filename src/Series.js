import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


const Series = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data);
      })
  }, [])

  const deletaSerie = id => {
    axios
      .delete('/api/series/' + id)
      .then(res => {
        const filtrado = data.filter(item => item.id !== id)
        setData(filtrado)
      })
  }

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Séries</h1><br />
        <Link to="/series/novo" className="btn btn-primary">Nova Série</Link>
        <br />
        <div className="alert alert-warning" role="alert">
          Não existem séries cadastradas !
        </div>
      </div>
    )
  }

  const renderizaLinha = item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>
          <Button outline color="danger" onClick={() => deletaSerie(item.id)}>Deletar</Button>{' '}
          <Link to={'/series/' + item.id} ><Button outline color="secondary">Info</Button></Link>
        </td>
      </tr>
    )
  }

  return (
    <div className="container">
      <h1>Séries</h1><br />
      <Button outline color="primary" tag={Link} to="/series/novo">Nova Série</Button>{' '}
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

export default Series;