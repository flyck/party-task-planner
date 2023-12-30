import React from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import Input from "@/components/ui/minis/input";
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client'
import { CreatePartyMutation, CreatePartyMutationVariables, CreatePartyDocument } from "@/lib/gql/graphql";
import { toast } from "react-toastify";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const PartyDetails: React.FC<{}> = () => {
  const [hydrated, setHydrated] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      title: "Birthday Party",
      location: "Musterstreet 12, New York",
      date: "June 10, 2023, 2:00 PM",
      description: ""
    }
  });

  const [createParty, { data, loading, error }] = useMutation<CreatePartyMutation, CreatePartyMutationVariables>(CreatePartyDocument);

  //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }


  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(getValues());
    let id = ""
    try {
      // const { data, errors } = await createParty({
      //   variables: getValues()
      // })
      // if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
      // console.log(data)
      id = "123-512-165"
    } catch (error) {
      toast.error("Couldnt create party.")
      console.error("Caught: " + error)
    }
    console.log("error!")
    toast.error("Couldnt create party.", { hideProgressBar: true, delay: 2000 })
    // window.location.assign(`/${id}`)
  };

  return (<AppLayout title="Details" left={""} right={""}>
    <form onSubmit={(event) => submit(event)}>
      <Input title="Title" props={{
        type: "text", onFocus: () => redirect(),
        required: true,
        ...register("title")
      }} />
      <Input title="Where" props={{
        type: "text", onFocus: () => redirect(),
        ...register("location")
      }} />
      <Input title="When" props={{
        type: "text", onFocus: () => redirect(),
        ...register("date")
      }} />
      <Input title="Description" props={{
        type: "text", onFocus: () => redirect(),
        ...register("description")
      }} />
      <SubmitButton disabled={isUserSet()} />
    </form>
  </AppLayout>
  )
}

function redirect() {
  isUserSet() ? window.location.assign("/editUser?showInfo=true") : undefined
}

function isUserSet() {
  const userName = window.localStorage.getItem("userName")
  const userEmail = window.localStorage.getItem("userEmail")

  return (!userName || !userEmail)
}


export default PartyDetails
