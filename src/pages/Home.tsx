// 3rd party imports
import * as React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Card,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  Checkbox,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import MuiPhoneNumber from 'material-ui-phone-number'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// My imports

interface IFormInputs {
  firstName: string
  lastName: string
  feet: number
  inches: number
  email1: string
  email2: string
  terms: boolean
}

//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
  firstName: yup.string().required('first name is required'),
  lastName: yup.string().required('last name is required'),
  feet: yup
    .number()
    .nullable(true)
    .typeError('must be a valid number')
    .transform((v, o) => (o === '' ? null : v)),
  inches: yup
    .number()
    .nullable(true)
    .typeError('must be a valid number')
    .transform((v, o) => (o === '' ? null : v)),
  email1: yup
    .string()
    .email('must be a valid email')
    .required('email is required'),
  email2: yup
    .string()
    .email('must be a valid email')
    .required('email is required'),
  terms: yup.bool().oneOf([true], 'must agree to terms'),
})

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '3rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1.5rem',
  },
  date: {
    width: 150,
    marginTop: -4,
  },
  education: {
    minWidth: 100,
  },
})

const Home: React.FC = () => {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  )
  const [phoneNumber, setPhoneNumber] = React.useState<String | undefined>()
  const [dateError, setDateError] = React.useState<Boolean>(false)
  const [phoneError, setPhoneError] = React.useState<Boolean>(false)
  const onSubmit = (data: IFormInputs) => {
    console.log(phoneNumber)
    if (phoneNumber === undefined || phoneNumber === '+') {
      setPhoneError(true)
      return
    } else {
      setPhoneError(false)
    }
    console.log(data)
    console.log(selectedDate)
  }
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }
  const [education, setEducation] = React.useState('')

  const handleEducationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEducation(event.target.value as string)
  }

  const handlePhoneChange = (value: any) => {
    setPhoneNumber(value)
    console.log(phoneNumber)
  }

  React.useEffect(() => {
    if (selectedDate === null) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [selectedDate])

  return (
    <PageWrapper>
      <Typography variant='h4' style={{ textAlign: 'center' }}>
        CSC 642 Summer 2020 Individual Assignment Steven McHenry
      </Typography>
      <Card className={classes.root}>
        <Typography style={{ textAlign: 'center' }} variant='h4'>
          Data survey form
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='false'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <FormElement>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '1rem' }}>
                <TextField
                  name='firstName'
                  id='firstName'
                  label='first name *'
                  type='text'
                  inputRef={register}
                  color={errors.firstName && 'secondary'}
                />
                <ErrorText>{errors.firstName?.message}</ErrorText>
              </div>
              <div>
                <TextField
                  name='lastName'
                  id='lastName'
                  label='last name *'
                  type='text'
                  color={errors.lastName && 'secondary'}
                  inputRef={register}
                />
                <ErrorText>{errors.lastName?.message}</ErrorText>
              </div>
            </div>
          </FormElement>
          <FormElement>
            <Typography style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
              Birth Date *
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.date}
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                value={selectedDate}
                onChange={handleDateChange}
                inputRef={register}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                {...(dateError ? { error: true } : {})}
                {...(dateError ? { helperText: 'birth date is required' } : {})}
              />
            </MuiPickersUtilsProvider>
          </FormElement>
          <FormElement>
            <InputLabel id='demo-simple-select-label'>
              Education level (optional)
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={education}
              onChange={handleEducationChange}
              className={classes.education}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'high school'}>high school</MenuItem>
              <MenuItem value={'college'}>college</MenuItem>
              <MenuItem value={'graduate studies'}>graduate studies</MenuItem>
              <MenuItem value={'Ph.D'}>Ph.D</MenuItem>
            </Select>
          </FormElement>
          <FormElement>
            <Typography style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
              Height (optional)
            </Typography>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '1rem' }}>
                <Input
                  name='feet'
                  id='feet'
                  inputRef={register}
                  endAdornment={
                    <InputAdornment position='end'>ft</InputAdornment>
                  }
                  color={errors.feet && 'secondary'}
                  style={{ maxWidth: '100px' }}
                />
                <ErrorText>{errors.feet?.message}</ErrorText>
              </div>
              <div>
                <Input
                  name='inches'
                  id='inches'
                  inputRef={register}
                  endAdornment={
                    <InputAdornment position='end'>in</InputAdornment>
                  }
                  color={errors.inches && 'secondary'}
                  style={{ maxWidth: '100px' }}
                />
                <ErrorText>{errors.inches?.message}</ErrorText>
              </div>
            </div>
          </FormElement>
          <FormElement>
            <Typography style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
              Phone Number *
            </Typography>
            <MuiPhoneNumber
              defaultCountry={'us'}
              disableAreaCodes
              value={phoneNumber}
              onChange={handlePhoneChange}
              {...(phoneError ? { error: true } : {})}
              {...(phoneError
                ? { helperText: 'phone number is required' }
                : {})}
            />
          </FormElement>
          <FormElement>
            <TextField
              name='email1'
              id='email1'
              label='email *'
              type='text'
              inputRef={register}
              color={errors.email1 && 'secondary'}
            />
            <ErrorText>{errors.email1?.message}</ErrorText>
            <TextField
              name='email2'
              id='email2'
              label='validate email *'
              type='text'
              inputRef={register}
              color={errors.email2 && 'secondary'}
            />
            <ErrorText>{errors.email2?.message}</ErrorText>
          </FormElement>
          <FormElement>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                “I Agree to terms” check *
              </Typography>
              <Checkbox
                name='terms'
                id='terms'
                inputRef={register}
                color='primary'
              />
            </div>
            <ErrorText>{errors.terms?.message}</ErrorText>
          </FormElement>
          <Button
            style={{ marginTop: '1rem', alignSelf: 'center' }}
            variant='contained'
            color='primary'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Card>
    </PageWrapper>
  )
}

export default Home

// STYLING
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`
const FormElement = styled.div`
  margin-top: 2rem;
`
const ErrorText = styled.p`
  color: red;
`
