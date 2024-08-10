import { Box, Tab, Tabs } from '@mui/material';
import { OrderSectionType } from '../utils/types/Order.type';
import { useMemo, useState } from 'react';
import OrderList from './OrderList';
import OrderCustomers from './OrderCustomers';
import OrderProducts from './OrderProducts';
import { OrdersEnum } from '../utils/enum/Order.enum';
import { OrderSection } from '../utils/constants/Order.constant';

const OrdersContainer: React.FC = () => {
  const [tabSelected, setTabSelected] = useState<OrderSectionType>(
    OrdersEnum.ORDERS,
  );

  const renderComponentSelected = useMemo(
    () => ({
      [OrdersEnum.ORDERS]: <OrderList />,
      [OrdersEnum.ORDERS_CUSTOMERS]: <OrderCustomers />,
      [OrdersEnum.ORDERS_PRODUCTS]: <OrderProducts />,
    }),
    [],
  );

  return (
    <Box sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabSelected}
          onChange={(_, newValue: OrderSectionType) => setTabSelected(newValue)}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'uppercase',
              minWidth: 120,
              '&.Mui-selected': {
                color: 'neutral.dark.contrastText',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'neutral.dark.contrastText',
            },
          }}
        >
          <Tab label={OrderSection.orders} value={OrdersEnum.ORDERS} />
          <Tab
            label={OrderSection.customers}
            value={OrdersEnum.ORDERS_CUSTOMERS}
          />
          <Tab
            label={OrderSection.products}
            value={OrdersEnum.ORDERS_PRODUCTS}
          />
        </Tabs>
      </Box>
      {renderComponentSelected[tabSelected]}
    </Box>
  );
};

export default OrdersContainer;
