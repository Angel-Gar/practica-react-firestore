import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading"

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await loginUser(data.email, data.password);
      navigate("/");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Title text="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa tu correo"
          error={errors.email}
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>
        <FormError error={errors.email} />

        <FormInput
          label="Ingresa tu contraseña"
          error={errors.password}
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password} />
        {
          loading ?
          <ButtonLoading />
          :
          <Button type="submit" text="Login" loading={loading} color="blue" />
        }
        
      </form>
    </>
  );
};

export default Login;
