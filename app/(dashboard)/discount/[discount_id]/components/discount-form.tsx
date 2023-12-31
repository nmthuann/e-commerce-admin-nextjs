"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Calendar as CalendarIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Discount } from "@/types/discount.interface";
// import { useOrigin } from "@/hooks/use-origin";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    format,
    formatISO,
    formatISO9075,
    formatRelative,
    isValid,
} from "date-fns";

const formSchema = z.object({
    description: z.string().min(1),
    expired: z.coerce.date(),
    percent: z.coerce.number(),
});

type DiscountFormValues = z.infer<typeof formSchema>;

interface DiscountFormProps {
    initialData: Discount | null;
}

export const DiscountForm: React.FC<DiscountFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    // const origin = useOrigin();
    // const baseUrl = `${origin}`;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/discount`;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Discount" : "Create Discount";
    const description = initialData ? "Edit a Discount." : "Add a new Discount";
    const toastMessage = initialData
        ? "Discount updated."
        : "Discount created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<DiscountFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            description: "",
            expired: new Date(),
            percent: 0,
        },
    });

    const onSubmit = async (data: DiscountFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                // console.log(`${URL}}/update/${params.discount_id}`)
                await axios.put(`/api/discount/${params.discount_id}`, data);
            } else {
                // console.log(`${baseUrl}`,baseUrl)
                await axios.post(`/api/discount`, data);
            }
            router.refresh();
            router.push(`/discount`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/discount/${params.discount_id}`);
            router.refresh();
            router.push(`/discount`);
            toast.success("discount deleted.");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all products using this discount first."
            );
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
                <Heading title={title} description={description} />
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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expired"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>
                                        Expired time of Discount
                                    </FormLabel>
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
                                                    {/* {
                      isValid(field.value)  ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>
                        {format(field.value, "PPP")}
                        </span>
                      )} */}
                                                    {isValid(field.value) ? (
                                                        <span>
                                                            {format(
                                                                field.value,
                                                                "PPP"
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            Invalid Date
                                                        </span>
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
                                                initialFocus
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                fromYear={new Date(
                                                    Date.now()
                                                ).getFullYear()}
                                                toYear={
                                                    new Date().getFullYear() +
                                                    20
                                                }
                                                disabled={
                                                    (date: any) =>
                                                        date < Date.now()
                                                    // ||
                                                    // date <
                                                    //     new Date(
                                                    //         "2050-01-01"
                                                    //     )
                                                    //new Date("2050-01-01")
                                                    //   || date <
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of sale is used to calculate
                                        your expired time of discount.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="percent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Percent</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            type="number" // Chỉnh kiểu dữ liệu thành "number"
                                            step="1" // (Nếu yêu cầu) Chỉnh số bước nhảy khi thay đổi giá trị
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
