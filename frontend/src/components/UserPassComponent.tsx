import { FormField, Input } from 'semantic-ui-react'

import { User } from '../utils/API';

type Props = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function UserPassComponent(props: Props) {

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newUser = {...props.user}
    newUser.email = event.target.value
    props.setUser(newUser)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newUser = {...props.user}
    newUser.password = event.target.value
    props.setUser(newUser)
  }

  return (
      <>
        <FormField>
          <label>Email</label>
          <Input 
            placeholder='email' 
            type='email'
            value={props.user.email}
            onChange={handleEmailChange}
          />
        </FormField>
        <FormField>
          <label>Password</label>
          <Input 
            placeholder='password' 
            type='password'
            value={props.user.password}
            onChange={handlePasswordChange}
          />
        </FormField>
      </>
  )
}

export default UserPassComponent;