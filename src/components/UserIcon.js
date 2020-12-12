import {
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { AccountCircle } from '@material-ui/icons';
import { useState } from 'react';

const UserIcon = () => {
  const [iconColor, setIconColor] = useState('inherit');
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(!isOpen);
    setIconColor('action');
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <AccountCircle
        style={{ fontSize: 40 }}
        onMouseEnter={open}
        onMouseLeave={() => setIconColor('inherit')}
        color={iconColor}
      />
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Box></Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter d='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button variant='outline'>Cancel</Button>
              <Button colorScheme='red'>Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserIcon;
