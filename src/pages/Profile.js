import { AtSignIcon } from '@chakra-ui/icons';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { releaseDateFormat, getAge } from '../utils';
const { default: DateFnsUtils } = require('@date-io/date-fns');
const {
  MuiPickersUtilsProvider,
  DatePicker,
  DateTimePicker,
} = require('@material-ui/pickers');

const {
  Box,
  Input,
  InputGroup,
  Container,
  InputLeftAddon,
  Checkbox,
  Stack,
  Select,
  Text,
} = require('@chakra-ui/react');

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.displayName.split('|')[0]);
  const [surname, setSurname] = useState(user.displayName.split('|')[1]);
  const [email, setEmail] = useState(user.email);
  const [birthDate, setBirthDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [isChecked, setIschecked] = useState(false);
  const [language, setLanguage] = useState(1);

  return (
    <Container p={3} maxW='30em' mt='10px'>
      <Stack spacing={3}>
        <Text fontSize='2xl' align='center'>
          Profile
        </Text>
        <InputGroup>
          <InputLeftAddon children='Name' width='96px' />
          <Input
            variant='outline'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Surname' width='96px' />
          <Input
            variant='outline'
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Email' width='96px' />
          <Input
            variant='outline'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Date' width='96px' />
          <Input
            variant='outline'
            value={birthDate ? releaseDateFormat(birthDate) : ''}
            onClick={() => setShowPicker((prev) => !prev)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Language' width='96px' />
          <Select
            placeholder='Select language'
            borderLeftRadius={0}
            onChange={(event) => {
              setLanguage(event.target.value);
            }}
            value={language}
          >
            <option value='1'>English</option>
            <option value='2'>Romana</option>
          </Select>
        </InputGroup>
        {getAge(birthDate) >= 18 && (
          <Box h='40px' d='flex' alignItems='center'>
            <Checkbox
              isChecked={isChecked}
              onChange={(e) => setIschecked((prev) => !prev)}
            >
              Show adult movies
            </Checkbox>
          </Box>
        )}
        <Box display='none'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              width={10}
              value={birthDate}
              onClose={() => setShowPicker((prev) => !prev)}
              onChange={(date) => setBirthDate(date)}
              format='dd/MM/yyyy'
              open={showPicker}
              openTo='year'
              views={['year', 'month', 'date']}
              disableFuture
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Stack>
    </Container>
  );
};

export default Profile;
