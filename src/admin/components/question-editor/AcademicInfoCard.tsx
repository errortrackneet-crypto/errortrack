type Props = {
  subjects: any[];

  subjectId: number;
  setSubjectId: (value: number) => void;

  selectedClass: 11 | 12;
  setSelectedClass: (value: 11 | 12) => void;

  chapterId: number;
  setChapterId: (value: number) => void;

  topicId: number;
  setTopicId: (value: number) => void;

  filteredChapters: any[];
  filteredTopics: any[];

  difficulty: string;
  setDifficulty: (value: string) => void;

  isActive: boolean;
  setIsActive: (value: boolean) => void;
};

export default function AcademicInfoCard({
  subjects,
  subjectId,
  setSubjectId,

  selectedClass,
  setSelectedClass,

  chapterId,
  setChapterId,

  topicId,
  setTopicId,

  filteredChapters,
  filteredTopics,

  difficulty,
  setDifficulty,

  isActive,
  setIsActive,
}: Props) {
  return (
    <div className="sticky top-6 bg-white rounded-2xl border border-slate-200 p-6">

      <h2 className="text-xl font-semibold mb-6">
        📚 Academic Information
      </h2>

      <div className="space-y-5">

        <div>

          <label className="block text-sm font-medium mb-2">
            Subject
          </label>

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={0}>Select Subject</option>

            {subjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Class
          </label>

          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(Number(e.target.value) as 11 | 12)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={11}>Class 11</option>
            <option value={12}>Class 12</option>
          </select>

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Chapter
          </label>

          <select
            value={chapterId}
            onChange={(e) => setChapterId(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={0}>Select Chapter</option>

            {filteredChapters.map((chapter) => (
              <option
                key={chapter.id}
                value={chapter.id}
              >
                {chapter.name}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Topic
          </label>

          <select
            value={topicId}
            onChange={(e) => setTopicId(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={0}>Select Topic</option>

            {filteredTopics.map((topic) => (
              <option
                key={topic.id}
                value={topic.id}
              >
                {topic.name}
              </option>
            ))}

          </select>

        </div>

        <div>

          <label className="block text-sm font-medium mb-2">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

        </div>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />

          <span className="font-medium">
            Active
          </span>

        </label>

      </div>

    </div>
  );
}