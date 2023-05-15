import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login({ saveuserData }) {
  let navigate = useNavigate({});
  const [isloading, setisloading] = useState(false);
  const [errormessage, seterrormessage] = useState(null);
  async function login(values) {
    setisloading(true);
    seterrormessage(null);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .catch((err) => {
        console.log(err);
        seterrormessage(err.response.data.message);
        console.log(errormessage);
      });
    if (data.message == "success") {
      localStorage.setItem("userToken", data.token);
      navigate("/");
      saveuserData();
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email min length is 3"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password start with capital"),
  });
  let user = {
    email: "",
    password: "",
  };

  let Formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: (values) => login(values),
  });
  return (
    <div className="w-50 mx-auto">
      <h3>register now</h3>
      {errormessage ? (
        <div className="alert alert-danger">{errormessage}</div>
      ) : (
        ""
      )}
      <form onSubmit={Formik.handleSubmit}>
        <div>
          <div class="mb-3">
            <label for="email" class="form-label">
              Email address
            </label>
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              type="email"
              class="form-control"
              id="email"
              placeholder="enter your email"
              value={Formik.values.email}
            />
            {Formik.errors.email && Formik.touched.email ? (
              <div className="alert alert-danger text-center">
                {Formik.errors.email}
              </div>
            ) : (
              "  "
            )}
          </div>

          <div>
            <label for="password" type="password" class="form-label">
              password
            </label>
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              class="form-control"
              id="password"
              type="password"
              placeholder="enterpassord"
              value={Formik.values.passoword}
            />
            {Formik.errors.password && Formik.touched.password ? (
              <div className="alert alert-danger text-center">
                {Formik.errors.password}
              </div>
            ) : (
              "  "
            )}
          </div>

          {isloading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(Formik.isValid && Formik.dirty)}
              type="submit"
              className="btn btn-outline-primary"
            >
              submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
