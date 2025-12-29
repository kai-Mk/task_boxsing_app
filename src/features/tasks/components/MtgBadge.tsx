import { MtgAvailability } from "@prisma/client";

type Props = {
  availability: MtgAvailability;
  size?: "sm" | "md";
};

const MTG_CONFIG = {
  AVAILABLE: {
    label: "MTG可",
    className: "bg-green-100 text-green-700 border-green-300",
  },
  CHAT_ONLY: {
    label: "声掛けOK",
    className: "bg-yellow-100 text-yellow-700 border-yellow-300",
  },
  UNAVAILABLE: {
    label: "MTG不可",
    className: "bg-gray-100 text-gray-500 border-gray-300",
  },
} as const;

const MtgBadge = ({ availability, size = "sm" }: Props) => {
  const config = MTG_CONFIG[availability];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-block rounded-full border font-medium ${config.className} ${sizeClass}`}
    >
      {config.label}
    </span>
  );
};

export default MtgBadge;
