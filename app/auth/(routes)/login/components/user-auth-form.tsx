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
import { AuthError, ErrorInput, UnknownError } from "@/constants/errors/errors";
import axios from "axios";
import toast from "react-hot-toast";
import { Messages } from "@/constants/notifications/message";

const formSchema = z.object({
    email: z
        .string()
        .min(2, {
            message: `${ErrorInput.MIN_ERROR} 2 kí tự.`,
        })
        .email(),
    password: z.string().min(8, {
        message: `${ErrorInput.MIN_ERROR} 6 kí tự.`,
    }),
});

export function LoginForm() {
    // const { loginResponse, loginIsLoading, loginError, callLoginRefetch } =
    //     LoginApi();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    //
    // useEffect(() => {
    //     if (loginResponse) {
    //         console.log(loginResponse);
    //         localStorage.setItem("token", loginResponse.access_token);
    //         //  cookies().set({
    //         //   name: 'token',
    //         //   value: loginResponse.access_token,
    //         //   httpOnly: true,
    //         // })
    //         redirect("/");
    //     } else if (loginError) {
    //         console.log(loginError);
    //         alert(AuthError.LOGIN_FAILED);
    //     }
    // }, [loginResponse, loginError]);

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("values:::", values);
        // callLoginRefetch(values);
        try {
            setLoading(true);
            await axios.post(`/api/auth/login`, values);
            toast.success(Messages.EMAIL_VALID);
            // redirect("/");
            router.push("/");
        } catch (error) {
            console.log("onSubmit :: Login ::", error);
            toast.error("hahaha");
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
