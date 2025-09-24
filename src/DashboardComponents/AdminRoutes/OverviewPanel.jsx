import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area, CartesianGrid
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF5'];

const OverviewPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetch("https://disaster-management-website-server.vercel.app/alertPanel")
      .then(res => res.json())
      .then(rawData => {
        setData(rawData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Detect dark mode
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300 text-xl font-semibold">
      Loading...
    </div>
  );

  if (!data.length) return (
    <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300 text-xl font-semibold">
      No data found
    </div>
  );

  const countByType = data.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  const chartDataByType = Object.entries(countByType).map(([key, count]) => ({ _id: key, count }));

  const countBySeverity = data.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] || 0) + 1;
    return acc;
  }, {});
  const chartDataBySeverity = Object.entries(countBySeverity).map(([key, count]) => ({ _id: key, count }));

  const affectedByType = data.reduce((acc, item) => {
    if (!item.affectedPopulation) return acc;
    acc[item.type] = (acc[item.type] || 0) + item.affectedPopulation;
    return acc;
  }, {});
  const chartDataAffectedByType = Object.entries(affectedByType).map(([key, total]) => ({ _id: key, total }));

  const affectedByYear = data.reduce((acc, item) => {
    if (!item.affectedPopulation || !item.year) return acc;
    acc[item.year] = (acc[item.year] || 0) + item.affectedPopulation;
    return acc;
  }, {});
  const chartDataAffectedByYear = Object.entries(affectedByYear)
    .map(([year, total]) => ({ year, total }))
    .sort((a, b) => a.year - b.year);

  const axisTextColor = isDark ? '#e5e7eb' : '#1f2937'; // Tailwind: gray-200 vs gray-800
  const tooltipBg = isDark ? '#1f2937' : '#ffffff'; // gray-800 vs white
  const tooltipText = isDark ? '#e5e7eb' : '#1f2937';

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-indigo-400 drop-shadow-lg mb-12">
        Disaster Overview Panel
      </h2>

      {/* Bar Chart: Count by Type */}
      <section className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
          Disasters by Type (Count)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartDataByType}>
            <XAxis dataKey="_id" stroke={axisTextColor} tick={{ fill: axisTextColor }} />
            <YAxis stroke={axisTextColor} tick={{ fill: axisTextColor }} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: 10 }} itemStyle={{ color: tooltipText }} />
            <Legend />
            <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

  <section className="lg:flex gap-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl transition-colors duration-300">
    {/* Pie Chart Section */}
    <div className="flex-1 mb-10 lg:mb-0">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300 text-center">
        Disasters by Severity (Count)
      </h3>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-inner">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartDataBySeverity}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ name }) => name}
              labelStyle={{ fill: '#fff' }}
            >
              {chartDataBySeverity.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderRadius: 10,
                color: '#fff',
              }}
              itemStyle={{ color: '#fbbf24' }}
            />
            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Bar Chart Section */}
    <div className="flex-1">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300 text-center">
        Total Affected Population by Type
      </h3>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-inner">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartDataAffectedByType}>
            <XAxis
              dataKey="_id"
              stroke={axisTextColor}
             tick={{ fill: axisTextColor }}
            />
            <YAxis stroke={axisTextColor} tick={{ fill: axisTextColor }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderRadius: 10,
                color: '#fff',
              }}
              itemStyle={{ color: '#fbbf24' }}
            />
            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
            <Bar dataKey="total" fill="#fb923c" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </section>


   
      

      {/* Area Chart: Affected by Year */}
      {chartDataAffectedByYear.length > 0 && (
        <section className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-300">
            Affected Population Over Years
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartDataAffectedByYear}>
              <defs>
                <linearGradient id="colorAffected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke={axisTextColor} tick={{ fill: axisTextColor }} />
              <YAxis stroke={axisTextColor} tick={{ fill: axisTextColor }} />
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#cbd5e1'} />
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: 10 }} itemStyle={{ color: tooltipText }} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#6366f1"
                fill="url(#colorAffected)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>
      )}
    </div>
  );
};

export default OverviewPanel;
