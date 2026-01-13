"use client";

import { useState } from "react";
import Link from "next/link";
import { useCampaigns, Campaign } from "@/context/campaign-context";
import { Plus, Search, Filter, MoreHorizontal, ArrowUpRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as LabelPrimitive from "@radix-ui/react-label";

const Label = LabelPrimitive.Root;

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function CampaignsList() {
  const { campaigns, addCampaign } = useCampaigns();
  const searchParams = useSearchParams();
  const createHandle = searchParams.get('create');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    influencerHandle: "",
    platform: "Instagram" as const,
    budget: 0,
    startDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
      if (createHandle) {
          setNewCampaign(prev => ({ ...prev, influencerHandle: createHandle }));
          setIsDialogOpen(true);
      }
  }, [createHandle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign(newCampaign);
    setIsDialogOpen(false);
    setNewCampaign({
        name: "",
        influencerHandle: "",
        platform: "Instagram",
        budget: 0,
        startDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Active Campaigns</h1>
          <p className="text-zinc-500">Track real-time performance and ROI.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
              <Plus size={18} /> New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Launch New Campaign</DialogTitle>
              <DialogDescription>
                Start tracking a new influencer partnership. We'll automatically start monitoring for fraud.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Campaign Name</Label>
                <Input 
                  placeholder="e.g. Summer Launch 2026" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Influencer Handle</Label>
                <Input 
                  placeholder="@username" 
                  value={newCampaign.influencerHandle}
                  onChange={(e) => setNewCampaign({...newCampaign, influencerHandle: e.target.value})}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="text-sm font-medium">Platform</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newCampaign.platform}
                      onChange={(e) => setNewCampaign({...newCampaign, platform: e.target.value as any})}
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="TikTok">TikTok</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-sm font-medium">Budget ($)</Label>
                    <Input 
                      type="number" 
                      placeholder="5000" 
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({...newCampaign, budget: Number(e.target.value)})}
                      required 
                    />
                 </div>
              </div>
              <DialogFooter>
                <Button type="submit">Launch Campaign</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
           <Input placeholder="Search campaigns..." className="pl-10 bg-white" />
        </div>
        <Button variant="outline" className="gap-2 text-zinc-600">
           <Filter size={16} /> Filter
        </Button>
      </div>

      {/* Campaign List */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Budget Used</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Fraud Risk</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {campaigns.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                      No active campaigns. Start one to see data here.
                   </td>
                 </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/campaigns/${campaign.id}`} className="block">
                        <div className="font-medium text-zinc-900 group-hover:text-indigo-600 transition-colors">{campaign.name}</div>
                        <div className="text-sm text-zinc-500">{campaign.influencerHandle} • {campaign.platform}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-zinc-900">${campaign.spend.toLocaleString()}</div>
                      <div className="text-xs text-zinc-500">of ${campaign.budget.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1 font-medium text-green-600">
                         <ArrowUpRight size={16} />
                         {campaign.spend > 0 ? ((campaign.revenue / campaign.spend) * 100).toFixed(0) : 0}%
                       </div>
                       <div className="text-xs text-zinc-500">${campaign.revenue.toLocaleString()} Rev</div>
                    </td>
                    <td className="px-6 py-4">
                       {campaign.fraudScore > 50 ? (
                         <div className="flex items-center gap-1.5 text-red-600 font-medium text-sm bg-red-50 px-2 py-1 rounded-full w-fit">
                           <ShieldAlert size={14} />
                           High ({campaign.fraudScore}%)
                         </div>
                       ) : (
                         <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                           <CheckCircle2 size={14} />
                           Low ({campaign.fraudScore}%)
                         </div>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-600">
                        <MoreHorizontal size={18} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function CampaignsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CampaignsList />
        </Suspense>
    )
}

function StatusBadge({ status }: { status: Campaign['status'] }) {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    paused: "bg-yellow-100 text-yellow-700 border-yellow-200",
    completed: "bg-zinc-100 text-zinc-700 border-zinc-200",
    fraud_alert: "bg-red-100 text-red-700 border-red-200 animate-pulse"
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