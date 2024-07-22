import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  OrderManagerSectionType,
  OrderManagerSectionValue,
} from '../types/OrderManagerSection.type';
import { INITIAL_VALUES_ORDERS } from './Order.constant';
import type * as Yup from 'yup';
import validationSchemaOrders from '../../Orders/validationSchemaOrders';
import validationSchemaCustomer from '../../Customers/validationSchemaCustomer';
import validationSchemaProduct from '../../Products/validationSchemaProduct';
import OrderRegister from '../../Orders/OrderRegister';

export const ColumnItems: {
  id: OrderManagerSectionType;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    id: 'orders',
    label: 'Encomendas',
    icon: <CalendarMonthIcon />,
  },
  {
    id: 'customers',
    label: 'Clientes',
    icon: <PersonIcon />,
  },
  {
    id: 'products',
    label: 'Produtos',
    icon: <ShoppingCartIcon />,
  },
];

export const ManageOrders: Record<
  OrderManagerSectionType,
  OrderManagerSectionValue
> = {
  customers: 'Clientes',
  orders: 'Encomendas',
  products: 'Produtos',
};

export const ConfigButton: Record<
  OrderManagerSectionType,
  {
    label: string;
    initialValues: object;
    validationSchema: Yup.AnyObjectSchema;
    component: JSX.Element;
    titleRegister: string;
  }
> = {
  customers: {
    label: 'ADICIONAR CLIENTE',
    titleRegister: 'Cadastro de cliente',
    initialValues: {},
    validationSchema: validationSchemaCustomer,
    component: <div>customers</div>,
  },
  orders: {
    label: 'ADICIONAR ENCOMENDA',
    titleRegister: 'Cadastro de encomenda',
    initialValues: INITIAL_VALUES_ORDERS,
    validationSchema: validationSchemaOrders,
    component: <OrderRegister />,
  },
  products: {
    label: 'ADICIONAR PRODUTO',
    titleRegister: 'Cadastro de produto',
    initialValues: {},
    validationSchema: validationSchemaProduct,
    component: <div>products</div>,
  },
};
