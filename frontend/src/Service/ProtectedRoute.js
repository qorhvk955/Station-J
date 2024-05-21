import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, userRole }) {
    
    if (userRole === 'ROLE_ADMIN' || userRole === 'ROLE_SUBADMIN' || userRole === 'ROLE_STAFF') {
        return children;    
    }

    alert('권한이 없습니다.');
    return <Navigate to="/" />;
}

export default ProtectedRoute;