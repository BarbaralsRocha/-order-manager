// SearchInput.style.tsx
import styled, { css } from 'styled-components';

interface ISearchInputProps {
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  value?: string;
}

const sizeStyles = {
  sm: css`
    height: 40px;
    font-size: 14px;
  `,
  md: css`
    height: 48px;
    font-size: 16px;
    padding: 0px;
  `,
  lg: css`
    height: 64px;
    font-size: 18px;
  `,
};

const disabledStyles = css`
  background-color: #f0f0f0;
  color: #cccccc;
  cursor: not-allowed;
`;

export const SearchInput = styled.div<ISearchInputProps>`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  transition:
    border-color 0.3s,
    background-color 0.3s;

  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ disabled }) => disabled && disabledStyles}

  .icon-left {
    margin-right: 8px;
    font-family: 'Material Symbols Outlined';
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    padding-left: 8px;
  }

  .icon-right {
    margin-right: 8px;
    font-family: 'Material Symbols Outlined';
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    cursor: pointer;
  }

  .input-container {
    position: relative;
    width: 100%;
    height: 100%;

    input {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      padding-left: 16px;
      padding-top: 16px;
      padding-right: ${({ size }) =>
        size === 'sm' ? '36px' : size === 'md' ? '40px' : '44px'};
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      position: relative;

      &:focus {
        outline: none;
      }

      &:focus + .placeholder,
      &:not(:placeholder-shown) + .placeholder {
        top: 16px;
        left: 16px;
        font-size: 12px;
        color: #000;
      }
    }

    .placeholder {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      color: #b8b8b8;
      pointer-events: none;
      transition: all 0.3s;
    }

    .has-value {
      top: 12px;
      font-size: 12px;
      color: #000;
    }
  }

  &:focus-within {
    outline: none;
    border-bottom: 2px solid #000;
  }
`;
