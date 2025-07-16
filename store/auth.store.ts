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

    fetchAuthenticatedUser: () => Promise<void>;
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
    const user = await getCurrentUser(); // 👈 usa tu función personalizada
    if (user) set({ isAuthenticated: true, user: user as User });
    else set({ isAuthenticated: false, user: null });
  } catch (e) {
    console.log('fetchAuthenticatedUser Error', e);
    set({ isAuthenticated: false, user: null });
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
