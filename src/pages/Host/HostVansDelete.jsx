import React, { Suspense } from "react";
import {
  useLoaderData,
  useActionData,
  defer,
  Await,
  redirect,
  Form,
  useNavigate,
} from "react-router-dom";
import { deleteVan } from "../../api.js";
import {
  requireAuth,
  checkVanExistsAndPermission,
  getVanObjectWithImages,
} from "../../utils.js";

import Loading from "../../components/Loading.jsx";
import BackLink from "../../components/BackLink.jsx";
import VanType from "../../components/Vans/VanType.jsx";

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

export async function action({ params }) {
  try {
    await deleteVan(params.id);
  } catch (err) {
    return err.message;
  }
  throw redirect("/host/vans");
}

export default function HostVansDelete() {
  const loaderData = useLoaderData();
  const errorMessage = useActionData();
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
    <div className="hostVansDelete">
      <BackLink linkName="Back to all vans" />
      <h2>Delete this van?</h2>
      {errorMessage && <h2>{errorMessage}</h2>}
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.van}>
          {(vanData) => {
            return (
              <div className="hostVansDelete-info">
                <img
                  src={
                    vanData.imageUrls[0] || "/assets/images/vanDefaultImage.png"
                  }
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
          }}
        </Await>
        <Form method="post">
          <button>Delete (Final)</button>
        </Form>
      </Suspense>
    </div>
  );
}
