import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    return !user ? (
        <Navigate to={"/login"} replace />
    ) : (
        children
    );
};

export default ProtectedRoute;