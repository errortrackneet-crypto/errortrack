import { useState } from "react";
import { ChevronRight, Lock, Crown, Zap } from "lucide-react";
import {
  botanyChapters11,
  botanyChapters12,
  zoologyChapters11,
  zoologyChapters12,
  chapterQuestionTypes,
  pyqYears,
} from "@/data/content";
import type { Page, Subject, ClassLevel } from "@/types";

type PracticeMode = "ncert" | "pyq";

interface PracticeState {
  subject: Subject | null;
  classLevel: ClassLevel | null;
  chapter: string | null;
  year: number | null;
}

function SubjectClassChapterBreadcrumb({
  mode,
  state,
  onReset,
  onResetClass,
  onResetChapter,
  accentClass,
}: {
  mode: string;
  state: PracticeState;
  onReset: () => void;
  onResetClass: () => void;
  onResetChapter: () => void;
  accentClass: string;
}) {
  const hasBreadcrumb = state.subject || state.classLevel || state.chapter;
  if (!hasBreadcrumb) return null;
  return (
    <div className="flex items-center gap-1.5 text-sm flex-wrap">
      <button onClick={onReset} className={`${accentClass} font-medium transition capitalize`}>
        {mode}
      </button>
      {state.subject && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button onClick={onResetClass} className={`${accentClass} font-medium transition capitalize`}>
            {state.subject}
          </button>
        </>
      )}
      {state.classLevel && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button onClick={onResetChapter} className={`${accentClass} font-medium transition`}>
            Class {state.classLevel}
          </button>
        </>
      )}
      {state.chapter && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-600 font-medium truncate max-w-[160px]">{state.chapter}</span>
        </>
      )}
    </div>
  );
}

function SubjectSelector({
  onSelect,
  botanySub,
  zoologySub,
}: {
  onSelect: (s: Subject) => void;
  botanySub: string;
  zoologySub: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-3">Select Subject</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect("botany")}
          className="flex items-center gap-4 p-5 rounded-2xl border-2 border-green-100 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-all text-left group"
        >
          <span className="text-4xl">🌿</span>
          <div className="flex-1">
            <h3 className="text-base font-bold text-green-800 font-display">Botany</h3>
            <p className="text-sm text-green-600">{botanySub}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-green-400 group-hover:text-green-600 transition" />
        </button>
        <button
          onClick={() => onSelect("zoology")}
          className="flex items-center gap-4 p-5 rounded-2xl border-2 border-blue-100 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-all text-left group"
        >
          <span className="text-4xl">🧬</span>
          <div className="flex-1">
            <h3 className="text-base font-bold text-blue-800 font-display">Zoology</h3>
            <p className="text-sm text-blue-600">{zoologySub}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition" />
        </button>
      </div>
    </div>
  );
}

function ClassSelector({
  subject,
  onSelect,
}: {
  subject: Subject;
  onSelect: (c: ClassLevel) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-3">Select Class</p>
      <div className="grid grid-cols-2 gap-4">
        {(["11", "12"] as ClassLevel[]).map((cls) => (
          <button
            key={cls}
            onClick={() => onSelect(cls)}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-teal-300 hover:bg-teal-50 transition-all"
          >
            <span className="text-3xl font-black text-gray-800 font-display">Class {cls}</span>
            <span className="text-xs text-gray-400 mt-2">
              {subject === "botany"
                ? cls === "11" ? "10 Chapters" : "6 Chapters"
                : cls === "11" ? "9 Chapters" : "7 Chapters"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChapterSelector({
  chapters,
  onSelect,
}: {
  chapters: string[];
  onSelect: (ch: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-3">Select Chapter</p>
      <div className="space-y-2">
        {chapters.map((ch, i) => (
          <button
            key={ch}
            onClick={() => onSelect(ch)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-gray-100 text-xs font-bold text-gray-500 flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-gray-800">{ch}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function PracticePage({
  isPremium,
  onStartQuestion,
  onNav,
}: {
  isPremium: boolean;
  onStartQuestion: () => void;
  onNav: (p: Page) => void;
}) {
  const [mode, setMode] = useState<PracticeMode>("ncert");
  const [state, setState] = useState<PracticeState>({
    subject: null,
    classLevel: null,
    chapter: null,
    year: null,
  });

  const resetState = () =>
    setState({ subject: null, classLevel: null, chapter: null, year: null });

  const resetMode = (m: PracticeMode) => {
    setMode(m);
    resetState();
  };

  const chapters =
    state.subject && state.classLevel
      ? state.subject === "botany"
        ? state.classLevel === "11" ? botanyChapters11 : botanyChapters12
        : state.classLevel === "11" ? zoologyChapters11 : zoologyChapters12
      : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 font-display">Practice</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {mode === "ncert"
            ? "NCERT chapter-wise practice (Premium)"
            : "Free previous year questions — no subscription needed"}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => resetMode("ncert")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition ${
            mode === "ncert" ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {!isPremium && <Lock className="w-3 h-3" />}
          <span>📖</span> NCERT Practice
        </button>
        <button
          onClick={() => resetMode("pyq")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition ${
            mode === "pyq" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <span>📝</span> PYQ (Free)
        </button>
      </div>

      {/* ── NCERT Practice Mode — not premium ── */}
      {mode === "ncert" && !isPremium && (
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-100 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-pink-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-display mb-2">NCERT Practice is Premium</h3>
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            Unlock NCERT line-by-line, chapter-wise questions, assertion-reason, diagrams and more.
            Plans start at just <strong>₹59/month</strong>.
          </p>
          <button
            onClick={() => onNav("subscription")}
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-teal-600 transition"
          >
            <Crown className="w-4 h-4" /> View Plans
          </button>
          <p className="mt-4 text-xs text-gray-400">
            PYQ tab is completely free — no signup needed.
          </p>
        </div>
      )}

      {/* ── NCERT Practice Mode — premium ── */}
      {mode === "ncert" && isPremium && (
        <div className="space-y-5">
          <SubjectClassChapterBreadcrumb
            mode="NCERT Practice"
            state={state}
            onReset={resetState}
            onResetClass={() => setState((s) => ({ ...s, classLevel: null, chapter: null }))}
            onResetChapter={() => setState((s) => ({ ...s, chapter: null }))}
            accentClass="text-teal-600 hover:text-teal-700"
          />

          {!state.subject && (
            <SubjectSelector
              onSelect={(s) => setState((prev) => ({ ...prev, subject: s }))}
              botanySub="16 Chapters · 2,400 Questions"
              zoologySub="16 Chapters · 2,800 Questions"
            />
          )}

          {state.subject && !state.classLevel && (
            <ClassSelector
              subject={state.subject}
              onSelect={(c) => setState((s) => ({ ...s, classLevel: c }))}
            />
          )}

          {state.subject && state.classLevel && !state.chapter && (
            <ChapterSelector
              chapters={chapters}
              onSelect={(ch) => setState((s) => ({ ...s, chapter: ch }))}
            />
          )}

          {state.chapter && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-3">Select Question Type</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {chapterQuestionTypes.map((qt) => (
                  <button
                    key={qt.id}
                    onClick={onStartQuestion}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 hover:bg-teal-50 transition-all"
                  >
                    <span className="text-2xl">{qt.emoji}</span>
                    <span className="text-[11px] font-medium text-gray-700 text-center leading-snug">
                      {qt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PYQ Mode ── */}
      {mode === "pyq" && (
        <div className="space-y-5">
          {/* PYQ breadcrumb */}
          {(state.subject || state.classLevel || state.chapter || state.year !== null) && (
            <div className="flex items-center gap-1.5 text-sm flex-wrap">
              <button onClick={resetState} className="text-blue-500 font-medium hover:text-blue-600 transition">
                PYQ
              </button>
              {state.subject && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <button
                    onClick={() => setState((s) => ({ ...s, classLevel: null, chapter: null, year: null }))}
                    className="text-blue-500 font-medium hover:text-blue-600 transition capitalize"
                  >
                    {state.subject}
                  </button>
                </>
              )}
              {state.classLevel && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <button
                    onClick={() => setState((s) => ({ ...s, chapter: null, year: null }))}
                    className="text-blue-500 font-medium hover:text-blue-600 transition"
                  >
                    Class {state.classLevel}
                  </button>
                </>
              )}
              {state.chapter && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-600 font-medium truncate max-w-[140px]">{state.chapter}</span>
                </>
              )}
            </div>
          )}

          {/* Step 1: Subject */}
          {!state.subject && (
            <SubjectSelector
              onSelect={(s) => setState((prev) => ({ ...prev, subject: s }))}
              botanySub="480 PYQ Questions · FREE"
              zoologySub="520 PYQ Questions · FREE"
            />
          )}

          {/* Step 2: Class */}
          {state.subject && !state.classLevel && (
            <ClassSelector
              subject={state.subject}
              onSelect={(c) => setState((s) => ({ ...s, classLevel: c }))}
            />
          )}

          {/* Step 3: Chapter */}
          {state.subject && state.classLevel && !state.chapter && (
            <ChapterSelector
              chapters={chapters}
              onSelect={(ch) => setState((s) => ({ ...s, chapter: ch }))}
            />
          )}

          {/* Step 4: Year */}
          {state.chapter && state.year === null && (
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-3">Select Year</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pyqYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => { setState((s) => ({ ...s, year: yr })); onStartQuestion(); }}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <span className="text-lg font-black text-gray-800 font-display">{yr}</span>
                    <span className="text-[11px] text-gray-400 mt-1">~15 Qs</span>
                  </button>
                ))}
              </div>
              <button
                onClick={onStartQuestion}
                className="mt-3 w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50 hover:border-indigo-400 hover:bg-indigo-100 transition-all"
              >
                <Zap className="w-5 h-5 text-indigo-500" />
                <span className="font-bold text-indigo-700">All Years Mixed</span>
                <span className="text-xs text-indigo-500 ml-1">All Questions</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
