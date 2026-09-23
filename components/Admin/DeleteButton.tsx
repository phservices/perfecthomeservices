"use client";

export default function DeleteButton({
  confirmText = "Delete this post for good? This can't be undone.",
}: {
  confirmText?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
      className="rounded-full px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
    >
      Delete
    </button>
  );
}
