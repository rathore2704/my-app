import React, { Fragment, useState } from 'react';
import '../table.css';
import data from '../mock-data.json';
import { nanoid } from 'nanoid';
import { ReadOnlyRow } from './ReadOnlyRow';
import EditTableRow from './EditTableRow';
import { useLocation, useNavigate } from 'react-router-dom';

//import { Page } from '@react-pdf/renderer';
//import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

//import jsPDF from 'jspdf';
import PDF from './PDF';



import '../App.css';



export const Table = (props) => {

    // const styleBox = {

    // };

    const location = useLocation();
    const { selectedValue1, selectedValue2, selectedValue3 } = location.state;

    const navigate = useNavigate();
    const [contacts, setContacts] = useState(data);


    const [addFormData, setAddFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: ''
    })


    const [editFormData, setEditFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: ''
    });

    const PDF = {
        fullName: props.fullName,
        address: props.address,
        PhoneNumber: props.phoneNumber,
        email: props.email
    }

    console.log("pdf...", PDF)



//    const state = {
//         selectedValue1: selectedValue1,
//         selectedValue2: selectedValue2,
//         selectedValue3: selectedValue3,
//         fullName: '',
//         address: '',
//         phoneNumber: '',
//         email: '',
//         postSubmitted: false
//     }

//   const  onChange = input => e => {
//         this.setState({
//             [input]: e.target.value
//         });
//     }

    // const submitPost = (e) => {

    //     if (!this.state.title || !this.state.content) {
    //         alert('All fields are required!');
    //         e.preventDefault();
    //     } else {
    //         this.setState({
    //             postSubmitted: true
    //         });
    //     }
    // }

    const [edtContactId, setEditContactId] = useState(null);

    //const [showPDF, setShowPDF] = useState(false);

    const handleAddFormChange = event => {
        event.preventDefault()

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        // const newFormData = { ...addFormData }
        // newFormData[fieldName] = fieldValue

        setAddFormData({ ...addFormData, [fieldName]: fieldValue })
    };



    const handleEditFormChange = event => {
        event.preventDefault();

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        // const newFormData = { ...editFormData };
        // newFormData[fieldName] = fieldValue;

        setEditFormData({ ...editFormData, [fieldName]: fieldValue });
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: nanoid(),
            fullName: addFormData.fullName,
            address: addFormData.address,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email
        };

        //const newContacts = [...contacts, newContact];
        setContacts( [...contacts, newContact]);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: edtContactId,
            fullName: editFormData.fullName,
            address: editFormData.address,
            phoneNumber: editFormData.phoneNumber,
            email: editFormData.email
        }

        const newContacts = contacts.map(contact =>
            contact.id === edtContactId ? editedContact : contact
        );

        // const index = contacts.findIndex((contact) => contact.id === edtContactId);

        // newContacts[index] = editedContact;

        setContacts(newContacts);

        setEditContactId(null);
    }

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);

        const formValues = {
            fullName: contact.fullName,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            email: contact.email
        }

        setEditFormData(formValues);
    };


    const handleCancelClick = () => {
        setEditContactId(null);
    }

    const handleDeleteClick = (contactId) => {
        const newContacts = contacts.filter(contact => contact.id !== contactId);
        setContacts(newContacts);

        // const index = contacts.findIndex((contact) => contact.id === contactId);

        // newContacts.splice(index, 1);

        //setContacts(newContacts);
    };

    // const handlePDFGenerate = () => {
    //     setShowPDF(true);
    // };


    // const generatePDF = () => {
    //     const doc = (
    //         <Document>
    //             <Page size="A4">
    //                 <View style={styles.header}>
    //                     <Text style={styles.headerText}>Contact Details</Text>
    //                     <Text>{selectedValue1}</Text>
    //                     <Text>{selectedValue2}</Text>
    //                     <Text>{selectedValue3}</Text>
    //                 </View>
    //                 <View style={styles.table}>
    //                     <View style={styles.row}>
    //                         <Text style={styles.headerCell}>Name</Text>
    //                         <Text style={styles.headerCell}>Address</Text>
    //                         <Text style={styles.headerCell}>Phone Number</Text>
    //                         <Text style={styles.headerCell}>Email</Text>
    //                     </View>
    //                     {contacts.map(contact => (
    //                         <View style={styles.row} key={contact.id}>
    //                             <Text style={styles.cell}>{contact.fullName}</Text>
    //                             <Text style={styles.cell}>{contact.address}</Text>
    //                             <Text style={styles.cell}>{contact.phoneNumber}</Text>
    //                             <Text style={styles.cell}>{contact.email}</Text>
    //                         </View>
    //                     ))}
    //                 </View>
    //             </Page>
    //         </Document>
    //     );

    //     const pdfBlob = PDFViewer.renderToBlob(doc);

    //     // Save the PDF blob to the local drive
    //     const url = window.URL.createObjectURL(pdfBlob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'contact_details.pdf';
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    // };

    // //Styles for PDF document
    // const styles = StyleSheet.create({
    //     header: {
    //         textAlign: 'center',
    //         marginBottom: 10,
    //     },
    //     headerText: {
    //         fontSize: 20,
    //         fontWeight: 'bold',
    //     },
    //     table: {
    //         display: 'table',
    //         width: 'auto',
    //         borderStyle: 'solid',
    //         borderWidth: 1,
    //         borderRightWidth: 0,
    //         borderBottomWidth: 0,
    //     },
    //     row: {
    //         flexDirection: 'row',
    //         borderBottomWidth: 1,
    //     },
    //     headerCell: {
    //         margin: 5,
    //         fontSize: 12,
    //         fontWeight: 'bold',
    //     },
    //     cell: {
    //         margin: 5,
    //         fontSize: 10,
    //     },
    // });


    // const generatePDF = () => {
    //     const doc = new jsPDF();


    //     let y = 20;

    //     doc.text(20, y, 'Contact Details');
    //     y += 10;
    //     doc.text(20, y, selectedValue1);
    //     y += 10;
    //     doc.text(20, y, selectedValue2);
    //     y += 10;
    //     doc.text(20, y, selectedValue3);
    //     y += 20;

    //     doc.autoTable({
    //         head: [['Name', 'Address', 'Phone Number', 'Email']],
    //         body: contacts.map((contact) => [
    //             contact.fullName,
    //             contact.address,
    //             contact.phoneNumber,
    //             contact.email,
    //         ]),
    //     });
    //     console.log('PDF generated', doc);


    //     doc.save('contact_details.pdf');

    // };



    return (
        <>
            
                (<div className=' container app-container'>


                    <h2 style={{ textAlign: 'center' }}>Page table</h2>

                    <div className='page-table' >


                        <input type="text" value={selectedValue1} readOnly />

                        <input type="text" value={selectedValue2} readOnly />

                        <input type="text" value={selectedValue3} readOnly />
                        <button onClick={() => navigate('/')}>Back To Home</button>
                        {/* <button onClick={handlePDFGenerate}>Download PDF</button> */}

                        {/* <button onClick={generatePDF}>Download PDF</button>  */}
                    </div>

                    <br />

                    <h2>Add a new contact</h2>
                    <form className='add-form' onSubmit={handleAddFormSubmit}>
                        <input
                            onChange={handleAddFormChange}
                            type='text'
                            placeholder='Enter FullName'
                            required='required'
                            name='fullName'
                        />
                        <input
                            onChange={handleAddFormChange}
                            type='text'
                            placeholder='Enter Address'
                            required='required'
                            name='address'
                        />
                        <input
                            onChange={handleAddFormChange}
                            type='text'
                            placeholder='Enter PhoneNumber'
                            required='required'
                            name='phoneNumber'
                        />
                        <input
                            onChange={handleAddFormChange}
                            type='text'
                            placeholder='Enter Email'
                            required='required'
                            name='email'
                        />
                        <button onClick={handleAddFormSubmit} type='submit'>Add</button>
                    </form>

                    <br />

                    <form className='form' onSubmit={handleEditFormSubmit} >
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(contact => (
                                    <Fragment>


                                        {edtContactId === contact.id ? (
                                            <EditTableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                        ) : (<ReadOnlyRow contact={contact}
                                            handleDeleteClick={handleDeleteClick}
                                            handleEditClick={handleEditClick} />)}

                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                        {/* <button type="button" onClick={this.submitPost} className="btn btn-primary btn-lg">Submit</button> */}
                    </form>


                </div>
                ) 

            

        </>
    )
}



export default Table

