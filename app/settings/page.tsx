"use client";

import { useState } from "react";
import { Link2, CheckCircle2, AlertCircle, RefreshCw, ShoppingBag, BarChart2, Instagram, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Platform Integrations</h1>
        <p className="text-zinc-500">Connect your data sources to enable real-time ROI tracking.</p>
      </header>

      <div className="space-y-6">
        {/* E-commerce Section */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">E-Commerce & Sales</h2>
          <div className="grid gap-4">
             <IntegrationCard 
               icon={<ShoppingBag className="text-green-600" size={24} />}
               name="Shopify"
               description="Sync orders, customer data, and discount codes to attribute revenue."
               status="connected"
               lastSync="Synced 12 mins ago"
             />
             <IntegrationCard 
               icon={<BarChart2 className="text-orange-500" size={24} />}
               name="Google Analytics 4"
               description="Track traffic sources, session duration, and goal completions."
               status="disconnected"
             />
          </div>
        </section>

        {/* Social Platforms */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 mt-8">Social Platforms</h2>
          <div className="grid gap-4">
             <IntegrationCard 
               icon={<Instagram className="text-pink-600" size={24} />}
               name="Instagram Graph API"
               description="Pull engagement data (Stories, Reels, Posts) for fraud analysis."
               status="connected"
               lastSync="Synced 1 hour ago"
             />
             <IntegrationCard 
               icon={<Video className="text-black" size={24} />}
               name="TikTok for Business"
               description="Track video views and click-through rates from TikTok campaigns."
               status="error"
               errorMessage="Token expired. Please reconnect."
             />
          </div>
        </section>

        {/* Advanced Settings */}
        <section className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 mt-8">
           <h3 className="font-bold text-zinc-900 mb-4">Data Sync Preferences</h3>
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-zinc-900">Auto-Sync Data</p>
                 <p className="text-sm text-zinc-500">Refresh metrics every 4 hours automatically.</p>
               </div>
               <Switch defaultChecked />
             </div>
             <div className="h-px bg-zinc-200"></div>
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-zinc-900">Attribution Window</p>
                 <p className="text-sm text-zinc-500">Credit sales to influencers up to 30 days after click.</p>
               </div>
               <select className="bg-white border border-zinc-300 rounded-md text-sm p-1">
                 <option>7 Days</option>
                 <option selected>30 Days</option>
                 <option>60 Days</option>
               </select>
             </div>
           </div>
        </section>
      </div>
    </div>
  );
}

function IntegrationCard({ icon, name, description, status, lastSync, errorMessage }: any) {
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        toast.success(`Connected to ${name}`);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-start justify-between group hover:border-blue-200 transition-all">
       <div className="flex gap-4">
          <div className="p-3 bg-zinc-50 rounded-lg h-fit">{icon}</div>
          <div>
            <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
              {name}
              {status === 'connected' && <CheckCircle2 size={14} className="text-green-500" />}
            </h3>
            <p className="text-sm text-zinc-500 max-w-md mt-1">{description}</p>
            
            <div className="mt-3 flex items-center gap-2 text-xs">
               {status === 'connected' ? (
                 <span className="text-zinc-400 flex items-center gap-1">
                   <RefreshCw size={12} /> {lastSync}
                 </span>
               ) : status === 'error' ? (
                 <span className="text-red-500 flex items-center gap-1 font-medium">
                   <AlertCircle size={12} /> {errorMessage}
                 </span>
               ) : null}
            </div>
          </div>
       </div>

       <div>
         {status === 'connected' ? (
            <Button variant="outline" className="border-zinc-200 text-zinc-600">Manage</Button>
         ) : status === 'error' ? (
            <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 border">Reconnect</Button>
         ) : (
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800" onClick={handleConnect} disabled={loading}>
                {loading ? "Connecting..." : "Connect"}
            </Button>
         )}
       </div>
    </div>
  )
}
