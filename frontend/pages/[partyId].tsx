import React, { useEffect } from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import Input from "@/components/ui/minis/input";
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { DeletePartyDocument, DeletePartyMutation, DeletePartyMutationVariables, GetPartyDocument, GetPartyQuery, GetPartyQueryVariables, Party, UpdatePartyDocument, UpdatePartyMutation, UpdatePartyMutationVariables, UpdatedPartyDocument, UpdatedPartySubscription, UpdatedPartySubscriptionVariables } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const PartyDetails: React.FC<{}> = () => {
  const router = useRouter();
  const id = router.query.partyId as string
  const {
    register,
    getValues,
    setValue,
  } = useForm();

  const [deleteParty] = useMutation<DeletePartyMutation, DeletePartyMutationVariables>(DeletePartyDocument);

  const { loading: loadingParty, error, data: getPartyData } = useQuery<GetPartyQuery, GetPartyQueryVariables>(GetPartyDocument, {
    variables: { id },
    onCompleted: (result) => {
      if (!result.getParty) {
        console.error(result)
        // TODO redirect to 404 page in certain conditions
        toast.error("Couldnt find party.")
      }
      const { date, description, location, title } = result.getParty!
      setValue("title", title)
      setValue("location", location)
      setValue("description", description)
      setValue("date", date)
    },
    onError: (result) => {
      console.error(result)
      // TODO redirect to 404 page in certain conditions
      toast.error("Couldnt retrieve party.")
    }
  });

  const [updateParty, { loading: updatePartyLoading }] = useMutation<UpdatePartyMutation, UpdatePartyMutationVariables>(UpdatePartyDocument, {
    variables: { id },
  });

  const { data: updatedPartyData, error: updatedPartyError } = useSubscription<UpdatedPartySubscription, UpdatedPartySubscriptionVariables>(UpdatedPartyDocument, {
    variables: { id },
  });

  useEffect(() => {
    if (updatedPartyError) {
      console.error("Error from subscription: " + JSON.stringify(updatedPartyError))
      toast.error("Error in live update.")
    }
    if (updatedPartyData) {
      const { date, description, location, title } = updatedPartyData.updatedParty as Party
      setValue("title", title)
      setValue("location", location)
      setValue("description", description)
      setValue("date", date)
    }
  }, [updatedPartyData, updatedPartyError])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(getValues());
    try {
      const { errors } = await updateParty({
        variables: { id, ...getValues() }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt update party.")
      console.error("Caught: " + error)
    }
  };

  const handleDelete = async () => {
    try {
      const { errors } = await deleteParty({
        variables: { id }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt delete party.")
      console.error("Caught: " + error)
    }
    window.location.assign("/")
  }

  return (<AppLayout title="Details" left={""} right={`${id}/participants`}>
    <form onSubmit={(event) => submit(event)}>
      <Input title="Title" props={{
        type: "text",
        required: true,
        ...register("title")
      }} />
      <Input title="Where" props={{
        type: "text",
        ...register("location")
      }} />
      <Input title="When" props={{
        type: "text",
        ...register("date")
      }} />
      <Input title="Description" props={{
        type: "text",
        ...register("description")
      }} />
      <div className="p-2">
        <button className="bg-red-600 text-gray-200 rounded-sm w-full" onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
      <SubmitButton loading={updatePartyLoading} />
    </form>
  </AppLayout>
  )
}

export default PartyDetails
