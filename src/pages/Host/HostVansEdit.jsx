import React, { Suspense } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  defer,
  Await,
  useNavigate,
} from "react-router-dom";
import BackLink from "../../components/BackLink.jsx";
import Loading from "../../components/Loading.jsx";

import { editVan } from "../../api.js";
import {
  requireAuth,
  checkVanExistsAndPermission,
  getVanObjectWithImages,
} from "../../utils.js";

export async function loader({ params, request, currentUser }) {
  //Show loading element while user is still initializing
  if (currentUser === undefined) return defer({ van: new Promise(() => {}) });

  let vanSnapshot;
  try {
    await requireAuth(request, currentUser);
    vanSnapshot = await checkVanExistsAndPermission(params.id, currentUser);
  } catch (err) {
    throw redirect(`/van-error?err=${err.message}`);
  }

  return defer({ van: getVanObjectWithImages(vanSnapshot) });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const isPublic = formData.get("isPublic");
  //const image = formData.get("vanImage");
  const updates = { ...Object.fromEntries(formData), isPublic };

  const vanId = params.id;

  try {
    await editVan({ vanId, ...updates });
    return redirect("/host/vans");
  } catch (err) {
    return err.message;
  }
}

/* function renderForm(vanData) {
 */ /* <label htmlFor="imageUpload">
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
        /> */

export default function HostVansEdit() {
  //const [selectedFile, setSelectedFile] = React.useState(undefined);
  //const [preview, setPreview] = React.useState(undefined);

  // create a preview as a side effect, whenever selected file is changed
  /* React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]); */

  /* const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0]);
    }
  }; */

  const errorMessage = useActionData();
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  React.useEffect(() => {
    loaderData.van.then((res) => {
      if (res instanceof Error) {
        navigate(`/van-error?err=${res.message}`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return (
    <div className="hostVansEdit">
      <BackLink linkName="Back to van" />
      <h2>Edit van</h2>
      <Form method="post" encType="multipart/form-data">
        {errorMessage && (
          <h3 className="hostVansEdit-errorMessage">{errorMessage}</h3>
        )}
        <Suspense fallback={<Loading />}>
          <Await resolve={loaderData.van}>
            {(vanData) => {
              return (
                <>
                  <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    className="hostVansEdit-input-normal"
                    defaultValue={vanData.name}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="hostVansEdit-input-normal"
                    defaultValue={vanData.price}
                  />
                  <select
                    name="type"
                    id="type"
                    className="hostVansEdit-select"
                    defaultValue={vanData.type}
                  >
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
                    className="hostVansEdit-input-large"
                    defaultValue={vanData.description}
                  />
                  <input
                    className="hostVansEdit-checkbox"
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    defaultChecked={vanData.isPublic}
                  />
                  <label htmlFor="isPublic">Show publicly?</label>
                  <br />
                  <button>Edit van</button>
                </>
              );
            }}
          </Await>
        </Suspense>
      </Form>
    </div>
  );
}
