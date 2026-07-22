export interface CvUploadState {
  cvId: string | null;
  status: "idle" | "processing" | "done" | "failed";
}
