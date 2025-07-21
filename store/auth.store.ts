import { account, getCurrentUser } from "@/lib/appwrite"; // 👈 asegúrate que `account` esté aquí
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<User | null>;
    logout: () => Promise<void>; // 👈 agrega esto
};

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),

     // 👈 asegúrate que esté importado

fetchAuthenticatedUser: async () => {
  set({ isLoading: true });
  try {
    const userDoc = await getCurrentUser();  // Document de Appwrite

    if (userDoc) {
      // Asumiendo que userDoc tiene todas las propiedades necesarias para User
      const user: User = {
        $id: userDoc.$id,
        $collectionId: userDoc.$collectionId,
        $databaseId: userDoc.$databaseId,
        $createdAt: userDoc.$createdAt,
        $updatedAt: userDoc.$updatedAt,
        $permissions: userDoc.$permissions,
        accountId: userDoc.accountId,
        name: userDoc.name,
        email: userDoc.email,
        avatar: userDoc.avatar,
        role: userDoc.role,
        addresses: userDoc.addresses,
        gender: userDoc.gender,
        phone: userDoc.phone,
        // añade cualquier otro campo que esperes en User
      };

      set({ isAuthenticated: true, user });
      return user;
    } else {
      set({ isAuthenticated: false, user: null });
      return null;
    }
  } catch (e) {
    set({ isAuthenticated: false, user: null });
    return null;
  } finally {
    set({ isLoading: false });
  }
},




// auth.store.ts
logout: async () => {
  try {
    await account.deleteSession("current");
  } catch (err) {
    console.log("Logout failed", err);
  } finally {
    set({ isAuthenticated: false, user: null });
  }
},

}));

export default useAuthStore;
