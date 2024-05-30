import React, { useState } from "react";
import download from "../../assets/fields/import.svg";
import attach from "../../assets/fields/Attach.png";
import pdf from "../../assets/Form/svgexport-10 (18) 1.svg";
import trash from "../../assets/Form/trash.svg";
import material from "../../assets/Form/material-symbols_zoom-out-map-rounded.svg";
import "./View_attachments.css";
import { IoCloseSharp } from "react-icons/io5";

const View_attachments = ({ links, attachs }) => {
  let [scaleimg, setScaleimg] = useState();


  const handleDownload = (path) => {
    // Replace 'your-pdf-file-path.pdf' with the actual path to your PDF file
    const pdfFilePath = path;
    // const link = document.createElement('a');

    // link.href = pdfFilePath;
    // link.download = 'downloaded-file.pdf';
    window.open(pdfFilePath, '_blank');

    // link.click();
  };

  return (
    <div>
      <div className="dash__viewtask-attachments">
        <h2 className="head">Links :</h2>

        <div className="dash__viewtask-attachments_content">
          {links && (
            <div>
              <div className="attach-head">
                <img src={attach} alt="" />
                <h3>Document Links</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 dash__form-content_links ">
                {links?.map((link) => {
                  return (
                    <div className="dash__form-content_links-link-a">
                          <a href={link} target="blank">
                            {link}
                          </a>
                        </div>
                  );
                })}
              </div>
            </div>
          )}

          {attachs && (
            <>
              <div>
                <div className="attach-head">
                  <img src={attach} alt="" />
                  <h3>Attachments</h3>
                </div>

                <div
                  className="dash__form-content_attach_upload flex"
                  style={{
                    gap: "25px",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                  }}
                >
                  {attachs?.map((att, index) => {

                    if (att.attachment_type === "image"){

                      return (
                        <div
                          className="dash__form-content_attach_upload-image" 
                        >
                          <div className="dash__form-content_attach_upload-image_file">
                            <img
                            
                              src={att.attachment_path}
                              alt="attach img"
                            />
                           
                          </div>
  
                          <div className="dash__form-content_attach_upload-image_hover">
                            <img
                              src={material}
                              alt="material"
                              onClick={() => {
                                setScaleimg(att.attachment_path);
                              }}
                            />
                          </div>
  
                          {/* <div className='dash__form-content_attach_upload-image_zoom'> 
  
                                                   <img src={attachment.attachment_path} alt='attach img'/>
  
                                                </div> */}
                        </div>
                      );
                    
                    }
             
                  })}
                </div>
              </div>

              <div>
                <div className="attach-head">
                  <img src={document} alt="" />
                  <h3> Documents</h3>
                </div>

                <div className="attach-files grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-8">
                  {attachs?.map((attachment) => {
                    if (attachment.attachment_type !== "image") {
                      return (
                        <div className="attach-file">
                          <div>
                            <img src={pdf} alt="files" />
                          </div>
                          <div>
                            <h3
                              style={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                width:'150px',
                                overflow:"hidden"
                                
                              }}
                            >
                              {attachment.file_name}
                            </h3>
                            <p> {attachment.size}</p>
                          </div>
                          <div style={{ marginLeft: "auto" }}>
                            <img src={download} alt="" onClick={()=>{handleDownload(attachment.attachment_path
)}} />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              
              { scaleimg && 
                               <div className='imageScaled'  onClick={()=>{setScaleimg()}}>

                                <img src={scaleimg} alt='img' />
                                  
                                  
                   </div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default View_attachments;
