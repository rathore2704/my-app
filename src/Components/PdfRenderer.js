import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const PdfGenerator = ({ children }) => {
  const contentRef = useRef(null);
  const location = useLocation();

  const { selectedValue1, selectedValue2, selectedValue3 } = location.state;

  const generatePdf = async () => {
    const content = contentRef.current;

    if (!content) {
      console.error("PDF content element not found");
      return;
    }

    try {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();

      // Add aditional information

      doc.setFontSize(12);
      //doc.getStyles();

      doc.text(`sv1:${selectedValue1}`, 10, 10);
      doc.text(`sv2:${selectedValue2}`, 10, 20);
      doc.text(`sv3:${selectedValue3}`, 10, 30);

      // doc.text.selectedValue1, 10, 10;
      // doc.text.selectedValue2, 10, 20;
      // doc.text.selectedValue3, 10, 30;

      doc.addImage(imgData, "PNG", 10, 10, 180, 0);
      doc.save("sample.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>PDF Generator</h1>
       
      </div>
      <button onClick={generatePdf}>Download PDF</button>
      <br />
      <br />
      <div className="content">
        <div ref={contentRef}>{children}</div>
      </div>

     
    </div>
  );
};

export default PdfGenerator;
