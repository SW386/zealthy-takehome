
import React from 'react';
import { FormField } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { User } from '../utils/API';

type Props = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function BirthdayComponent(props: Props) {

  const handleChange = (event: any) => {
    const date = event as Date;
    let newUser = {...props.user}
    newUser.birthday = date
    props.setUser(newUser)
  }

  return (
    <FormField>
        <label>Select Birthday</label>
        <DatePicker
            selected={props.user.birthday} 
            onChange={handleChange} 
        />
    </FormField>
  )
}

export default BirthdayComponent;