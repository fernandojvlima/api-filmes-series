import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label, Badge, Form, Input, FormGroup, Button } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  });

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  const save = item => {
    console.log('save')
  }

  const onChange = () => {
    console.log('onChange')
  }

  //custom header
  const masterHeader = {
    height: '50vh',
    min: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className='col-3'>
                <img className="img-fluid img-thumbnail" alt={data.name} src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'> {data.name}</h1>
                <div className="lead text-white">
                  <Badge color="success">Assistido </Badge>{' '}
                  <Badge color="secondary">Para assistir</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <br />
      <div className="container">
        <Form>
          <FormGroup>
            <Label htmlFor="nomeSerie">Nome da Serie</Label>
            <Input type="text" value={data.name} onChange={onChange} id="name" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Comentários</Label>
            <Input type="textarea" onChange={onChange} name="comments" id="comments" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Gênero</Label>
            <Input type="select" name="genero" id="genero">
              <option>1</option>
              <option>2</option>
            </Input>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Status</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Assistido
            </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Para assistir
            </Label>
            </FormGroup>
          </FormGroup>
          <Button outline color="primary" onClick={save} >Salvar</Button>
        </Form>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </div>
  )

}

export default InfoSerie;