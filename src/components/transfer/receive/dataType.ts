export type File = {
  id: number;
  type: "file" | "text";
  name?: string;
  size?: string;
  sessionId?: number;
  fileUrl?: string;
  text?: string;
  expiresIn: string;
};

export type ContentType = {
  id: number;
  sessionId: string;
  sharedBy: string;
  visibility: "public" | "private";
  files: File[];
};
