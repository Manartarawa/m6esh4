import { appConfig } from "@/config/app";
import { AppError } from "@/lib/errors";

export type UploadKind = "profile" | "portfolio" | "project" | "deliverable";

export interface StoredObject {
  key: string;
  url: string;
  contentType: string;
  size: number;
}

export interface StorageAdapter {
  put(input: {
    kind: UploadKind;
    filename: string;
    contentType: string;
    size: number;
    ownerId: string;
  }): Promise<StoredObject>;
}

class LocalStorageAdapter implements StorageAdapter {
  async put(input: {
    kind: UploadKind;
    filename: string;
    contentType: string;
    size: number;
    ownerId: string;
  }): Promise<StoredObject> {
    const allowed =
      input.kind === "project"
        ? appConfig.uploads.allowedAttachmentTypes
        : appConfig.uploads.allowedImageTypes;
    if (!allowed.some((type) => type === input.contentType)) {
      throw new AppError("This file type is not allowed.", "VALIDATION", 400);
    }
    const limitMb =
      input.kind === "deliverable" || input.kind === "project"
        ? appConfig.uploads.maxAttachmentMb
        : appConfig.uploads.maxImageMb;
    if (input.size > limitMb * 1024 * 1024) {
      throw new AppError("File exceeds the size limit.", "VALIDATION", 400);
    }
    const key = `${input.kind}/${input.ownerId}/${Date.now()}-${input.filename}`;
    return {
      key,
      url: `/uploads/${key}`,
      contentType: input.contentType,
      size: input.size,
    };
  }
}

export const storage: StorageAdapter = new LocalStorageAdapter();
