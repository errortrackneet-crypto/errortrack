type Props = {
  onSave: () => void;
  isSaving: boolean;
  isEditing: boolean;
};

export default function ActionBar({
  onSave,
  isSaving,
  isEditing,
}: Props) {
  return (
    <div className="sticky bottom-0 mt-6 bg-white border border-slate-200 rounded-2xl p-4">

      <div className="flex justify-end">

        <button
  type="button"
  onClick={onSave}
  disabled={isSaving}
  className={`rounded-xl px-6 py-3 text-white font-semibold transition

    ${
      isSaving
        ? "bg-slate-400 cursor-not-allowed"
        : "bg-teal-500 hover:bg-teal-600"
    }`}
>
  {isSaving ? "Saving..." : isEditing ? "Update Question" : "Save Question"}
</button>

      </div>

    </div>
  );
}