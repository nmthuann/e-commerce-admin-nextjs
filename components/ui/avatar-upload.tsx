"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    value: string | null; // Thay đổi kiểu dữ liệu của 'value' thành 'string | null'
}

const AvatarUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    value,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    const onRemove = () => {
        onChange(""); // Xóa hình ảnh bằng cách đặt giá trị thành null
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            {value ? (
                <div className="mb-4 flex items-center gap-4">
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={onRemove}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img className="object-cover" alt="Image" src={value} />
                    </div>
                </div>
            ) : (
                <CldUploadWidget onUpload={onUpload} uploadPreset="fnqd5dfv">
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
            )}
        </div>
    );
};

export default AvatarUpload;
