"use client";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const OrderItem = ({ index, loading = true, products = [] }) => {
    const [idSanPham, setIdSanPham] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [validate, setValidate] = useState(false);
    const form = useFormContext();

    const handleCheckQuantity = (quantity) => {
        let item = products.find((item) => {
            return item.product_id === idSanPham;
        })?.quantity;
        if (quantity <= item) {
            setValidate(false);
            setQuantity(quantity);
        } else {
            setValidate(true);
        }
    };

    return (
        <div className="display-flex w-100">
            <hr></hr>
            <FormField
                control={form.control}
                name="order_detail"
                render={({ field }) => (
                    <FormItem style={{ minWidth: "32%" }}>
                        <FormLabel>Product</FormLabel>
                        <Select
                            onValueChange={(v) => {
                                setIdSanPham(+v);
                                form.setValue(
                                    `order_detail.${index}.product_id`,
                                    v
                                );
                            }}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Product" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {products.map((pr) => {
                                    return (
                                        <SelectItem
                                            key={`${pr.product_id}`}
                                            value={`${pr.product_id}`}
                                        >
                                            {pr.product_name}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => {
                    return (
                        <FormItem style={{ minWidth: "32%" }}>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <div
                                    style={{
                                        padding: "5px 10px",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px",
                                        marginTop: "9px",
                                        height: "40px",
                                    }}
                                >
                                    {
                                        products.find((item) => {
                                            return (
                                                item.product_id === idSanPham
                                            );
                                        })?.price
                                    }
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
            <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem style={{ minWidth: "32%" }}>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="quantity"
                                onChange={(v) => {
                                    handleCheckQuantity(v.target.value);

                                    return form.setValue(
                                        `order_detail.${index}.quantity`,
                                        v.target.value
                                    );
                                }}
                            />
                        </FormControl>
                        {validate ? (
                            <span style={{ color: "red" }}>
                                Nhập quá số lượng
                            </span>
                        ) : (
                            ""
                        )}
                    </FormItem>
                )}
            />
        </div>
    );
};
