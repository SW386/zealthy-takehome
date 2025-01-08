import React from 'react'
import { Container, Header, FormField, Dropdown, DropdownProps, Button, Form, Message } from 'semantic-ui-react'
import { fetchAdminSettings, updateAdminSettings, AdminSettings, defaultSettings } from '../utils/API';

const pageOptions = [
    {
        key: '2',
        text: 'Page 2',
        value: 2,
    },
    {
        key: '3',
        text: 'Page 3',
        value: 3,
    },
]

function AdminPage() {

  const [adminSettings, setAdminSettings] = React.useState<AdminSettings>(defaultSettings);
  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')

  const fetchData = async () => {
    const response = await fetchAdminSettings();
    setAdminSettings(response.data);
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const validSetting = () => {
    let secondPage = false;
    let thirdPage = false;
    for (const [_key, value] of Object.entries(adminSettings)) {
        value === 2 ? secondPage = true : thirdPage = true
    }
    return secondPage && thirdPage
  }

  const handleChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const newSettings = {...adminSettings}
    const key = data.additionLabel as keyof AdminSettings;
    newSettings[key] = data.value as number;
    setAdminSettings(newSettings);
  }

  const handleSubmit = async () => {
    if (validSetting()) {
        try {
            const response = await updateAdminSettings(adminSettings)
            setAdminSettings(response.data)
            setSuccessMessage('Successfully updated settings')
            setErrorMessage('')
        } catch {
            setSuccessMessage('')
            setErrorMessage('Error with server, please try again later')
        }
    } else {
        setSuccessMessage('')
        setErrorMessage('Each page needs at least one section, please change the selection')
    }
  }

  return (
    <Container style={{marginTop : "5vh", height :'100vh'}}>
        <Header>Set Components</Header>
        <Form onSubmit={handleSubmit}>
            <FormField>
                <label>About Section</label>
                <Dropdown
                    placeholder='Set Page'
                    fluid
                    selection
                    options={pageOptions}
                    value={adminSettings.about}
                    additionLabel='about'
                    onChange={handleChange}
                />
            </FormField>
            <FormField>
                <label>Birthday Section</label>
                <Dropdown
                    placeholder='Set Page'
                    fluid
                    selection
                    options={pageOptions}
                    value={adminSettings.birthday}
                    additionLabel='birthday'
                    onChange={handleChange}
                />
            </FormField>
            <FormField>
                <label>Address Section</label>
                <Dropdown
                    placeholder='Set Page'
                    fluid
                    selection
                    options={pageOptions}
                    value={adminSettings.address}
                    additionLabel='address'
                    onChange={handleChange}
                />
            </FormField>
            <Button>Save Selection</Button>
            {errorMessage ? <Message negative onDismiss={()=>{setErrorMessage('')}}>
                {errorMessage}
            </Message> : <div/>}
            {successMessage ? <Message positive onDismiss={()=>{setSuccessMessage('')}}>
                {successMessage}
            </Message> : <div/>}
        </Form>
    </Container>
  )
}

export default AdminPage