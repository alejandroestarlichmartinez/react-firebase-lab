// vendors
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
// config
import { login } from "../config/firebase";
import * as Yup from "yup";
// context
import { useUserContext } from "../context/UserContext";
// components
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const Login = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const onSubmit = async (
    { email, password }: { email: string, password: string },
    { setSubmitting, setErrors, resetForm }: any) => {
    try {
      await login({ email, password });
      console.log("user logged in");
      resetForm();
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "Email already in use" });
      }
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-login-credentials") {
        setErrors({ password: "Error with user or password" });
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
        Sign in
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
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
              placeholder="test@example.com"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              id="email"
              label="Ingrese email"
              fullWidth
              sx={{ mb: 3 }}
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
              Login
            </LoadingButton>

            <Button
              component={Link}
              to="/register"
              fullWidth
            >
              Don't have an account? Sign in
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};