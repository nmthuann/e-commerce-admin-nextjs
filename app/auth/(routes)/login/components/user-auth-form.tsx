"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LoginApi } from "@/actions/auth/login";
import { redirect, useRouter } from "next/navigation";
import {
    AuthError,
    AuthExceptionMessages,
    ErrorInput,
    UnknownError,
} from "@/constants/errors/errors";
import axios from "axios";
import toast from "react-hot-toast";
import { Messages } from "@/constants/notifications/message";
import { useAppDispatch } from "@/redux/hook";
import { authActions } from "@/redux/features/auth-slice";
// import { authActions } from "@/redux/store";
// import { useAuth } from "@/providers/auth-provider";
// import { useAppDispatch } from "@/redux/hook";
// import { authActions } from "@/redux/reducers/auth-slice";

const formSchema = z.object({
    email: z
        .string()
        .min(2, {
            message: `${ErrorInput.MIN_ERROR} 2 kí tự.`,
        })
        .email({
            message: ErrorInput.EMAIL_INVALID,
        }),
    password: z.string().min(8, {
        message: `${ErrorInput.MIN_ERROR} 6 kí tự.`,
    }),
});

export function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // const { login } = useAuth();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log("values:::", values);
        // callLoginRefetch(values);
        try {
            setLoading(true);
            const res = await axios.post(`/api/auth/login`, values);
            if (res.data.message) {
                toast.error(res.data.message);
                return;
            }

            // replace in here
            // login({
            //     email: values.email,
            //     name: await res.data.first_name,
            //     avatar_url: await res.data.avatar_url,
            //     position: await res.data.position,
            // });

            // bổ sung redux
            dispatch(
                authActions.login({
                    email: values.email,
                    name: await res.data.first_name,
                    avatar_url: await res.data.avatar_url,
                    position: await res.data.position,
                })
            );

            toast.success(Messages.EMAIL_VALID);
            router.push("/");
        } catch (error) {
            console.log("onSubmit :: Login ::", error);
            toast.error(AuthExceptionMessages.LOGIN_FAILED);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    // ame="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@mail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="*******"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className="ml-auto" type="submit">
                    Đăng nhập
                </Button>
            </form>
        </Form>
    );
}
