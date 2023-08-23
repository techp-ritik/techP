import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './Signin';

test('render login page',()=>{
  const component=render(<SignIn/>)
  const child =component.getByLabelText("Sign In")
  expect(child).toBeInTheDocument();
})
