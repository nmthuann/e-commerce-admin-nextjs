"use client"

import * as z from "zod"

import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
// ... (other imports and code)

const userFormSchema = z.object({
  first_name: z.string().min(2).max(50).optional(),
  last_name: z.string().min(2).max(50).optional(),
  avatar_url: z.string().optional(),
  gender: z.string().optional(),
  birthday: z.date(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  // ... (other props)
  onConfirm: () => void;
};

export const UserForm: React.FC<UserFormProps> = ({
  // ... (other props)
   onConfirm
}) => {
  // ... (other state and variables)

  const router = useRouter();

  
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    

  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      avatar_url: '',
      gender: '',
      birthday: new Date(),
      address: '',
      phone: '',
    },
  });

  const onSubmitUser = async (data: UserFormValues) => {
    try {
      setLoading(true);
      await axios.post(`/api/employee/create-user`, data);
      // router.refresh();
      router.push(`/employee/create/user-form`);
      toast.success('User created!.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  //  // Call onSubmit when the form is submitted
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Your form submission logic

    // Call the onSubmit prop
    onConfirm();
  };

  return (
     <>
    <Form {...userForm}>
      <form onSubmit={userForm.handleSubmit(onSubmitUser)} className="space-y-8 w-full">
        <div className="md:grid md:grid-cols-3 gap-8">

          <FormField
            control={userForm.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={userForm.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          

           <FormField
          control={userForm.control}
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
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
            control={userForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={userForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Gender </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Gender" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={userForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Phone </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />




          {/* Repeat for other fields */}
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          Confirm
        </Button>
      </form>
    </Form>
    </>
  );
};
