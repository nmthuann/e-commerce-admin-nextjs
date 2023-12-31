"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";

import { Product } from "@/types/product.interface";
import { Category } from "@/types/category.interface";
import { Image } from "@/types/image.interface";
import { Discount } from "@/types/discount.interface";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/switch";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/image-upload";
import { ProductError, UnknownError } from "@/constants/errors/errors";
import { Messages, SuccessMessages } from "@/constants/notifications/message";

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData: Product;
    // | (Product
    //      & {
    //       images: Image[];
    //   })
    // | null;

    categories: Category[];
    discounts: Discount[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
    categories,
    discounts,
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // const { control, handleSubmit, setValue, getValues } = useForm();
    // const [isFormChanged, setFormChanged] = useState(false);
    // const [initialFormState, setInitialFormState] = useState({});
    // const { register, handleSubmit } = useForm();

    const defaultValues: ProductFormValues = {
        status: initialData.status,
        battery: initialData.battery,
        behind_camera: initialData.behind_camera,
        category_id: initialData.category.category_id as number,
        color: initialData.color,
        description: initialData.description,
        discount_id: initialData.category.category_id,
        front_camera: initialData.front_camera,
        hardware: initialData.hardware,
        memory: initialData.memory,
        model_name: initialData.model_name,
        operation_system: initialData.operation_system,
        price: initialData.price,
        quantity: initialData.quantity,
        ram: initialData.ram,
        screen: initialData.screen,
        unit_price: initialData.unit_price,
        vote: initialData.vote,
        images: initialData.images,
    };

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    /**
     *
     * @param values
     * @returns
     * 1. Values === defaultValues
     * 2. 1 field thay đổi giá trị
     * 3. nhiều field thay đổi giá trị
     */
    const onSubmit = async (values: ProductFormValues) => {
        console.log(`Submit ${JSON.stringify(values, null, 2)} `);
        //toast.success("Bạn không thay đổi gì cả!");
        const check: boolean = areObjectsEqual(values, defaultValues);
        if (check) {
            toast.success("Bạn không thay đổi gì!");
            router.push(`/product`);
            router.refresh();
            return;
        } else {
            try {
                await axios.put(
                    `/api/product/${parseInt(params.product_id as string)}`,
                    values
                );
                router.refresh();
                router.push(`/product`);
                toast.success(SuccessMessages.PRODUCT_UPDATED);
            } catch (error: AxiosError | any) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        toast.error(`${ProductError.PRODUCT_CREATE_FAILED}`);
                        return;
                    }
                }
            }
        }

        // try {
        //     setLoading(true);
        //     console.log(initialData);
        //     await axios.put(
        //         `/api/product/${parseInt(params.product_id as string)}`,
        //         values
        //     );
        //     router.refresh();
        //     router.push(`/product`);
        //     toast.success(Product updated.);
        // } catch (error: any) {
        //     toast.error("Something went wrong.");
        // } finally {
        //     setLoading(false);
        // }
    };

    const onDelete = async () => {
        try {
            // setLoading(true);
            // await axios.delete(`/api/product/${params.product_id}`);
            router.push(`/product`);
            router.refresh();
            toast.success(SuccessMessages.PRODUCT_DELETED);
        } catch (error: any) {
            toast.error(UnknownError.SOMETHING_WRONG);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title="Edit product" description="Edit product." />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />

            {/* FORM CREAT PRODUCT */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={(field.value || []).map(
                                            (image) => image.url
                                        )}
                                        disabled={loading}
                                        onChange={(url: any) => {
                                            // Kiểm tra xem field.value có tồn tại không
                                            if (field.value) {
                                                field.onChange([
                                                    ...field.value,
                                                    { url },
                                                ]);
                                            } else {
                                                // Nếu field.value không tồn tại, tạo một mảng mới
                                                field.onChange([{ url }]);
                                            }
                                        }}
                                        onRemove={(url) => {
                                            // Kiểm tra xem field.value có tồn tại không
                                            if (field.value) {
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (current) =>
                                                            current.url !== url
                                                    ),
                                                ]);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="md:grid md:grid-cols-3 gap-8 ">
                        {/* HÃNG ĐIỆN THOẠI - CATEGORY */}
                        {/* CATEGORY */}

                        <FormField
                            control={form.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hãng điện thoại</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "outline",
                                                    }),
                                                    "w-[200px] appearance-none bg-transparent font-normal"
                                                )}
                                                {...field}
                                            >
                                                {categories.map(
                                                    (category: Category) => (
                                                        <option
                                                            key={
                                                                category.category_id
                                                            }
                                                            value={
                                                                category.category_id
                                                            }
                                                        >
                                                            {
                                                                category.category_name
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </FormControl>
                                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* TÊN DÒNG SẢN PHẨM - MODEL NAME */}
                        <FormField
                            control={form.control}
                            name="model_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên model sản phẩm</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Model name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* QUANTITY */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số lượng sản phẩm</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập thông tin PIN ..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giá Bán</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="9.99"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Unit Price */}
                        <FormField
                            control={form.control}
                            name="unit_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Giá Nhập</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="9.99"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* VOTE */}
                        <FormField
                            control={form.control}
                            name="vote"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lượt bình chọn</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="9.99"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* SCREEN */}
                        <FormField
                            control={form.control}
                            name="screen"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kích Thước Màn Hình</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Your Phone number"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* MEMORY */}
                        <FormField
                            control={form.control}
                            name="memory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dung lượng Bộ Nhớ</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập thông tin Bộ nhớ ..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* OPERATION SYSTEM */}
                        <FormField
                            control={form.control}
                            name="operation_system"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>OS</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Hệ điều hành của thiết bị ..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* HARDWARE */}
                        <FormField
                            control={form.control}
                            name="hardware"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hardware</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Phần cứng thiết bị ..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* COLOR */}
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Màu sắc</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "outline",
                                                    }),
                                                    "w-[200px] appearance-none bg-transparent font-normal"
                                                )}
                                                {...field}
                                            >
                                                <option value="red">Đỏ</option>
                                                <option value="black">
                                                    Đen
                                                </option>
                                                <option value="blue">
                                                    Xanh Dương
                                                </option>
                                                <option value="gray">
                                                    Xám
                                                </option>
                                                <option value="white">
                                                    Trắng
                                                </option>
                                                <option value="other">
                                                    Khác
                                                </option>
                                            </select>
                                        </FormControl>
                                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* DISCOUNT */}
                        <FormField
                            control={form.control}
                            name="discount_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount Code</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "outline",
                                                    }),
                                                    "w-[200px] appearance-none bg-transparent font-normal"
                                                )}
                                                {...field}
                                            >
                                                {discounts.map(
                                                    (discount: Discount) => (
                                                        <option
                                                            key={
                                                                discount.discount_id
                                                            }
                                                            value={
                                                                discount.discount_id
                                                            }
                                                        >
                                                            {
                                                                discount.description
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </FormControl>
                                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* STATUS */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Trạng Thái Hoạt Động
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* BATTERY */}
                        <FormField
                            control={form.control}
                            name="battery"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dung lượng PIN</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập thông tin PIN ..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* FRONT CAMERA */}
                        <FormField
                            control={form.control}
                            name="front_camera"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Camera trước</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập thông tin Cam Trước ..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* BEHIND CAMERA */}
                        <FormField
                            control={form.control}
                            name="behind_camera"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Camera Sau</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập thông tin Cam Sau ..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* RAM */}
                        <FormField
                            control={form.control}
                            name="ram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ram</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập thông tin Ram ... "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* DESCRIPTION */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô tả sản phẩm</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={loading}
                                            placeholder="Nhập mô tả sản phẩm ..."
                                            {...field}
                                        />
                                        {/* <Input /> */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">Save changes</Button>
                </form>
            </Form>
        </>
    );
};

const formSchema = z.object({
    images: z.object({ url: z.string() }).array().optional(),
    model_name: z.string().min(1),
    quantity: z.coerce.number().min(1),
    category_id: z.coerce.number().min(1),
    price: z.coerce.number().min(1),
    unit_price: z.coerce.number().min(1),
    vote: z.coerce.number().min(0),
    discount_id: z.coerce.number().min(1),
    operation_system: z.string().min(1),
    hardware: z.string().min(1),
    status: z.boolean().default(true),
    color: z.string().min(1),
    battery: z.coerce.number().min(1),

    front_camera: z.coerce.number().min(1),
    behind_camera: z.coerce.number().min(1),
    screen: z.coerce.number().min(1),
    memory: z.coerce.number().min(1),
    ram: z.coerce.number().min(1),

    description: z.string().min(1),
});

function areObjectsEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // let changedField: string | null = null;

    if (keys1.length !== keys2.length) {
        return false;
    }

    //  Array is images
    for (const key of keys1) {
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            // If both values are arrays, compare the 'url' property
            // delete images
            if (obj1[key].length !== obj2[key].length) {
                return false;
            }

            for (let i = 0; i < obj1[key].length; i++) {
                if (obj1[key][i].url !== obj2[key][i].url) {
                    return false;
                }
            }
        } else if (obj1[key] !== obj2[key]) {
            // handle here
            // if (changedField === null) {
            //     changedField = key;
            // } else {
            //     return false;
            // }
            return false;
        }
    }

    return true;
}

// enum Color {
//     Red = "red",
//     Black = "black",
//     Gray = "gray",
//     Blue = "blue",
//     White = "white",
//     Yellow = "yellow",
//     Other = "other",
// }
