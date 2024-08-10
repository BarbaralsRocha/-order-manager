import { TextField } from '@mui/material';
import React from 'react';
// import * as S from './Filters.style.tsx';

interface IProps {
  label: string;
  valueSearch?: string;
}

const Filters: React.FC<IProps> = ({ label, valueSearch }) => {
  return (
    <div>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={valueSearch}
        sx={{
          width: 300,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'neutral.dark.contrastText', // Cor quando em foco
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: 'neutral.dark.contrastText', // Cor da label quando em foco
            },
          },
        }}
      />
    </div>
  );
};

export default Filters;
