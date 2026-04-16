import type { SupportedLocale } from '@/i18n/locales';

type LoginTranslations = {
  needAccount: string;
  signUp: string;
  welcomeBack: string;
  title: string;
  subtitle: string;
  emailAddress: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  submit: string;
  submitting: string;
  fallbackError: string;
};

export const loginTranslations: Record<SupportedLocale, LoginTranslations> = {
  en: {
    needAccount: 'Need an account?',
    signUp: 'Sign Up',
    welcomeBack: 'Welcome back',
    title: 'Log In',
    subtitle: 'Access your dashboard and continue where you left off.',
    emailAddress: 'Email Address',
    emailPlaceholder: 'email@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    submit: 'Log In',
    submitting: 'Logging In...',
    fallbackError: 'Login failed. Please try again.',
  },
  ro: {
    needAccount: 'Ai nevoie de cont?',
    signUp: 'Înregistrează-te',
    welcomeBack: 'Bine ai revenit',
    title: 'Autentificare',
    subtitle: 'Accesează dashboard-ul tău și continuă de unde ai rămas.',
    emailAddress: 'Adresă de email',
    emailPlaceholder: 'email@exemplu.com',
    password: 'Parolă',
    passwordPlaceholder: 'Introdu parola',
    submit: 'Autentifică-te',
    submitting: 'Se autentifică...',
    fallbackError: 'Autentificarea a eșuat. Te rugăm să încerci din nou.',
  },
  hu: {
    needAccount: 'Nincs fiókod?',
    signUp: 'Regisztráció',
    welcomeBack: 'Üdv újra',
    title: 'Bejelentkezés',
    subtitle: 'Lépj be a vezérlőpultodra, és folytasd, ahol abbahagytad.',
    emailAddress: 'Email cím',
    emailPlaceholder: 'email@pelda.hu',
    password: 'Jelszó',
    passwordPlaceholder: 'Add meg a jelszavad',
    submit: 'Bejelentkezés',
    submitting: 'Bejelentkezés...',
    fallbackError: 'A bejelentkezés sikertelen. Kérlek próbáld újra.',
  },
};
