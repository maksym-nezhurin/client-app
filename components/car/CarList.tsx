'use client';

import { Button } from '@/components/ui/Button';
import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SidebarFilters } from '@/components/sidebar/SidebarFilters'
import CarItem from '@/components/car/CarItem';
import Link from 'next/link';
import { ICar } from '@/types/car';

interface IProps {
    cars: [] | ICar[];
    page: number;
    pages: number;
    rent?: boolean;
    limit: number;
}

const queryClient = new QueryClient();

export function CarList(props: IProps) {
    const isFirstRender = useRef(true);
    const { limit } = props;
    const [cars, setCars] = useState(props.cars);
    const [page, setPage] = useState(props.page);
    const [pages, setPages] = useState(props.pages);

    const onFilterChange = (filter) => {
        console.log('change', filter);
    }

    const handleChangePage = (p) => {
        if (p > 0 && p <= pages) {
            setPage(p);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/cars?page=${page}&limit=${limit}${props.rent && '&isRentable=true'}`
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch cars');
            const { success, pagination, data } = await res.json();

            if (!success) {
                throw new Error('Failed to fetch cars data');
            }

            setPages(pagination.pages);
            setCars(data);
        }

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        getData();
    }, [page, limit]);

    return (
        <QueryClientProvider client={queryClient}>
            {/* Filters Section */}
            <div className="gap-4 relative">
                <SidebarFilters onFilterChange={onFilterChange} />

                <div>
                    <div className='h-[calc(100vh-300px)] overflow-scroll p-8'>
                    {/* Car Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <Link key={car.id} href={`/browse/${car.id}`} className="block">
                                <CarItem car={car} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-4 pt-4">
                    <Button variant="outline" onClick={() => handleChangePage(page - 1)}>Previous</Button>
                    <span className="text-muted-foreground">Page {page} of {pages}</span>
                    <Button variant="outline" onClick={() => handleChangePage(page + 1)}>Next</Button>
                </div>
            </div>
                
            </div>
       </QueryClientProvider>
    )
}