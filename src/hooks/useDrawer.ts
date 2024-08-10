import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useCallback } from 'react';
import { IDrawer } from '../interfaces/IDrawer';
import { SharedActions } from '../redux/slices/SharedSlice';

interface IUseDrawer {
  drawer: IDrawer;
  handleOpenDrawer(): void;
  handleCloseDrawer(): void;
  setComponentAtDrawer({
    component,
    title,
  }: {
    component: JSX.Element | React.FunctionComponent | null;
    title: string;
  }): void;
}

const useDrawer = (): IUseDrawer => {
  const dispatch = useDispatch();
  const { drawer } = useSelector((store: RootState) => store.SharedReducer);

  const handleOpenDrawer = useCallback(() => {
    dispatch(SharedActions.setDrawer({ ...drawer, isOpen: true }));
  }, [dispatch, drawer]);

  const handleCloseDrawer = useCallback(() => {
    dispatch(SharedActions.setDrawer({ ...drawer, isOpen: false }));
  }, [dispatch, drawer]);

  const setComponentAtDrawer = useCallback(
    ({
      component,
      title,
    }: {
      component: JSX.Element | React.FunctionComponent | null;
      title: string;
    }) => {
      dispatch(
        SharedActions.setDrawer({
          title,
          isOpen: true,
          component,
        }),
      );
    },
    [dispatch],
  );

  return {
    drawer,
    handleOpenDrawer,
    handleCloseDrawer,
    setComponentAtDrawer,
  };
};

export default useDrawer;
