export function StatCard({ title, value, icon, color = "blue" }) {
  const getColorClass = () => {
    const colors = {
      blue: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border-blue-200 shadow-blue-100",
      green: "bg-gradient-to-br from-green-50 to-green-100 text-green-600 border-green-200 shadow-green-100",
      yellow: "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600 border-yellow-200 shadow-yellow-100",
      red: "bg-gradient-to-br from-red-50 to-red-100 text-red-600 border-red-200 shadow-red-100"
    };
    return colors[color] || colors.blue;
  };
  
  return (
    <div className={`card border-l-4 ${getColorClass()} hover:shadow-2xl cursor-default`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">{title}</p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-5xl opacity-30 hover:opacity-50 transition-opacity`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 h-1 bg-gradient-to-r from-current to-transparent rounded-full opacity-20"></div>
    </div>
  );
}
