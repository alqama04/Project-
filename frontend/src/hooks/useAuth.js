import { useSelector } from "react-redux";
import { selectCurrentToken} from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const UseAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = 'User'

    if (token) {
        const decoded = jwtDecode(token)
        const {id,name, role } = decoded.UserInfo
        isManager = role.toLowerCase() === 'Manager'.toLowerCase()
        isAdmin = role.toLowerCase() === 'admin'.toLowerCase()

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return {id, name, role, status, isManager, isAdmin }
    }
    return {id:'', name: '', role: '', isManager, isAdmin, status }
}

export default UseAuth;
