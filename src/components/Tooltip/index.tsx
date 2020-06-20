import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  // Passo para o tooltip que ele vai poder receber uma estilização de um elemento superior
  // Ele é estilizado no styles do input
  className?: string; // Preciso desse classname pq o styled-component usa as classes para a estilização, então eu coloco o classname
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
