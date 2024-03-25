import create from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: new Date(),
        hashedPassword: "",
      },
      setUserData: (newData) =>
        set(() => ({ userData: { ...get().userData, ...newData } })),
    }),
    { name: "user-storage" },
  ),
);
