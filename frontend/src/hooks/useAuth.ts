import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/*
 * useAuth adında özel (custom) bir React Hook'u oluşturuyoruz.
 *
 * Bu hook'un amacı, AuthContext'e erişimi kolaylaştırmaktır.
 *
 * Böylece her component içinde sürekli
 * useContext(AuthContext)
 * yazmak yerine sadece
 * useAuth()
 * kullanabiliyoruz.
 *
 * Bu yöntem kod tekrarını azaltır ve okunabilirliği artırır.
 */
export function useAuth() {

    /*
     * AuthContext içinde paylaşılan verilere erişir.
     *
     * Buradan aşağıdaki bilgilere ulaşabiliriz:
     *
     * - user
     * - token
     * - login()
     * - register()
     * - logout()
     * - isAuthenticated
     *
     * useContext yalnızca AuthProvider tarafından sarılmış
     * componentlerde çalışır.
     */
    const context = useContext(AuthContext);

    /*
     * Eğer context bulunamazsa,
     * useAuth büyük ihtimalle AuthProvider dışında kullanılmıştır.
     *
     * Bu durumda uygulamanın yanlış kullanılmasını engellemek için
     * anlamlı bir hata mesajı oluşturuyoruz.
     *
     * Böylece geliştirici problemi hızlıca anlayabilir.
     */
    if (!context) {
        throw new Error("useAuth AuthProvider içinde kullanılmalıdır.");
    }

    /*
     * AuthContext içindeki bütün bilgileri
     * componentlere geri döndürür.
     *
     * Böylece LoginPage, Dashboard,
     * ProtectedRoute ve diğer componentler
     * aynı kullanıcı bilgilerini kullanabilir.
     */
    return context;
}