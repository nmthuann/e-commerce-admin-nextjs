"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { imageOptimizer } from "next/dist/server/image-optimizer";
import toast from "react-hot-toast";
import { ProductError } from "@/constants/errors/errors";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    // const cldUploadWidgetRef = useRef(null);

    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onClose = () => {
        // if (cldUploadWidgetRef.current) {
        //     // Close the Cloudinary upload widget if it's open
        //     cldUploadWidgetRef.current.close();
        // }
        setIsWidgetOpen(false);
    };

    const onUpload = (result: any) => {
        if (result.info && result.info.resource_type === "image") {
            onChange(result.info.secure_url);
            // Thực hiện các thao tác sau khi tải lên thành công
        } else {
            onRemove(result.info.secure_url);
            onClose();
            toast.error(ProductError.IMAGE_WRONG_FAIL);
        }
        // onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    const cloudinaryOptions = {
        encryption: {
            type: "unsigned",
        },
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            {/* allowedFormats={["jpg", "jpeg", "png", "gif"]} // Cho phép các định
            dạng ảnh phổ biến maxFileSize={50 * 1024 * 1024} */}
            <CldUploadWidget
                onUpload={onUpload}
                uploadPreset="fnqd5dfv"
                // clientAllowedFormats={["webp", "gif", "video"]}
                // maxFileSize="5500000"
                //options={cloudinaryOptions}
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
