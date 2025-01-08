import React from 'react'
import {
  Container,
  Header
} from 'semantic-ui-react'
import FormBuilder from '../utils/FormBuilder';
import { 
  fetchAdminSettings, 
  AdminSettings, 
  User, 
  defaultSettings, 
  defaultUser 
} from '../utils/API';

function SingupPage() {

  const [adminSettings, setAdminSettings] = React.useState<AdminSettings>(defaultSettings);
  const [page, setPage] = React.useState(1);
  const [user, setUser] = React.useState<User>(defaultUser);

  const fetchData = async () => {
    const response = await fetchAdminSettings();
    setAdminSettings(response.data);
  }

  React.useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <Container style={{marginTop : "5vh", height :'100vh'}}>
      <Header>Sign Up</Header>
      <FormBuilder 
        settings={adminSettings} 
        page={page} 
        setPage={setPage}
        user={user}
        setUser={setUser}
      />
    </Container>
  )
}

export default SingupPage