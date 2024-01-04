import React from "react";
import { Form, redirect, useActionData, useSubmit } from "react-router-dom";
import BackLink from "../../components/BackLink.jsx";
import HostVanImage from "../../components/Host/HostVanImage.jsx";

import { createVan } from "../../api.js";

export async function action({ request, currentUser }) {
  const formData = await request.formData();
  const images = formData.getAll("vanImages");
  const isPublic = formData.get("isPublic");

  const updates = {
    ...Object.fromEntries(formData),
    images: images,
    isPublic: isPublic,
  };

  const hostId = currentUser.uid;
  try {
    await createVan({ hostId, ...updates });
    return redirect("/host/vans");
  } catch (err) {
    return err.message;
  }
}

export default function HostVansAdd() {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [preview, setPreview] = React.useState([]);

  const submit = useSubmit();

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    selectedFiles.forEach((file) => {
      formData.append("vanImages", file, file.name);
    });
    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      replace: true,
    });
  };

  React.useEffect(() => {
    //Set preview to empty array if no files left
    if (selectedFiles.length === 0) {
      setPreview([]);
      return;
    }
    //Set preview to generated array of ObjectURLs
    const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(objectUrls);
    // free memory whenever this component is unmounted
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const onSelectFile = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      setSelectedFiles((prevArray) => [...prevArray, files[i]]);
    }
    // Create a new input element to allow uploading the same file again
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.id = "imageUpload";
    newInput.name = "vanImage";
    newInput.accept = "image/*";
    newInput.multiple = "multiple";
    newInput.addEventListener("change", onSelectFile);
    // Replace the old input with the new one
    e.target.parentNode.replaceChild(newInput, e.target);
  };

  const errorMessage = useActionData();

  return (
    <div className="hostVansAdd">
      <BackLink linkName="Back to all vans" />
      <h2>Add a new van</h2>
      {preview.length > 0 && (
        <div className="hostVansAdd-imagePreview">
          {preview.map((imgUrl, index) => (
            <HostVanImage
              key={index}
              index={index}
              setSelectedFiles={setSelectedFiles}
              src={imgUrl}
              alt="Shows uploaded van"
            />
          ))}
          <label htmlFor="imageUpload">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12h3m3 0h-3m0 0V9m0 3v3m9-11.4v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z"
              />
            </svg>
          </label>
        </div>
      )}
      <Form onSubmit={onSubmit}>
        <label htmlFor="imageUpload">
          {preview.length === 0 && (
            <div className="hostVansAdd-imageUpload-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12h3m3 0h-3m0 0V9m0 3v3m9-11.4v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z"
                />
              </svg>
              <p>Add images</p>
            </div>
          )}
        </label>
        <input
          id="imageUpload"
          type="file"
          name="vanImage"
          accept="image/*"
          multiple="multiple"
          onChange={onSelectFile}
        />
        {errorMessage && (
          <h3 className="hostVansAdd-errorMessage">{errorMessage}</h3>
        )}
        <input
          type="name"
          name="name"
          placeholder="Name"
          className="hostVansAdd-input-normal"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="hostVansAdd-input-normal"
        />
        <select name="type" id="type" className="hostVansAdd-select">
          <option value="">-- Select a type --</option>
          <option value="rugged">Rugged</option>
          <option value="simple">Simple</option>
          <option value="luxury">Luxury</option>
        </select>
        <textarea
          rows={4}
          type="text"
          name="description"
          placeholder="Description"
          className="hostVansAdd-input-large"
        />
        <input
          className="hostVansAdd-checkbox"
          type="checkbox"
          id="isPublic"
          name="isPublic"
        />
        <label htmlFor="isPublic">Show publicly?</label>
        <br />
        <button className="hostVansAdd-button">Create van</button>
      </Form>
    </div>
  );
}
