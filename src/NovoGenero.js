import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const NovoGenero = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
      .post('/api/genres', {
        name: name,
      })
      .then(res => {
        setSuccess(true)
      })
  }

  if (success) {
    return (<Redirect to="/generos" />)
  }

  return (
    <div className="container">
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Nome do Gênero</Label>
          <Input type="text" onChange={onChange} name="novo-genero" id="novo-genero" placeholder="Digite o gênero" />
        </FormGroup>
        <Button outline color="primary" onClick={save}>Salvar</Button>{' '}
      </Form>
    </div>)
}

export default NovoGenero;