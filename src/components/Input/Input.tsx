import React from 'react';
import * as S from './Input.style';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  iconLeft?: string;
  iconRight?: string;
  onActionIconClick?: () => void;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<IProps> = ({
  size,
  placeholder,
  iconLeft,
  iconRight,
  onActionIconClick,
  disabled,
  value,
  onChange,
}) => {
  return (
    <S.SearchInput size={size} disabled={disabled} value={value}>
      {iconLeft && <span className="icon-left">{iconLeft}</span>}
      <div className="input-container">
        <input type="text" value={value} onChange={onChange} placeholder=" " />
        {placeholder && (
          <span className={`placeholder ${value ? 'has-value' : ''}`}>
            {placeholder}
          </span>
        )}
      </div>
      {iconRight && (
        <span className="icon-right" onClick={onActionIconClick}>
          {iconRight}
        </span>
      )}
    </S.SearchInput>
  );
};

export default SearchInput;
