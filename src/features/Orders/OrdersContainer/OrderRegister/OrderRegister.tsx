/* eslint-disable import/no-extraneous-dependencies */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as S from './OrderRegister.style';
import useDrawer from '../../../../hooks/useDrawer';
import {
  IOrder,
  IProductOrder,
  OrderValues,
} from '../../interfaces/IOrder.interface';
import {
  useGetCustomerListQuery,
  useGetProductsListQuery,
} from '../../redux/Orders.api';
import { INITIAL_VALUES_PRODUCT_ORDER } from '../../utils/constants/Order.constant';
import { Measurement } from '../../utils/types/Order.type';
import useRegister from '../../../../hooks/useRegister';
import SkeletonComponent from '../../../../components/SkeletonComponent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

dayjs.locale('pt-br');

const OrderRegister: React.FC = () => {
  const {
    currentData: currentDataCustomer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
  } = useGetCustomerListQuery();
  const {
    currentData: currentDataProducts,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useGetProductsListQuery();
  const { values, setFieldValue, setFieldTouched } = useFormikContext<IOrder>();
  const { handleCloseDrawer } = useDrawer();
  const { insertRegister, handleRemoveRegister } = useRegister();
  const [products, setProducts] = useState<IProductOrder>(
    INITIAL_VALUES_PRODUCT_ORDER,
  );

  const handleChange = (field: string, value: OrderValues) => {
    setFieldValue(field, value);
    setTimeout(() => setFieldTouched(field, true));
  };

  const handleCustomerChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      const selectedId = event.target.value as number;
      const selectedCustomer = currentDataCustomer?.output.find(
        (customer) => customer.id === selectedId,
      );

      if (selectedCustomer) {
        setFieldValue('customer.id', selectedCustomer.id);
        setFieldValue('customer.name', selectedCustomer.value);
      }
    },
    [currentDataCustomer?.output, setFieldValue],
  );

  const handleProductChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      const selectedId = event.target.value as number;
      const selectedProduct = currentDataProducts?.output.find(
        (product) => product.id === selectedId,
      );

      if (selectedProduct) {
        setProducts((prev) => ({
          ...prev,
          name: selectedProduct.value,
          productId: Number(selectedId),
        }));
      }
    },
    [currentDataProducts?.output],
  );

  const handleInsertProduct = () => {
    insertRegister<IProductOrder>('products', products, values.products);
    setProducts(INITIAL_VALUES_PRODUCT_ORDER);
  };

  const disableButtonToAddProduct = useMemo(() => {
    const { id, additionalInformations, ...rest } = products;
    return Object.values(rest).some((s) => !s);
  }, [products]);

  return (
    <S.Container>
      <div>
        <Box sx={{ display: 'flex', p: 4, alignItems: 'flex-end', gap: 2 }}>
          <SkeletonComponent
            width={300}
            height={56}
            loading={isLoadingCustomer}
          >
            <FormControl fullWidth sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">
                Selecione o cliente
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.customer.id || undefined}
                label="Selecione o cliente"
                onChange={(e) => {
                  handleCustomerChange(e);
                }}
              >
                {currentDataCustomer?.output.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SkeletonComponent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Data da entrega"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                format="DD/MM/YYYY hh:mm a"
                onChange={(e) =>
                  handleChange('deliveryDate', e && e.toISOString())
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Divider />
        <Typography sx={{ p: 4 }} variant="h6">
          Adicionar produto
        </Typography>
        <Box
          sx={{
            display: 'flex',
            paddingLeft: 4,
            paddingRight: 4,
            alignItems: 'center',
            gap: 2,
          }}
        >
          <SkeletonComponent
            width={300}
            height={56}
            loading={isLoadingProducts}
          >
            <FormControl fullWidth sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">
                Selecione o produto
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={products.productId || ''}
                label=" Selecione o produto"
                onChange={(e) => {
                  handleProductChange(e);
                }}
              >
                {currentDataProducts?.output.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SkeletonComponent>
          <FormControl fullWidth sx={{ width: 100 }}>
            <InputLabel id="demo-simple-select-label">Medida</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={products.type || ''}
              label="Medida"
              onChange={(e) =>
                setProducts((prev) => ({
                  ...prev,
                  type: e.target.value as Measurement,
                }))
              }
            >
              <MenuItem value="UN">UN</MenuItem>
              <MenuItem value="KG">KG</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Qtde"
            variant="outlined"
            type="number"
            sx={{ width: 100 }}
            value={products.quantity || ''}
            onChange={(e) =>
              setProducts((prev) => ({
                ...prev,
                quantity:
                  Number(e.target.value) > 1 ? Number(e.target.value) : 1,
              }))
            }
          />

          <TextField
            label="Comentário"
            id="outlined-controlled"
            variant="outlined"
            value={products.additionalInformations || ''}
            onChange={(e) =>
              setProducts((prev) => ({
                ...prev,
                additionalInformations: e.target.value,
              }))
            }
            sx={{ width: 200 }}
          />
          <AddCircleOutlineIcon
            fontSize="large"
            sx={{
              color: disableButtonToAddProduct
                ? 'neutral.light.main'
                : 'neutral.dark.contrastText',
              cursor: disableButtonToAddProduct ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (disableButtonToAddProduct) return;
              handleInsertProduct();
            }}
          />
        </Box>
        <Typography sx={{ p: 4 }} variant="h6">
          Produto adicionado
        </Typography>
        <Box sx={{ paddingLeft: 4, paddingRight: 4 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ p: 0 }}>Produto</TableCell>
                  <TableCell align="right">Medida</TableCell>
                  <TableCell align="right">Quantidade</TableCell>
                  <TableCell align="right">Observações</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {values.products.map((row: IProductOrder) => (
                  <TableRow key={row.name} sx={{ border: 0 }}>
                    <TableCell component="th" scope="row" sx={{ p: 0 }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {row.additionalInformations}
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon onClick={() => setProducts(row)} />
                      <DeleteIcon
                        onClick={() =>
                          handleRemoveRegister('products', row, values.products)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
      <div>
        <Divider />
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCloseDrawer}
            sx={{
              color: 'neutral.dark.contrastText',
              borderColor: 'neutral.dark.contrastText',
              borderRadius: 0,
              letterSpacing: 1,
              p: 2,
              paddingLeft: 3,
              paddingRight: 3,
              '&:hover': {
                borderColor: 'neutral.light.light',
                backgroundColor: 'neutral.light.light',
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              letterSpacing: 1,
              p: 2,
              paddingLeft: 3,
              paddingRight: 3,
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </div>
    </S.Container>
  );
};

export default OrderRegister;
