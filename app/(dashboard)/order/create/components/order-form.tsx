"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { OrderItem } from "./order-item"
import { toast } from "react-hot-toast"
import { Calendar as CalendarIcon, Check, ChevronsUpDown, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Discount } from "@/types/discount.interface"
import { useOrigin } from "@/hooks/use-origin"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, formatISO, formatISO9075, formatRelative, isValid } from "date-fns"
import { Payment } from "@/types/payment.interface"
import { Shipping } from "@/types/shipping.interface"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product } from "@/types/product.interface"
import { log } from "console"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"

// const productSchema = z.array(
//   z.object({
//     product_id: z.number(),
//     quantity: z.string(),
//   })
// );


// const formSchema = z.object({
//   products: z.array(z.string()), // Assuming you're using product IDs as strings
//   category_name: z.string().min(2),
//   description: z.string().min(1),
// });

// type OrderFormValues = z.infer<typeof formSchema>

interface OrderFormProps {
  payments: Payment[] ,
  shippings: Shipping[],
  products: Product[],
};

export const OrderForm: React.FC<OrderFormProps> = ({
  payments,
  shippings,
  products
}) => {
  
  const router = useRouter();

  //const [open, setOpen] = useState(false);
  const [countRow, setCountRow] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
    // const [openShipping, setOpenShipping] = useState(false);

    //   const [openPayment, setOpenPayment] = useState(false);
    //     const [value, setValue] = useState("")

  const form = useForm()
 useEffect(()=>{form.reset({
  order_detail:[]
 })
},[]);
 const onSubmit  = async (data: any) => {
    try {
      console.log(data);
      alert("acx")
      setLoading(true);
      await axios.post(`/api/order`, data);
      router.refresh();
      router.push('/employee');  // ăn gian
      toast.success('Order created!.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

 const handleThem = () =>{
  setCountRow(countRow+1);
 }

 const [idShipping, setIdShipping] = useState();
 const handleChangShipping = (event: any) =>{
  setIdShipping(event);
 }

 console.log(idShipping);

  return(
    <>
      <Separator />
       <Heading title="Create New Order Offline" description="Manage Order for your store" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full display-flex">

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem style={{width:"48%"}}>
                <FormLabel>Contact (Phone)</FormLabel>
                <FormControl>
                  <Input 
                    disabled={loading} 
                    placeholder="Contact" {...field} 
                    />
                </FormControl>
                
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="shipping_id"
  render={({ field }) => (
    <FormItem style={{ width: "48%", marginTop: "0px" }}>
      <FormLabel>Shipping</FormLabel>
      <FormControl>
        <Select
         onValueChange={(v) => {
                                form.setValue(
                                    `shipping_id`,
                                    v
                                );
                            }}
        >
          {/* {...field?.value} */}
          {/* onValueChange={handleChangShipping} */}
          <SelectTrigger>
            <SelectValue placeholder="Shipping" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Shipping</SelectLabel>
              {shippings.map((shipping) => (
                <SelectItem 
                  key={shipping.shipping_id}
                  value={String(shipping.shipping_id)}
                >
                  {shipping.shipping_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  )}
/>

          <FormField
            control={form.control}
            name="employee_id"
            render={({ field }) => (
              <FormItem className="w-32">
                <FormLabel>Employee</FormLabel>
                <FormControl>
                  <Input 
                    disabled={loading} 
                    placeholder="employee" {...field} 
                    />
                </FormControl>
                
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="discount_id"
            render={({ field }) => (
              <FormItem className="w-32">
                <FormLabel>Discount ID</FormLabel>
                <FormControl>
                  <Input 
                    disabled={loading} 
                    placeholder="discount Id" {...field} 
                    />
                </FormControl>
                
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="delivery_address"
            render={({ field }) => (
              <FormItem className="w-32">
                <FormLabel>Delivery address</FormLabel>
                <FormControl>
                  <Input 
                    disabled={loading} 
                    placeholder="delivery addres" {...field} 
                    />
                </FormControl>
                
              </FormItem>
            )}
          />


          {Array.from({ length: countRow }).map((_, index) => (
          <OrderItem key={index} products={products} index={index} />
        ))}
        <Button disabled={loading} onClick={()=>onSubmit} className="ml-auto" type="submit">
            Create
          </Button>
        </form>
          <Button className="ml-auto" onClick={handleThem}>
           + Thêm
          </Button>
      </Form>
      
    </>
  );
};


  //               {value
  //             ? shippingOptions.find((shipping) => 
  // shipping.shipping_name.toUpperCase() === value.toUpperCase())?.shipping_name