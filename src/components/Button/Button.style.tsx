// Button.style.tsx
import styled, { css } from 'styled-components';

interface IButtonProps {
  type?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const sizeStyles = {
  sm: css`
    height: 32px;
    font-size: 12px;
  `,
  md: css`
    height: 48px;
    font-size: 14px;
  `,
  lg: css`
    height: 64px;
    font-size: 16px;
  `,
};

const typeStyles = {
  primary: css`
    background-color: #fbc105;
    color: #000;
    border: none;
    &:hover {
      background-color: #ffe799; /* Cor de fundo no hover para primary */
      color: #000;
    }
  `,
  secondary: css`
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    &:hover {
      background-color: #f0f0f0;
      color: #000;
      border: 2px solid #fff;
    }
  `,
  ghost: css`
    background-color: transparent;
    color: #000;
    border: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #000;
    }
  `,
};

const disabledStyles = css`
  background-color: rgb(204, 204, 204);
  color: rgb(102, 102, 102);
  border: none;
  cursor: not-allowed;
`;

export const Button = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: bold;
  font-family: inherit;
  letter-spacing: 1px;

  ${({ size = 'sm' }) => sizeStyles[size]}
  ${({ type = 'primary' }) => typeStyles[type]}
  ${({ disabled }) => disabled && disabledStyles}

  .icon {
    margin-right: 8px;
    font-family: 'Material Symbols Outlined';
    font-weight: 700;
    font-style: normal;
    font-size: 32px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }

  .label {
    font-family: Roboto;
  }

  &:disabled {
    /* Adiciona estilos adicionais se necessário quando o botão está desabilitado */
  }
`;
