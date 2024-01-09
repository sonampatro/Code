import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('shuffles the deck when "Shuffle Deck" button is clicked', () => {
    const { getByText } = render(<App />);
    const shuffleButton = getByText('Shuffle Deck');
    fireEvent.click(shuffleButton);
  });

  test('draws the specified number of cards when input value changes', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('No. of Cards to be drawn');
    fireEvent.change(input, { target: { value: '5' } });
  });

  test('sorts the drawn cards when "Sort Drawn Cards" button is clicked', () => {
    const { getByText } = render(<App />);
    const sortButton = getByText('Sort Drawn Cards');
    fireEvent.click(sortButton);
  });
});
