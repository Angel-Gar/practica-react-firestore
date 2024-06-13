import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";


const Register = () => {
  const navigate = useNavigate();

  const { registerUser } = useContext(UserContext);

  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await registerUser(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Title text="Register" />
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          error={errors.email}
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
        ></FormInput>
        <FormError error={errors.email} />

        <FormInput
          type="password"
          error={errors.password}
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu contraseña"
        ></FormInput>
        <FormError error={errors.password} />

        <FormInput
          type="password"
          error={errors.password2}
          placeholder="Confirme password"
          {...register("password2", {
            validate: validateEquals(getValues("password")),
          })}
          label="Confirma tu contraseña"
        ></FormInput>
        <FormError error={errors.password2} />
        <Button type="submit" text="Register" loading={loading} color="blue" />
      </form>
    </>
  );
};

export default Register;
