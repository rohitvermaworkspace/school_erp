const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateReceipt = (payment, student) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();

      const fileName = `receipt_${payment._id}.pdf`;
      const filePath = path.join(__dirname, "../receipts", fileName);

      // Ensure folder exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // 🏫 HEADER
      doc.fontSize(20).text("School Fee Receipt", {
        align: "center",
      });

      doc.moveDown();

      // 👨‍🎓 Student Info
      doc.fontSize(12).text(`Student Name: ${student.name}`);
      doc.text(`Class: ${payment.className}`);
      doc.text(`Email: ${student.email}`);

      doc.moveDown();

      // 💰 Payment Info
      doc.text(`Amount Paid: ₹${payment.amountPaid}`);
      doc.text(`Total Fee: ₹${payment.totalFee}`);
      doc.text(`Remaining Fee: ₹${payment.remainingFee}`);
      doc.text(`Status: ${payment.paymentStatus}`);

      doc.moveDown();

      // 📅 Transaction Info
      doc.text(`Payment Mode: ${payment.paymentMode}`);
      doc.text(`Transaction ID: ${payment.transactionId || "N/A"}`);
      doc.text(`Date: ${new Date(payment.paidAt).toDateString()}`);

      doc.moveDown();

      doc.text("Thank you for your payment!", {
        align: "center",
      });

      doc.end();

      stream.on("finish", () => {
        resolve(filePath);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generateReceipt;