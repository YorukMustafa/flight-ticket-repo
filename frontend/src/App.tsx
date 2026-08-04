import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/unauthorized"
                element={<UnauthorizedPage />}
            />

            <Route element={<ProtectedRoute />}>
                <Route
                    element={
                        <RoleRoute allowedRoles={["ROLE_ADMIN"]} />
                    }
                >
                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />
                </Route>

                <Route
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "ROLE_CUSTOMER",
                                "ROLE_ADMIN",
                            ]}
                        />
                    }
                >
                    <Route
                        path="/customer"
                        element={<CustomerDashboard />}
                    />
                </Route>
            </Route>

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}