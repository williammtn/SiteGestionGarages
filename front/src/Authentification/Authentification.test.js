import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Authentification from './Authentification';

describe('Authentification', () => {
  it('should switch to the registration tab when clicking on the registration button', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Authentification />
      </MemoryRouter>
    );
    const registrationButton = getByText('S\'enregistrer');
    fireEvent.click(registrationButton);
    const registrationTab = getByRole('tabpanel', { name: 'S\'enregistrer' });
    expect(registrationTab).toHaveClass('show');
  });
});