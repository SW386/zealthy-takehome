import { FormField, TextArea } from 'semantic-ui-react'
import { User } from '../utils/API';

type Props = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function AboutComponent(props: Props) {

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newUser = {...props.user}
    newUser.about = event.target.value
    props.setUser(newUser)
  }

  return (
    <FormField>
        <label>About</label>
        <TextArea 
          rows={10}
          placeholder='tell us more about you...'
          onChange={handleChange}
          value={props.user.about}
        />
    </FormField>
  )
}

export default AboutComponent;