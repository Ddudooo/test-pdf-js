import { createCanvas } from 'canvas'
import * as JsBarcode from 'jsbarcode'

export function ImageBarCodeGenerate(data: string) {
  const canvas = createCanvas(200, 200)
  JsBarcode(canvas, data)
  return canvas.toDataURL()
}
