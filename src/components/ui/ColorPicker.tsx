"use client";

import { TaskColor } from "@prisma/client";

type ColorPickerProps = {
  label: string;
  value: TaskColor;
  onChange: (color: TaskColor) => void;
  error?: string;
  required?: boolean;
};

const COLOR_OPTIONS: { value: TaskColor; bg: string; ring: string }[] = [
  { value: "RED", bg: "bg-red-300", ring: "ring-red-500" },
  { value: "ORANGE", bg: "bg-orange-300", ring: "ring-orange-500" },
  { value: "YELLOW", bg: "bg-yellow-300", ring: "ring-yellow-500" },
  { value: "GREEN", bg: "bg-green-300", ring: "ring-green-500" },
  { value: "BLUE", bg: "bg-blue-300", ring: "ring-blue-500" },
  { value: "PURPLE", bg: "bg-purple-300", ring: "ring-purple-500" },
  { value: "PINK", bg: "bg-pink-300", ring: "ring-pink-500" },
  { value: "GRAY", bg: "bg-gray-300", ring: "ring-gray-500" },
];

const ColorPicker = ({
  label,
  value,
  onChange,
  error,
  required = false,
}: ColorPickerProps) => {
  return (
    <div className="relative pb-3">
      <div className="flex items-baseline gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {required && (
          <span className="text-xs text-white bg-red-500 px-1.5 py-0.5 rounded">必須</span>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {COLOR_OPTIONS.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={`
              w-6 h-6 rounded-full transition-all
              ${color.bg}
              ${
                value === color.value
                  ? `ring-2 ring-offset-1 ${color.ring}`
                  : "hover:scale-110"
              }
            `}
            aria-label={color.value}
          />
        ))}
      </div>
      {error && (
        <p className="absolute -bottom-3 left-0 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default ColorPicker;
