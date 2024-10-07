import Nav from "../../components/sub component/Nav"
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";


const ResetPassword = () => {

  const link = useParams().token

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required").min(6, "Too Short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { newPassword } = values;
      const token =  window.location.pathname.split("/").pop();

      console.log(token, link)

     fetch(process.env.REACT_APP_API_LINK + `auth/reset-password/${token}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({newPassword: newPassword})
         })
        .then((response) => {
          toast.success(response) // .data.message);
          // setTimeout(() => {
          //   window.location.href = "/signin";
          // }, 3000);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Your link has expired");
        });
    },
  });

  return (
    <>
      <div className="bg-secondary h-screen">
        <Nav />
        <ToastContainer />
        <div className="flex justify-center my-32">
          <div className="bg-white p-16 rounded-lg">
            <h1 className="text-3xl font-semibold">Reset Password</h1>
            <form onSubmit={formik.handleSubmit} className="mt-5">
              <label
                htmlFor="newPassword"
                className={`text-sm  ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : "New Password"}
              </label>
              <motion.input
                type="password"
                placeholder="New Password"
                className={`border-2 w-full p-2 focus:outline-none rounded-md
                ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                name="newPassword"
                id="newPassword"
              />

              <label
                htmlFor="confirmPassword"
                className={`text-sm  ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : "Confirm Password"}
              </label>
              <motion.input
                type="password"
                placeholder="Confirm Password"
                className={`border-2 w-full p-2 focus:outline-none rounded-md
                ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                name="confirmPassword"
                id="confirmPassword"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-primary text-white w-full mt-5 p-2 rounded-md"
              >
                Reset Password
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;