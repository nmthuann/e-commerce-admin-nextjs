"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    AuthExceptionMessages,
    ErrorInput,
    MiddlewareError,
} from "@/constants/errors/errors";
import { Position } from "@/types/position.interface";
import ImageUpload from "@/components/ui/image-upload";
import AvatarUpload from "@/components/ui/avatar-upload";
import { useState } from "react";
import { useEmail } from "@/contexts/email.context";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Messages } from "@/constants/notifications/message";
// import { toast } from "@/components/ui/use-toast";
// import { useState } from "react";

/**
 * Yêu cầu:
 *
 * 1. first name
 * 2. last Name
 * 3. gender
 * 4. dob
 * 5. địa chỉ
 * 6. phone
 * 7. avatar_url
 *
 *
 * 1. employee_id
 * // 2. salary
 * // 3. work_status
 * 4. position_id
 */
interface EmployeeFormProps {
    positions: Position[];
    // email?: string;
}

type registerFormValues = z.infer<typeof registerFormSchema>;
const defaultValues: Partial<registerFormValues> = {
    employee_id: "",
    first_name: "",
    last_name: "",
    address: "",
};

export const CreateEmployeeForm: React.FC<EmployeeFormProps> = ({
    positions,
    // email,
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // const { email } = useEmail();
    const params = useParams();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues,
    });

    // 2. Define a submit handler.
    async function onSubmit(values: registerFormValues) {
        console.log(
            `Submit ${JSON.stringify(values, null, 2)} ${params.email}@${
                params.domain
            } `
        );

        const email = `${params.email}@${params.domain}`;
        try {
            setLoading(true);
            const res = await axios.post(`/api/employee/create-employee`, {
                employee_id: values.employee_id,
                avatar_url: values.avatar_url,
                first_name: values.first_name,
                last_name: values.last_name,
                gender: values.gender,
                birthday: values.birthday,
                address: values.address,
                phone: values.phone,
                position_id: values.position_id,
                email: email,
            });
            if (res.status === 400) {
                toast.error(
                    `${AuthExceptionMessages.REGISTER_EMPLOYEE_FAILED} `
                );
                return;
            }
            if (res.data.message === ErrorInput.EMAIL_NOT_FOUND) {
                toast.error(`${ErrorInput.EMAIL_NOT_FOUND} `);
                return;
            }
            if (res.data.message === MiddlewareError.TOKEN_MISSING) {
                toast.error(`${ErrorInput.EMAIL_NOT_FOUND} `);
                return;
            }
            router.push("/employee");
            router.refresh();
            toast.success(Messages.CREATE_EMPLOYEE_SUCCESS);
        } catch (error) {
            console.log("onSubmit :: register ::", error);
            toast.error(`${AuthExceptionMessages.REGISTER_EMPLOYEE_FAILED}`);
        } finally {
            setLoading(false);
        }

        // toast.success(Messages.CREATE_EMPLOYEE_SUCCESS);
        // router.push("/employee");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="avatar_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Background image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* CCCD */}
                <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Căn Cước Công Dân</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Tên  */}
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This is the name that will be displayed on your
                                profile and in emails.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Họ */}
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Surname" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Giới Tính */}
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giới tính</FormLabel>
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
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </FormControl>
                                <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                            </div>
                            {/* <FormDescription>
                                Set the font you want to use in the dashboard.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Sinh nhật */}
                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Chọn ngày</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date.getFullYear() >
                                                new Date().getFullYear() - 18 ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {/* <FormDescription>
                                Your date of birth is used to calculate your
                                age.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Địa Chỉ */}
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa Chỉ</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Address" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Số Điện thoại */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Your Phone number"
                                    {...field}
                                />
                            </FormControl>
                            {/* <FormDescrip+tion>
                                This is the name that will be displayed on your
                                profile and in emails.
                            </FormDescrip+tion> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="position_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chức vụ</FormLabel>
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
                                        {/* <option value="male">Bán hàng</option>
                                        <option value="female">Kho</option>
                                        <option value="other">
                                            Vận chuyển
                                        </option> */}
                                        {positions.map((position: Position) => (
                                            <option
                                                key={position.position_id}
                                                value={position.position_id}
                                            >
                                                {position.position_name}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                            </div>
                            {/* <FormDescription>
                                Set the font you want to use in the dashboard.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Creat</Button>
            </form>
        </Form>
    );
};

const registerFormSchema = z.object({
    avatar_url: z.string().nullish(),
    first_name: z
        .string()
        .min(2, {
            message: `${ErrorInput.MIN_ERROR} 2 kí tự.`,
        })
        .max(10, {
            message: `${ErrorInput.MAX_ERROR} 10 kí tự.`,
        })
        .refine(
            (value) => {
                /**
                 * Sử dụng biểu thức chính quy
                 * để kiểm tra xem giá trị không chứa chỉ khoảng trắng
                 * hoặc không có giá trị
                 */

                return (
                    !/\d/.test(value) &&
                    value.trim() !== "" &&
                    /^[^\s]*$/.test(value)
                );
            },
            {
                message: ErrorInput.NAME_INVALID,
            }
        ),
    last_name: z.string().min(2, {
        message: `${ErrorInput.MIN_ERROR} 2 kí tự.`,
    }),
    position_id: z.string().nonempty({
        message: `${ErrorInput.NOT_FULL_FIELD}`,
    }),
    gender: z.enum(["male", "female", "other"], {
        invalid_type_error: `${ErrorInput.NOT_SELECT_FIELD} giới tính.`,
        required_error: `${ErrorInput.NOT_SELECT_FIELD} giới tính.`,
    }),
    birthday: z.date({
        required_error: `${ErrorInput.NOT_SELECT_FIELD} ngày sinh.`,
    }),
    phone: z.string().refine((value) => /^\d{10}$/.test(value), {
        message: ErrorInput.PHONE_NUMBER_ERROR,
    }),
    address: z.string().nonempty({
        message: `${ErrorInput.NOT_FULL_FIELD}`,
    }),
    // phone: z.coerce // SOLUTION
    //     .number(),

    employee_id: z.string().length(12, {
        message: `${ErrorInput.LENGTH_ERROR} 12 kí tự.`,
    }),
});
