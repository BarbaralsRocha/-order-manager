import React from 'react';
import Filters from '../Filters';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete, Edit } from '@mui/icons-material';
import { timeFormat } from '../../../../utils/timeFormat';
import { dateFormat } from '../../../../utils/dateFormat';
import OrderListSkeleton from './OrderListSkeleton';
import { useGetOrdersQuery } from '../../redux/Orders.api';

const OrderList: React.FC = () => {
  const { currentData, isLoading, error } = useGetOrdersQuery();

  if (error) {
    return <div> error</div>;
  }

  if (isLoading) {
    return <OrderListSkeleton />;
  }

  return (
    <>
      <Filters label="Digite o nome do cliente" />
      {currentData?.output.map((order) => (
        <Accordion key={order.id} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`customer-${order.id}`}
            id={`customer-${order.id}`}
          >
            <Typography gutterBottom variant="h5" component="div">
              {order.customer.name}
              <Typography variant="body2" color="text.secondary">
                {order.deliveryDate &&
                  `${dateFormat(new Date(order.deliveryDate))} - ${timeFormat(new Date(order.deliveryDate))}`}
              </Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Medida</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Observações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((row) => (
                    <TableRow key={row.name} sx={{ border: 0 }}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">
                        {row.additionalInformations}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
          <AccordionActions>
            <Button
              size="small"
              startIcon={<Edit />}
              sx={{ color: 'neutral.dark.main' }}
            />
            <Button
              size="small"
              startIcon={<Delete />}
              sx={{ color: 'neutral.dark.main' }}
            />
          </AccordionActions>
        </Accordion>
      ))}
    </>
  );
};

export default OrderList;

// <Card key={order.id}>
//   <CardContent>
//     <Box
//       component="section"
//       sx={{ display: 'flex', justifyContent: 'space-between' }}
//     >
//       <Typography gutterBottom variant="h5" component="div">
//         {order.customer}
//         <Typography variant="body2" color="text.secondary">
//           {order.deliveryDate &&
//             `${dateFormat(new Date(order.deliveryDate))} - ${timeFormat(new Date(order.deliveryDate))}`}
//         </Typography>
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         {order.deliveryDate && timeFormat(new Date(order.deliveryDate))}
//       </Typography>
//     </Box>
//     <TableContainer>
//       <Table
//         sx={{ minWidth: 650 }}
//         size="small"
//         aria-label="a dense table"
//       >
//         <TableHead>
//           <TableRow>
//             <TableCell>Produto</TableCell>
//             <TableCell align="right">Medida</TableCell>
//             <TableCell align="right">Quantidade</TableCell>
//             <TableCell align="right">Observações</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {order.products.map((row) => (
//             <TableRow key={row.name} sx={{ border: 0 }}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.type}</TableCell>
//               <TableCell align="right">{row.quantity}</TableCell>
//               <TableCell align="right">
//                 {row.additionalInformations}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </CardContent>
//   <CardActions>
//     <Button
//       size="small"
//       startIcon={<Edit />}
//       sx={{ color: 'neutral.dark.main' }}
//     />
//     <Button
//       size="small"
//       startIcon={<Delete />}
//       sx={{ color: 'neutral.dark.main' }}
//     />
//   </CardActions>
// </Card>
