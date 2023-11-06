"use client";

import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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

import { Category } from "@/types/category.interface";
import { Discount } from "@/types/discount.interface";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ProductError, SystemError } from "@/constants/errors/errors";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/image-upload";
import { Messages } from "@/constants/notifications/message";

type CreateProductFormValues = z.infer<typeof formSchema>;

interface CreateProductFormProps {
    categories: Category[];
    discounts: Discount[];
}
const defaultValues: Partial<CreateProductFormValues> = {
    // images: [],
};

export const CreateProductForm: React.FC<CreateProductFormProps> = ({
    categories,
    discounts,
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    //const params = useParams();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    //async function onSubmit(values: CreateProductFormValues) {
    const onSubmit = async (values: CreateProductFormValues) => {
        if (values.unit_price > values.price) {
            // Nếu điều kiện không thỏa mãn, hiển thị thông báo lỗi
            form.setError("unit_price", {
                type: "manual",
                message: ProductError.CHECK_INPUT_PRICE,
            });
            return;
        } else {
            // Nếu điều kiện thỏa mãn, xóa thông báo lỗi nếu có
            form.clearErrors("unit_price");
        }
        console.log(`Submit ${JSON.stringify(values, null, 2)} `);

        try {
            //setLoading(true);
            const res = await axios.post(`/api/product/create`, values);

            if (res.data.message === ProductError.PRODUCT_DUPLICATE) {
                console.log("await res.data", await res.data);
                toast.error(ProductError.PRODUCT_DUPLICATE);
                return;
            } else {
                router.push("/product");
                router.refresh();
                toast.success(Messages.CREATE_PRODUCT_SUCCESS);
            }
        } catch (error: AxiosError | any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    toast.error(`${ProductError.PRODUCT_CREATE_FAILED}`);
                    return;
                }
            }

            toast.error(SystemError.INTERNAL_SERVER_ERROR);
        }
        // finally {
        //     setLoading(false);
        // }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {}} //onDelete
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Create product"
                    description="Add a new product"
                />
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
                                        // disabled={loading}
                                        onChange={(url) => {
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
                                    <FormLabel>Model Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            // disabled={loading}
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
                                            placeholder="Nhập Số lượng sản phẩm ..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* WARRANTY */}
                        <FormField
                            control={form.control}
                            name="warranty_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời gian bảo hành</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập Thời gian bảo hành ..."
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
                                            // disabled={loading}
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
                                            // disabled={loading}
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
                                            // disabled={loading}
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
                                            // disabled={loading}
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
                                                <option value="yellow">
                                                    Vàng
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
                                            // disabled={loading}
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

                    <Button type="submit">Xác Nhận</Button>
                </form>
            </Form>
        </>
    );
};

const formSchema = z.object({
    images: z.object({ url: z.string() }).array(), //.optional(),
    model_name: z.string().min(1),
    quantity: z.coerce.number().min(1),
    category_id: z.coerce.number().min(1),
    price: z.coerce.number().min(1),
    unit_price: z.coerce.number().min(1),
    // vote: z.coerce.number().min(1),
    discount_id: z.coerce.number().min(1),
    operation_system: z.string().min(1),
    hardware: z.string().min(1),
    // status: z.boolean().default(false),
    color: z.string().min(1),
    battery: z.coerce.number().min(1),
    front_camera: z.coerce.number().min(1),
    behind_camera: z.coerce.number().min(1),
    screen: z.coerce.number().min(1),
    memory: z.coerce.number().min(1),
    ram: z.coerce.number().min(1),
    description: z.string().min(1),
    warranty_time: z.coerce.number().min(1),
});

// const title = initialData ? "Edit product" : "Create product";
// const description = initialData ? "Edit a product." : "Add a new product";
// const toastMessage = initialData ? "Product updated." : "Product created.";
// const action = initialData ? "Save changes" : "Create";
