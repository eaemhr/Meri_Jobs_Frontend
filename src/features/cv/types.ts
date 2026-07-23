// export interface CvUploadState {
//   cvId: string | null;
//   status: "idle" | "processing" | "done" | "failed";
// }
export type CvStatus = "idle" | "processing" | "completed" | "failed";

export interface CvUploadState {
  cvId: string | null;
  status: CvStatus;
}
