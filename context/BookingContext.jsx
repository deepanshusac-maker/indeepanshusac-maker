"use client";

import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [prefillTreatment, setPrefillTreatment] = useState("");

    const openBookingModal = (treatment = "") => {
        setPrefillTreatment(treatment);
        setIsOpen(true);
    };

    const closeBookingModal = () => {
        setIsOpen(false);
        setPrefillTreatment("");
    };

    return (
        <BookingContext.Provider
            value={{
                isOpen,
                prefillTreatment,
                openBookingModal,
                closeBookingModal,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
