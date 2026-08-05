import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/*
 * ProtectedRoute, giriş yapılmadan erişilmemesi gereken
 * sayfaları korumak için oluşturulmuştur.
 *
 * Bu component sayesinde kullanıcı giriş yapmamışsa
 * korunan sayfalara erişemez ve otomatik olarak
 * giriş ekranına yönlendirilir.
 */
export default function ProtectedRoute() {

    /*
     * AuthContext içerisindeki giriş durumunu alıyoruz.
     *
     * isAuthenticated değeri:
     *
     * true  -> kullanıcı giriş yapmış.
     * false -> kullanıcı giriş yapmamış.
     */
    const { isAuthenticated } = useAuth();

    /*
     * Eğer kullanıcı giriş yapmamışsa
     * bu component hiçbir sayfayı göstermeden
     * Login ekranına yönlendirir.
     *
     * replace özelliği sayesinde
     * login sayfasına yönlendirme tarayıcı geçmişine eklenmez.
     *
     * Böylece kullanıcı geri tuşuna bastığında
     * tekrar korunan sayfaya dönemez.
     */
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    /*
     * Kullanıcı giriş yaptıysa
     * Outlet sayesinde korunan sayfa ekrana gösterilir.
     *
     * Outlet;
     * App.tsx içerisinde ProtectedRoute'un altına yazılan
     * componentleri temsil eder.
     *
     * Örneğin:
     *
     * <ProtectedRoute>
     *      CustomerDashboard
     * </ProtectedRoute>
     *
     * burada Outlet yerine CustomerDashboard render edilir.
     */
    return <Outlet />;
}