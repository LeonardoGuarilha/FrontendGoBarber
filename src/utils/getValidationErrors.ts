import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // falo que os dois lados da chave tem que ser uma string
  // Ele vai me retornar um objeto. Ex: { nome: 'O nome é obrigatório' }
}

export default function getValidationErrors(err: ValidationError): Errors {
  // Declaro uma variável com o tipo Erros e inicio ela como vazia
  const validationErrors: Errors = {};

  // percorro os meus erros, os meus erros estão dentro do inner que é um array
  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
