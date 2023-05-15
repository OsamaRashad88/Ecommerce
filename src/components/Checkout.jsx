import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import React from "react";
import { useContext } from "react";
import { Cartcontext } from "../Contexts/Cartcontext";
export default function Checkout() {
  let { onlinepayment, cartId } = useContext(Cartcontext);
  async function handleSubmit(values) {
    let response = await onlinepayment(cartId, values);
    if (response?.data?.status === "success")
      window.location.href = response.data.session.url;
    console.log(values);
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="w-5- py-5 mx-auto">
        <form onSubmit={formik.handleSubmit}></form>
        <label htmlFor="details">details</label>
        <input
          type="text"
          className="form-control mb-3"
          value={formik.values.details}
          onChange={formik.handleChange}
          name="details"
          id="details"
        />
        <label htmlFor="phone">phone</label>
        <input
          type="tel"
          className="form-control mb-3"
          value={formik.values.phone}
          onChange={formik.handleChange}
          name="phone"
          id="phone"
        />
        <label htmlFor="city">city</label>
        <input
          type="text"
          className="form-control mb-3"
          value={formik.values.city}
          onChange={formik.handleChange}
          name="city"
          id="city"
        />
        <button type="submit" className="btn border-main w-100">
          submit
        </button>
      </div>
    </>
  );
}
