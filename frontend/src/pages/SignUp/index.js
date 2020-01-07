import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

const schema = Yup.object().shape({
  name: Yup.string().required('A nome é obrigatório'),
  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória').min(6, 'A senha precisa conter no mínimo 6 caracteres')
});

export default function SignUp() {
  function handleSubmit(data) {
    console.log(data);
    
  }

  return (
    <>
      <h1>Criar a sua conta</h1>
      <Form schema ={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Criar</button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
