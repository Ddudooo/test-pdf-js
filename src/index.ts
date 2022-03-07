import { jsPDF } from 'jspdf'

function helloWorld() {
  const doc = new jsPDF()

  doc.text('hello world!', 10, 10)
  doc.save('hello_world.pdf')
}

helloWorld()
