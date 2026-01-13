import { LayoutDashboard, Settings, LogOut, Users, ShieldCheck, FileText, Swords, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CampaignProvider } from "@/context/campaign-context";
import { Toaster } from "sonner";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen bg-zinc-50 text-zinc-900 font-sans">
        {/* Simplified Sidebar for Settings - or could reuse main sidebar but keeping it consistent for now */}
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-zinc-100">
                <Link href="/dashboard" className="flex items-center gap-2 font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                   <ArrowLeft size={18} /> Back to Dashboard
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Settings
                </div>
                <NavItem href="/settings" icon={<Settings size={20} />} label="Integrations" active />
                <NavItem href="/settings/team" icon={<Users size={20} />} label="Team Members" />
                <NavItem href="/settings/billing" icon={<FileText size={20} />} label="Billing" />
            </nav>
            <div className="p-4 border-t border-zinc-100">
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                    <LogOut size={20} /> Logout
                </Link>
            </div>
        </aside>

        <main className="flex-1 md:ml-64 p-8">
            {children}
        </main>
        <Toaster />
      </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
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
