import React from 'react';
import {
    Form,
    Button,
    Icon,
    Message,
    Progress
} from 'semantic-ui-react'
import AboutComponent from '../components/AboutComponent';
import AddressComponent from '../components/AddressComponent';
import UserPassComponent from '../components/UserPassComponent';
import BirthdayComponent from '../components/BirthdayComponent';
import { AdminSettings, User, fetchOrCreateUser, updateUser } from './API';

type Props = {
    settings: AdminSettings
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
}


const NameToComponent = (componentName: string, 
    user: User, 
    setUser:React.Dispatch<React.SetStateAction<User>>
) => {
    switch(componentName) {
        case 'about':
            return <AboutComponent user={user} setUser={setUser}/>
        case 'address':
            return <AddressComponent user={user} setUser={setUser}/>
        case 'birthday':
            return <BirthdayComponent user={user} setUser={setUser}/>
        default:
            return <div/>
    }
}
  
function FormBuilder(props: Props) {

    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    const validateSubmission = () => {
        let isValid = true
        if (props.page == 1) {
            isValid = isValid && props.user.password !== ''
            isValid = isValid && props.user.email !== ''
            let re = /\S+@\S+\.\S+/;
            isValid = isValid && re.test(props.user.email)
            return isValid
        }
        for (const [key, value] of Object.entries(props.settings)) {
            if (value != props.page) {
                continue;
            }
            switch(key) {
                case 'about':
                    isValid = isValid && props.user.about !== ''
                    continue
                case 'address':
                    isValid = isValid && props.user.address !== ''
                    isValid = isValid && props.user.city !== ''
                    isValid = isValid && props.user.state !== ''
                    isValid = isValid && props.user.zipcode !== null
                    continue
                case 'birthday':
                    isValid = isValid && props.user.birthday !== null
                    continue
                default:
                    continue
            }
        }
        return isValid
    }

    const getComponents = () => {
        if (props.page == 1) {
            return <UserPassComponent user={props.user} setUser={props.setUser} />
        }
        const components: React.ReactElement[] = []
        for (const [key, value] of Object.entries(props.settings)) {
            const component = NameToComponent(key, props.user, props.setUser);
            if (value === props.page) {
                components.push(component)
            }
        }
        return components
    }

    const handleNext = async () => {
        const isValid = validateSubmission()
        if (isValid) {
            setErrorMessage('')
            try {
                let user: User;
                if (props.page == 1) {
                    const response = await fetchOrCreateUser(props.user)
                    if (response.data.password != props.user.password) {
                        setErrorMessage('This user has been created with a different password, use the correct password to continue')
                        return
                    }
                    user = response.data;
                } else {
                    const response = await updateUser(props.user)
                    user = response.data
                }
                props.setUser(user)
                props.setPage(props.page+1)
            } catch {
                setErrorMessage('There has been an error, try again later')
            }
        } else {
            setErrorMessage('The form has missing fields!')
        } 
    }

    const handleSubmit = async () => {
        const isValid = validateSubmission()
        if (isValid) {
            try {
                const response = await updateUser(props.user)
                const user = response.data
                props.setUser(user)
                setErrorMessage('')
                setSuccessMessage('New user created!')
            } catch {
                setErrorMessage('There has been an error, try again later')
            }
        } else {
            setErrorMessage('The form has missing fields!')
        } 
    }

    const handlePrev = () => {
        props.setPage(props.page-1)
        setErrorMessage('')
    }

    const getButtons = () => {
        switch(props.page) {
            case 1:
                return <Button icon labelPosition='right' onClick={handleNext}>
                    Next
                    <Icon name='arrow right' />
                </Button>
            case 2:
                return <>
                <Button icon labelPosition='left' onClick={handlePrev}>
                    Prev
                    <Icon name='arrow left' />
                </Button>
                <Button icon labelPosition='right' onClick={handleNext}>
                    Next
                    <Icon name='arrow right' />
                </Button>
                </>
            case 3:
                return <>
                <Button icon labelPosition='left' onClick={handlePrev}>
                    Prev
                    <Icon name='arrow left' />
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
                </>
        }
    }

    return (
        <Form>
            <>
            <Progress color='green' value={props.page} total={3} ratio/>
            {getComponents()}
            {getButtons()}
            {errorMessage ? <Message negative onDismiss={()=>{setErrorMessage('')}}>
                {errorMessage}
            </Message> : <div/>}
            {successMessage ? <Message positive onDismiss={()=>{setSuccessMessage('')}}>
                {successMessage}
            </Message> : <div/>}
            </>
        </Form>
    )
}

export default FormBuilder