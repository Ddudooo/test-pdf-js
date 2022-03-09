import { DOMImplementation, XMLSerializer } from 'xmldom'
import * as JsBarcode from 'jsbarcode'

export function svgBarcodeGnerator(barcode: string) {
  const options = {
    width: 100,
    height: 80,
    x: 0,
    y: 0,
    fontSize: 8,
    textPosition: 'top',
    displayValue: false,
    textMargin: 0,
    margin: 0,
  }
  const {
    width,
    height,
    x = 0,
    y = 0,
    fontSize = 8,
    textPosition = 'top',
    displayValue = false,
    textMargin = 0,
    margin = 0,
  } = options
  const xmlSerializer = new XMLSerializer()
  const document = new DOMImplementation().createDocument('', 'html', null)
  const svgNode = document.createElementNS('', 'svg')
  JsBarcode(svgNode, barcode, {
    xmlDocument: document,
    textMargin,
    margin,
    width: 2,
    height: height || 60,
    fontSize,
    textPosition,
    displayValue,
  })
  svgNode.setAttribute('width', `${width}px`)
  svgNode.setAttribute('preserveAspectRatio', 'none meet')
  if (x) {
    svgNode.setAttribute('x', x)
  }
  if (y) {
    svgNode.setAttribute('y', y)
  }
  return xmlSerializer.serializeToString(svgNode)
}
