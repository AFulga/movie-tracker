import useFetchCallback from '../hooks/useFetchCallback';
import { BeatLoader } from 'react-spinners';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { USERS_URL } from '../connectors/api';
import { releaseDateFormat, getAge, validateEmail, STATUS } from '../utils';
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
  Button,
} = require('@chakra-ui/react');

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [showPicker, setShowPicker] = useState(false);
  const [isChecked, setIschecked] = useState(user.showAdult);
  const [language, setLanguage] = useState(user.language);
  const [message, setMessage] = useState('');

  console.log('profile', user);

  const [callback, { data, status }] = useFetchCallback(
    `${USERS_URL}/${user.uid}`,
    'POST',
    {
      email,
      firstName,
      surname,
      birthDate,
      language,
      showAdult: isChecked,
    }
  );

  const submitData = () => {
    setMessage('');
    if (validateEmail(email) && firstName && surname) {
      callback();
      setUser((prev) => {
        return {
          ...prev,
          firstName,
          surname,
          email,
          birthDate,
          language,
          showAdult: isChecked,
        };
      });
    } else {
      if (!(email && firstName && surname)) {
        setMessage('Firstname, Name and Email are required');
      } else {
        if (!validateEmail(email)) {
          setMessage('Email address is not in the correct format.');
        }
      }
    }
  };

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
    if (getAge(date) < 18) {
      setIschecked(false);
    }
  };
  console.log('language', language);
  return (
    <Container p={3} maxW='30em' mt='10px'>
      <Stack spacing={3}>
        <Text fontSize='2xl' align='center'>
          Profile
        </Text>
        {message && (
          <Text fontSize='xl' align='center' color='tomato'>
            {message}
          </Text>
        )}
        <InputGroup>
          <InputLeftAddon children='Firstname' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Surname' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Email' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Date' width='96px' />
          <Input
            isDisabled={status === STATUS.PENDING}
            variant='outline'
            value={birthDate ? releaseDateFormat(birthDate) : ''}
            onClick={() => setShowPicker((prev) => !prev)}
            onChange={() => {}}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='Language' width='96px' />
          <Select
            isDisabled={status === STATUS.PENDING}
            placeholder='Select language'
            borderLeftRadius={0}
            onChange={(event) => {
              setLanguage(event.target.value);
            }}
            value={language}
          >
            <option value='en'>English</option>
            <option value='ro'>Romana</option>
          </Select>
        </InputGroup>
        {getAge(birthDate) >= 18 && (
          <Box h='40px' d='flex' alignItems='center'>
            <Checkbox
              isDisabled={status === STATUS.PENDING}
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
              onChange={handleBirthDateChange}
              format='dd/MM/yyyy'
              open={showPicker}
              openTo='year'
              views={['year', 'month', 'date']}
              disableFuture
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Button
          isLoading={status === STATUS.PENDING}
          colorScheme='blue'
          spinner={<BeatLoader size={8} color='white' />}
          onClick={submitData}
        >
          Update profile
        </Button>
      </Stack>
    </Container>
  );
};

export default Profile;
