import React from 'react'

const EditTableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    type='text'
                    name='fullName'
                    required='required'
                    placeholder='Enter FullName'
                    value={editFormData.fullName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type='text'
                    name='address'
                    required='required'
                    placeholder='Enter Address'
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                ></input>

            </td>
            <td>
                <input
                    type='text'
                    name='phoneNumber'
                    required='required'
                    placeholder='Enter PhoneNumber'
                    value={editFormData.phoneNumber} 
                    onChange={handleEditFormChange}>

                </input>
            </td>
            <td>
                <input
                    type='email'
                    name='email'
                    required='required'
                    placeholder='Enter Email'
                    value={editFormData.email} 
                    onChange={handleEditFormChange}></input>
            </td>
            <td><button type='submit'   >Save</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button></td>
        </tr>
    )
}

export default EditTableRow
