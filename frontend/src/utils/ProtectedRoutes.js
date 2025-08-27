import { Outlet, Navigate } from "react-router-dom"


const ProtectedRoutes = (props) => {
    return props.isAuth ? <Outlet /> : <Navigate to="/auth" />
}

export default ProtectedRoutes