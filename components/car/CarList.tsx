'use client';

import { Button } from '@/components/ui/Button';
import { useState, useEffect, useMemo } from 'react';
import CarItem from '@/components/car/CarItem';
import Link from 'next/link';
import { ICar } from '@/types/car';
import { Filters } from '@/components/sidebar/SidebarFilters';

interface IProps {
    cars: [] | ICar[];
    page: number;
    pages: number;
    rent?: boolean;
    limit: number;
    filters?: Filters;
    search?: string;
    sort?: string;
    condition?: string;
}

export function CarList(props: IProps) {
    const { limit, rent, filters, search = '', sort = 'newest' } = props;
    const [cars, setCars] = useState(props.cars);
    const [page, setPage] = useState(props.page);
    const [pages, setPages] = useState(props.pages);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePage = (p: number) => {
        if (p > 0 && p <= pages) {
            setPage(p);
        }
    }

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/cars?page=${page}&limit=${limit}${rent && '&isRentable=true'}`
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch cars');
                const { success, pagination, data } = await res.json();

                if (!success) {
                    throw new Error('Failed to fetch cars data');
                }

                setPages(pagination.pages);
                setCars(data);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [page, limit, rent]);

    const filteredCars = useMemo(() => {
        let result = [...cars];

        const searchValue = search.trim().toLowerCase();
        if (searchValue) {
            result = result.filter((car) => {
                return (
                    car.brand.toLowerCase().includes(searchValue) ||
                    car.model.toLowerCase().includes(searchValue) ||
                    car.description.toLowerCase().includes(searchValue)
                );
            });
        }

        if (filters) {
            const brand = typeof filters.brand === 'string' ? filters.brand.toLowerCase() : '';
            const model = typeof filters.model === 'string' ? filters.model.toLowerCase() : '';
            const fromYear = typeof filters.fromYear === 'number' ? filters.fromYear : Number(filters.fromYear);
            const toYear = typeof filters.toYear === 'number' ? filters.toYear : Number(filters.toYear);
            const maxPrice = typeof filters.maxPrice === 'string' ? Number(filters.maxPrice) : Number(filters.maxPrice);
            const type = typeof filters.type === 'string' ? filters.type.toLowerCase() : '';

            if (brand) {
                result = result.filter((car) => car.brand.toLowerCase().includes(brand));
            }
            if (model) {
                result = result.filter((car) => car.model.toLowerCase().includes(model));
            }
            if (type) {
                result = result.filter((car) => car.type.toLowerCase().includes(type));
            }
            if (!Number.isNaN(fromYear)) {
                result = result.filter((car) => car.year >= fromYear);
            }
            if (!Number.isNaN(toYear)) {
                result = result.filter((car) => car.year <= toYear);
            }
            if (!Number.isNaN(maxPrice) && maxPrice > 0) {
                result = result.filter((car) => car.price <= maxPrice);
            }
        }

        if (sort === 'price_low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_high') {
            result.sort((a, b) => b.price - a.price);
        } else {
            result.sort((a, b) => b.year - a.year);
        }

        return result;
    }, [cars, filters, search, sort]);

    return (
        <div className="space-y-6">
            {isLoading && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
                    Loading cars...
                </div>
            )}
            {/* Car Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {filteredCars.map((car) => (
                    <Link key={car.id} href={`/browse/${car.id}`} className="block">
                        <CarItem car={car} />
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 pt-4">
                <Button variant="outline" onClick={() => handleChangePage(page - 1)}>Previous</Button>
                <span className="text-muted-foreground">Page {page} of {pages}</span>
                <Button variant="outline" onClick={() => handleChangePage(page + 1)}>Next</Button>
            </div>
        </div>
    )
}