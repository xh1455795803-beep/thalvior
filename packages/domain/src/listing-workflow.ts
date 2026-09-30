export type ListingStatus = "draft" | "review" | "approved" | "ready" | "published" | "failed" | "archived";
export type ListingEvent = "submit_review" | "approve" | "reject" | "publish" | "publish_failed" | "archive";

const transitions: Record<ListingStatus, Partial<Record<ListingEvent, ListingStatus>>> = {
  draft: { submit_review: "review" },
  review: { approve: "approved", reject: "draft" },
  approved: { publish: "published", reject: "draft" },
  ready: { publish: "published", reject: "draft" },
  published: { archive: "archived" },
  failed: { publish: "published", archive: "archived" },
  archived: {}
};

export function transitionListing(status: ListingStatus, event: ListingEvent): ListingStatus {
  const next = transitions[status]?.[event];
  if (!next) throw new Error(`LISTING_INVALID_TRANSITION:${status}:${event}`);
  return next;
}

export function validateBeforePublish(fields: Record<string, unknown>, required: string[]) {
  const errors = required.filter(key => fields[key] === undefined || fields[key] === null || fields[key] === "").map(key => `${key}不能为空`);
  return { valid: errors.length === 0, errors };
}
