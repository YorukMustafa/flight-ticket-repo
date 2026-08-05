/*
 * Kullanıcı rollerini tanımlayan özel bir TypeScript type'ıdır.
 *
 * Bu projede yalnızca iki farklı kullanıcı rolü bulunmaktadır:
 *
 * ROLE_ADMIN
 * ROLE_CUSTOMER
 *
 * Böylece role değişkenine yanlışlıkla
 * farklı bir değer atanması engellenmiş olur.
 *
 * Örneğin;
 *
 * role = "Admin"
 *
 * yazılırsa TypeScript hata verecektir.
 *
 * Bu yaklaşım type safety (tip güvenliği) sağlar.
 */
export type UserRole = "ROLE_ADMIN" | "ROLE_CUSTOMER";

/*
 * Sisteme giriş yapan kullanıcıyı temsil eder.
 *
 * AuthContext içerisinde user state'i
 * bu interface kullanılarak tutulmaktadır.
 *
 * Böylece uygulamanın her yerinde
 * kullanıcı nesnesi aynı yapıya sahip olur.
 */
export interface User {

    /*
     * Kullanıcının e-posta adresi.
     *
     * Şu an kullanıcıyı ekranda göstermek için kullanılmaktadır.
     */
    email: string;

    /*
     * Kullanıcının sistemdeki rolü.
     *
     * ROLE_ADMIN
     * veya
     * ROLE_CUSTOMER
     *
     * olabilir.
     *
     * Bu bilgi RoleRoute içerisinde
     * yetki kontrolü yapılırken kullanılır.
     */
    role: UserRole;
}

/*
 * Login ekranından gönderilecek veriyi temsil eder.
 *
 * Böylece login fonksiyonuna
 * eksik veya yanlış veri gönderilmesi engellenir.
 */
export interface LoginRequest {

    /*
     * Kullanıcının giriş yapmak için kullandığı e-posta.
     */
    email: string;

    /*
     * Kullanıcının girdiği şifre.
     */
    password: string;
}

/*
 * Register ekranından gönderilecek veriyi temsil eder.
 *
 * Backend'e kayıt olurken gönderilecek bilgiler
 * bu interface ile belirlenmiştir.
 */
export interface RegisterRequest {

    /*
     * Kullanıcının adı.
     */
    firstName: string;

    /*
     * Kullanıcının soyadı.
     */
    lastName: string;

    /*
     * Kullanıcının e-posta adresi.
     */
    email: string;

    /*
     * Kullanıcının belirlediği şifre.
     *
     * Gerçek projede frontend yalnızca gönderir.
     * Şifre backend tarafında güvenli şekilde hashlenerek saklanmalıdır.
     */
    password: string;
}

/*
 * Login başarılı olduğunda backend'den gelecek cevabı temsil eder.
 *
 * Şu an mock authentication kullanıldığı için
 * aktif olarak kullanılmamaktadır.
 *
 * Gerçek backend entegrasyonunda
 * JWT Token bu yapı içerisinde gelecektir.
 */
export interface AuthResponse {

    /*
     * Kullanıcının JWT Token bilgisi.
     *
     * Sonraki API isteklerinde
     * Authorization Header içinde gönderilecektir.
     */
    token: string;
}