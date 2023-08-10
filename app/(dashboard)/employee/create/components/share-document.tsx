// "use client"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"

// export function DemoShareDocument() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Share this document</CardTitle>
//         <CardDescription>
//           Anyone with the link can view this document.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex space-x-2">
//           <Input value="http://example.com/link/to/document" readOnly />
//           <Button variant="secondary" className="shrink-0">
//             Copy Link
//           </Button>
//         </div>
//         <Separator className="my-4" />
//         <div className="space-y-4">
//           <h4 className="text-sm font-medium">People with access</h4>
//           <div className="grid gap-6">
//             <div className="flex items-center justify-between space-x-4">
//               <div className="flex items-center space-x-4">
//                 <Avatar>
//                   <AvatarImage src="/avatars/03.png" />
//                   <AvatarFallback>OM</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-sm font-medium leading-none">
//                     Olivia Martin
//                   </p>
//                   <p className="text-sm text-muted-foreground">m@example.com</p>
//                 </div>
//               </div>
//               <Select defaultValue="edit">
//                 <SelectTrigger className="ml-auto w-[110px]">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="edit">Can edit</SelectItem>
//                   <SelectItem value="view">Can view</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex items-center justify-between space-x-4">
//               <div className="flex items-center space-x-4">
//                 <Avatar>
//                   <AvatarImage src="/avatars/05.png" />
//                   <AvatarFallback>IN</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-sm font-medium leading-none">
//                     Isabella Nguyen
//                   </p>
//                   <p className="text-sm text-muted-foreground">b@example.com</p>
//                 </div>
//               </div>
//               <Select defaultValue="view">
//                 <SelectTrigger className="ml-auto w-[110px]">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="edit">Can edit</SelectItem>
//                   <SelectItem value="view">Can view</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex items-center justify-between space-x-4">
//               <div className="flex items-center space-x-4">
//                 <Avatar>
//                   <AvatarImage src="/avatars/01.png" />
//                   <AvatarFallback>SD</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-sm font-medium leading-none">
//                     Sofia Davis
//                   </p>
//                   <p className="text-sm text-muted-foreground">p@example.com</p>
//                 </div>
//               </div>
//               <Select defaultValue="view">
//                 <SelectTrigger className="ml-auto w-[110px]">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="edit">Can edit</SelectItem>
//                   <SelectItem value="view">Can view</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// "use client"
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import React, { useState } from 'react';


// export const OTPCard = () => {
//   const [otp, setOTP] = useState('');

//   const handleConfirm = () => {
//     // Implement the logic to handle the OTP confirmation here
//     console.log('OTP Confirmed:', otp);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Enter OTP</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-col space-y-4">
//           <Input
//             value={otp}
//             onChange={(e) => setOTP(e.target.value)}
//             placeholder="Enter OTP"
//           />
//           <Button onClick={handleConfirm}>Confirm</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default OTPCard;

"use client"
import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface OTPCardProps {
  onVerified: () => void;
}


export const OTPCard: React.FC<OTPCardProps> = ({ onVerified }) => {
  const [otp, setOTP] = useState('');
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      const response = await axios.post('/api/employee/verify-otp', { otp }); // Replace with your API endpoint
      if (response.data.success) {
        onVerified(); // Call the onVerified function to trigger the navigation
      } else {
        setVerificationError('adadaa'); //'Invalid OTP'
      }
    } catch (error) {
      console.error('API Error:', error);
      setVerificationError('An error occurred during verification');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter OTP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Input
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            placeholder="Enter OTP"
          />
          {verificationError && <p className="text-red-500">{verificationError}</p>}
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPCard;

