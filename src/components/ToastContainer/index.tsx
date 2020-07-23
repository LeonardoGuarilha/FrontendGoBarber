import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  // O primeiro parametro seria as minhas mensagems
  // O segundo parametro é uma função que retorna um campo único das minhas mensagens
  // E o terceiro paramentro seria um objeto com as minhas animações
  const messageWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  );

  return (
    <Container>
      {messageWithTransitions.map((
        { item, key, props } // Esse map vai recebe um objeto(que eu desestruturei), dentro do props tem a estilizacao, o item é a mensagem
      ) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
