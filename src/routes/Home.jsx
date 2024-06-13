import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";
import Button from "../components/Button";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
  const [copy, setCopy] = useState({})
  const { required, patternURL } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    setError,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("get data");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data getData...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    console.log("Delete");
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };


  const pathURL = window.location.href;
  const handleClickCopy =async(nanoid)=>{

    await navigator.clipboard.writeText(pathURL + nanoid)
    console.log("Copiado")
    setCopy({[nanoid]: true})
  }



  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa URL"
          error={errors.email}
          type="text"
          placeholder="http://bluuweb.org"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
        ></FormInput>
        <FormError error={errors.url} />

        {newOriginID ? (
          <Button
            type="submit"
            text="Save"
            color="blue"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            text="ADD URL"
            color="blue"
            loading={loading.updateData}
          />
        )}
      </form>
      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2"
        >
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <div className=" flex spaxce-x-2">
            <Button
              type="button"
              text="delete"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              type="button"
              text="Edit"
              color="blue"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              type="button"
              text={copy[item.nanoid] ? "Copied" : "Copy"}
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
