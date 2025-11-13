'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils'; // Replace with your clsx or utility method

export interface SelectOption {
  label: string;
  value: string;
}

interface BaseSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  emptyLabel?: string;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  className,
  id,
  name,
  emptyLabel = 'No options',
}: BaseSelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onChange} disabled={disabled}>
      <RadixSelect.Trigger
        id={id}
        name={name}
        className={cn(
          'inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-label={placeholder}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="ml-2 text-gray-400">
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className="z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
          position="popper"
        >
          <RadixSelect.Viewport className="p-1 max-h-[60vh]">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">{emptyLabel}</div>
            ) : (
              options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm text-gray-900 hover:bg-blue-100 focus:outline-none',
                    value === option.value && 'bg-blue-500 text-white'
                  )}
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute right-2">
                    <CheckIcon />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))
            )}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
