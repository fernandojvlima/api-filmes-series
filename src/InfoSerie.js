import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label, Badge, Form, Input, FormGroup, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  });
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState({});
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([])

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres/')
      .then(res => {
        setGenres(res.data.data)
      })
  }, [])

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const onChangeGender = evt => {
    setGenreId(evt.target.value)
  }

  const save = () => {
    axios
      .put('/series' + match.params.id, {
        ...form,
        genre: genreId
      })
      .then(res => {
        setSuccess(true)
      })
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

  if (success) {
    return (
      <Redirect to="/series" />
    )
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
            <Label htmlFor="exampleText">Comentários</Label>
            <Input type="textarea" value={form.comments} onChange={onChange('comments')} name="comments" id="comments" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="exampleSelect">Gênero</Label>
            <Input type="select" onChangeGender={onChangeGender} name="genero" id="genero">
              {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
            </Input>
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Status</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" value="ASSISTIDO" onChange={onChange('ASSISTIDO')} id="assistido" name="status" checked={form.status === 'ASSISTIDO'} />{' '}
                Assistido
            </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input type="radio" value="PARA_ASSISTIR" onChange={onChange('PARA_ASSISTIR')} id="paraAssistir" name="status" checked={form.status === 'PARA_ASSISTIR'} />{' '}
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