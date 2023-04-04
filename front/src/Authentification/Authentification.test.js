import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Authentification from './Authentification';

describe('Authentification', () => {
  it('should switch to the registration tab when clicking on the registration button', () => {
    const { getByText, getByRole } = render(<Authentification />);
    const registrationButton = getByText('S\'enregistrer');
    fireEvent.click(registrationButton);
    const registrationTab = getByRole('tabpanel', { name: 'S\'enregistrer' });
    expect(registrationTab).toHaveClass('show');
  });

  it('should switch to the login tab when clicking on the login button', () => {
    const { getByText, getByRole } = render(<Authentification />);
    const loginButton = getByText('Connexion');
    fireEvent.click(loginButton);
    const loginTab = getByRole('tabpanel', { name: 'Connexion' });
    expect(loginTab).toHaveClass('show');
  });

  it('should display the email input field on the login tab', () => {
    const { getByLabelText, getByRole } = render(<Authentification />);
    const emailInput = getByLabelText('Email');
    const loginTab = getByRole('tabpanel', { name: 'Connexion' });
    expect(emailInput).toBeInTheDocument();
    expect(loginTab).toHaveClass('show');
  });

  it('should display the name input field on the registration tab', () => {
    const { getByLabelText, getByRole } = render(<Authentification />);
    const nameInput = getByLabelText('Nom');
    const registrationTab = getByRole('tabpanel', { name: 'S\'enregistrer' });
    expect(nameInput).toBeInTheDocument();
    expect(registrationTab).toHaveClass('show');
  });
});
