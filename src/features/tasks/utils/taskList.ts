/**
 * TaskColor から Tailwind クラスを取得
 */
export const getColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    RED: "bg-red-300",
    ORANGE: "bg-orange-300",
    YELLOW: "bg-yellow-300",
    GREEN: "bg-green-300",
    BLUE: "bg-blue-300",
    PURPLE: "bg-purple-300",
    PINK: "bg-pink-300",
    GRAY: "bg-gray-300",
  };
  return colorMap[color] || "bg-gray-300";
};
