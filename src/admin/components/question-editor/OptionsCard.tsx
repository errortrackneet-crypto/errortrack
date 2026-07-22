type Props = {
  optionA: string;
  setOptionA: (value: string) => void;

  optionB: string;
  setOptionB: (value: string) => void;

  optionC: string;
  setOptionC: (value: string) => void;

  optionD: string;
  setOptionD: (value: string) => void;

  correctAnswer: string;
  setCorrectAnswer: (value: string) => void;
};

export default function OptionsCard({
  optionA,
  setOptionA,
  optionB,
  setOptionB,
  optionC,
  setOptionC,
  optionD,
  setOptionD,
  correctAnswer,
  setCorrectAnswer,
}: Props) {

  return (

    <div className="bg-white rounded-2xl border border-slate-200 p-6">

      <h2 className="text-xl font-semibold mb-5">
        ☑ Options
      </h2>

      <div className="space-y-4">

        {/* A */}

        <div className="flex items-center gap-4">

          <input
            type="radio"
            checked={correctAnswer === "A"}
            onChange={() => setCorrectAnswer("A")}
          />

          <span className="font-semibold w-6">
            A
          </span>

          <input
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            placeholder="Option A"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

        {/* B */}

        <div className="flex items-center gap-4">

          <input
            type="radio"
            checked={correctAnswer === "B"}
            onChange={() => setCorrectAnswer("B")}
          />

          <span className="font-semibold w-6">
            B
          </span>

          <input
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            placeholder="Option B"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

        {/* C */}

        <div className="flex items-center gap-4">

          <input
            type="radio"
            checked={correctAnswer === "C"}
            onChange={() => setCorrectAnswer("C")}
          />

          <span className="font-semibold w-6">
            C
          </span>

          <input
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            placeholder="Option C"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

        {/* D */}

        <div className="flex items-center gap-4">

          <input
            type="radio"
            checked={correctAnswer === "D"}
            onChange={() => setCorrectAnswer("D")}
          />

          <span className="font-semibold w-6">
            D
          </span>

          <input
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
            placeholder="Option D"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>

      </div>

    </div>

  );
}