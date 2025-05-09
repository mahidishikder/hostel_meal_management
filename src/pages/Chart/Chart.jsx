import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Chart 1: Meal Category Distribution
const mealCategoryData = [
  { name: 'Breakfast', value: 12 },
  { name: 'Lunch', value: 28 },
  { name: 'Dinner', value: 20 },
  { name: 'Snacks', value: 10 },
];

// Chart 2: Weekly Calorie Intake
const weeklyCalories = [
  { day: 'Sun', calories: 1800 },
  { day: 'Mon', calories: 2000 },
  { day: 'Tue', calories: 1950 },
  { day: 'Wed', calories: 2100 },
  { day: 'Thu', calories: 2050 },
  { day: 'Fri', calories: 2200 },
  { day: 'Sat', calories: 1900 },
];

// Chart 3: Top Consumed Meals
const topMeals = [
  { name: 'Biryani', count: 15 },
  { name: 'Pasta', count: 10 },
  { name: 'Salad', count: 8 },
  { name: 'Burger', count: 6 },
];

// Chart 4: Monthly Meal Expenses
const monthlyExpenses = [
  { month: 'Jan', expense: 250 },
  { month: 'Feb', expense: 200 },
  { month: 'Mar', expense: 300 },
  { month: 'Apr', expense: 280 },
];

const ChartDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Chart 1: Meal Category Pie Chart */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Meal Category Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={mealCategoryData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {mealCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Weekly Calorie Line Chart */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Weekly Calorie Intake</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyCalories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Top Consumed Meals Bar Chart */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Top Consumed Meals</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topMeals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 4: Monthly Meal Expenses Area Chart */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Monthly Meal Expenses</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={monthlyExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="expense" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartDashboard;