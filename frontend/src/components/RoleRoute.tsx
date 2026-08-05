import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";

/*
 * RoleRoute componentinin dışarıdan hangi rollere izin vereceğini belirtir.
 *
 * allowedRoles bir dizi (array) olarak tutulmuştur.
 *
 * Bunun nedeni aynı sayfaya birden fazla rolün erişebilmesidir.
 *
 * Örneğin;
 *
 * ["ROLE_ADMIN"]
 *
 * sadece admin girebilir.
 *
 * ["ROLE_ADMIN", "ROLE_CUSTOMER"]
 *
 * hem admin hem customer girebilir.
 */
interface RoleRouteProps {
    allowedRoles: UserRole[];
}

/*
 * RoleRoute kullanıcı giriş yaptıktan sonra
 * yetkisinin yeterli olup olmadığını kontrol eder.
 *
 * ProtectedRoute sadece giriş yapılıp yapılmadığını kontrol eder.
 *
 * RoleRoute ise kullanıcının hangi role sahip olduğunu kontrol eder.
 *
 * Böylece her kullanıcı yalnızca yetkili olduğu sayfalara erişebilir.
 */
export default function RoleRoute({
                                      allowedRoles,
                                  }: RoleRouteProps) {

    /*
     * AuthContext içerisindeki kullanıcı bilgisi alınır.
     *
     * Buradan kullanıcının
     *
     * email
     * role
     *
     * bilgilerine erişebiliriz.
     */
    const { user } = useAuth();

    /*
     * Güvenlik amacıyla ilk olarak
     * kullanıcı giriş yapmış mı kontrol edilir.
     *
     * Eğer kullanıcı yoksa
     * Login ekranına yönlendirilir.
     *
     * Bu kontrol aslında ProtectedRoute içerisinde de bulunmaktadır.
     *
     * Ancak RoleRoute tek başına kullanılırsa da
     * güvenli çalışabilmesi için tekrar kontrol edilmektedir.
     */
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    /*
     * Kullanıcının rolü,
     * izin verilen roller listesinde bulunuyor mu kontrol edilir.
     *
     * includes()
     *
     * dizi içerisinde ilgili değerin olup olmadığını kontrol eder.
     *
     * Eğer kullanıcının rolü izin verilen roller arasında yoksa
     * Unauthorized sayfasına yönlendirilir.
     */
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    /*
     * Kullanıcı hem giriş yaptıysa
     * hem de gerekli role sahipse
     * ilgili sayfa ekrana gösterilir.
     *
     * Outlet,
     * App.tsx içerisinde RoleRoute altında bulunan
     * componentleri temsil eder.
     */
    return <Outlet />;
}