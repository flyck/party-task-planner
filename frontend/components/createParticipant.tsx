import React from "react"
import SubmitButton from "@/components/ui/minis/submitButton";
import Input from "@/components/ui/minis/input";
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client'
import { CreateParticipantMutation, CreateParticipantMutationVariables, CreateParticipantDocument } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const CreateParticipant: React.FC<{}> = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "John",
      email: "john.doe@email.com"
    }
  });
  const router = useRouter();
  const partyId = router.query.partyId as string
  const [createParticipant, { error, data, loading: createPartyLoading }] = useMutation<CreateParticipantMutation, CreateParticipantMutationVariables>(CreateParticipantDocument);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    let id = ""
    try {
      const { data, errors } = await createParticipant({
        variables: {
          args: {
            partyId,
            invitationSent: false,
            ...getValues()
          }

        }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
      id = data!.createParticipant!.id!
    } catch (error) {
      toast.error("Couldnt create participant.")
      console.error("Caught: " + error)
    }
    console.log("Participant created:" + id)
    window.location.assign(`/${partyId}/participants`)
  };

  return (
    <form onSubmit={(event) => submit(event)}>
      <Input title="Name" props={{
        type: "text", onFocus: () => redirect(),
        required: true,
        ...register("name")
      }} />
      <Input title="Email" props={{
        type: "text", onFocus: () => redirect(),
        ...register("email")
      }} />
      <SubmitButton loading={createPartyLoading} props={{ disabled: isUserSet() }} />
    </form>
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


export default CreateParticipant
