"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
// import { Billboard, Category } from "@prisma/client"
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category } from "@/types/category.interface";
// import { useOrigin } from "@/hooks/use-origin";
import { Textarea } from "@/components/ui/textarea";

// const URL=`${process.env.NEXT_PUBLIC_API_URL}/category`

const formSchema = z.object({
    category_name: z.string().min(2),
    description: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
    initialData: Category | null;
    // description: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    // billboards
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category." : "Add a new category";
    const toastMessage = initialData
        ? "Category updated."
        : "Category created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema), // useState
        defaultValues: initialData || {
            category_name: "",
            description: "",
        },
    });

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                // console.log(`${URL}}/update/${params.category_id}`)
                await axios.put(
                    `/api/category/${parseInt(
                        params.category_id as string,
                        10
                    )}`,
                    data
                );
            } else {
                // console.log(`${baseUrl}`,baseUrl)
                await axios.post(`/api/category`, data);
            }
            router.refresh();
            router.push(`/category`);
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
            await axios.delete(`/api/category/${params.category_id}`);
            router.refresh();
            router.push(`/category`);
            toast.success("Category deleted.");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all products using this category first."
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
                            name="category_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Category name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    {/* <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}> */}
                                    <FormControl>
                                        {/* <Input disabled={loading} placeholder="Description" {...field}  /> */}
                                        <Textarea
                                            disabled={loading}
                                            placeholder="Description"
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
