// components/WithRoleProtection.tsx
import useAuthStore from "@/store/auth.store";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

const WithRoleProtection = ({
  allowedRoles,
  children,
}: {
  allowedRoles: ("cliente" | "repartidor")[];
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) return <ActivityIndicator />;

  if (!isAuthenticated || !allowedRoles.includes(user?.role as any)) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
};

export default WithRoleProtection;
