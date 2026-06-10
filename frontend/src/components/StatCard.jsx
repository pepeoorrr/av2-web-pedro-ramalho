export function StatCard({ title, value, icon, color = "blue" }) {
  const getColorClass = () => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
      red: "bg-red-50 text-red-600 border-red-200"
    };
    return colors[color] || colors.blue;
  };
  
  return (
    <div className={`card border-l-4 ${getColorClass()}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`text-4xl opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
