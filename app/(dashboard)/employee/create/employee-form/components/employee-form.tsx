"use client"

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Position } from '@/types/position.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useForm, } from 'react-hook-form';
import toast from 'react-hot-toast';


import * as z from "zod"


const employeeFormSchema = z.object({
  employee_id: z.string().min(12),
  salary: z.string(),
  position_id: z.number(),
  // work_status: true
});
type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

interface EmployeeFormProps {
  positions: Position[],
};



export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  // ... (other props)
  positions
}) => {

    const router = useRouter();


    // const [value, setValue] = React.useState("")
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("")


    const employeeForm = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
        employee_id: '',
        salary: '',
        position_id: 1,
    },
  });

  // submit -> button
  const onSubmit  = async (data: EmployeeFormValues) => {
    try {
      setLoading(true);
      await axios.post(`/api/employee`, data);
      
      router.push('/employee');
      router.refresh();
      toast.success('Employee created!.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


    return (
         <>
        <Form {...employeeForm}>
      <form onSubmit={employeeForm.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="md:grid md:grid-cols-3 gap-8">

          <FormField
            control={employeeForm.control}
            name="employee_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CCCD</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="CCCD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={employeeForm.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input 
                    disabled={loading} 
                    type='number' 
                    placeholder="Salary" {...field} 
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          

        <FormField
          control={employeeForm.control}
          name="position_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Position</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    >
                {value
  //               {value
  //             ? shippingOptions.find((shipping) => 
  // shipping.shipping_name.toUpperCase() === value.toUpperCase())?.shipping_name
            ? positions.find((position) => position.position_name.toUpperCase() === value.toUpperCase())?.position_id
            : "Select Position..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No position found.</CommandEmpty>
          <CommandGroup>
            {positions.map((position) => (
              <CommandItem
                key={position.position_id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === String(position.position_id) ? "opacity-100" : "opacity-0"
                  )}
                />
                {position.position_name}
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </Command>
                </PopoverContent>
                </Popover>
              <FormDescription>
                Your postion is used in where you work.
              </FormDescription>
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
    )


}











