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

      let currentPage = 1;
      // let remainingEntries = children.length;

      // Iterate over children array and add pages as needed
      for (let i = 0; i < children.length; i += entriesPerPage) {
        // Slice the children array to get entries for the current page
        const currentPageEntries = children.slice(i, i + entriesPerPage);

       

         // Add entries to the current page
        // currentPageEntries.forEach((entry, index) => {
        //   //doc.addImage(imgData, "PNG", x, index * lineHeight + 10, 180, 0);
          
        //   entry.forEach((value, index) => {
        //     doc.addImage(imgData, "PNG", 20, y + 10 * lineHeight, 180, 0);
        //    // doc.text(`${value}`, x, index * lineHeight + 10);

        //     doc.addPage();
          
        //   });
        // });

         // Add entries to the current page
         currentPageEntries.forEach((entry, index) => {
          doc.text(`${entry}`, x, y + (index + 1) * lineHeight);
          if ((index + 1) % entriesPerPage === 0) {
            doc.addPage();
          }
        });

        
        currentPage++;
      }

      //doc.addImage(imgData, "PNG", 20, y + 10 * lineHeight, 180, 0);

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