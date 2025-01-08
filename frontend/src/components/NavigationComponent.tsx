import {
  MenuItem,
  Menu,
} from 'semantic-ui-react'
import { NavLink } from "react-router";

type Props = {
    child: JSX.Element
}

const SidebarComponent = (props : Props) => {
    return <div>
    <Menu inverted style={{borderRadius: 0}}>
        <MenuItem>
            <NavLink to='/'>Signup Page</NavLink>
        </MenuItem>
        <MenuItem>
            <NavLink to='/admin'>Admin Page</NavLink>
        </MenuItem>
        <MenuItem>
            <NavLink to='/data'>Data Page</NavLink>
        </MenuItem>
    </Menu>
    {props.child}
    </div>

}

export default SidebarComponent;