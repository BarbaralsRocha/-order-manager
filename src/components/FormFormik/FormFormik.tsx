// eslint-disable-next-line import/no-extraneous-dependencies
import { Formik, useFormikContext } from 'formik';
import React, { ReactNode, useEffect } from 'react';
import type * as Yup from 'yup';

interface IPropsFormik {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: React.MutableRefObject<any>;
  initialValues: object;
  validationSchema: Yup.AnyObjectSchema;
  children: ReactNode;
  initialTouched?: object;
}

const FormFormik: React.FC<IPropsFormik> = ({
  innerRef,
  initialValues,
  validationSchema,
  children,
  initialTouched,
}) => (
  <Formik
    innerRef={innerRef}
    onSubmit={() => {}}
    initialValues={initialValues}
    initialTouched={initialTouched}
    validationSchema={validationSchema}
    validateOnChange={false}
  >
    {() => <>{children}</>}
  </Formik>
);

export const FormikWithSetErrors: React.FC<{
  children: ReactNode;
  errorsFormik: object;
}> = ({ children, errorsFormik }) => {
  const { setErrors } = useFormikContext();

  useEffect(() => {
    setErrors(errorsFormik);
  }, [errorsFormik, setErrors]);

  return <>{children}</>;
};

export default FormFormik;
