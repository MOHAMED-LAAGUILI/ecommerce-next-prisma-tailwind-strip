'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLoading } from '@/context/loading-context';
import Loading from './../../../components/Loading';
import Table from '@/components/Table';

const AdminProducts = () => {
    const { isLoading } = useLoading();

    // Local state to control loader visibility and activity rows data
    const [activityRows] = useState([]); // State for fetched data


     if (isLoading) return <Loading/>



    const activityHeaders = ["#", "Name", "Price", "Orders", "Actions"];

    return (
        <div className="min-h-screen px-4 lg:px-20 py-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Products</h1>
                <Link href="/admin/products/new">
                    <button className="flex items-center px-4 py-2 bg-gray-800 text-white rounded shadow-2xl dark:bg-white dark:text-black  hover:bg-green-600 transition">
                        <Plus className="mr-2" />
                        Add New Product
                    </button>
                </Link>
            </div>

            {/* Table Section */}
            {isLoading ? (
                <><Loading /></>
            ) : (
                <><Table headers={activityHeaders} rows={activityRows} title={'Products'} /></>
            )}
        </div>
    );
};

export default AdminProducts;
