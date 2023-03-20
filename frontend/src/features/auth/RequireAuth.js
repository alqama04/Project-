import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { role } = UseAuth()

    const content = (!allowedRoles.includes(role)
        
        ? <Navigate to="/auth/login" state={{ from: location }} replace />
        :
        <Outlet />

    )

    return content
}

export default RequireAuth;
