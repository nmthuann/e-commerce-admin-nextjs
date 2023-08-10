"use client"
import { Metadata } from "next"
import Image from "next/image"

import { cn } from "@/lib/utils"
import OTPCard from "./components/share-document"
import { useState } from "react"
import { UserForm } from "./components/profile-form"




export const metadata: Metadata = {
  title: "Create Employee",
  description: "Examples of cards built using the components.",
}

// function DemoContainer({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn(
//         "flex items-center justify-center [&>div]:w-full",
//         className
//       )}
//       {...props}
//     />
//   )
// }

export default function EmployeePage() {

     const [isVerified, setIsVerified] = useState(false);

  const handleOTPVerified = () => {
    setIsVerified(true);
  };


  return (
    <>
      <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          {/* <DemoContainer> */}
            {/* <DemoShareDocument />
            <OTPCard/> */}
            {isVerified ? (
                <UserForm /> // Render the user information form if verified
            ) : (
                <OTPCard onVerified={handleOTPVerified} /> // Render the OTPCard if not verified
            )}
          {/* </DemoContainer> */}
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
        </div>
      </div>
    </>
  )
}