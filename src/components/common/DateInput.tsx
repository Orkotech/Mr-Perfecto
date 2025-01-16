import React from 'react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
}

export function DateInput({ label, value, onChange, required }: DateInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
        required={required}
      />
    </div>
  );
}