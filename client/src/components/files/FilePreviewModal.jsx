function FilePreviewModal({
  file,
  onClose,
}) {
  const fileUrl =
    `http://localhost:8000${file.fileUrl}`;

  const isImage =
    file.fileType?.includes(
      "image"
    );

  const isPdf =
    file.fileType?.includes(
      "pdf"
    );

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg dark:text-white">
            {file.fileName}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500"
          >
            Close
          </button>
        </div>

        {isImage && (
          <img
            src={fileUrl}
            alt=""
            className="max-h-[600px] mx-auto"
          />
        )}

        {isPdf && (
          <iframe
            src={fileUrl}
            title="pdf"
            className="w-full h-[600px]"
          />
        )}

        {!isImage &&
          !isPdf && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              Download File
            </a>
          )}
      </div>
    </div>
  );
}

export default FilePreviewModal;