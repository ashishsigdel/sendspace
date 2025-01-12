"use client";
import React, { useState, useCallback } from "react";
import { BsChatSquareText, BsCloudUpload } from "react-icons/bs";
import { FaFileAlt, FaGlobe, FaLock, FaShare } from "react-icons/fa";
import FileSelect from "./FileSelect";
import TextForm from "./TextForm";
import TabItem from "@/components/TabIcon";
import OptionButton from "./OptionButton";
import PasswordModel from "./PasswordModel";
import { myAxios } from "@/services/apiServices";
import toast from "react-hot-toast";
import Response from "./Response";

const Send = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedType, setSelectedType] = useState<"text" | "file">("text");
  const [text, setText] = useState<string>("");
  const [textError, setTextError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    sessionId: string;
    visibility: string;
  } | null>(null);

  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    setFiles((prev) => [...prev, ...selectedFiles]);
  }, []);

  const validateText = () => {
    if (!text) {
      setTextError("Text is required!");
      return;
    } else {
      setTextError("");
    }
  };

  const handleSend = async () => {
    validateText();
    if (text && !textError) {
      try {
        const response = await myAxios.post("/transfer", {
          text,
          visibility: isPublic ? "public" : "private",
          password: password,
        });
        setResponse(response.data.data);
        setText("");
      } catch (error: any) {
        throw error?.response?.data?.message || "Something went wrong!";
      }
    } else {
      throw textError;
    }
  };

  const generatingLink = async () => {
    toast.promise(handleSend(), {
      loading: "Generating Link...",
      success: "Link Generated Successfully",
      error: (err: string) => err,
    });
  };

  if (response) {
    return <Response response={response} setResponse={setResponse} />;
  }
  return (
    <div className="mx-auto w-full max-w-xl lg:max-w-2xl">
      <div className="mb-4 flex w-full justify-center">
        <div className="flex gap-2 rounded-xl border border-black/10 p-1 dark:border-white/10 bg-white dark:bg-gray-950">
          <TabItem
            label="Text"
            icon={<BsChatSquareText />}
            active={selectedType === "text"}
            onClick={() => setSelectedType("text")}
          />
          <TabItem
            label="File"
            icon={<FaFileAlt />}
            active={selectedType === "file"}
            onClick={() => setSelectedType("file")}
          />
        </div>
      </div>
      {selectedType === "text" ? (
        <TextForm
          text={text}
          setText={setText}
          textError={textError}
          validateText={validateText}
        />
      ) : (
        <FileSelect
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onDragOver={onDragOver}
          isDragging={isDragging}
          onFileSelect={onFileSelect}
        />
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 font-medium">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedType === "text" && (
        <>
          <div className="mt-5 space-y-3">
            <OptionButton
              active={isPublic}
              icon={<FaGlobe />}
              titleText="Public Share"
              subText="Anyone with the link can view"
              onClick={() => {
                setIsPublic(true);
                setPassword("");
              }}
            />
            <OptionButton
              active={!isPublic}
              icon={<FaLock />}
              titleText="Private Share"
              subText="Password required to see"
              onClick={() => setShowPasswordModal(true)}
              isPassword={true}
              password={password}
            />
          </div>
          <div className="mt-10">
            <TabItem
              icon={<FaShare />}
              active={true}
              label="Generate Link"
              onClick={() => generatingLink()}
            />
          </div>
        </>
      )}

      {showPasswordModal && (
        <PasswordModel
          password={password}
          setIsPublic={setIsPublic}
          setPassword={setPassword}
          setShowPasswordModal={setShowPasswordModal}
        />
      )}
    </div>
  );
};

export default Send;
