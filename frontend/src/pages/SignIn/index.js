import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
});

export default function SignIn() {
  function handleSubmit(data) {
    console.log(data);
    
  }

  return (
    <>
      <h1>Entrar na sua conta</h1>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );
}