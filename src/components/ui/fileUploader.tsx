"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FileUploaderProps = {
  onDrop: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
  description?: string;
  type?: string;
};

export function FileUploader({
  onDrop,
  accept = {
    "image/png": [],
    "image/jpeg": [],
    "image/jpg": [],
    "application/pdf": [], // Tambahkan dukungan untuk file PDF
  },
  maxSize = 5 * 1024 * 1024, // 10MB
  label = "Drag your file or",
  description = "Max 5 MB file is allowed",
  type = "Only support .png, .jpg, .jpeg, .csv",
}: FileUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; // Ambil file pertama
      setUploadedFile(file); // Simpan file yang diunggah
      onDrop([file]); // Panggil callback dengan file yang diunggah
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
    multiple: false, // Hanya izinkan satu file
  });

  return (
    <>
      {uploadedFile ? (
        <div className="mt-4">
          {uploadedFile.type === "text/csv" ? (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.5 2.5H6a2 2 0 00-2 2v15a2 2 0 002 2h12a2 2 0 002-2V8.5L14.5 2.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 2v6h6"
                />
              </svg>
              <p className="text-sm text-gray-600">{uploadedFile.name}</p>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-4">
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Uploaded file"
              className="w-32 h-32 object-cover rounded-md"
            />

          <Button
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = Object.keys(accept).join(",");
              input.onchange = (event) => {
                const file = (event.target as HTMLInputElement).files?.[0];
                if (file) {
                  setUploadedFile(file);
                  onDrop([file]);
                }
              };
              input.click();
            }}
            variant={"outline"}
            size={"sm"}
            className="w-auto"
          >
            Change file
          </Button>
          </div>
          )}
        </div>
      ) : (
        <Card
          {...getRootProps()}
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.025 15.06C28.005 9.885 23.46 6 18 6C13.665 6 9.9 8.46 8.025 12.06C3.51 12.54 0 16.365 0 21C0 25.965 4.035 30 9 30H28.5C32.64 30 36 26.64 36 22.5C36 18.54 32.925 15.33 29.025 15.06ZM28.5 27H9C5.685 27 3 24.315 3 21C3 17.925 5.295 15.36 8.34 15.045L9.945 14.88L10.695 13.455C12.12 10.71 14.91 9 18 9C21.93 9 25.32 11.79 26.085 15.645L26.535 17.895L28.83 18.06C31.17 18.21 33 20.175 33 22.5C33 24.975 30.975 27 28.5 27ZM12 19.5H15.825V24H20.175V19.5H24L18 13.5L12 19.5Z"
                fill="black"
                fillOpacity="0.8"
              />
            </svg>

            <p className="text-sm text-gray-600">
              {label}{" "}
              <span className="text-info-500 font-semibold">browse</span>
            </p>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </Card>
      )}
      <div className="text-neutral-500 text-xs">{type}</div>
    </>
  );
}
