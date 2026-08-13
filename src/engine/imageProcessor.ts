import heic2any from 'heic2any'

export async function loadPhoto(file: File): Promise<HTMLImageElement> {
  // HEIC is decoded natively where supported, otherwise converted locally in-browser.
  const heic = /heic|heif/i.test(file.type) || /\.hei[cf]$/i.test(file.name)
  let source: Blob = file
  if (heic) {
    const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: .92 })
    source = Array.isArray(converted) ? converted[0] : converted
  }
  const url = URL.createObjectURL(source)
  try {
    const img = new Image(); img.src = url; await img.decode(); return img
  } finally { setTimeout(() => URL.revokeObjectURL(url), 1000) }
}

export function cover(ctx: CanvasRenderingContext2D, image: CanvasImageSource, x: number, y: number, w: number, h: number) {
  const img = image as HTMLImageElement
  const iw = img.naturalWidth || (image as ImageBitmap).width, ih = img.naturalHeight || (image as ImageBitmap).height
  const scale = Math.max(w / iw, h / ih), sw = w / scale, sh = h / scale
  // A slight upward bias keeps faces composed well when no face detector is available.
  const sx = (iw - sw) / 2, sy = Math.max(0, (ih - sh) * .35)
  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h)
}
