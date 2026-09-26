const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.8;

/**
 * Shrinks a photo in the browser to at most 1600px on its long side, as a JPEG.
 * A typical 4–8 MB phone photo comes out around 200–500 KB.
 * Returns null if the browser can't decode the file (e.g. HEIC in Chrome).
 */
export async function shrinkImage(file: File): Promise<Blob | null> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return null;
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return null;
  }
  // JPEG has no transparency; give see-through PNGs a white background instead of black.
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
}
