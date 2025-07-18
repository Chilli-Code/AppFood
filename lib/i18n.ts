// lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      //login
      create_explore: 'Crear una cuenta o iniciar sesión para explorar',
      get_started: 'Get Started now',

      //inicio
      provide_best_food: 'Provide the best food for you',
      your_location: 'Your Location',
      summer_combo: "SUMMER COMBO",
      burger_bash: "BURGER BASH",
      pizza_party: "PIZZA PARTY",
      burrito_delight: "BURRITO DELIGHT",

      //search
      search: 'Search',
      find_your_favorite_food: 'Find your favorite food',
      nothing_matched_your_search: 'Nothing matched your search',
      try_different_search_term: 'Try a different search term or check for typos.',
      search_placeholder: "Search for pizzas, burgers...",
      all: "All",
      wraps: "Wraps",
      salads: "Salads",
      burgers: "Burgers",
      from:'From',


      //MenuDetails
      calories: 'Calories',
      protein: 'Protein',
      add_cart:'Add to cart',
      freedeliver:'Free Delivery',
      added_to_cart: "1 has been added",

      // Cart
      your_cart: 'Your Cart',
      payment_summary: 'Payment Summary',
      order_now: 'Order Now',
      cartitem: 'Cart Item',
      total_items: 'Total Items ({{count}})',
      delivery_fee: 'Delivery Fee',
      discount: 'Discount',
      total: 'Total',

      // Ajustes
      setting: 'Settings',
      profile: 'PROFILE',
      push_notification: 'Push Notification',
      location: 'Location',
      dark: 'Dark',
      language: 'Language',
      other: 'OTHER',
      appearance:'Appearance',

      // Pantallas / flujos generales
      add_to_cart: 'Add to cart',
      notifications: 'Notifications',
      create_or_login_explore: 'Create an account or log in to explore',
      dont_have_account: "Don't have an account",
      sign_up: 'Sign Up',
      enter_password: 'Enter your Password',
      enter_email: 'Enter your Email',
      lbemail: 'Email',
      lbpassword:'Password',
      email_address: 'email-address',
      password: 'Password',
      sign_in: 'Sign In',
      enter_full_name: 'Enter your full name',
      lbfullname:'Full name',
      already_have_account: 'Already have an account?',
      youre_all_set: "You're all set to continue where you left off.",
      login_successful: 'Login Successful',
      go_to_homepage: 'Go to Homepage',
      enjoy_service: 'Enjoy our service',
      close:'Close',
      hello:'¡Hello!',

    },
  },

  es: {
    translation: {
      //login
      create_explore: 'Cree una cuenta o inicie sesión para explorar',
      get_started: 'Empieza ahora',

      //inicio
      summer_combo: "Combo de Verano",
      burger_bash: "Festival de Hamburguesas",
      pizza_party: "Fiesta de Pizza",
      burrito_delight: "Delicia de Burrito",

      //seacrh
      search: 'Buscar',
      find_your_favorite_food: 'Encuentra tu comida favorita',
      nothing_matched_your_search: 'Nada coincide con tu búsqueda',
      try_different_search_term: 'Prueba con otro término de búsqueda o verifica errores tipográficos.',
      search_placeholder: "Busca pizzas, hamburguesas...",
      all: "Todos",
      wraps: "Enrollados",
      salads: "Ensaladas",
      burgers: "Hamburguesas",
      from:'Desde',


      // Ajustes
      setting: 'Configuración',
      appearance:'Apariencia',
      profile: 'PERFIL',
      push_notification: 'Notificaciones',
      location: 'Ubicación',
      dark: 'Oscuro',
      language: 'Idioma',
      other: 'OTROS',

      //MenuDetail
      calories: 'Calorias',
      protein: 'Proteina',
      add_cart:'Añadir al carrito',
      freedeliver:'Envío gratuito',


      //Cart
      payment_summary: 'Resumen de pagos',
      order_now: 'Pedir ahora',
      total_items: 'Total de artículos ({{count}})',
      delivery_fee: 'Costo de envío',
      discount: 'Descuento',
      total: 'Total',
      cartitem: 'Cesta Artículo',
       added_to_cart: "Se ha añadido 1",

      // Pantallas / flujos generales
      add_to_cart: 'Añadir al carrito',
      provide_best_food: 'Te ofrecemos la mejor comida',
      your_cart: 'Tu carrito',
      notifications: 'Notificationes',
      create_or_login_explore: 'Crea una cuenta o inicia sesión para explorar',
      dont_have_account: '¿No tienes una cuenta?',
      sign_up: 'Registrarse',
      enter_password: 'Introduce tu contraseña',
      enter_email: 'Introduce tu correo electrónico',
      lbemail:'Correo',
      lbpassword:'contraseña',
      email_address: 'correo electrónico',
      password: 'Contraseña',
      sign_in: 'Iniciar sesión',
      enter_full_name: 'Introduce tu nombre completo',
      lbfullname:'Nombre Completo',
      your_location: 'Tu ubicación',
      already_have_account: '¿Ya tienes una cuenta?',
      youre_all_set: 'Todo listo para continuar donde lo dejaste.',
      login_successful: 'Inicio de sesión exitoso',
      go_to_homepage: 'Ir a la página principal',
      enjoy_service: 'Disfruta de nuestro servicio',
      close:'Cerrar',
      hello:'¡Hola!',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
