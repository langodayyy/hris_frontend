import React from "react";
import { Button } from "@/components/ui/button"; // Pastikan path ini sesuai dengan proyek kamu

interface DownloadButtonProps {
  fileUrl: string;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileUrl, fileName }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("File berhasil diunduh");
  };

  return (
    <Button
      variant="ghost"
      className="w-auto"
      size="icon"
      onClick={handleDownload}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="24"
        height="24"
        strokeWidth="2"
      >
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
        <path d="M7 11l5 5l5 -5"></path>
        <path d="M12 4l0 12"></path>
      </svg>
    </Button>
  );
};

export default DownloadButton;
