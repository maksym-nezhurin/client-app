// typescript
// File: `apps/client/components/sidebar/YearRangePicker.tsx`
import React from 'react';

type YearRange = [number, number];

interface YearRangePickerProps {
    value: YearRange;
    onChange: (v: YearRange) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    labelFrom?: string;
    labelTo?: string;
    ariaFrom?: string;
    ariaTo?: string;
}

export function YearRangePicker({
    value,
    onChange,
    min = 1990,
    max = new Date().getFullYear(),
    step = 1,
    className = '',
    labelFrom = 'From',
    labelTo = 'To',
    ariaFrom = 'from year',
    ariaTo = 'to year',
}: YearRangePickerProps) {
    const [low, high] = value;

    const clamp = (v: number, a = min, b = max) => Math.min(Math.max(v, a), b);

    const setLow = (v: number) => {
        const nv = clamp(Math.min(v, high));
        onChange([nv, high]);
    };

    const setHigh = (v: number) => {
        const nv = clamp(Math.max(v, low));
        onChange([low, nv]);
    };

    const percent = (v: number) => ((v - min) / (max - min)) * 100;

    const trackStyle = {
        background: `linear-gradient(90deg, #e5e7eb ${percent(min)}%, #e5e7eb ${percent(low)}%, #3b82f6 ${percent(low)}%, #3b82f6 ${percent(high)}%, #e5e7eb ${percent(high)}%, #e5e7eb 100%)`,
    } as React.CSSProperties;

    return (
        <div className={`w-full ${className}`}>
            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                <div>
                    {labelFrom}: {low}
                </div>
                <div>
                    {labelTo}: {high}
                </div>
            </div>

            <div className="relative h-8">
                {/* visual track */}
                <div
                    className="absolute inset-0 h-2 top-3 rounded-md"
                    style={trackStyle}
                />

                {/* lower thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={low}
                    onChange={(e) => setLow(Number(e.target.value))}
                    className="absolute w-full h-8 appearance-none bg-transparent pointer-events-none"
                    style={{ zIndex: 3 }}
                />

                {/* upper thumb (separate element to allow independent dragging) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={high}
                    onChange={(e) => setHigh(Number(e.target.value))}
                    className="absolute w-full h-8 appearance-none bg-transparent pointer-events-none"
                    style={{ zIndex: 4 }}
                />

                {/* overlay inputs for actual pointer events (thumbs) */}
                <div className="absolute inset-0 flex items-center justify-between px-0">
                    <div
                        style={{ left: `${percent(low)}%` }}
                        className="transform -translate-x-1/2"
                    >
                        <div className="w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow pointer-events-auto" />
                    </div>
                    <div
                        style={{ left: `${percent(high)}%` }}
                        className="transform -translate-x-1/2"
                    >
                        <div className="w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow pointer-events-auto" />
                    </div>
                </div>
            </div>

            {/* precise numeric inputs */}
            <div className="mt-3 flex gap-2">
                <input
                    aria-label={ariaFrom}
                    type="number"
                    value={low}
                    min={min}
                    max={high}
                    onChange={(e) => setLow(Number(e.target.value || min))}
                    className="w-1/2 px-2 py-1 border rounded"
                />
                <input
                    aria-label={ariaTo}
                    type="number"
                    value={high}
                    min={low}
                    max={max}
                    onChange={(e) => setHigh(Number(e.target.value || max))}
                    className="w-1/2 px-2 py-1 border rounded"
                />
            </div>
        </div>
    );
}
