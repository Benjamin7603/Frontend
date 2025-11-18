import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../components/layout/Header';



describe('Componente: Header', () => {

  test('Se renderiza correctamente sin crashear', () => {
    render(
      <Header 
        currentPage="inicio" 
        onPageChange={() => {}} 
        cartCount={0} 
        onCartToggle={() => {}} 
      />
    );
  });

  test('Muestra el título/logo "TechStore"', () => {
    render(
      <Header 
        currentPage="inicio" 
        onPageChange={() => {}} 
        cartCount={0} 
        onCartToggle={() => {}} 
      />
    );
    expect(screen.getByText('TechStore')).toBeInTheDocument();
  });

});