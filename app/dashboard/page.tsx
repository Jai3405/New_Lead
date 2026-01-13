"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, AlertTriangle, Activity, BarChart3 } from "lucide-react";

const data = [
  { name: 'Jan', spend: 4000, revenue: 2400 },
  { name: 'Feb', spend: 3000, revenue: 1398 },
  { name: 'Mar', spend: 2000, revenue: 9800 },
  { name: 'Apr', spend: 2780, revenue: 3908 },
  { name: 'May', spend: 1890, revenue: 4800 },
  { name: 'Jun', spend: 2390, revenue: 3800 },
  { name: 'Jul', spend: 3490, revenue: 4300 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard Overview</h1>
        <p className="text-zinc-500">Welcome back, Sarah. Here's how your campaigns are performing.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KpiCard 
          title="Total Revenue" 
          value="$124,500" 
          change="+12.5%" 
          trend="up" 
          icon={<DollarSign className="text-indigo-600" size={20} />} 
        />
        <KpiCard 
          title="Active Campaigns" 
          value="8" 
          change="+2" 
          trend="up" 
          icon={<Activity className="text-violet-600" size={20} />} 
        />
        <KpiCard 
          title="Avg. ROAS" 
          value="3.2x" 
          change="-0.4" 
          trend="down" 
          icon={<BarChart3 className="text-fuchsia-600" size={20} />} 
        />
        <KpiCard 
          title="Fraud Prevented" 
          value="$12,450" 
          change="High" 
          trend="up" 
          icon={<AlertTriangle className="text-red-500" size={20} />} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-zinc-900">Spend vs. Revenue</h3>
            <select className="text-sm border-zinc-200 rounded-md text-zinc-500">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#f4f4f5'}}
                />
                <Bar dataKey="spend" name="Ad Spend" fill="#e4e4e7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts / Fraud Watch */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
           <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
             <AlertTriangle size={18} className="text-red-500" />
             Fraud Alerts
           </h3>
           <div className="space-y-4">
             <AlertItem 
               user="@lifestyle_emma"
               issue="Bot Spike Detected"
               time="2h ago"
               severity="high"
             />
             <AlertItem 
               user="@fitness_mike"
               issue="Engagement Pod"
               time="5h ago"
               severity="medium"
             />
             <AlertItem 
               user="@sarah_styles"
               issue="Fake Followers > 40%"
               time="1d ago"
               severity="high"
             />
             <div className="pt-4 mt-4 border-t border-zinc-100 text-center">
               <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All Alerts</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, change, trend, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-zinc-50 rounded-lg">{icon}</div>
        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-zinc-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-zinc-900">{value}</h3>
      </div>
    </div>
  )
}

function AlertItem({ user, issue, time, severity }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
        severity === 'high' ? 'bg-red-500' : 'bg-orange-500'
      }`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-900 truncate">{user}</p>
        <p className="text-xs text-zinc-500">{issue}</p>
      </div>
      <span className="text-xs text-zinc-400 whitespace-nowrap">{time}</span>
    </div>
  )
}
