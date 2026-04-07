import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Filter, Group, MoreVertical, UserPlus, Search, Shield, History, KeyRound, ShieldCheck, Bolt, Mail } from 'lucide-react';
import { SettingsSubviewProps } from './types';

export const InternalUserManagement: React.FC<SettingsSubviewProps> = ({ onViewChange }) => {
  return (
    <div className="p-10 max-w-7xl mx-auto overflow-y-auto h-full pb-24 md:pb-8">
      <div className="mb-8 flex justify-between items-end gap-6 flex-wrap">
        <div className="flex items-start gap-3">
          <button onClick={() => onViewChange?.('settings')} className="mt-1 p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <ArrowLeft className="w-5 h-5 text-on-surface" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-on-surface font-headline">Employee Registry</h1>
            <p className="text-on-surface-variant mt-1">Manage staff access and organizational hierarchy.</p>
          </div>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm hover:opacity-90 transition-all">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<Group className="w-5 h-5 text-primary" />} badge="Staff" badgeClassName="text-primary bg-primary-fixed/30" label="Total Staff" value="12" suffix="Internal" />
        <StatCard icon={<Bolt className="w-5 h-5 text-tertiary" />} badge="Live" badgeClassName="text-tertiary bg-tertiary-fixed/30" label="Active Now" value="05" suffix="Syncing" />
        <StatCard icon={<Mail className="w-5 h-5 text-error" />} badge="Pending" badgeClassName="text-error bg-error-container/30" label="Pending Invites" value="02" suffix="Waiting" />
      </div>

      <div className="bg-surface-container-low p-4 rounded-xl mb-6 flex flex-wrap items-center gap-4 border border-outline-variant/20">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input className="w-full bg-surface border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Search by name, email, or employee ID..." type="text" />
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-surface border border-outline-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface-variant focus:ring-2 focus:ring-primary/20">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Dispatcher</option>
            <option>Manager</option>
          </select>
          <select className="bg-surface border border-outline-variant/30 rounded-lg px-4 py-2 text-sm text-on-surface-variant focus:ring-2 focus:ring-primary/20">
            <option>All Departments</option>
            <option>Operations</option>
            <option>Logistics</option>
            <option>Maintenance</option>
          </select>
          <button className="bg-surface border border-outline-variant/30 p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high/50 text-on-surface-variant text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Login</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            <EmployeeRow name="Julian Rivers" email="j.rivers@terratowing.com" role="Admin" roleClassName="bg-primary/10 text-primary" department="Operations" lastLogin="2 mins ago" />
            <EmployeeRow name="Sarah Chen" email="s.chen@terratowing.com" role="Dispatcher" roleClassName="bg-tertiary/10 text-tertiary" department="Logistics" lastLogin="1 hour ago" />
            <EmployeeRow name="Marcus Thorne" email="m.thorne@terratowing.com" role="Manager" roleClassName="bg-secondary/10 text-secondary" department="Maintenance" lastLogin="3 days ago" inactive />
            <tr className="hover:bg-surface-container-low transition-colors bg-error-container/5">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm">Amara Okafor</p>
                    <p className="text-xs text-error">Invite Pending</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4"><span className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold">Dispatcher</span></td>
              <td className="px-6 py-4 text-sm text-on-surface">Logistics</td>
              <td className="px-6 py-4"><span className="text-[10px] font-bold text-on-surface-variant italic">Waiting for response</span></td>
              <td className="px-6 py-4 text-sm text-on-surface-variant">N/A</td>
              <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                <button className="text-xs font-bold text-primary hover:underline">Resend</button>
                <button className="text-on-surface-variant hover:text-primary"><MoreVertical className="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
          <p className="text-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">1 to 4</span> of <span className="font-bold text-on-surface">12</span> employees</p>
          <div className="flex gap-2 items-center">
            <button className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant opacity-40" disabled><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold text-sm">1</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant/30 text-on-surface-variant font-bold text-sm hover:bg-surface-container-high">2</button>
            <button className="w-10 h-10 rounded-lg border border-outline-variant/30 text-on-surface-variant font-bold text-sm hover:bg-surface-container-high">3</button>
            <button className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-primary"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-surface p-8 rounded-xl border border-outline-variant/10">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold font-headline">Access Controls</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
              <div className="flex gap-4">
                <KeyRound className="w-5 h-5 text-on-surface-variant" />
                <div>
                  <p className="text-sm font-bold">Multi-Factor Authentication</p>
                  <p className="text-xs text-on-surface-variant">Required for all administrative accounts</p>
                </div>
              </div>
              <span className="text-xs font-bold text-primary">ENFORCED</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
              <div className="flex gap-4">
                <ShieldCheck className="w-5 h-5 text-on-surface-variant" />
                <div>
                  <p className="text-sm font-bold">Role-Based Permissions</p>
                  <p className="text-xs text-on-surface-variant">3 levels of internal hierarchy defined</p>
                </div>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">Manage</button>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-xl border border-outline-variant/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-tertiary" />
              <h2 className="text-xl font-bold font-headline">Recent Management Activity</h2>
            </div>
            <button className="text-xs font-bold text-primary hover:underline">View All Logs</button>
          </div>
          <div className="space-y-6">
            <TimelineItem toneClassName="bg-primary" text="Julian Rivers updated permissions for Sarah Chen" time="Today at 11:24 AM" />
            <TimelineItem toneClassName="bg-tertiary" text="System automatically deactivated Marcus Thorne (Inactivity)" time="Yesterday at 04:15 PM" />
            <TimelineItem toneClassName="bg-secondary" text="Admin Manager invited Amara Okafor to Dispatch" time="Oct 24 at 09:00 AM" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, badge, badgeClassName, label, value, suffix }: { icon: React.ReactNode; badge: string; badgeClassName: string; label: string; value: string; suffix: string }) => (
  <div className="bg-surface p-6 rounded-xl shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/10">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${badgeClassName}`}>{badge}</span>
    </div>
    <h3 className="text-on-surface-variant text-sm font-semibold">{label}</h3>
    <p className="text-3xl font-bold text-on-surface">{value} <span className="text-sm font-normal text-on-surface-variant ml-1">{suffix}</span></p>
  </div>
);

const EmployeeRow = ({ name, email, role, roleClassName, department, lastLogin, inactive = false }: { name: string; email: string; role: string; roleClassName: string; department: string; lastLogin: string; inactive?: boolean }) => (
  <tr className="hover:bg-surface-container-low transition-colors">
    <td className="px-6 py-4">
      <div className={`flex items-center gap-3 ${inactive ? 'opacity-60' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-bold text-sm">{name.split(' ').map((p) => p[0]).join('')}</div>
        <div>
          <p className="font-bold text-on-surface text-sm">{name}</p>
          <p className="text-xs text-on-surface-variant">{email}</p>
        </div>
      </div>
    </td>
    <td className={`px-6 py-4 ${inactive ? 'opacity-60' : ''}`}><span className={`px-3 py-1 rounded-full text-xs font-bold ${roleClassName}`}>{role}</span></td>
    <td className={`px-6 py-4 text-sm text-on-surface ${inactive ? 'opacity-60' : ''}`}>{department}</td>
    <td className="px-6 py-4">
      <div className={`w-10 h-5 rounded-full relative cursor-pointer ${inactive ? 'bg-secondary/10' : 'bg-primary/20'}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm ${inactive ? 'left-0.5 bg-secondary' : 'right-0.5 bg-primary'}`} />
      </div>
    </td>
    <td className="px-6 py-4 text-sm text-on-surface-variant">{lastLogin}</td>
    <td className="px-6 py-4 text-right">
      <button className="text-on-surface-variant hover:text-primary"><MoreVertical className="w-4 h-4" /></button>
    </td>
  </tr>
);

const TimelineItem = ({ toneClassName, text, time }: { toneClassName: string; text: string; time: string }) => (
  <div className="flex gap-4 relative">
    <div className={`w-2 h-2 rounded-full mt-1.5 z-10 ${toneClassName}`} />
    <div>
      <p className="text-sm">{text}</p>
      <p className="text-[10px] text-on-surface-variant mt-0.5 uppercase tracking-wide">{time}</p>
    </div>
  </div>
);
