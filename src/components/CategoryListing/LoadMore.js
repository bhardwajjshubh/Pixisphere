export default function LoadMore({ onClick, hasMore, loading }) {
  return (
    <div className="flex justify-center my-8">
      {hasMore && (
        <button
          onClick={onClick}
          disabled={loading}
          className={`px-6 py-3 rounded-md text-white font-medium transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
