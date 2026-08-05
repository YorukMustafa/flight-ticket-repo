import {
    createContext,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {
    LoginRequest,
    RegisterRequest,
    User,
} from "../types/auth";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<User>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

interface AuthProviderProps {
    children: ReactNode;
}

const MOCK_DELAY_MS = 500;

function readStoredUser(): User | null {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser) as User;
    } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return null;
    }
}

/**
 * Aşama 1 boyunca kimlik doğrulama akışını frontend tarafında test etmek
 * için mock veri kullanılır. Gerçek backend bağlandığında yalnızca login ve
 * register fonksiyonlarının içi API istekleriyle değiştirilecektir.
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );
    const [user, setUser] = useState<User | null>(readStoredUser);

    const login = useCallback(async (data: LoginRequest): Promise<User> => {
        await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

        // Projede daha önce belirlenen mock rol kuralı korunmaktadır.
        const loggedInUser: User =
            data.email.toLowerCase() === "admin@test.com"
                ? { email: data.email, role: "ROLE_ADMIN" }
                : { email: data.email, role: "ROLE_CUSTOMER" };

        const mockToken =
            loggedInUser.role === "ROLE_ADMIN"
                ? "mock-admin-token"
                : "mock-customer-token";

        setUser(loggedInUser);
        setToken(mockToken);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", mockToken);

        return loggedInUser;
    }, []);

    const register = useCallback(async (data: RegisterRequest): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

        const registeredUsers = JSON.parse(
            localStorage.getItem("registeredUsers") ?? "[]",
        ) as RegisterRequest[];

        registeredUsers.push(data);
        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(registeredUsers),
        );
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }, []);

    const value = useMemo(
        () => ({
            user,
            token,
            isAuthenticated: Boolean(user && token),
            login,
            register,
            logout,
        }),
        [user, token, login, register, logout],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
