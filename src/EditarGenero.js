import React, { useState, useEffect } from 'react';
import { Form, Label, FormGroup, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const EditarGenero = ({ match }) => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axios
      .get('/api/genres/' + match.params.id)
      .then(res => {
        setName(res.data.name)
      })
  }, [match.params.id])


  const onChange = evt => {
    setName(evt.target.value)
  }

  const save = () => {
    axios
      .put('/api/genres/' + match.params.id, {
        name: name
      })
      .then(res => {
        setSuccess(true);
      })
  }

  if (success) {
    return (
      <Redirect to="/generos" />
    )
  }

  return (
    <div className="container">
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Editar do Gênero</Label>
          <Input type="text" onChange={onChange} value={name} id="name" />
        </FormGroup>
        <Button outline color="primary" onClick={save} >Salvar</Button>{' '}
      </Form>
    </div>)
}

export default EditarGenero;