import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import BackLink from "../../components/BackLink.jsx";

import { createVan } from "../../api.js";

export async function action({ request, currentUser }) {
  const formData = await request.formData();
  const image = formData.get("vanImage");
  const name = formData.get("name");
  const price = formData.get("price");
  const type = formData.get("type");
  const description = formData.get("description");
  const isPublic = formData.get("isPublic");

  try {
    await createVan(
      currentUser.uid,
      image,
      name,
      price,
      type,
      description,
      isPublic
    );
    return redirect("/host/vans");
  } catch (err) {
    return err.message;
  }
}

export default function HostVansAdd() {
  const [selectedFile, setSelectedFile] = React.useState(undefined);
  const [preview, setPreview] = React.useState(undefined);

  // create a preview as a side effect, whenever selected file is changed
  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const errorMessage = useActionData();

  return (
    <div className="hostVansAdd">
      <BackLink linkName="Back to all vans" />
      <h2>Add a new van</h2>
      <Form method="post" encType="multipart/form-data" replace>
        <label htmlFor="imageUpload">
          <div className="hostVansAdd-imageUpload-button">
            {preview ? (
              <img src={preview} alt="Uploaded van" />
            ) : (
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
            )}
            <p>{preview ? "Change image" : "Add an image"}</p>
          </div>
        </label>
        <input
          id="imageUpload"
          type="file"
          name="vanImage"
          accept="image/*"
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
        <button>Create van</button>
      </Form>
    </div>
  );
}
