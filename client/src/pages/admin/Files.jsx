import { useEffect, useState } from "react";
import api from "../../services/api";

import AdminLayout from "../../components/layout/AppLayout";

import FileTable from "../../components/files/FileTable";
import UploadFileModal from "../../components/files/UploadFileModal";
import FilePreviewModal from "../../components/files/FilePreviewModal";
import { FaFolderOpen } from "react-icons/fa";

function Files() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showUpload, setShowUpload] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await api.get("/files");
      setFiles(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete file?")) return;

    try {
      await api.delete(`/files/${id}`);
      fetchFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreview = (file) => {
    setSelectedFile(file);
    setShowPreview(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-4">
                📁 File Management
              </div>
              <h1 className="text-4xl font-black text-white leading-tight">
                File Upload Center
              </h1>
              <p className="text-purple-100 text-lg mt-3">
                Upload, manage and preview files
              </p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
            >
              + Upload File
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {/* TABLE HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaFolderOpen className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold">All Files</h2>
                <p className="text-sm text-white/80">Browse and manage uploaded files</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-x-auto p-6">
            <FileTable
              files={files}
              loading={loading}
              onDelete={handleDelete}
              onPreview={handlePreview}
            />
          </div>
        </div>
      </div>

      {showUpload && (
        <UploadFileModal
          onClose={() => setShowUpload(false)}
          onSuccess={fetchFiles}
        />
      )}

      {showPreview && selectedFile && (
        <FilePreviewModal
          file={selectedFile}
          onClose={() => setShowPreview(false)}
        />
      )}
    </AdminLayout>
  );
}

export default Files;