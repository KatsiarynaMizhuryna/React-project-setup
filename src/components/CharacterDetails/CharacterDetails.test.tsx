import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';
import character from '../../__ tests __/mock_data';

describe('CharacterDetails', () => {
  test('renders character image', () => {
    render(<CharacterDetails character={character} />);

    const image = screen.getByAltText('Character 1');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', character.image);
  });

  test('renders character name', () => {
    render(<CharacterDetails character={character} />);

    const name = screen.getByText(/Name:/);
    expect(name).toBeInTheDocument();
    expect(screen.getByText('Character 1')).toBeInTheDocument();
  });

  test('renders character status', () => {
    render(<CharacterDetails character={character} />);

    const status = screen.getByText(/Status:/);
    expect(status).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  test('renders character species', () => {
    render(<CharacterDetails character={character} />);

    const species = screen.getByText(/Species:/);
    expect(species).toBeInTheDocument();
    expect(screen.getByText('species 1')).toBeInTheDocument();
  });

  test('renders character gender', () => {
    render(<CharacterDetails character={character} />);

    const gender = screen.getByText(/Gender:/);
    expect(gender).toBeInTheDocument();
    expect(screen.getByText('string')).toBeInTheDocument();
  });

  test('renders character last known location', () => {
    render(<CharacterDetails character={character} />);

    const location = screen.getByText(/Last Known Location:/);
    expect(location).toBeInTheDocument();
    expect(screen.getByText('location1')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'location1' })).toHaveAttribute(
      'href',
      'location1'
    );
  });
});
