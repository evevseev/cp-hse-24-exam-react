import create from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      userData: {
        firstName: "Evgeny",
        lastName: "Evseev",
        email: "example@mail.com",
        hashedPassword: "SAHDnjldfsbuwe",
      },
      setUserData: (newData) =>
        set(() => ({ userData: { ...get().userData, ...newData } })),
    }),
    { name: "user-storage" },
  ),
);
