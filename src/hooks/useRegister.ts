import { useFormikContext } from 'formik';
import { IOrder } from '../features/Orders/interfaces/IOrder.interface';

interface IUseRegister {
  insertRegister: <
    T extends {
      id: number | null;
    },
  >(
    field: string,
    value: T,
    items: T[],
  ) => void;
  handleRemoveRegister: <
    T extends {
      id: number | null;
    },
  >(
    field: string,
    value: T,
    items: T[],
  ) => void;
}

const useRegister = (): IUseRegister => {
  const { setFieldTouched, setFieldValue } = useFormikContext<IOrder>();

  const insertRegister: {
    <T extends { id: number | null }>(
      field: string,
      value: T,
      items: T[],
    ): void;
  } = (field, value, items) => {
    const lastRegister = items[items.length - 1]?.id || 0;
    const fieldValue = value.id
      ? items.map((p) => (p.id === value.id ? value : p))
      : [...(items || []), { ...value, id: lastRegister + 1 }];
    setFieldValue(field, fieldValue);
    setTimeout(() => setFieldTouched(field, true));
  };

  const handleRemoveRegister: {
    <T extends { id: number | null }>(
      field: string,
      value: T,
      items: T[],
    ): void;
  } = (field, value, items) => {
    const getValues = [...items];
    const updatePatrimony = getValues.filter((p) => p.id !== value.id);
    setFieldValue(field, updatePatrimony);
    setTimeout(() => setFieldTouched(field, true));
  };

  return {
    insertRegister,
    handleRemoveRegister,
  };
};

export default useRegister;
