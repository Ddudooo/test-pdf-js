import * as pdf from 'pdf-creator-node'
import { svgBarcodeGnerator } from '@/svgBarcodeGnerator'
import { ImageBarCodeGenerate } from '@/imageBarcode.util'
import { readFileSync } from 'fs'
import { join } from 'path'
import { render } from 'mustache'

async function html2Pdf() {
  const params = {
    message: '안녕하세요',
    barcode: svgBarcodeGnerator('test'),
    barcodeImg: ImageBarCodeGenerate('test'),
  }

  const template = readFileSync(
    join(__dirname, 'templates', 'sample.hbs'),
    'utf8',
  )
  const html = render(template, params)
  try {
    const result = await pdf.create(
      {
        html: html,
        path: 'html2pdf.pdf',
        data: {},
      },
      {
        orientation: 'landscape',
        width: '200mm',
        height: '102mm',
      },
    )
  } catch (e) {
    console.error(e)
  }
}

;(async () => {
  await html2Pdf()
  process.exit(0)
})()
