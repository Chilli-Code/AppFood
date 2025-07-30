// lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      // TABS
      home:'Home',
      cart:'Cart',
      profileT:'Profile',

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
      titledetail: 'Details',

      //Notificaciones
      order_deleted:'Order deleted',
      no_orders_yet:'No orders yet',

      // Cart
      your_cart: 'Your Cart',
      payment_summary: 'Payment Summary',
      order_now: 'Order Now',
      cartitem: 'Cart Item',
      total_items: 'Total Items ({{count}})',
      delivery_fee: 'Delivery Fee',
      discount: 'Discount',
      total: 'Total',
      your_cart_is_empty:'Your cart is empty',
      your_order_is_processing:'Your order is processing',
      check_your_notifications:'Check your notifications',

      //Profile
      titleprofile: 'Profile',
      lblphone:'Phone number',
      log_out:'log out',
      //edit profile
      titleeditinfo:'Edit personal data',
      bteditprofile:'Edit Profile',
      lbladdres1:'Address 1 (Home)',
      lbladdres2:'Address 2 (Work)',
      lblgender:'Gender',
      select_genderM:'Male',
      select_genderF:'Female',
      select_gender_placeholder:'Select gender',
      lbladdress:'Address',
      location_loading:'Getting location...',
      locationactual:'Use current location',
      message_update_profile:'Success, profile updated',



      // Ajustes
      setting: 'Settings',
      profile: 'PROFILE',
      push_notification: 'Push Notification',
      location: 'Location',
      dark: 'Dark',
      language: 'Language',
      other: 'OTHER',
      appearance:'Appearance',
      saveInfo: 'Save changes',
      about_ticketis: "About Ticketis",
      privacy_policy: "Privacy Policy",
      terms_and_conditions: "Terms and Conditions",



      //Location Toast
        location_permission_denied: 'Permission denied',
      location_permission_error: 'Could not enable location',
      location_enabled: 'Location enabled',
      location_disabled: 'Location disabled',

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
      //TABS
      home:'Inicio',
      cart:'Carrito',
      profileT:'Perfil',
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
      saveInfo: 'Guardar cambios',
      lblgender:'Genero',
      about_ticketis: "Acerca de Ticketis",
      privacy_policy: "Política de Privacidad",
      terms_and_conditions: "Términos y Condiciones",


      // Location Toast
      location_permission_denied: 'Permiso denegado',
      location_permission_error: 'No se pudo activar la ubicación',
      location_enabled: 'Ubicación activada',
      location_disabled: 'Ubicación desactivada',

      //MenuDetail
      calories: 'Calorias',
      protein: 'Proteina',
      add_cart:'Añadir al carrito',
      freedeliver:'Envío gratuito',
      titledetail: 'Detalles',

      //Notificaciones
      order_deleted:'Pedido eliminado',
      no_orders_yet:'Todavía no hay pedidos',



      //Profile
      titleprofile: 'Perfil',
      lblphone:'Numero de telefono',
      log_out:'Cerrar sesión',
      //edit Profile
      titleeditinfo:'Editar datos personales',
      bteditprofile:'Editar Perfil',
      lbladdres1:'Dirección 1 (Casa)',
      lbladdres2:'Dirección 2 (Trabajo)',
      select_genderM:'Masculino',
      select_genderF:'Femenino',
      lbladdress:'Direccion',
      select_gender_placeholder:'Seleciona género',
      locationactual:'Usar ubicación actual',
      location_loading:'Obteniendo ubicación...',
      message_update_profile:'Éxito, Perfil actualizado',





      //Cart
      payment_summary: 'Resumen de pagos',
      order_now: 'Pedir ahora',
      total_items: 'Total de artículos ({{count}})',
      delivery_fee: 'Costo de envío',
      discount: 'Descuento',
      total: 'Total',
      cartitem: 'Cesta Artículo',
       added_to_cart: "Se ha añadido 1",
      your_cart_is_empty:'Su carrito está vacío',
      your_order_is_processing:'Su pedido está en proceso',
      check_your_notifications:'Revise sus notificaciones',


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
