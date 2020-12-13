import { Tooltip } from '@chakra-ui/react';
import { AccountCircle } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const UserIcon = () => {
  const { user } = useContext(UserContext);
  const [iconColor, setIconColor] = useState('inherit');

  const open = () => {
    setIconColor('action');
  };

  return (
    <Tooltip hasArrow label={user.email} bg='gray.300' color='black'>
      <AccountCircle
        style={{ fontSize: 40 }}
        onMouseEnter={() => setIconColor('action')}
        onMouseLeave={() => setIconColor('inherit')}
        color={iconColor}
      />
    </Tooltip>
  );
};

export default UserIcon;
