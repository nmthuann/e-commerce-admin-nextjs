// "use client";

// import { useEffect, useState } from "react";

// import { Modal } from "@/components/ui/modal";
// import { Button } from "@/components/ui/button";
// import { IOrderDetail } from "@/types/order-detail.interface";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";

// interface OrderDetailProps {
//     isOpen: boolean;
//     onClose: () => void;
//     loading: boolean;
//     orderDetails: IOrderDetail[];
// }

// export const OrderDetailModal: React.FC<OrderDetailProps> = ({
//     isOpen,
//     onClose,
//     loading,
//     orderDetails,
// }) => {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     if (!isMounted) {
//         return null;
//     }

//     return (
//         <Modal
//             title="Order Detail"
//             description="This action cannot be undone."
//             isOpen={isOpen}
//             onClose={onClose}
//         >
//             <div className="pt-6 space-x-2 flex items-center justify-end w-full">
//                 {orderDetails.map((orderDetail: IOrderDetail) => (
//                     <div>
//                         <Label>Tên Model</Label>
//                         <Input
//                             type="text"
//                             value={orderDetail.product.model_name}
//                             readOnly
//                         />
//                         <Label>Số lượng mua</Label>
//                         <Input
//                             type="text"
//                             value={orderDetail.quantity}
//                             readOnly
//                         />
//                     </div>
//                 ))}
//                 <Button disabled={loading} variant="outline" onClick={onClose}>
//                     Close
//                 </Button>
//             </div>
//         </Modal>
//     );
// };
