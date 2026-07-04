import {
  Home,
  BookOpen,
  Bookmark,
  ClipboardList,
  BarChart2,
  User,
  ChevronRight,
  ChevronLeft,
  Crown,
} from "lucide-react";
import etFavicon from "@/assets/ET_Fevicon.png";
import etLogoFull from "@/assets/Untitled_design.png";
import type { Page } from "@/types";

const navItems: { id: Page; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "practice", label: "Practice", Icon: BookOpen },
  { id: "saved", label: "Saved", Icon: Bookmark },
  { id: "tests", label: "Tests", Icon: ClipboardList },
  { id: "stats", label: "Stats", Icon: BarChart2 },
  { id: "profile", label: "Profile", Icon: User },
];

export function Sidebar({
  page,
  isPremium,
  collapsed,
  onCollapse,
  onNav,
}: {
  page: Page;
  isPremium: boolean;
  collapsed: boolean;
  onCollapse: () => void;
  onNav: (p: Page) => void;
}) {
  return (
    <aside
      className={`hidden lg:flex flex-col h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-30 transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-60"
      }`}
    >
      {/* Logo + toggle */}
      <div className={`flex items-center border-b border-gray-100 h-[61px] flex-shrink-0 ${collapsed ? "justify-center px-0" : "gap-2.5 px-4"}`}>
        <img src={etFavicon} alt="ErrorTrack icon" className="w-8 h-8 object-contain flex-shrink-0" />
        {!collapsed && (
          <span className="font-display font-black text-[17px] leading-none tracking-tight whitespace-nowrap">
            <span style={{ color: "#0f1f5c" }}>ERROR</span><span style={{ color: "#00c49a" }}>Track</span>
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ id, label, Icon }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center rounded-xl text-sm font-medium transition-all ${
                collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
              } ${
                active
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? "text-teal-600" : "text-gray-400"}`} />
              {!collapsed && (
                <>
                  <span>{label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      {!collapsed && (
        <>
          {!isPremium && (
            <div className="px-3 pb-4 pt-2">
              <div className="bg-gradient-to-br from-[#0f1f5c] to-[#1a3a7a] rounded-2xl p-4 text-white">
                <Crown className="w-5 h-5 text-yellow-300 mb-2" />
                <p className="text-sm font-bold mb-1">Go Premium</p>
                <p className="text-xs text-teal-100 mb-3">Unlock NCERT, tests & full stats.</p>
                <button
                  onClick={() => onNav("subscription")}
                  className="w-full bg-white text-teal-700 text-xs font-bold rounded-lg py-2 hover:bg-teal-50 transition"
                >
                  View Plans
                </button>
              </div>
            </div>
          )}
          {isPremium && (
            <div className="px-4 pb-4 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full w-fit">
                <Crown className="w-3 h-3 text-amber-500" />
                <span className="text-[11px] font-semibold text-amber-600 tracking-wide">Premium</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Collapse toggle button — sits on the right edge */}
      <button
        onClick={onCollapse}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-[72px] w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition z-10"
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3 text-gray-500" />
          : <ChevronLeft className="w-3 h-3 text-gray-500" />
        }
      </button>
    </aside>
  );
}

export function MobileHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100 flex justify-center items-center py-2.5">
      <img
        src={etLogoFull}
        alt="ErrorTrack"
        className="h-7 w-auto object-contain"
      />
    </header>
  );
}

export function BottomNav({ page, onNav }: { page: Page; onNav: (p: Page) => void }) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30">
      <div className="flex">
        {navItems.map(({ id, label, Icon }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                active ? "text-teal-600" : "text-gray-400"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-[9px] font-medium leading-none mt-0.5">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
