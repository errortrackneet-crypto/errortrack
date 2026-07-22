import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  ListTree,
  FileText,
  Users,
  Settings,
  Bell,
  Search,
} from "lucide-react";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AdminLayout({
  title,
  children,
}: AdminLayoutProps) {
  const menu = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    path: "/admin",
  },
  {
    icon: BookOpen,
    name: "Questions",
    path: "/admin/questions",
  },
  {
    icon: FolderOpen,
    name: "Chapters",
    path: "/admin/chapters",
  },
  {
    icon: ListTree,
    name: "Topics",
    path: "/admin/topics",
  },
  {
    icon: FileText,
    name: "Tests",
    path: "/admin/tests",
  },
  {
    icon: Users,
    name: "Users",
    path: "/admin/users",
  },
  {
    icon: Settings,
    name: "Settings",
    path: "/admin/settings",
  },
];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F1F5C] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">
            ERROR<span className="text-teal-400">Track</span>
          </h1>
          <p className="text-xs text-gray-300 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-teal-500 text-white"
        : "hover:bg-white/10"
    }`
  }
>
  <Icon size={20} />
  <span>{item.name}</span>
</NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
              <Search size={18} />
              <input
                placeholder="Search..."
                className="bg-transparent outline-none text-sm"
              />
            </div>

            <Bell size={22} className="text-slate-600" />

            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}