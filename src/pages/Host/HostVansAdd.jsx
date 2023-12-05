import React from "react";
import { Form, redirect } from "react-router-dom";
import BackLink from "../../components/BackLink.jsx";

import { createVan } from "../../api.js";

export async function action({ request, currentUser }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = formData.get("price");
  const type = formData.get("type");
  const description = formData.get("description");
  const isPublic = formData.get("isPublic");

  try {
    await createVan(currentUser.uid, name, price, type, description, isPublic);
    return redirect("/host/vans");
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export default function HostVansAdd() {
  return (
    <div className="hostVansAdd">
      <BackLink linkName="Back to all vans" />
      <h2>Add a new van</h2>
      {/* Upload image functionality */}
      <Form method="post" replace>
        <input type="file" name="vanImage" accept="image/*" />
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
