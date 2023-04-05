import React from 'react';
import { render, screen } from '@testing-library/react';
import SliderFunction from './slider';

describe('SliderFunction component', () => {
  it('should render carousel items', () => {
    render(<SliderFunction />);
    const item1 = screen.getByAltText('First slide');
    expect(item1).toBeInTheDocument();
    const item2 = screen.getByAltText('Second slide');
    expect(item2).toBeInTheDocument();
    const item3 = screen.getByAltText('Third slide');
    expect(item3).toBeInTheDocument();
  });

  it('should render carousel captions', () => {
    render(<SliderFunction />);
    const caption1 = screen.getByText('Feu Vert');
    expect(caption1).toBeInTheDocument();
    const caption2 = screen.getByText('Norauto');
    expect(caption2).toBeInTheDocument();
    const caption3 = screen.getByText('Speedy');
    expect(caption3).toBeInTheDocument();
  });
});