// src/api/media.js
import { api } from "./client";

// Helpers
export function buildMediaFormData({
  file,
  title,
  description = "",
  mediaType,
  category,
  visibility = "public",
  tags = [],
  metadata = {},
}) {
  const formData = new FormData();

  if (!file) throw new Error("File is required");
  formData.append("file", file);

  formData.append("title", title);
  if (description) formData.append("description", description);
  formData.append("mediaType", mediaType);
  formData.append("category", category);
  formData.append("visibility", visibility);

  if (Array.isArray(tags) && tags.length > 0) {
    formData.append("tags", tags.join(","));
  }

  if (metadata && Object.keys(metadata).length > 0) {
    formData.append("metadata", JSON.stringify(metadata));
  }

  return formData;
}

// POST /api/media
export async function createMedia(payload, { onUploadProgress } = {}) {
  const formData = buildMediaFormData(payload);

  const res = await api.post("/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return res.data?.media || res.data;
}

// GET /api/media
export async function getMediaList(params = {}) {
  const res = await api.get("/media", { params });
  return res.data;
}

// GET /api/media/:id
export async function getMediaItem(id) {
  const res = await api.get(`/media/${id}`);
  return res.data?.media || res.data;
}

// PUT /api/media/:id
export async function updateMedia(id, data) {
  const res = await api.put(`/media/${id}`, data);
  return res.data?.media || res.data;
}

// DELETE /api/media/:id
export async function deleteMedia(id) {
  const res = await api.delete(`/media/${id}`);
  return res.data;
}

// POST /api/media/:id/like
export async function toggleMediaLike(id) {
  const res = await api.post(`/media/${id}/like`);
  return res.data;
}

export async function addMediaCollaborator(id, { userId, role = "viewer" }) {
  const res = await api.post(`/media/${id}/collaborators`, { userId, role });
  return res.data;
}

export async function removeMediaCollaborator(id, userId) {
  const res = await api.delete(`/media/${id}/collaborators/${userId}`);
  return res.data;
}

// Categorías
export async function getMediaCategories() {
  const res = await api.get("/media/categories");
  return res.data?.categories || res.data;
}
