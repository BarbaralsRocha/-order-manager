// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const validationSchemaProduct = Yup.object().shape({
  id: Yup.string().nullable(),
});

export default validationSchemaProduct;
