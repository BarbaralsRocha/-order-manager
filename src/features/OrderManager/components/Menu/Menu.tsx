import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { ColumnItems } from '../../utils/constants/OrderManagerSection.constant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ManageOrdersActions } from '../../redux/slices/ManageOrders.slice';

const drawerWidth = 240;

const Menu: React.FC = () => {
  const currentMenuSelected = useSelector(
    (store: RootState) => store.ManagerOrdersReducer.currentMenuSelected,
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List sx={{ marginTop: 0, p: 0 }}>
          {ColumnItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() =>
                  dispatch(ManageOrdersActions.setCurrentMenuSelect(item.id))
                }
                selected={currentMenuSelected === item.id}
                sx={{
                  ...(currentMenuSelected === item.id && {
                    backgroundColor:
                      theme.palette.neutral.light.main + ' !important',
                    color: theme.palette.neutral.dark.contrastText,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.neutral.dark.contrastText,
                    },
                  }),
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Menu;
