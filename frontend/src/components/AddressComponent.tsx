import { FormField, FormGroup, Input } from 'semantic-ui-react'
import { User } from '../utils/API';

type Props = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

function AddressComponent(props: Props) {

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newUser = {...props.user}
    newUser.address = event.target.value
    props.setUser(newUser)
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newUser = {...props.user}
    newUser.city = event.target.value
    props.setUser(newUser)
  }

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newUser = {...props.user}
    newUser.state = event.target.value
    props.setUser(newUser)
  }

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newUser = {...props.user}
    newUser.zipcode = Number(event.target.value)
    props.setUser(newUser)
  }

  return (
      <FormGroup>
        <FormField width={9}>
          <label>Address</label>
          <Input 
            placeholder='address'
            onChange={handleAddressChange}
            value={props.user.address}
          />
        </FormField>
        <FormField>
          <label>City</label>
          <Input 
            placeholder='city'
            onChange={handleCityChange}
            value={props.user.city}
          />
        </FormField>
        <FormField>
          <label>State</label>
          <Input 
            placeholder='state'
            onChange={handleStateChange}
            value={props.user.state}
          />
        </FormField>
        <FormField width={2}>
          <label>Zip</label>
          <Input 
            placeholder='zip' 
            type='number'
            onChange={handleZipChange}
            value={props.user.zipcode}
          />
        </FormField>
      </FormGroup>
  )
}

export default AddressComponent;