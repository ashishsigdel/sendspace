import React from "react";
import { BsCloudUpload } from "react-icons/bs";

type Props = {
  onDragOver: any;
  onDragLeave: any;
  onDrop: any;
  isDragging: any;
  onFileSelect: any;
};

export default function FileSelect({
  onDragLeave,
  onDragOver,
  onDrop,
  isDragging,
  onFileSelect,
}: Props) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 ${
        isDragging
          ? "border-blue-500 bg-black/10 dark:bg-white/10"
          : "border-gray-400 dark:border-gray-700"
      } transition-colors duration-200`}
    >
      <BsCloudUpload size={50} />

      <label className="mt-4 cursor-pointer">
        <span className="text-blue-500 hover:text-blue-600">
          Click to upload
        </span>
        <span className="text-gray-500"> or drag and drop</span>
        <input
          type="file"
          className="hidden"
          onChange={onFileSelect}
          multiple
        />
      </label>
      <p className="mt-2 text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
    </div>
  );
}
