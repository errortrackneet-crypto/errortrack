interface QuestionFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  selectedSubject: string;
  setSelectedSubject: (value: string) => void;

  selectedClass: string;
  setSelectedClass: (value: string) => void;

  selectedChapter: string;
  setSelectedChapter: (value: string) => void;

  selectedTopic: string;
  setSelectedTopic: (value: string) => void;

  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;

  subjectOptions: string[];
  classOptions: string[];
  chapterOptions: string[];
  topicOptions: string[];
  difficultyOptions: string[];
}

export default function QuestionFilters({
  search,
  setSearch,

  selectedSubject,
  setSelectedSubject,

  selectedClass,
  setSelectedClass,

  selectedChapter,
  setSelectedChapter,

  selectedTopic,
  setSelectedTopic,

  selectedDifficulty,
  setSelectedDifficulty,

  subjectOptions,
  classOptions,
  chapterOptions,
  topicOptions,
  difficultyOptions,
}: QuestionFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search questions..."
        className="rounded-xl border border-slate-300 px-4 py-3"
      />

      <select
        value={selectedSubject}
        onChange={(e) =>
          setSelectedSubject(e.target.value)
        }
        className="rounded-xl border border-slate-300 px-4 py-3"
      >
        {subjectOptions.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      <select
        value={selectedClass}
        onChange={(e) =>
          setSelectedClass(e.target.value)
        }
        className="rounded-xl border border-slate-300 px-4 py-3"
      >
        {classOptions.map((cls) => (
          <option key={cls} value={cls}>
            {cls === "All"
              ? "All Classes"
              : `Class ${cls}`}
          </option>
        ))}
      </select>

      <select
        value={selectedChapter}
        onChange={(e) =>
          setSelectedChapter(e.target.value)
        }
        className="rounded-xl border border-slate-300 px-4 py-3"
      >
        {chapterOptions.map((chapter) => (
          <option key={chapter} value={chapter}>
            {chapter === "All"
              ? "All Chapters"
              : chapter}
          </option>
        ))}
      </select>

      <select
        value={selectedTopic}
        onChange={(e) =>
          setSelectedTopic(e.target.value)
        }
        className="rounded-xl border border-slate-300 px-4 py-3"
      >
        {topicOptions.map((topic) => (
          <option key={topic} value={topic}>
            {topic === "All"
              ? "All Topics"
              : topic}
          </option>
        ))}
      </select>

      <select
        value={selectedDifficulty}
        onChange={(e) =>
          setSelectedDifficulty(e.target.value)
        }
        className="rounded-xl border border-slate-300 px-4 py-3"
      >
        {difficultyOptions.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty === "All"
              ? "All Difficulty"
              : difficulty}
          </option>
        ))}
      </select>

    </div>
  );
}