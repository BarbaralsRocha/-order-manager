// Button.tsx
import React from 'react';
import * as S from './Button.style';

interface IProps {
  children?: string;
  icon?: string;
  type?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({
  children,
  icon,
  type = 'primary',
  size = 'sm',
  onClick,
  disabled,
}) => {
  return (
    <S.Button type={type} size={size} onClick={onClick} disabled={disabled}>
      {icon && <span className="icon">{icon}</span>}
      {children && <span className="label">{children}</span>}
    </S.Button>
  );
};

export default Button;
