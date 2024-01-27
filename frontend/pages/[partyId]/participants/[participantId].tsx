import React from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import Input from "@/components/ui/minis/input";
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from "@apollo/client";
import { DeleteParticipantDocument, DeleteParticipantMutation, DeleteParticipantMutationVariables, GetParticipantDocument, GetParticipantQuery, GetParticipantQueryVariables, UpdateParticipantDocument, UpdateParticipantMutation, UpdateParticipantMutationVariables } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Scrollable from "@/components/scrollable";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const PartyDetails: React.FC<{}> = () => {
  const [hydrated, setHydrated] = React.useState(false);
  const router = useRouter();
  const partyId = router.query.partyId as string
  const id = router.query.participantId as string
  const {
    register,
    getValues,
    setValue,
    watch,
  } = useForm();

  const [deleteParticipant] = useMutation<DeleteParticipantMutation, DeleteParticipantMutationVariables>(DeleteParticipantDocument);

  const { loading: loadingParticipant } = useQuery<GetParticipantQuery, GetParticipantQueryVariables>(GetParticipantDocument, {
    variables: { partyId, id },
    onCompleted: (result) => {
      if (!result.getParticipant) {
        console.error(result)
        // TODO redirect to 404 page in certain conditions
        toast.error("Couldnt find participant.")
      }
      const { email, name, invitationSent } = result.getParticipant!
      setValue("email", email)
      setValue("name", name)
      setValue("invitationSent", invitationSent)
    },
    onError: (result) => {
      console.error(result)
      // TODO redirect to 404 page in certain conditions
      toast.error("Couldnt retrieve participant.")
    }
  });

  const [updateParticipant, { loading: updateParticipantLoading }] = useMutation<UpdateParticipantMutation, UpdateParticipantMutationVariables>(UpdateParticipantDocument);

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
    try {
      const { data, errors } = await updateParticipant({
        variables: { args: { partyId, id, ...getValues() } }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt update party.")
      console.error("Caught: " + error)
    }
    window.location.assign(`/${partyId}/participants`)
  };

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { errors } = await deleteParticipant({
        variables: { partyId, id }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt delete participant.")
      console.error("Caught: " + error)
    }
    window.location.assign(`/${partyId}/participants`)
  }

  return (<AppLayout title="Details" left={""} right={""}>
    <form onSubmit={(event) => submit(event)}>
      <Scrollable>
        <div className="flex-1">
          <Input title="Name" loading={loadingParticipant} props={{
            type: "text", onFocus: () => redirect(),
            required: true,
            ...register("name")
          }} />
          <Input title="Email" loading={loadingParticipant} props={{
            type: "text", onFocus: () => redirect(),
            ...register("email")
          }} />
          <div className="p-2 border-b border-gray-500">
            {getInviteButton(loadingParticipant, setValue, watch("invitationSent"))}
          </div>
          <div className="p-2 border-b border-gray-500">
            <button className="bg-red-600 text-gray-200 rounded-sm w-full" onClick={(event) => handleDelete(event)}>
              Delete
            </button>
          </div>
        </div>
      </Scrollable>
      <SubmitButton loading={updateParticipantLoading} props={{ disabled: isUserSet() }} />
    </form>
  </AppLayout>
  )
}

function redirect() {
  isUserSet() ? window.location.assign("/editUser?showInfo=true") : undefined
}

function getInviteButton(loading: boolean, setValue: any, invitationSent: boolean) {
  if (loading) {
    return <button className="bg-sky-600 text-gray-200 rounded-sm w-full">
    </button>
  }

  console.log("InvitationSent: " + invitationSent)

  if (invitationSent === true) {
    return <button className="bg-sky-900 text-gray-200 rounded-sm w-full" disabled={true}>
      Invite sent
    </button>
  }

  return <button className="bg-sky-600 text-gray-200 rounded-sm w-full" onClick={(event) => { event.preventDefault(); setValue("invitationSent", true); console.log("Send") }}>
    Send Invite
  </button>
}

function isUserSet() {
  const userName = window.localStorage.getItem("userName")
  const userEmail = window.localStorage.getItem("userEmail")

  return (!userName || !userEmail)
}


export default PartyDetails
