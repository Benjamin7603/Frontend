import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';

// MOCK: Simulamos la respuesta del servidor para que el test no falle por conexión
jest.mock('../services/userService', () => ({
  loginUser: jest.fn(() => Promise.resolve(null)) // Simula login fallido
}));

describe('Componente: Login', () => {

  test('Permite al usuario escribir en los campos de email y contraseña', () => {
    render(<Login onPageChange={() => {}} />);
    
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Contraseña:');

    fireEvent.change(emailInput, { target: { value: 'test@usuario.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@usuario.com');
    expect(passwordInput.value).toBe('123456');
  });

  // 👇 AQUÍ ESTÁ EL CAMBIO CLAVE: "async"
  test('Muestra un mensaje de error si las credenciales son incorrectas', async () => { 
    const mockOnPageChange = jest.fn();

    render(<Login onPageChange={mockOnPageChange} />);

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Contraseña:');
    const loginButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

    fireEvent.change(emailInput, { target: { value: 'usuario_malo@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password_incorrecta' } });

    fireEvent.click(loginButton);

    // 👇 AQUÍ ESTÁ EL OTRO CAMBIO: "await screen.findByText"
    expect(await screen.findByText('Credenciales incorrectas. Intente nuevamente.')).toBeInTheDocument();

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

});