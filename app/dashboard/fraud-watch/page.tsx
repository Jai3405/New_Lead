"use client";

import { useState } from "react";
import { Bell, ShieldAlert, Mail, Smartphone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function FraudWatchPage() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    thresholdFraud: 20,
    thresholdEngagement: 1.5,
    autoPause: true
  });

  const handleSave = () => {
    toast.success("Alert preferences updated. You are protected.");
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Fraud Watch (Real-Time)</h1>
        <p className="text-zinc-500">Configure your automated defense system. Included in Continuity Program.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Alert Feed */}
        <div className="md:col-span-2 space-y-6">
           {/* Active Threat Card */}
           <div className="bg-red-50 border border-red-200 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ShieldAlert size={120} className="text-red-500" />
              </div>
              <div className="relative z-10">
                 <h3 className="text-lg font-bold text-red-900 flex items-center gap-2 mb-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                    Active Threat Detected
                 </h3>
                 <p className="text-red-700 mb-6 max-w-md">
                    <strong>@fashion_bella_official</strong> just received 5,000 likes from a known click-farm IP range in a 2-minute window.
                 </p>
                 <div className="flex gap-3">
                    <Button className="bg-red-600 hover:bg-red-700 text-white border-none">
                       Block & Pause Campaign
                    </Button>
                    <Button variant="outline" className="bg-white border-red-200 text-red-700 hover:bg-red-50">
                       View Audit Log
                    </Button>
                 </div>
              </div>
           </div>

           {/* Recent Activity Log */}
           <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                 <h3 className="font-semibold text-zinc-900">Recent Scans</h3>
                 <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded-full">Live Feed</span>
              </div>
              <div className="divide-y divide-zinc-100">
                 {[
                   { user: "@lifestyle_emma", status: "Clean", time: "2m ago", score: 12 },
                   { user: "@tech_guru_mike", status: "Clean", time: "15m ago", score: 15 },
                   { user: "@fitness_june", status: "Suspicious", time: "42m ago", score: 45 },
                   { user: "@fashion_bella_official", status: "Critical", time: "1h ago", score: 40 },
                 ].map((log, i) => (
                    <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${
                             log.score > 30 ? 'bg-red-500' : 'bg-green-500'
                          }`} />
                          <div>
                             <p className="text-sm font-medium text-zinc-900">{log.user}</p>
                             <p className="text-xs text-zinc-500">Scan complete • {log.time}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                             log.score > 30 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                             {log.status} ({log.score}%)
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
           <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <Bell size={18} /> Alert Thresholds
              </h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-sm mb-2">
                       <span className="text-zinc-400">Max Fraud Score</span>
                       <span className="font-bold text-red-400">{settings.thresholdFraud}%</span>
                    </div>
                    <input 
                       type="range" 
                       min="0" max="100" 
                       value={settings.thresholdFraud}
                       onChange={(e) => setSettings({...settings, thresholdFraud: Number(e.target.value)})}
                       className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-500" 
                    />
                    <p className="text-xs text-zinc-500 mt-2">Trigger alert if fake followers exceed this %.</p>
                 </div>
                 
                 <div>
                    <div className="flex justify-between text-sm mb-2">
                       <span className="text-zinc-400">Min Engagement</span>
                       <span className="font-bold text-yellow-400">{settings.thresholdEngagement}%</span>
                    </div>
                    <input 
                       type="range" 
                       min="0" max="10" step="0.1"
                       value={settings.thresholdEngagement}
                       onChange={(e) => setSettings({...settings, thresholdEngagement: Number(e.target.value)})}
                       className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-yellow-500" 
                    />
                 </div>

                 <div className="pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-sm font-medium">Auto-Pause Campaign</span>
                       <Switch 
                          checked={settings.autoPause} 
                          onCheckedChange={(c) => setSettings({...settings, autoPause: c})}
                          className="data-[state=checked]:bg-red-500"
                       />
                    </div>
                    <p className="text-xs text-zinc-500">Automatically stop ad spend if fraud is detected.</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
               <h3 className="font-semibold text-zinc-900 mb-4">Notification Channels</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                           <Mail size={16} />
                        </div>
                        <div className="text-sm">
                           <p className="font-medium text-zinc-900">Email Alerts</p>
                           <p className="text-zinc-500">Instant delivery</p>
                        </div>
                     </div>
                     <Switch checked={settings.emailAlerts} onCheckedChange={(c) => setSettings({...settings, emailAlerts: c})} />
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                           <Smartphone size={16} />
                        </div>
                        <div className="text-sm">
                           <p className="font-medium text-zinc-900">SMS Alerts</p>
                           <p className="text-zinc-500">Urgent Only (+ $0.05/msg)</p>
                        </div>
                     </div>
                     <Switch checked={settings.smsAlerts} onCheckedChange={(c) => setSettings({...settings, smsAlerts: c})} />
                  </div>
               </div>
               <Button className="w-full mt-6" onClick={handleSave}>
                  Save Preferences
               </Button>
           </div>
        </div>
      </div>
    </div>
  );
}