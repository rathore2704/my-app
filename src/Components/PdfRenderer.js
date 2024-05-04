import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import "../App.css";

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
      const canvas = await html2canvas(content, {scrollY: -window.scrollY});
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();
  
      // Add additional information
      doc.setFontSize(12);
  
      // Align and style the selected values horizontally
      const x = 40; // Starting x position
      const y = 30; // Starting y position
      const xOffset = 50; // Horizontal offset between values
      const lineHeight = 2; // Line height between values
      
      doc.setFont("helvetica", "bold");
      doc.text("MP & AD Enterprise", x + 40, y - 20);

      doc.setFont("helvetica", "normal");
  
      doc.text(`${selectedValue1}`, x, y);
      doc.text(`${selectedValue2}`, x + xOffset, y);
      doc.text(`${selectedValue3}`, x + 2 * xOffset, y);

      // calculate the number of entries per page

      const entriesPerPage = 40;
      const totalPages = Math.ceil(children.length / entriesPerPage);

      let currentPage = 1;
      let remainingEntries = children.length;

      for(let i = 0; i < children.length; i+=entriesPerPage) {
        // Add entries to the current page
        const currentPageEntries = children.slice(i, i + entriesPerPage);
        currentPageEntries.forEach((entry, index) => {
          const tableRow = `${entry.serialNumber}, ${entry.ubin}, ${entry.receivedMessage}, ${entry.time}`;
          doc.text(tableRow, x, y + lineHeight * index);
        });

         // Add the table image for the current page
      if (currentPage !== totalPages) {
        doc.addPage();
      }

      y = 10; // Reset y position for the next page
      currentPage++;
      remainingEntries -= currentPageEntries.length;
    }
 
      doc.addImage(imgData, "PNG", 10, y + 3 * lineHeight, 180, 0);

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


// problem with the above code such that if the entries in the table are more than 100 then will print only first 40 to 50 entries in the pdf table as the above code does not generate the next page of