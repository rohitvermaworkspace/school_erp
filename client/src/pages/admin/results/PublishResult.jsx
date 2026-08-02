import api from "../../../services/api";
import toast from "react-hot-toast";

function PublishResult({
  resultId,
  onPublished,
}) {

  const handlePublish = async (id) => {
    try {
      const res = await api.put(
        `/results/${id}/publish`
      );

      setResults((prev) =>
        prev.map((result) =>
          result._id === id
            ? {
                ...result,
                published: true,
              }
            : result
        )
      );
      toast.success(
        "Result published successfully"
      );
    } catch (error) {
      toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    )}
  };

  return (
    <button
      onClick={handlePublish}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Publish
    </button>
  );
}

export default PublishResult;