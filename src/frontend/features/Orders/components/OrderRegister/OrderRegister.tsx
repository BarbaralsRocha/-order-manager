/* eslint-disable import/no-extraneous-dependencies */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Divider,
  Typography,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as S from './OrderRegister.style';
import useDrawer from '../../../../commons/hooks/useDrawer';
import { IOrder, IProductOrder } from '../../interfaces/IOrder.interface';
import {
  useGetCustomerListQuery,
  useGetProductsListQuery,
  useSendOrderMutation,
} from '../../redux/Orders.api';
import { INITIAL_VALUES_PRODUCT_ORDER } from '../../utils/constants/Order.constant';
import useRegister from '../../hooks/useRegister';
import SkeletonComponent from '../../../../commons/components/SkeletonComponent';
import EmptyState from '../../../../commons/components/EmptyState';
import TableRender from '../../../../commons/components/TableRender';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import OrderListItems from '../OrderListItems';
import useSnackBar from '../../../../commons/hooks/useSnackbar';
import { Measurement } from '../../../../commons/types/Measurement.type';
import useAlertHandler from '../../../../commons/hooks/useAlertHandler';

dayjs.locale('pt-br');

interface IProps {
  labelButton?: 'Cadastrar' | 'Editar';
}
// TODO: ERROR PARA QUANDO ENVIAR A ORDEM
const OrderRegister: React.FC<IProps> = ({ labelButton = 'Cadastrar' }) => {
  const {
    currentData: currentDataCustomer,
    isFetching: isLoadingCustomer,
    isError: isErrorCustomer,
    refetch: refetchCustomer,
  } = useGetCustomerListQuery();
  const {
    currentData: currentDataProducts,
    isFetching: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useGetProductsListQuery();
  const [sendOrder, sendOrderMutation] = useSendOrderMutation();
  const { values, setFieldValue, setFieldTouched } = useFormikContext<IOrder>();
  const { handleCloseDrawer } = useDrawer();
  const { showSnackbar } = useSnackBar();
  const { insertRegister, handleRemoveRegister } = useRegister();
  const [products, setProducts] = useState<IProductOrder>(
    INITIAL_VALUES_PRODUCT_ORDER,
  );

  useAlertHandler({
    apiResult: sendOrderMutation,
    successMessage: 'Dados salvos!',
    errorMessage: 'Não foi possivel salvar os dados!',
    callback: () => handleCloseDrawer(),
  });

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
    // eslint-disable-next-line no-unused-vars
    const { id, additionalInformations, ...rest } = products;
    return Object.values(rest).some((s) => !s);
  }, [products]);

  const isOrderComplete = useMemo(() => {
    const requiredFields = [
      values.customer?.id,
      values.customer?.name,
      values.deliveryDate,
    ];

    return (
      requiredFields.every((field) => field !== null && field !== undefined) &&
      values.products.length > 0
    );
  }, [values]);

  return (
    <S.Container>
      <div style={{ paddingTop: 32 }}>
        <Box
          sx={{
            display: 'flex',
            p: 4,
            paddingTop: 0,
            gap: 2,
          }}
        >
          <SkeletonComponent
            width={300}
            height={56}
            loading={isLoadingCustomer}
          >
            <FormControl fullWidth sx={{ width: 300 }}>
              <InputLabel>Selecione o cliente</InputLabel>
              <Select
                variant="outlined"
                disabled={isErrorCustomer}
                data-testid="customer"
                value={values.customer.id || undefined}
                label="Selecione o cliente"
                onChange={(e) => {
                  handleCustomerChange(e);
                }}
              >
                {currentDataCustomer?.output.map((customer) => (
                  <MenuItem
                    data-testid={customer.id}
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.value}
                  </MenuItem>
                ))}
              </Select>
              {isErrorCustomer && (
                <Box display="flex" gap={1} marginTop={1}>
                  <Typography variant="caption" color="error">
                    Erro ao carregar a lista de clientes
                  </Typography>
                  <AutorenewIcon onClick={refetchCustomer} />
                </Box>
              )}
            </FormControl>
          </SkeletonComponent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoItem> */}
            <DateTimePicker
              ampm={false}
              label="Data da entrega"
              views={['year', 'month', 'day', 'hours', 'minutes']}
              format="DD/MM/YYYY hh:mm a"
              value={
                values.deliveryDate ? dayjs(values.deliveryDate) : undefined
              }
              onChange={(e) => {
                setFieldValue('deliveryDate', e && e.toISOString());
                setTimeout(() => setFieldTouched('deliveryDate', true));
              }}
            />
            {/* </DemoItem> */}
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
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <SkeletonComponent
            width={300}
            height={56}
            loading={isLoadingProducts}
          >
            <FormControl fullWidth sx={{ width: 300 }}>
              <InputLabel>Selecione o produto</InputLabel>
              <Select
                value={products.productId || ''}
                label=" Selecione o produto"
                data-testid="product"
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
              {isErrorProducts && (
                <Box display="flex" gap={1} marginTop={1}>
                  <Typography variant="caption" color="error">
                    Erro ao carregar a lista de produtos
                  </Typography>
                  <AutorenewIcon onClick={refetchProducts} />
                </Box>
              )}
            </FormControl>
          </SkeletonComponent>
          <FormControl fullWidth sx={{ width: 100 }}>
            <InputLabel>Medida</InputLabel>
            <Select
              value={products.type || ''}
              label="Medida"
              data-testid="type"
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
            label="Qtde"
            variant="outlined"
            type="number"
            data-testid="quantity"
            sx={{ width: 100 }}
            value={products.quantity || ''}
            onChange={(e) =>
              setProducts((prev) => ({
                ...prev,
                quantity: Number(e.target.value),
              }))
            }
          />

          <TextField
            label="Comentário"
            variant="outlined"
            data-testid="additionalInformations"
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
            data-testid="add-product"
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
          <TableRender<IProductOrder>
            columns={[
              { label: 'Produto' },
              { label: 'Medida', position: 'right' },
              { label: 'Quantidade', position: 'right' },
              { label: 'Observações', position: 'right' },
              { label: '', position: 'right' },
            ]}
            data={values.products}
            emptyState={
              <EmptyState
                title="Não há nenhum produto adicionado"
                description="Preencha os campos acima e clique no '+' para adicionar"
              />
            }
            isLoading={false}
            isError={false}
            renderRow={(rowData: IProductOrder) => (
              <OrderListItems<IProductOrder>
                editProduct={() => setProducts(rowData)}
                deleteProduct={() => {
                  setProducts(INITIAL_VALUES_PRODUCT_ORDER);
                  handleRemoveRegister('products', rowData, values.products);
                }}
                rowData={rowData}
              />
            )}
          />
        </Box>
      </div>

      <div>
        <Divider />
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            data-testid="back-button"
            onClick={handleCloseDrawer}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="large"
            data-testid="register-order"
            disabled={!isOrderComplete || sendOrderMutation.isLoading}
            onClick={() => sendOrder(values)}
          >
            {labelButton}
          </Button>
        </Box>
      </div>
    </S.Container>
  );
};

export default OrderRegister;