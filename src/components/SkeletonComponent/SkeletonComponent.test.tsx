import React from 'react';
import { render } from '@testing-library/react';
import SkeletonComponent from './SkeletonComponent';

test('renders SkeletonComponent', () => {
  render(
    <SkeletonComponent height={100} width={100} variant="rectangular" loading>
      <div>teste</div>
    </SkeletonComponent>,
  );
});
