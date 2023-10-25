// vendors
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
// hooks
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
// config
import { register } from "../config/firebase";
import * as Yup from "yup";
// conmponents
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const Register = () => {
  const { user } = useUserContext();

  // alternativa con hook
  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (
    { email, password }: { email: string, password: string },
    { setSubmitting, setErrors, resetForm }: any
  ) => {
    try {
      await register({ email, password });
      console.log("user registered");
      resetForm();
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email already in use" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().trim().min(6).required(),
  });

  return (
    <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#444" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography
        component="h1"
        variant="h5"
      >
        Sign up
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isSubmitting,
          errors,
          touched,
          handleBlur,
        }) => (
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ mt: 1 }}
          >
            <TextField
              type="text"
              label="Ingrese email"
              value={values.email}
              onChange={handleChange}
              name="email"
              fullWidth
              sx={{ mb: 3 }}
              id="email"
              placeholder="test@example.com"
              onBlur={handleBlur}
              error={(errors.email && touched.email) || false}
              helperText={errors.email && touched.email && errors.email}
            />

            <TextField
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese contraseña"
              fullWidth
              sx={{ mb: 3 }}
              error={(errors.password && touched.password) || false}
              helperText={
                errors.password && touched.password && errors.password
              }
            />

            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              sx={{ mb: 3 }}
            >
              Register
            </LoadingButton>

            <Button
              component={Link}
              to="/login"
              fullWidth
            >
              Have an account? Log in
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};
