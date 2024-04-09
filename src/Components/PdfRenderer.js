import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PdfGenerator = ({ children }) => {
  const contentRef = useRef(null);

  const generatePdf = async () => {
    const content = contentRef.current;

    if (!content) {
      console.error('PDF content element not found');
      return;
    }

    try {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 10, 10, 180, 0);
      doc.save('sample.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <div ref={contentRef}>
        {children}
      </div>
      <button onClick={generatePdf}>Download PDF</button>
    </div>
  );
};

export default PdfGenerator;
