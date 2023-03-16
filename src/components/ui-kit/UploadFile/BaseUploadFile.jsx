import React from "react";
import Dropzone from "react-dropzone";

function BaseUploadFile({
    renderComponent,
    onDrop = (acceptedFiles) => console.log(acceptedFiles),
}) {
    return (
        <Dropzone onDrop={onDrop} noClick={true}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
                        {renderComponent}
                        {/* <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p> */}
                    </div>
                </section>
            )}
        </Dropzone>
    );
}
export default BaseUploadFile;
