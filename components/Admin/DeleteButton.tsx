"use client";

export default function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm("Delete this post for good? This can't be undone.")) e.preventDefault();
      }}
      className="rounded-full px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
    >
      Delete
    </button>
  );
}
