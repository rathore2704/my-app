import React, { Fragment, useState } from "react";
import "../table.css";
import data from "../mock-data.json";
import { nanoid } from "nanoid";
import { ReadOnlyRow } from "./ReadOnlyRow";
import EditTableRow from "./EditTableRow";
import { useLocation, useNavigate } from "react-router-dom";

//import { Page } from '@react-pdf/renderer';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import PdfGenerator from "./PdfRenderer";


import "../App.css";

export const Table = (props) => {
  const location = useLocation();
  const { selectedValue1, selectedValue2, selectedValue3 } = location.state;

  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState(1)
  const [contacts, setContacts] = useState(data);

  const [addFormData, setAddFormData] = useState({
    serialNumber: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    serialNumber: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const PDF = {
    serialNumber: "1",
    fullName: "deepak",
    address: "kanpur",
    PhoneNumber: "45556",
    email: "gggg@.com",
  };

  console.log("pdf...", PDF);

  const [edtContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setAddFormData({ ...addFormData, [fieldName]: fieldValue });
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setEditFormData({ ...editFormData, [fieldName]: fieldValue });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      serialNumber:serialNumber,
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    
    setContacts([...contacts, newContact]);
    setSerialNumber(serialNumber + 1); // Increment serial number
    console.log("serial number", serialNumber);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: edtContactId,
      serialNumber: editFormData.serialNumber,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = contacts.map((contact) =>
      contact.id === edtContactId ? editedContact : contact
    );

    setContacts(newContacts);

    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      serialNumber: contact.serialNumber,
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(newContacts);
  };

  const generatePDF = () => {
    const doc = (
      <Document>
        <Page size="A4">
          <View>
            <Text>{selectedValue1}</Text>
            <Text>{selectedValue2}</Text>
            <Text>{selectedValue3}</Text>
            <Text></Text>
            <Text>Contact Details</Text>
            {contacts.map((contact) => (
              <Fragment>
                <Text>{contact.serialNumber}</Text>
                <Text>{contact.fullName}</Text>
                <Text>{contact.address}</Text>
                <Text>{contact.phoneNumber}</Text>
                <Text>{contact.email}</Text>
                <Text></Text>
              </Fragment>
            ))}
          </View>
        </Page>
      </Document>
    );

    // Render the PDF content
    const pdf = (
      <PDFViewer width="100%" height="100%">
        {" "}
        {doc}{" "}
      </PDFViewer>
    );

    // Create a Blob from the PDF content
    const blob = new Blob([pdf], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Download the PDF
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts.pdf";
    link.click();
  };

  //Styles for PDF document
  const styles = StyleSheet.create({
    header: {
      textAlign: "center",
      marginBottom: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
    },
    headerCell: {
      margin: 5,
      fontSize: 12,
      fontWeight: "bold",
    },
    cell: {
      margin: 5,
      fontSize: 10,
    },
  });

  return (
    <>
      (
      <div className=" container app-container">
        <h2 style={{ textAlign: "center" }}>Page table</h2>
        <div>
          <h1>PDF Generator Example</h1>

          <div className="page-table">
            <input type="text" value={selectedValue1} readOnly />
            <input type="text" value={selectedValue2} readOnly />
            <input type="text" value={selectedValue3} readOnly />
            <button onClick={() => navigate("/")}>Back To Home</button>
            {/* <button onClick={handlePDFGenerate}>Download PDF</button> */}

            <button onClick={generatePDF}>Download PDF</button>
          </div>

          <h2>Sample PDF Content</h2>
          <p>This is a sample PDF generated from React.</p>
          <p>Hard-coded content goes here...</p>

          <br />

          <h2>Add a new contact</h2>
          <form className="add-form" onSubmit={handleAddFormSubmit}>
            <input
              onChange={handleAddFormChange}
              type="text"
              placeholder="Enter FullName"
              required="required"
              name="fullName"
            />
            <input
              onChange={handleAddFormChange}
              type="text"
              placeholder="Enter Address"
              required="required"
              name="address"
            />
            <input
              onChange={handleAddFormChange}
              type="text"
              placeholder="Enter PhoneNumber"
              required="required"
              name="phoneNumber"
            />
            <input
              onChange={handleAddFormChange}
              type="text"
              placeholder="Enter Email"
              required="required"
              name="email"
            />
            <button onClick={handleAddFormSubmit} type="submit">
              Add
            </button>
          </form>

          <br />
          <PdfGenerator>
            <form className="form" onSubmit={handleEditFormSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>serialNumber</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <Fragment>
                      {edtContactId === contact.id ? (
                        <EditTableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          contact={contact}
                          handleDeleteClick={handleDeleteClick}
                          handleEditClick={handleEditClick}
                        />
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
              {/* <button type="button" onClick={this.submitPost} className="btn btn-primary btn-lg">Submit</button> */}
            </form>
          </PdfGenerator>
        </div>
      </div>
      )
    </>
  );
};

export default Table;

// improve the following code such that as the entries in the table should contain the 
