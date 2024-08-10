import { HashRouter, Route, Routes } from 'react-router-dom';
import OrderManagerContainer from './features/OrderManager/OrderManagerContainer';
import DrawerContainer from './components/DrawerContainer';

const RoutesOrderManager: React.FC = () => {
  return (
    <>
      <DrawerContainer />
      <HashRouter>
        <Routes>
          <Route path="/" element={<OrderManagerContainer />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default RoutesOrderManager;
