import PDFDocument from "pdfkit";
import { randomBytes } from "crypto";
import sizeOf from "buffer-image-size";

const converter = (images, res) => {
  images.splice(1, 1);
  const pdf = new PDFDocument({
    size: "a5",
    autoFirstPage: false,
  });
  const tocken = randomBytes(6).toString("hex") + ".pdf";
  pdf.info["Title"] = tocken;
  images.forEach((element) => {
    const dimensions = sizeOf(element.buffer);
    pdf.addPage().image(element.buffer, {
      align: "center",
      valign: "center",
      fit: [dimensions.height, dimensions.width],
    });
  });
  pdf.pipe(res);
  pdf.end();
};

export { converter };
