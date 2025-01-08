import React from 'react'
import { 
  Container, 
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableBody,
  TableCell,
  Table,
  Header
} from 'semantic-ui-react'
import { User, fetchAllUsers } from '../utils/API';


function DataPage() {

  const [users, setUsers] = React.useState<User[]>([]);

  const loadUsers = async () => {
    const response = await fetchAllUsers()
    setUsers(response.data.users)
  }

  const dateToString = (birthday: Date | null) => {
    if (birthday) {
      const date = new Date(birthday.toString())
      return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }
    return '';
  }

  React.useEffect(() => {
    loadUsers()
  }, [])

  return (
    <Container style={{marginTop : "5vh", height :'100vh'}}>
      <Header>Stored Users</Header>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Password</TableHeaderCell>
            <TableHeaderCell>Birthday</TableHeaderCell>
            <TableHeaderCell>About</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>State</TableHeaderCell>
            <TableHeaderCell>Zip</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => {
            return <TableRow>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{dateToString(user.birthday)}</TableCell>
              <TableCell>{user.about}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.state}</TableCell>
              <TableCell>{user.zipcode}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </Container>
  )
}

export default DataPage