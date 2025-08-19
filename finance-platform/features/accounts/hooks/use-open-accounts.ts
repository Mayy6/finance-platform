import {create} from "zustand";
type OpenAccountsState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useOpenAccounts = create<OpenAccountsState>((set) => ({
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
 