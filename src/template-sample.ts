import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { render } from 'mustache'
import * as puppeteer from 'puppeteer'
import { svgBarcodeGnerator } from '@/svgBarcodeGnerator'
import { ImageBarCodeGenerate } from '@/imageBarcode.util'
import HY_HEADLINE_MBase64 from '@/fonts/HY_HEADLINE_M.base64'

async function templatePDF() {
  const hyBase64URL = readFileSync(
    join(__dirname, 'fonts', 'HY_HEADLINE_M.woff2'),
    {
      encoding: 'base64',
    },
  )
  //console.log(hyBase64URL)

  const params = {
    message: '안녕하세요',
    font: HY_HEADLINE_MBase64,
    barcode: svgBarcodeGnerator('test'),
    barcodeImg: ImageBarCodeGenerate('test'),
  }

  const template = readFileSync(
    join(__dirname, 'templates', 'sample.hbs'),
    'utf8',
  )
  console.log(template)
  const html = render(template, params)
  console.log(html)
  writeFileSync('temp.html', html, { encoding: 'utf8' })
  //console.log(html)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  })
  const page = await browser.newPage()
  await page.emulateMediaType('screen')
  await page.setContent(html, {
    waitUntil: ['networkidle0'],
  })
  //await page.waitForTimeout(30000)
  await page.setViewport({
    width: 385,
    height: 755,
    isLandscape: true,
    deviceScaleFactor: 2,
  })
  //await page.waitForTimeout(15000)
  await page.screenshot({ path: 'screen.png' })
  await page.pdf({
    landscape: true,
    width: '380px',
    height: '755px',
    path: 'sample.pdf',
    printBackground: true,
  })
  await page.pdf({
    landscape: true,
    width: '380px',
    height: '755px',
    path: 'sample2.pdf',
    printBackground: true,
  })
  //
  //console.log(pdf)
  await browser.close()
  //return pdf
}

;(async () => {
  await templatePDF()
  process.exit(0)
})()
