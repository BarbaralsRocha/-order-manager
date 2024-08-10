import React from 'react';
import { Box, Card, Grid, Skeleton } from '@mui/material';

const OrderListSkeleton: React.FC = () => {
  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Skeleton variant="rectangular" width={210} height={22} />
        <Skeleton variant="rectangular" width={80} height={22} />
      </Box>

      <Grid
        container
        sx={{ p: 2 }}
        spacing={2}
        rowSpacing={2}
        direction="column"
      >
        <Grid item>
          <Skeleton variant="rectangular" width={500} height={22} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" width={500} height={22} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" width={500} height={22} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" width={500} height={22} />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, gap: 2 }}>
        <Skeleton variant="rectangular" width={80} height={22} />
        <Skeleton variant="rectangular" width={80} height={22} />
      </Box>
    </Card>
  );
};

export default OrderListSkeleton;
