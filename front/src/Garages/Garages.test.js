import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Garage from './Garages';

describe('Garage', () => {
  it('renders garage cards', async () => {
    // Define a fake garages array for testing
    const garages = [
      {
        garage_id: 1,
        garage_name: 'Garage A',
        garage_mechanics: true,
        garage_body: false,
        garage_address: '123 Main St',
        garage_zipcode: '12345',
        garage_city: 'Anytown',
      },
      {
        garage_id: 2,
        garage_name: 'Garage B',
        garage_mechanics: false,
        garage_body: true,
        garage_address: '456 Oak St',
        garage_zipcode: '54321',
        garage_city: 'Otherville',
      },
    ];

    const getByTextContents = (container, ...texts) => {
      return Array.from(container.querySelectorAll('*')).find(element => {
        return texts.every(text => element.textContent.includes(text))
      })
    }

    // Mock the fetch function to return the fake garages array
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(garages),
      })
    );

    const { getByText, queryByText, container } = render(<Garage />);

    // Wait for the garages to be loaded
    await waitFor(() => getByText('Garage A'));

    // Check that the garages are rendered with their information
    expect(getByText('Garage A')).toBeInTheDocument();
    const element1 = getByTextContents(container, 'Mécanique', 'Oui');
    expect(element1).toBeInTheDocument();
    const element2 = getByTextContents(container, 'Carrosserie', 'Non');
    expect(element2).toBeInTheDocument();
    const element3 = getByTextContents(container, 'Adresse', '123 Main St');
    expect(element3).toBeInTheDocument();
    const element4 = getByTextContents(container, 'Code Postal et Ville', '12345 Anytown');
    expect(element4).toBeInTheDocument();

    expect(getByText('Garage B')).toBeInTheDocument();
    const element5 = getByTextContents(container, 'Mécanique', 'Non');
    expect(element5).toBeInTheDocument();
    const element6 = getByTextContents(container, 'Carrosserie', 'Oui');
    expect(element6).toBeInTheDocument();
    const element7 = getByTextContents(container, 'Adresse', '456 Oak St');
    expect(element7).toBeInTheDocument();
    const element8 = getByTextContents(container, 'Code Postal et Ville', '54321 Otherville');
    expect(element8).toBeInTheDocument();
  });
});