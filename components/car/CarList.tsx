'use client';

import { Button } from '@/components/ui/Button';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SidebarFilters } from '@/components/sidebar/SidebarFilters'
import CarItem from '@/components/car/CarItem';
import Link from 'next/link';
import { ICar } from '@/types/car';

interface IProps {
    cars: ICar[],
}

const queryClient = new QueryClient();

export function CarList(props: IProps) {
    const { cars } = props;

    const onFilterChange = (filter) => {
        console.log('change', filter);
    }

    return (
        <QueryClientProvider client={queryClient}>
            {/* Filters Section */}
            <div className="gap-4 relative">
                <SidebarFilters onFilterChange={onFilterChange} />

                <div>
                    <div className='h-[calc(100vh-300px)] overflow-scroll'>
                    {/* Car Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <Link key={car.id} href={`/cars/${car.id}`} className="block">
                                <CarItem car={car} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-4 pt-4">
                    <Button variant="outline">Previous</Button>
                    <span className="text-muted-foreground">Page 1 of 5</span>
                    <Button variant="outline">Next</Button>
                </div>
            </div>
                
            </div>
       </QueryClientProvider>
    )
}