import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

// Seria a interface igual a do Input, mas aqui eu não vou sobreescrever nenhuma propriedade
// Então eu posso fazer assim
// Esse botão recebe todas as propriedades de um botão e mais o que eu quiser
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// o ...rest eu coloco todas as propriedades menos o childres, nessa variável rest, seria o props
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
