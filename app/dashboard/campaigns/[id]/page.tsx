"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useCampaigns, Campaign } from "@/context/campaign-context";
import { ArrowLeft, Trash2, PauseCircle, PlayCircle, AlertTriangle, TrendingUp, DollarSign, Calendar, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getCampaign, deleteCampaign } = useCampaigns();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | undefined>(undefined);

  useEffect(() => {
    setCampaign(getCampaign(id));
  }, [id, getCampaign]);

  if (!campaign) {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
            <p>Campaign not found</p>
            <Link href="/dashboard/campaigns" className="text-blue-600 hover:underline mt-2">Back to Campaigns</Link>
        </div>
    );
  }

  const handleDelete = () => {
      if(confirm("Are you sure you want to delete this campaign? Data will be lost.")) {
          deleteCampaign(campaign.id);
          router.push('/dashboard/campaigns');
      }
  };

  // Simulate daily data based on campaign status
  const data = [
    { name: 'Day 1', spend: 100, revenue: 0 },
    { name: 'Day 2', spend: 120, revenue: 45 },
    { name: 'Day 3', spend: 150, revenue: 120 },
    { name: 'Day 4', spend: 140, revenue: 200 },
    { name: 'Day 5', spend: 180, revenue: 350 },
    { name: 'Day 6', spend: 200, revenue: 420 },
    { name: 'Day 7', spend: 190, revenue: 580 },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/campaigns" className="p-2 hover:bg-zinc-100 rounded-full text-zinc-500 transition-colors">
            <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-zinc-900">{campaign.name}</h1>
                <StatusBadge status={campaign.status} />
            </div>
            <p className="text-zinc-500 flex items-center gap-2">
                <span className="font-medium text-zinc-900">{campaign.influencerHandle}</span> 
                on {campaign.platform} • Started {campaign.startDate}
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="text-zinc-600 hover:bg-zinc-50" onClick={() => toast.success("Downloading Campaign_Audit_Report.pdf...")}>
                <Download size={16} className="mr-2" /> Export Report
            </Button>
            <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200" onClick={handleDelete}>
                <Trash2 size={16} className="mr-2" /> Delete
            </Button>
            <Button variant="default" className="bg-zinc-900">
                Edit Settings
            </Button>
        </div>
      </div>

      {/* Fraud Alert Banner if High Risk */}
      {campaign.fraudScore > 50 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-4 mb-8">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                  <h3 className="font-semibold text-red-900">High Fraud Risk Detected</h3>
                  <p className="text-sm text-red-700 mt-1">
                      We detected abnormal bot activity on recent posts. {campaign.influencerHandle}'s engagement dropped by 40% when filtered for real users. 
                      Recommended action: <strong>Pause Campaign</strong>.
                  </p>
                  <Button size="sm" variant="outline" className="mt-3 bg-white border-red-200 text-red-700 hover:bg-red-100">
                      Pause Campaign Automatically
                  </Button>
              </div>
          </div>
      )}

      {/* PROVE IT SAVINGS SIMULATOR (The "What If" Story) */}
      {campaign.id === 'demo-fail' && (
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-10">
               <ShieldCheck size={140} />
           </div>
           <div className="relative z-10 p-8">
               <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                       <ShieldCheck size={24} />
                   </div>
                   <div>
                       <h3 className="text-lg font-bold">Forensic Savings Analysis</h3>
                       <p className="text-zinc-400 text-sm">How Prove It would have handled this campaign</p>
                   </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                   <div className="space-y-1">
                       <p className="text-sm text-zinc-500">Actual Wasted Spend</p>
                       <p className="text-2xl font-bold text-red-400 strikethrough decoration-red-400/50">$15,000</p>
                       <p className="text-xs text-red-400/60">Ran for 30 days</p>
                   </div>

                   <div className="space-y-1">
                       <p className="text-sm text-zinc-500">Spend with Prove It</p>
                       <p className="text-2xl font-bold text-green-400">$750</p>
                       <p className="text-xs text-green-400/60">Auto-paused on Day 2</p>
                   </div>

                   <div className="bg-white/10 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                       <p className="text-sm text-zinc-300 mb-1">Total Savings</p>
                       <p className="text-4xl font-bold text-green-400">$14,250</p>
                       <div className="flex items-center gap-1 text-xs text-green-300 mt-1">
                           <CheckCircle2 size={12} />
                           <span>Would have paid for 11 years of Prove It Pro</span>
                       </div>
                   </div>
               </div>
           </div>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KpiCard title="Total Spend" value={`$${campaign.spend.toLocaleString()}`} icon={<DollarSign className="text-zinc-500" />} />
        <KpiCard title="Total Revenue" value={`$${campaign.revenue.toLocaleString()}`} icon={<TrendingUp className="text-green-500" />} />
        <KpiCard title="ROI (ROAS)" value={`${(campaign.revenue / (campaign.spend || 1)).toFixed(2)}x`} icon={<BarChart className="text-blue-500" />} />
        <KpiCard title="Fraud Score" value={`${campaign.fraudScore}/100`} icon={<AlertTriangle className={campaign.fraudScore > 50 ? "text-red-500" : "text-green-500"} />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-semibold text-zinc-900 mb-6">Performance Over Time</h3>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="spend" stroke="#e4e4e7" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-zinc-600">Revenue (Shopify)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                    <span className="text-sm text-zinc-600">Ad Spend</span>
                </div>
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="font-semibold text-zinc-900 mb-4">Audience Insights</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Top Location</span>
                        <span className="font-medium">United States (42%)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Gender Split</span>
                        <span className="font-medium">65% F / 35% M</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Age Group</span>
                        <span className="font-medium">25-34</span>
                    </div>
                    <div className="h-px bg-zinc-100 my-4"></div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Est. Real Reach</span>
                        <span className="font-bold text-green-600">85,400</span>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl text-white shadow-lg">
                <h3 className="font-semibold mb-2">Automated Contract</h3>
                <p className="text-zinc-400 text-sm mb-4">
                    Protect your budget. Generate a contract that includes fraud clauses based on this data.
                </p>
                <Link 
                  href={`/dashboard/contracts?influencer=${encodeURIComponent(campaign.influencerHandle)}&budget=${campaign.budget}`}
                  className="inline-flex items-center justify-center w-full h-10 px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-md font-medium text-sm transition-colors"
                >
                  Generate Contract
                </Link>
            </div>
         </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }: any) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
        <div className="p-3 bg-zinc-50 rounded-xl">{icon}</div>
        <div>
          <p className="text-sm text-zinc-500 font-medium">{title}</p>
          <h3 className="text-xl font-bold text-zinc-900">{value}</h3>
        </div>
      </div>
    )
}

function StatusBadge({ status }: { status: Campaign['status'] }) {
    const styles = {
      active: "bg-green-100 text-green-700 border-green-200",
      paused: "bg-yellow-100 text-yellow-700 border-yellow-200",
      completed: "bg-zinc-100 text-zinc-700 border-zinc-200",
      fraud_alert: "bg-red-100 text-red-700 border-red-200"
    };
  
    const labels = {
      active: "Active",
      paused: "Paused",
      completed: "Completed",
      fraud_alert: "Fraud Alert"
    };
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    )
}
