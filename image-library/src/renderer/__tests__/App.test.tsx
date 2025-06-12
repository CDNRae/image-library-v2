import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from '../App';

test('renders hello message', () => {
  render(<App />);
  const element = screen.getByText(/hello/i);
  expect(element).toBeInTheDocument();
});
