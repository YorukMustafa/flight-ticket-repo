import axios from "axios";

import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from "../types/auth";

const API_URL = "http://localhost:8080/api/v1/auth";

export async function loginRequest(
    data: LoginRequest,
): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
        `${API_URL}/login`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "tr",
            },
        },
    );

    return response.data;
}

export async function registerRequest(
    data: RegisterRequest,
): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
        `${API_URL}/register`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "tr",
            },
        },
    );

    return response.data;
}