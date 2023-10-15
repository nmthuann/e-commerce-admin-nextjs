"use client"
import { Position } from "@/types/position.interface";
import { useState } from "react";
import { UserForm } from "./user-form";
import OTPCard from "./otp-verify";



export const CreateEmployee: React.FC= () => {
    const [showOTP, setShowOTP] = useState(true);
    const [showUserForm, setShowUserForm] = useState(false);
    // const [showEmployeeForm, setShowEmployeeForm] = useState(false);

    console.log("showOTP", showOTP);
    console.log("showUserForm", showUserForm);

  const handleOTPConfirm = () => {
    setShowOTP(false);
    setShowUserForm(true);
  };
  
   const handleUserFormConfirm = () => {
    setShowUserForm(false);
    // setShowEmployeeForm(true);
  };

    return (
        <>
        <div className="flex flex-col items-center justify-center mt-4">
            {showOTP && <OTPCard onConfirm={handleOTPConfirm} />}
            {showUserForm && <UserForm onConfirm={handleUserFormConfirm} />}
            {/* {showEmployeeForm && <EmployeeForm positions={positions} />} */}
        </div>

        </>
    )
}