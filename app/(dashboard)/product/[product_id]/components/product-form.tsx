"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/ui/image-upload"
import { Checkbox } from "@/components/ui/checkbox"
import { Product } from "@/types/product.interface"
import { Category } from "@/types/category.interface"
import { Image } from "@/types/image.interface"
import { useOrigin } from "@/hooks/use-origin"
import { Discount } from "@/types/discount.interface"

const formSchema = z.object({
  product_name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  unit_price: z.coerce.number().min(1),
  quatity: z.coerce.number().min(1),
  category_id: z.coerce.number().min(1),
  brand: z.string().min(1),
  orgin: z.string().min(1),
  isDiscount: z.boolean().default(false).optional(),
  isStatus: z.boolean().default(false).optional()
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product &
  {
    images: Image []
  } | null | undefined;
  categories: Category[],
  discounts: Discount[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  discounts,
  // Images
}) => {
  const params = useParams();
  const router = useRouter();

const origin = useOrigin();
  const baseUrl = `${origin}`
  const URL=`${process.env.NEXT_PUBLIC_API_URL}/product`

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
    price: parseFloat(String(initialData?.price)),
    unit_price: parseFloat(String(initialData?.unit_price)),
    //category_id: parseInt(String(initialData?.__category__.category_id)) || undefined,
    quantity: parseFloat(String(initialData?.quantity)),
  } : {
    product_name: '',
    images: [],
    price: 0,
    unit_price: 0,
    category_id: 1,
    quantity: 0,
    brand: '',
    orgin: '',
    isDiscount: false,
    isStatus: false,
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`${URL}/update/${parseInt(params.product_id as string)}`, data);
      } else {
        await axios.post(`${URL}/create`, data);
      }
      router.refresh();
      router.push(`/product`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${URL}/delete/${parseInt(params.product_id as string)}`);
      router.refresh();
      router.push(`/products`);
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  {/* <ImageUpload 
                    value = {
                      field.value?.map((image) => image.url ) || []
                    } 
                    disabled={loading} 
                    onChange={(url) => field.onChange([field.value, { url }])}
                    onRemove={(url) => field.onChange([field.value.filter((current) => current.url !== url)])}
                  /> */}

                   <ImageUpload 
                    value={field.value?.map((image) => image.url) || []  } 
                    disabled={loading} 
                    // onChange={(url) => field.onChange([...field.value, { url }])}
                    onChange={(url) => {
                      if (Array.isArray(field.value)) {
                        field.onChange([...field.value, { url }]);
                      } else {
                        // If field.value is not an array, handle it appropriately, for example:
                        field.onChange([{ url }]);
                      }
                    }}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    disabled={loading} 
                    onValueChange={field.onChange} 
                    value={String(field.value) || undefined} 
                    defaultValue={String(field.value) }>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem 
                            key={category.category_id} 
                            value={category.category_id.toString()}>{category.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="orgin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orgin</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="orgin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* <FormField
              control={form.control}
              name="isDiscount"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Featured
                    </FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            /> */}

            <FormField
    control={form.control}
    name="isDiscount"
    render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
            <Checkbox
            checked={field.value}
            // @ts-ignore
            onCheckedChange={field.onChange}
            />
        </FormControl>
        <div className="space-y-1 leading-none">
            <FormLabel>
            Featured
            </FormLabel>
            <FormDescription>
            This product will appear on the home page
            </FormDescription>
        </div>
        {/* Conditionally render the Select based on the checkbox value */}
        {field.value && (
            <Select
            disabled={loading}
            onValueChange={field.onChange}
            value={field.value.toString()}
            defaultValue={field.value.toString()}
            >
            <FormControl>
                <SelectTrigger>
                <SelectValue  placeholder="Select a Discount" />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {discounts.map((discount) => (
                <SelectItem
                    key={discount.discount_id}
                    value={discount.discount_id.toString()}
                >
                    {discount.description}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        )}
        </FormItem>
    )}
    />



            <FormField
              control={form.control}
              name="isStatus"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};