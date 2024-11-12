// hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import db from '@/db/db';
import { useLoading } from '@/context/loading-context';



export async function fetchSalesData() {
    const sales = await db?.order.aggregate({
        _sum: { PricePaid: true },
        _count: true,
    });
    return {
        amount: (sales?._sum.PricePaid || 0) / 100,
        numberOfSales: sales._count,
    };
}

export async function fetchProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        db?.product.count({ where: { isAvailableForPurchase: true } }),
        db?.product.count({ where: { isAvailableForPurchase: false } }),
    ]);
    return { activeCount, inactiveCount };
}

export async function fetchUserData() {
    const [usersCount, ordersData] = await Promise.all([
        db?.user.count(),
        db?.order.aggregate({
            _sum: { PricePaid: true },
        }),
    ]);
    return {
        usersCount,
        averageValuePerUser:
            usersCount === 0 ? 0 : (ordersData._sum.PricePaid || 0) / usersCount / 100,
    };
}

export function useDashboardData() {
    const { setIsLoading } = useLoading(); // Access loading state
    const [salesData, setSalesData] = useState({ amount: 0, numberOfSales: 0 });
    const [userData, setUserData] = useState({ usersCount: 0, averageValuePerUser: 0 });
    const [productData, setProductData] = useState({ activeCount: 0, inactiveCount: 0 });

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true); // Start loading

            try {
                const [sales, users, products] = await Promise.all([
                    fetchSalesData(),
                    fetchUserData(),
                    fetchProductData(),
                ]);

                // Simulate delay for all fetches before updating the state

                setSalesData(sales);
                setUserData(users);
                setProductData(products);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        }

        fetchData();
    }, [setIsLoading]);

    return { salesData, userData, productData };
}
