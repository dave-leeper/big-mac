import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Check for required elements', () => {
  const { getByText } = render(<App />);
  const countryDisplay = getByText(/You are in/i);
  const inputField = getByText(/0/i);
  const submitButton = getByText(/Submit/i);
  expect(countryDisplay).toBeInTheDocument();
  expect(inputField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
