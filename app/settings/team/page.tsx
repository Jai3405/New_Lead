"use client";

import { useState } from "react";
import { Mail, Shield, Trash2, Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TeamSettingsPage() {
  const [members, setMembers] = useState([
    { id: 1, name: "You", email: "jay@proveit.com", role: "Owner", status: "Active" },
    { id: 2, name: "Sarah Miller", email: "sarah@proveit.com", role: "Admin", status: "Active" },
    { id: 3, name: "Mike Ross", email: "mike@agency.com", role: "Viewer", status: "Pending" },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers([...members, {
        id: Math.random(),
        name: "Invited User",
        email: inviteEmail,
        role: "Analyst",
        status: "Pending"
    }]);
    setInviteEmail("");
    toast.success(`Invitation sent to ${inviteEmail}`);
  };

  const handleRemove = (id: number) => {
      setMembers(members.filter(m => m.id !== id));
      toast.success("Team member removed");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-zinc-900">Team Members</h1>
           <p className="text-zinc-500">Manage access and roles for your organization.</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus size={18} className="mr-2" /> Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite to Team</DialogTitle>
                    <DialogDescription>
                        Send an invitation link to your colleague. They will join as an Analyst by default.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input 
                            placeholder="colleague@company.com" 
                            type="email"
                            required
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Send Invite</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </header>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">User</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
                {members.map((member) => (
                    <tr key={member.id} className="group hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-medium text-zinc-900">{member.name}</div>
                                    <div className="text-xs text-zinc-500">{member.email}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-zinc-700">
                                <Shield size={14} className="text-zinc-400" />
                                {member.role}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                member.status === 'Active' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {member.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            {member.role !== 'Owner' && (
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-zinc-400 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleRemove(member.id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
