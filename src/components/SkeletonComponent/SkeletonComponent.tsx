import React, { ReactNode } from 'react';
import { Skeleton } from '@mui/material';

interface IProps {
  width: number;
  height: number;
  loading: boolean;
  children: ReactNode;
  variant?: 'rectangular' | 'text' | 'rounded' | 'circular';
}

const SkeletonComponent: React.FC<IProps> = ({
  width,
  height,
  loading,
  children,
  variant = 'rounded',
}) => {
  if (loading) {
    return <Skeleton width={width} height={height} variant={variant} />;
  }
  return <>{children}</>;
};

export default SkeletonComponent;
