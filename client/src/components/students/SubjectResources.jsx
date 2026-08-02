function SubjectResources({
  resources,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">

      <h3 className="text-xl font-bold mb-4">
        Subject Resources
      </h3>

      {resources?.length === 0 ? (
        <p className="text-gray-500">
          No resources available
        </p>
      ) : (
        <div className="space-y-3">

          {resources?.map(
            (resource) => (
              <a
                key={resource._id}
                href={resource.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50"
              >
                <span>
                  📄 {resource.title}
                </span>

                <span className="text-blue-600">
                  Download
                </span>
              </a>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default SubjectResources;