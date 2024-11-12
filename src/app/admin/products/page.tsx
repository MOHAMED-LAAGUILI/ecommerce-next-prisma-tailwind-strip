
import React from 'react';
import { Plus } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableHeader } from '@/components/ui/table';
import db from '@/db/db';
import { formatCurrency } from '@/lib/formatters';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteDropItem, ProductActiveToggle } from './productsActions';


interface Product {
  id: string;
  name: string;
  price: number;
  isAvailableForPurchase: boolean;
  _count: {
    orders: number;
  };
}

const AdminProducts = async () => {
  let products: Product[] = [];
  
  
  try {
    products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        isAvailableForPurchase: true,
        _count: { select: { orders: true } },
      },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const activityHeaders = ["#", "Name", "Price", "Orders", "Actions"];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-20 py-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-100">Manage Products</h1>
        <Link href="/admin/products/new">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Plus className="mr-2 h-5 w-5" /> Add Product
          </button>
        </Link>
      </div>
      {products.length === 0 ? (
       <div>No product available for the moment</div>
      ) : (
        <Table className="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
          <TableHeader className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
            <tr>
              {activityHeaders.map((header, index) => (
                <th key={index} className="px-4 sm:px-6 py-3 text-left font-semibold uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <td className="px-4 sm:px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                  {product.isAvailableForPurchase ? "✅" : "❌"} {product.name}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-300">{formatCurrency(product.price)}</td>
                <td className="px-4 sm:px-6 py-4 text-center">{product._count.orders}</td>
                <td className="px-4 sm:px-6 py-4">
   
 

                <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='dark:text-black dark:bg-white'>⌘</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem >
            <a href={`/admin/products/${product.id}/download`}>
               Download
              </a>
          </DropdownMenuItem>
          <DropdownMenuItem >
            <Link href={`/admin/products/${product.id}/edit`}>
               Edit
              </Link>
          </DropdownMenuItem>
          <ProductActiveToggle id={product.id} isAvailableForPurchase={product.isAvailableForPurchase}/>
          <DeleteDropItem  id={product.id}  disabled={product._count.orders>0} />
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>

                
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminProducts;
