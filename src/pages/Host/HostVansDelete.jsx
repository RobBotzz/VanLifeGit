import React, { Suspense } from "react";
import {
  useLoaderData,
  useActionData,
  defer,
  Await,
  redirect,
  Form,
} from "react-router-dom";
import { getVan, deleteVan } from "../../api.js";
import { requireAuthVan } from "../../utils.js";

import Loading from "../../components/Loading.jsx";
import BackLink from "../../components/BackLink.jsx";
import VanType from "../../components/Vans/VanType.jsx";

export async function loader({ params, request, currentUser }) {
  await requireAuthVan(params, request, currentUser);
  return defer({ van: getVan(params.id) });
}

export async function action({ params, request }) {
  try {
    await deleteVan(params.id);
    return redirect("/host/vans");
  } catch (err) {
    return err.message;
  }
}

function renderVanInfo(vanData) {
  return (
    <div className="hostVansDelete-info">
      <img
        src={vanData.imageUrls[0] || "/assets/images/vanDefaultImage.png"}
        alt="Shows Van"
      />
      <div className="hostVansDelete-info-text">
        <VanType type={vanData.type} size="small" />
        <h3>{vanData.name}</h3>
        <h4>
          $<b>{vanData.price}</b>/day
        </h4>
      </div>
    </div>
  );
}

export default function HostVansDelete() {
  const loaderData = useLoaderData();
  const errorMessage = useActionData();
  return (
    <div className="hostVansDelete">
      <BackLink linkName="Back to all vans" />
      <h2>Delete this van?</h2>
      {errorMessage && <h2>{errorMessage}</h2>}
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.van}>{renderVanInfo}</Await>
        <Form method="post">
          <button>Delete (Final)</button>
        </Form>
      </Suspense>
    </div>
  );
}
