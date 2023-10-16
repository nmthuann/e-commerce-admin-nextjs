import React, { createContext, useContext } from "react";

// Định nghĩa kiểu dữ liệu cho dữ liệu bạn muốn truyền
type EmailData = {
    email: string;
};

// Tạo một Context với kiểu dữ liệu EmailData
const EmailContext = createContext<EmailData | undefined>(undefined);

// Tạo hook custom để sử dụng Context
export function useEmail() {
    const context = useContext(EmailContext);
    if (!context) {
        throw new Error("useEmail must be used within an EmailProvider");
    }
    return context;
}

// Tạo Provider cho Context
export function EmailProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: EmailData;
}) {
    return (
        <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
    );
}
