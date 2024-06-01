import React, { useRef , ReactDOM } from "react";
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

      if (!content) {
        console.error("PDF content element not found");
        return;
      }
      //const data = React.cloneElement(content, { key: Date.now() });
      // const frame = document.createElement('div');
      // document.body.appendChild(frame);
      // ReactDOM.render(<div>{data}</div>, frame);
      // const actionCells = frame.querySelectorAll('td:last-child');
      // actionCells.forEach(cell => cell.remove());
      // ReactDOM.unmountComponentAtNode(frame);
      // document.body.removeChild(frame);


      const canvas = await html2canvas(content, {scrollY: -window.scrollY});
      const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgProps = pdf.getImageProperties(imgData);
                const imgWidth = pdfWidth - 8; // accounting for 4-unit margins on left and right
                const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                const margin = 4; // 4-unit margins top and bottom

                let heightLeft = imgHeight;
                let position = margin + 20; // Start after margin and header

                function addHeader(pdf, pageNumber) {
                    pdf.setFont("helvetica", "bold");
                    pdf.text("MP & AD Enterprise", 50, 10);

                    pdf.setFont("helvetica", "normal");
                    const xOffset = 60;
                    pdf.text(`${selectedValue1}`, 10, 20);
                    pdf.text(`${selectedValue2}`, 10 + xOffset, 20);
                    pdf.text(`${selectedValue3}`, 10 + 2 * xOffset, 20);
                }

                addHeader(pdf, 1);
                pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                heightLeft -= (pdfHeight - position - margin);

                let pageNumber = 2;
                while (heightLeft >= 0) {
                    pdf.addPage();
                    addHeader(pdf, pageNumber);
                    position = margin + 20; // Reset position for new page
                    pdf.addImage(imgData, 'PNG', margin, position - heightLeft, imgWidth, imgHeight);
                    heightLeft -= (pdfHeight - margin * 2 - 20); // Account for top and bottom margins and header
                    pageNumber++;
                }

                pdf.save('sample.pdf');
        
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