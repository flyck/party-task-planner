import React, { useEffect } from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import { useQuery, useSubscription } from "@apollo/client";
import { CreatedParticipantDocument, CreatedParticipantSubscription, CreatedParticipantSubscriptionVariables, GetParticipantsDocument, GetParticipantsQuery, GetParticipantsQueryVariables, Participant, SubscriptionCreatedParticipantArgs } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import createdParticipant from "@/const/graphql/createdParticipant";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const Participants: React.FC<{}> = () => {
  const [hydrated, setHydrated] = React.useState(false);
  const router = useRouter();
  const partyId = router.query.partyId as string
  const [participants, setParticipants] = React.useState<Participant[]>([]);

  const { error, data: getParticipantData, refetch } = useQuery<GetParticipantsQuery, GetParticipantsQueryVariables>(GetParticipantsDocument, {
    variables: { partyId },
    onError: (result) => {
      console.error(result)
      toast.error("Couldnt retrieve participants.")
    },
    onCompleted: (result) => {
      setParticipants(result.getParticipants?.items as Participant[])
    }
  });

  const { data: newParticipantData, error: newParticipantError } = useSubscription<CreatedParticipantSubscription, CreatedParticipantSubscriptionVariables>(CreatedParticipantDocument, { variables: { partyId },  });

  useEffect(() => {
    console.log("Hello I am triggered!")
    console.log(newParticipantData)
    // Handle subscription data
    if (newParticipantData) {
      refetch()
      // TODO dont refetch, only update the state
    }

    // Handle subscription errors
    if (error) {
      console.error('Subscription error', error);
    }
  }, [newParticipantData, newParticipantError]);

  //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (<AppLayout title="Participants" left={`/${partyId}`} right={""}>
    {participants.map((guy) => userElement(guy as Participant, partyId))}
    <SubmitButton props={{ disabled: isUserSet(), onClick: () => window.location.assign(`/${partyId}/participants/create`) }} text="+" />
  </AppLayout>
  )
}

function isUserSet() {
  const userName = window.localStorage.getItem("userName")
  const userEmail = window.localStorage.getItem("userEmail")

  return (!userName || !userEmail)
}

function userElement(guy: Participant, partyId: String) {
  return <a key={guy.id} href={`/${partyId}/participants/${guy.id}`}><div className="border-b border-gray-500 p-2">
    <div className="text-sm">{guy.name || "?"} ({guy.email})</div>
  </div ></a>
}

export default Participants
