import { jsPDF } from 'jspdf'
import { callAddFont } from './fonts/HY_HEADLINE_M-normal'
const doc = new jsPDF('l', 'mm', [200, 102])

jsPDF.API.events.push(['addFonts', callAddFont])
console.log(doc.getFontList())
doc.setFont('HY_HEADLINE_M')

doc.text('안녕하세요', 25, 10)

doc.save('sample.pdf')
