"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound } from "next/navigation";

const fileSchema = z.instanceof(File).refine((file) => file.size > 0, {
  message: "File cannot be empty",
});

const imageSchema = fileSchema.refine(
  (file) => file.type.startsWith("image/"),
  { message: "Must be a valid image file" }
);

const addSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().int().positive("Price must be a positive integer"),
  file: fileSchema,
  image: imageSchema,
});

const AddProduct = async (prevState: unknown, formData: FormData) => {
  const parsedData = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    // Collect all error messages
    const errorMessages = parsedData.error.errors.map((err) => err.message);

    // Join all errors into a single string to return
    return {
      success: false,
      message: errorMessages.join(" ❌ "), // Join all error messages with a comma
    };
  }

  const data = parsedData.data;

  try {
    await fs.mkdir("products", { recursive: true });
    await fs.mkdir("public/products", { recursive: true });

    const fileUUID = crypto.randomUUID();
    const imageUUID = crypto.randomUUID();
    const filePath = `products/${fileUUID}-${data.file.name}`;
    const imagePath = `/products/${imageUUID}-${data.image.name}`;

    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

    await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        filePath,
        imagePath,
      },
    });

    return { success: true, message: "Product added successfully" };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: "Failed to add product. Please try again." };
  }
};


export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {  
  await db.product.update({where: {id}, data:{isAvailableForPurchase}})
}
export async function deleteProduct(id: string) {  
  const product = await db.product.delete({where: {id}})
  if(product == null){return notFound()}

 await fs.unlink(product.filePath)
 await fs.unlink(`public${product.imagePath}`)

}

export default AddProduct;
