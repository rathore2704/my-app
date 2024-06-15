import React from 'react'

export const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <>
            <tr>
                <td>{contact.serialNumber}</td>
                <td>{contact.fullName}</td>
                <td>{contact.address}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.email}</td>
                <td>
                    <button onClick={(event) => handleEditClick(event, contact)}>Edit</button>
                    
                    <button onClick={() => handleDeleteClick(contact.id)} >Delete</button>
                    </td>
            </tr>
        </>
    )
}
