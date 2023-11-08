"use client";

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "./sheet";

interface SheetModalProps {
    title: string;
    description: string;
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const SheetModal: React.FC<SheetModalProps> = ({
    title,
    description,
    open,
    onClose,
    children,
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Sheet open={open} onOpenChange={onChange}>
            {/* <SheetTrigger>Open</SheetTrigger> */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                    <div>{children}</div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

// "use client";

// import { Dialog, Transition } from "@headlessui/react";
// import { X } from "lucide-react";
// import { Fragment } from "react";
// import IconButton from "./icon-button";
// import { Sheet } from "./sheet";

// interface SheetModalProps {
//     open: boolean;
//     onClose: () => void;
//     children: React.ReactNode;
// }

// const SheetModal: React.FC<SheetModalProps> = ({ open, onClose, children }) => {
//     return (
//         <Transition show={open} appear as={Fragment}>
//             <Sheet className="relative z-10" onClose={onClose}>
//                 <div className="fixed inset-0 bg-black bg-opacity-50" />

//                 <div className="fixed inset-0 overflow-y-auto">
//                     <div className="flex min-h-full items-center justify-center p-4 text-center">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 scale-95"
//                             enterTo="opacity-100 scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 scale-100"
//                             leaveTo="opacity-0 scale-95"
//                         >
//                             <Sheet.Panel className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
//                                 <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
//                                     <div className="absolute right-4 top-4">
//                                         <IconButton
//                                             onClick={onClose}
//                                             icon={<X size={15} />}
//                                         />
//                                     </div>
//                                     {children}
//                                 </div>
//                             </Sheet.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Sheet>
//         </Transition>
//     );
// };

// export default SheetModal;
