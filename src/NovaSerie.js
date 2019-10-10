import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const NovaSerie = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
      .post('/api/series', {
        name: name
      })
      .then(res => {
        setSuccess(true)
      })

  }

  if (success) {
    return (
      <Redirect to="/series" />
    )
  }

  return (
    <div className="container">
      <h1>Séries</h1><br />
      <Form>
        <FormGroup>
          <Label htmlFor="nomeSerie">Nome da Serie</Label>
          <Input type="text" value={name} onChange={onChange} id="name" placeholder="Digite o nome" />
        </FormGroup>
        <Button outline color="primary" onClick={save}>Salvar</Button>{' '}
      </Form>
    </div>)

}

export default NovaSerie;