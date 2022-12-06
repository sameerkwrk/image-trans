import PDFDocument from "pdfkit";
import sizeOf from "buffer-image-size";
import { randomBytes } from "crypto";

const converter = (images, res) => {
  const pdf = new PDFDocument({
    size: "a5",
    autoFirstPage: false,
  });
  const tocken = randomBytes(6).toString("hex") + ".pdf";
  pdf.info["Title"] = tocken;
  images.forEach((element) => {
    const dimensions = sizeOf(element.buffer);
    console.log(dimensions);
    pdf.addPage().image(element.buffer, {
      align: "center",
      valign: "center",
      fit: [250, 300],
    });
  });
  pdf.pipe(res);
  pdf.end();
};

export default converter;
