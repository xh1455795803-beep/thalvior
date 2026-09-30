export type AIJobType = "translation" | "title_optimization" | "description_optimization" | "keyword_generation" | "image_optimization" | "video_script" | "video_generation" | "policy_check";
export type AIJobStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled";
export type AIJob = { id:string; tenantId:string; type:AIJobType; provider?:string; input:Record<string,unknown>; output?:Record<string,unknown>; status:AIJobStatus; error?:string; createdAt:string; updatedAt:string };

export function canRetryAIJob(job: AIJob) { return job.status === "failed" || job.status === "cancelled"; }
