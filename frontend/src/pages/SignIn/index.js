import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

export default function SignIn() {
  function handleSubmit(data) {
    
  }

  return (
    <>
      <h1>Entrar na sua conta</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );
}
