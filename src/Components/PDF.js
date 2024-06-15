import React from 'react';
import Pdf from "react-to-pdf";

const ref = React.createRef();
const PDF = (props) => {
    return (
        <>
            <div className="App" ref={ref}>
                <h1>{props.fulName}</h1>
                <h1>{props.address}</h1>
                <h1>{props.phoneNumber}</h1>
                <h1>{props.email}</h1>
            </div>
            <br/>
            <br/>
            <hr/>

            <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}

            </Pdf>
        </>
    )
}

export default PDF
