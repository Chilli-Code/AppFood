import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { images } from "@/constants";
import { createUser } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
          const { t } = useTranslation();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showModal, setShowModal] = useState(false); // Estado para controlar la modal

  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const submit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password)
      return Alert.alert("Error", "Please enter valid data.");

    setIsSubmitting(true);

    try {
      
      await createUser({ name, email, password });


      
      setShowModal(true);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToHome = () => {
    setShowModal(false);
    setIsAuthenticated(true); 
    router.replace("/");
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder={t('enter_full_name')}
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label={t('lbfullname')}
      />
      <CustomInput
        placeholder={t('enter_email')}
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label={t('lbemail')}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder={t('enter_password')}
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label={t('lbpassword')}
        secureTextEntry={true}
      />

      <CustomButton
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          {t('already_have_account')}
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          {t('sign_in')}
        </Link>
      </View>

      {/* Modal de éxito con fondo borroso simulado */}
      <Modal
        animationType="slide" // Animación desde abajo
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1">
          {/* Fondo borroso simulado */}
          <View
            className="absolute w-full h-full bg-gray-800 bg-opacity-50"
            style={{ opacity: 0.5 }} // Ajusta la opacidad para simular desenfoque
          />
          {/* Contenedor de la modal desde abajo */}
          <View className="absolute bottom-0 w-full bg-white rounded-t-2xl p-6">

            {/* Icono de éxito */}
            <View className="flex items-center mb-4">
              <Image
                source={images.success} // Ícono de éxito (check naranja)
                className="w-[202px] h-[168px]"
              />
            </View>

            {/* Texto */}
            <Text className="text-center text-2xl font-semibold text-dark-100 mb-2">
              Login Successful
            </Text>
            <Text className="text-center font-medium text-gray-100 mb-6">
              You're all set to continue where you left off.
            </Text>

            {/* Botón */}
            <TouchableOpacity
              className="bg-primary rounded-lg py-3"
              style={{ borderRadius: 100 }}
              onPress={handleGoToHome}
            >
              <Text className="text-center text-white font-semibold">
                Go to Homepage
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignUp;