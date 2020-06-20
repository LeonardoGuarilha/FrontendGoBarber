import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

// Todas as propriedades que um input pode ter
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Sobreescrevo algumas propriedades do InputHTMLAttributes. Coloco o nome como obrigatorio
  name: string;
  containerStyle?: object;
  // Quando eu quero receber um componente como uma propriedade.
  // O icone é opcional
  icon?: React.ComponentType<IconBaseProps>;
}
// o ...rest eu coloco todas as propriedades menos o icon, nessa variável rest, seria o props
// icon: Icon, troco o nome de icon para Icon
const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  // Faço uma referência do meu input, o HTMLInputElement que eu passo como parâmetro de tipagem vai dizer
  // que a minha referência está armazenando a referência de um input
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // com o useCallback, eu crio a função dentro do componente que não é recriada na memória toda vez que o componente atualiza
  // Ele só é criado novamente se a variável que eu passar para o array de dependência for atualizada
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // o inputRef me da acesso direto ao input
    // Vejo se o meu inputRef tem algum valor, pq eu criei ele como null, então é current?
    // Transformo o valor em boolean !!inputRef.current?.value
    // Se tiver valor, vai ser true senão vai ser false
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Assim que o componente for exibido em tela, eu faço o registro no unform
  // Com isso, ele vai ter os dados do form, sem eu precisar criar um estado para cada input
  // Basicamente, ele foi em cada um dos inputs, pegou a referencia deles(o elemento na DOM) e acessou a propriedade value
  // E me retorunou o nome que eu coloquei no fieldName
  // O fieldName é o nome que eu digito no input, a ref é o que da acesso a input no html e o path é onde ele vai buscar o valor, ex: meu_componente.value
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value', // de onde que de dentro da referência o unform vai buscar o valor
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus} // recebeu o foco
        onBlur={handleInputBlur} // perdeu o foco
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
