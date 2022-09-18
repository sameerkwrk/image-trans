import PDFDocument from "pdfkit";
import { createWriteStream, readFileSync } from "fs";

function base64_encode(file) {
  // read binary data
  var bitmap = readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer.from(bitmap);
}
const pdf = new PDFDocument();

pdf.pipe(createWriteStream("clienst.pdf"));
pdf.addPage().image(base64_encode("./functions/screenshot(20).png"), {
  fit: [500, 400],
  align: "center",
  valign: "center",
});

pdf.end();
