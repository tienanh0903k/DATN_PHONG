'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'Admin' | 'Shop' | 'Customer';

interface AuthContextType {
	role: Role;
	setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [role, setRoleState] = useState<Role>('Customer');

	const setRole = (newRole: Role) => {
		setRoleState(newRole);
		localStorage.setItem('role', newRole);
	};

	useEffect(() => {
		const storedRole = localStorage.getItem('role') as Role | null;
		if (storedRole) {
			setRoleState(storedRole);
		}
	}, []);

	return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used inside AuthProvider');
	return context;
};
