import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import upload from "../../assets/Form/documentupload.svg";
import trash from "../../assets/Form/trash.svg";
import material from "../../assets/Form/material-symbols_zoom-out-map-rounded.svg";
import { Link } from "react-router-dom";
import { serverApi } from "../../../App";
import { IoIosClose } from "react-icons/io";
import word from "../../assets/Form/svgexport-18 1.svg";
import p from "../../assets/Form/svgexport-10 (18) 1.svg";
import rar from "../../assets/Form/svgexport-6 (2) 1.svg";
import { IoCloseSharp } from "react-icons/io5";

const Addattachments = ({ fun, prevFiles, deleteFiles }) => {
  let [links, setLinks] = useState([]);
  let [technology, setTechnology] = useState([]);
  let [images, setImages] = useState([]);
  let [docs, setDocs] = useState([]);
  console.log("🚀 ~ docs:", docs);
  let [docfiles, setDocfiles] = useState([]);
  console.log("🚀 ~ docfiles:", docfiles);
  let [Attachments, setAttachments] = useState([]);
  let [allattachments, setAllattachments] = useState([]);
  let [technologies, setTechnologies] = useState([]);
  let [scaleimg, setScaleimg] = useState();

  let fileInput = useRef("");

  const prevAttach = (att) =>
    att?.forEach((i) => {
      if (i.mime_type.startsWith("image/")) {
        setImages((prev) => [...prev, i.attachment_path]);
        // setAttachments((prev) => [...prev, i]);
      } else if (i.mime_type === "application/pdf") {
        setDocs((prev) => [...prev, { name: i.name, img: p, type: "pdf" }]);
        setDocfiles((prev) => [...prev, i]);
      } else if (i.extention === "imagerr/") {
        setDocs((prev) => [...prev, { name: i.name, img: word, type: "word" }]);
        setDocfiles((prev) => [...prev, i]);
      } else {
        setDocs((prev) => [...prev, { name: i.name, img: rar, type: "rar" }]);
        setDocfiles((prev) => [...prev, i]);
      }
    });
  useEffect(() => {
    return () => {
      prevAttach(prevFiles);
    };
  }, []);

  useEffect(() => {
    setAllattachments([...Attachments, ...docfiles]);
  }, [Attachments, docfiles]);

  useEffect(() => {
    fun(allattachments);
  }, [allattachments]);

  let remove = (index1, inputName, id) => {
    switch (inputName) {
      case "link":
        setLinks(
          links.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        break;
      case "tech":
        setTechnology(
          technology.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        break;
      case "images":
        setImages((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        setAttachments((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );

        deleteFiles(id);

        break;
      case "docs":
        setDocs((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        setDocfiles((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        deleteFiles(id);

        break;
    }
  };

  let addAttach = ({ target: { files } }) => {
    for (let i of files) {
      if (i.type.startsWith("image/")) {
        setImages((prev) => [...prev, URL.createObjectURL(i)]);
        setAttachments((prev) => [...prev, i]);
      } else if (i.type.endsWith("pdf")) {
        setDocs((prev) => [...prev, { name: i.name, img: p, type: "pdf" }]);
        setDocfiles((prev) => [...prev, i]);
      } else if (i.type.endsWith("document")) {
        setDocs((prev) => [...prev, { name: i.name, img: word, type: "word" }]);
        setDocfiles((prev) => [...prev, i]);
      } else {
        setDocs((prev) => [...prev, { name: i.name, img: rar, type: "rar" }]);
        setDocfiles((prev) => [...prev, i]);
      }
    }
  };

  // let removeAttach = (index2) => {
  //   setImages(
  //     images.filter((word, index) => {
  //       return index2 !== index;
  //     })
  //   );
  //   setAttachments(
  //     Attachments.filter((attach, index) => {
  //       return index2 !== index;
  //     })
  //   );

  //   // setDeleted([...deleted,index2])
  // };

  const imgFun = (type) => {
    switch (type) {
      case "application/pdf":
        return [p, "pdf"];
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "text/plain":
        return [word, "word"];
      case "application/x-zip-compressed" || "application/x-msdownload":
        return [rar, "rar"];

      default:
        return [p, "pdf"];
    }
    // doc.type==='application/pdf'&& p
  };

  return (
    <>
      <div className="dash__form-content_attach">
        <div className="dash__form-content_attach-header">
          <p>Attachments</p>
        </div>
        <div
          className="dash__form-content_attach_upload flex"
          style={{
            gap: "25px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <div
            className="dash__form-content_attach_upload-card"
            onClick={() => {
              fileInput.current.click();
            }}
          >
            <img src={upload} alt="upload" />
            <input
              hidden
              type="file"
              ref={fileInput}
              onChange={(e) => addAttach(e)}
              multiple
            />
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Uploading Files
            </button>
          </div>
          {/* <div className='dash__form-content_attach_upload-images flex 'style={{gap:'10px',width:'100%' , height:'100%' ,flexWrap:'wrap' */}

          {images.map((word, index) => {
            return (
              <div
                className="dash__form-content_attach_upload-image"
                key={index}
              >
                <div className="dash__form-content_attach_upload-image_file">
                  <img src={images[index]} alt="attach img" />
                </div>

                <div className="dash__form-content_attach_upload-image_hover">
                  <img
                    src={material}
                    alt="material"
                    onClick={() => {
                      setScaleimg(images[index]);
                    }}
                  />
                  <img
                    src={trash}
                    alt="trash"
                    onClick={() => {
                      remove(index, "images", word.id);
                    }}
                  />
                </div>
              </div>
            );
          })}

          {scaleimg && (
            <div
              className="imageScaled"
              onClick={() => {
                setScaleimg();
              }}
            >
              <img src={scaleimg} alt="img" />
            </div>
          )}

          {/* </div> */}
        </div>
      </div>

      {docs[0] && (
        <>
          <div>
            <div className="dash__form-content_attach-header">
              <p>Documents</p>
            </div>
          </div>

          <div className="dash__form-content_attach-documents">
            {docfiles?.map((doc, index) => {
              const [img, type] = imgFun(doc.type);
              return (
                <div className="dash__form-content_attach-documents_doc">
                  <img src={img} alt="pdf" />
                  <h4>{doc.name}</h4>
                  <div className="flex-col ">
                    <p style={{ justifySelf: "flex-end" }}>{type}</p>
                    <p className="font-bold">{Math.ceil(doc.size / 1000)}KB</p>
                  </div>
                  <IoIosClose
                    color=" #1370E4"
                    size={24}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      remove(index, "docs", doc.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Addattachments;
