import axios from "axios";

import i18n from "../i18n";
import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from "../types/auth";

const authApi = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ??
        "http://localhost:8080/api/v1/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

authApi.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18n.language.startsWith("en")
        ? "en"
        : "tr";
    return config;
});

export async function loginRequest(
    data: LoginRequest,
): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>("/login", data);
    return response.data;
}

export async function registerRequest(
    data: RegisterRequest,
): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>("/register", data);
    return response.data;
}
