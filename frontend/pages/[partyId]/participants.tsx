import React, { useEffect, useState } from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import { useQuery, useSubscription } from "@apollo/client";
import { CreatedParticipantDocument, CreatedParticipantSubscription, CreatedParticipantSubscriptionVariables, DeletedParticipantDocument, DeletedParticipantSubscription, DeletedParticipantSubscriptionVariables, GetParticipantsDocument, GetParticipantsQuery, GetParticipantsQueryVariables, Participant, UpdatedParticipantDocument, UpdatedParticipantSubscription, UpdatedParticipantSubscriptionVariables } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Skeleton } from "@/components/ui/skeleton";
import Modal from "@/components/modal";
import CreateParticipant from "@/components/createParticipant";
import Scrollable from "@/components/scrollable";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const Participants: React.FC<{}> = () => {
  const router = useRouter();
  const partyId = router.query.partyId as string
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { loading } = useQuery<GetParticipantsQuery, GetParticipantsQueryVariables>(GetParticipantsDocument, {
    skip: !partyId,
    variables: { partyId },
    onError: (result) => {
      console.error(result)
      toast.error("Couldnt retrieve participants.")
    },
    onCompleted: (result) => {
      setParticipants(result.getParticipants?.items as Participant[])
    }
  });
  const { data: newParticipantData, error: newParticipantError } = useSubscription<CreatedParticipantSubscription, CreatedParticipantSubscriptionVariables>(CreatedParticipantDocument, {
    variables: { partyId },
  });
  const { data: deletedParticipantData, error: deletedParticipantError } = useSubscription<DeletedParticipantSubscription, DeletedParticipantSubscriptionVariables>(DeletedParticipantDocument, {
    variables: { partyId },
  });
  const { data: updatedParticipantData, error: updatedParticipantError } = useSubscription<UpdatedParticipantSubscription, UpdatedParticipantSubscriptionVariables>(UpdatedParticipantDocument, {
    variables: { partyId },
  });

  useEffect(() => {
    if (newParticipantError) {
      console.error("Error from subscription: " + JSON.stringify(newParticipantError))
      toast.error("Error in live update.")
    }
    if (newParticipantData) {
      const newP: Participant = newParticipantData?.createdParticipant as Participant
      setParticipants([...participants, newP])
    }
  }, [newParticipantData, newParticipantError])

  useEffect(() => {
    if (deletedParticipantError) {
      console.error("Error from subscription: " + JSON.stringify(newParticipantError))
      toast.error("Error in live update.")
    }
    if (deletedParticipantData) {
      const deletedP: Participant = deletedParticipantData?.deletedParticipant as Participant
      setParticipants([...participants.filter((participant) => participant.id != deletedP.id)])
    }
  }, [deletedParticipantData, deletedParticipantError])

  useEffect(() => {
    if (updatedParticipantError) {
      console.error("Error from subscription: " + JSON.stringify(newParticipantError))
      toast.error("Error in live update.")
    }
    if (updatedParticipantData) {
      const updatedP: Participant = updatedParticipantData?.updatedParticipant as Participant
      const updatedParticipants = participants.map((participant) => {
        if (participant.id != updatedP.id) return participant
        return updatedP
      })
      // sort the participants to prevent an order mismatch
      setParticipants(updatedParticipants)
    }

  }, [updatedParticipantData, updatedParticipantError])

  const handleCloseModal = () => { setIsModalOpen(false); };

  return (<AppLayout title="Participants" left={`/${partyId}`} right={`/${partyId}/tasks`}>
    <Scrollable>
      {loading ? skeleton() : sortedParticipants(participants).map((guy) => getUserElement(guy, partyId))}
    </Scrollable>
    <SubmitButton props={{ onClick: () => setIsModalOpen(true) }} text="+" />
    <div className="z-50">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={"New Participant"} >
        <CreateParticipant />
      </Modal>
    </div>
  </AppLayout>
  )
}

function skeleton() {
  return <Skeleton className="h-9 bg-gray-200 rounded-sm" />
}

function sortedParticipants(list: readonly Participant[]) {
  const newList = [...list]
  newList.sort((a, b) => a.id!.localeCompare(b.id!))
  return newList
}

function getUserElement(guy: Participant, partyId: String) {
  return <a key={guy.id} href={`/${partyId}/participants/${guy.id}`}><div className="border-b border-gray-500 p-2">
    <div className="text-sm">{guy.name || "?"} ({guy.email})</div>
  </div ></a>
}

export default Participants
