"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Calendar as CalendarIcon, Trash } from "lucide-react"
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

const formSchema = z.object({
  description: z.string().min(1),
  expired: z.coerce.date(),
  percent: z.coerce.number()
});

type DiscountFormValues = z.infer<typeof formSchema>

interface DiscountFormProps {
  // initialData: Discount | null;
};

export const OrderForm: React.FC<DiscountFormProps> = ({
  // initialData,
}) => {
  return(
    <>
    
    </>
  );
};