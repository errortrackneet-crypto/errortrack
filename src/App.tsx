import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { ensureProfile } from "@/lib/profile";

import { Sidebar, MobileHeader, BottomNav } from "@/components/Navigation";
import { AuthPage } from "@/pages/AuthPage";
import { HomePage } from "@/pages/HomePage";
import { PracticePage } from "@/pages/PracticePage";
import { QuestionPage } from "@/pages/QuestionPage";
import { SavedPage } from "@/pages/SavedPage";
import { TestsPage } from "@/pages/TestsPage";
import { StatsPage } from "@/pages/StatsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SubscriptionPage } from "@/pages/SubscriptionPage";

import type { Page } from "@/types";

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const [userName, setUserName] = useState("Student");
  const [isPremium, setIsPremium] = useState(false);

  const [page, setPage] = useState<Page>("home");
  const [prevPage, setPrevPage] = useState<Page>("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  async function loadUserName() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUserName("Student");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    const name =
      data?.full_name?.trim() ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Student";

    setUserName(name);
  }

  useEffect(() => {
    async function restoreSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        await ensureProfile();
        await loadUserName();
      }
    }

    restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        await ensureProfile();
        await loadUserName();
      } else {
        setUserName("Student");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigate = (p: Page) => {
    setPrevPage(page);
    setPage(p);
  };

  const startQuestion = () => navigate("question");

  const backFromQuestion = () =>
    navigate(prevPage === "question" ? "practice" : prevPage);

  const handleSubscribe = () => {
    setIsPremium(true);
    navigate("home");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-background font-body flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Sidebar
        page={page}
        isPremium={isPremium}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed((c) => !c)}
        onNav={navigate}
      />

      <main
        className={`pb-20 lg:pb-0 min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-[68px]" : "lg:ml-60"
        }`}
      >
        <MobileHeader />

        <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8">
          {page === "home" && (
            <HomePage
              isPremium={isPremium}
              onNav={navigate}
              userName={userName}
            />
          )}

          {page === "practice" && (
            <PracticePage
              isPremium={isPremium}
              onStartQuestion={startQuestion}
              onNav={navigate}
            />
          )}

          {page === "question" && (
            <QuestionPage onBack={backFromQuestion} />
          )}

          {page === "saved" && (
            <SavedPage onStartPractice={startQuestion} />
          )}

          {page === "tests" && <TestsPage />}

          {page === "stats" && <StatsPage />}

          {page === "profile" && (
            <ProfilePage
              isPremium={isPremium}
              onNav={navigate}
              onLogout={handleLogout}
            />
          )}

          {page === "subscription" && (
            <SubscriptionPage
              isPremium={isPremium}
              onSubscribe={handleSubscribe}
              onBack={() => navigate(prevPage)}
            />
          )}
        </div>
      </main>

      <BottomNav page={page} onNav={navigate} />
    </div>
  );
}