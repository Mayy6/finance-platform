import {create} from "zustand";

// the create of zustand is used to create a store for managing the state of the new account sheet
// this store will be used to control the visibility of the new account sheet in the UI
// it provides methods to open and close the sheet, and a boolean state to track if the sheet is open or closed

type NewAcctState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewAcct = create<NewAcctState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));    