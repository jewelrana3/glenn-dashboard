'use client';

import { useEffect, useState } from 'react';

interface Order {
    id: string | number;
    date: string;
    orderNumber: string;
    userName: string;
    location: string;
    offer: string;
    orderItem: string;
    price: string;
    service: string;
    status: [string, string];
}

export default function useData(url: string) {
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}
