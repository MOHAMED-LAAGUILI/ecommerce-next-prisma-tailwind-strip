"use client";

import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Loading from "./../../../../components/Loading";
import { formatCurrency } from "@/lib/formatters";
import { useLoading } from "@/context/loading-context";
import { toast } from "react-toastify";
import AddProduct from "../../_actions/ProductsActions";

export default function AdminProducts() {
  const { isLoading } = useLoading();
  const [formState, formAction] = useFormState(AddProduct, {
    success: false,
    message: "",
  });

  // Initialize the state with empty strings instead of undefined
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priceInCent, setPriceInCent] = useState<number>(0);

  useEffect(() => {
    // Show toast only when form state changes
    if (formState?.success) {
      toast.success(formState.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
      });
    } else if (formState?.message) {
      toast.error("All fields are required");
    }
  }, [formState]); // Depend on formState to only trigger on change

  if (isLoading) return <Loading />;

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        <div>{pending ? "Saving..." : "Save Product"}</div>
      </Button>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Move ToastContainer here for global toast handling */}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Enter the details for the new product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={1}
                id="description"
                name="description"
              />
            </div>
            <div>
              <Label htmlFor="price">
                Price (in cents) {formatCurrency((priceInCent || 0) / 100)}
              </Label>
              <Input
                value={priceInCent}
                onChange={(e) => setPriceInCent(Number(e.target.value) || 0)}
                type="number"
                id="price"
                name="price"
                min={0}
                max={100000}
              />
            </div>
            <div>
              <Label htmlFor="file">Product File</Label>
              <Input type="file" id="file" name="file" />
            </div>
            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input type="file" id="image" name="image" accept="image/*" />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
