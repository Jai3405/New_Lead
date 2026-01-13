import Link from "next/link";
import { BarChart3, Search, LayoutDashboard, Settings, LogOut, Users, ShieldCheck, FileText, Swords, BrainCircuit } from "lucide-react";
import { CampaignProvider } from "@/context/campaign-context";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CampaignProvider>
      <div className="flex min-h-screen bg-zinc-50 text-zinc-900 font-sans">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 hidden md:flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-zinc-100">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <BarChart3 size={18} strokeWidth={3} />
              </div>
              Prove It.
            </Link>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active />
            <NavItem href="/dashboard/vetting" icon={<Search size={20} />} label="Vet Creator" />
            <NavItem href="/dashboard/campaigns" icon={<Users size={20} />} label="Active Campaigns" />
            <NavItem href="/dashboard/fraud-watch" icon={<ShieldCheck size={20} />} label="Fraud Watch" />
            <NavItem href="/dashboard/contracts" icon={<FileText size={20} />} label="Contracts" />
            <NavItem 
              href="/dashboard/competitors" 
              icon={<Swords size={20} />} 
              label={
                <span className="flex items-center w-full">
                  Competitor Intel 
                  <span className="ml-auto text-[10px] bg-zinc-900 text-white px-1.5 py-0.5 rounded font-bold tracking-wider">PRO</span>
                </span>
              } 
            />
            <NavItem 
              href="/dashboard/ai-lab" 
              icon={<BrainCircuit size={20} />} 
              label={
                <span className="flex items-center w-full">
                  AI Lab 
                  <span className="ml-auto text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold tracking-wider">BETA</span>
                </span>
              } 
            />
          </nav>

          <div className="p-4 border-t border-zinc-100">
             <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
             <NavItem href="/" icon={<LogOut size={20} />} label="Logout" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8">
          {children}
        </main>
        <Toaster />
      </div>
    </CampaignProvider>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: React.ReactNode, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? "bg-blue-50 text-blue-700" 
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}
