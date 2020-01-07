import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

export default function SignUp() {
  function handleSubmit(data) {

  }
  
  return (
    <>
      <h1>Criar a sua conta</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Criar</button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
