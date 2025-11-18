import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from '../pages/Login';


describe('Componente: Login', () => {

  test('Permite al usuario escribir en los campos de email y contraseña', () => {
    render(<Login onPageChange={() => {}} />);
    
    // Buscamos los campos por su "etiqueta"
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Contraseña:');

    // Simulamos al usuario escribiendo
    fireEvent.change(emailInput, { target: { value: 'test@usuario.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Verificamos que el texto está en los campos
    expect(emailInput.value).toBe('test@usuario.com');
    expect(passwordInput.value).toBe('123456');
  });


  test('Muestra un mensaje de error si las credenciales son incorrectas', () => {
    // Definimos una función "mock" para onPageChange
    const mockOnPageChange = jest.fn();

    render(<Login onPageChange={mockOnPageChange} />);

    //Buscamos los campos y el botón
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Contraseña:');
    const loginButton = screen.getByRole('button', { name: 'Iniciar Sesión' });

    // Escribimos credenciales incorrectas
    fireEvent.change(emailInput, { target: { value: 'usuario_malo@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password_incorrecta' } });

    // Simulamos el clic en el botón
    fireEvent.click(loginButton);

    // Verificamos que el mensaje de error aparezca en pantalla
    // (Usamos getByText para encontrar el error que definiste en tu Login.jsx)
    expect(screen.getByText('Credenciales incorrectas. Intente nuevamente.')).toBeInTheDocument();

    // Verificamos que la función de cambiar de página NO fue llamada
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

});