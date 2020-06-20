import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// isPrivate é para dizer que é uma rota autenticada
// Explicação do isPrivate === !!user. o !!user  é se o user não existe
// Rota privada: true / usuário autenticado: true = Ok
// Rota privada: true / usuário autenticado: false = Redireciona para o login
// Rota privada: false / usuário autenticado: true = Redireciona para o Dashboard
// Rota privada: false / usuário autenticado: false = Ok

// ...rest, todas as propriedades do componente
// A propriedade "render" do ReactDOMRoute eu consigo modificar a logistica pra mostrar uma rota em tela, pra mostrar um componente
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest} // Esse ...rest são todas as propriedades que eu recebo
      render={({ location }) => {
        // se a rota for privada e o usuário não estiver altenticado, vai para a rota de login
        // Se a rota ser privada é igual ao usuário autenticado
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }, // para não perder o histórico, vai garantir que eu não perca o histórico de acesso as rotas
            }}
          />
        );
      }}
    />
  );
};

export default Route;
