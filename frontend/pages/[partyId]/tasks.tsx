import React, { useEffect, useState } from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import { useQuery, useSubscription } from "@apollo/client";
import { CreatedParticipantDocument, CreatedParticipantSubscription, CreatedParticipantSubscriptionVariables, DeletedParticipantDocument, DeletedParticipantSubscription, DeletedParticipantSubscriptionVariables, GetParticipantsDocument, GetParticipantsQuery, GetParticipantsQueryVariables, GetTasksDocument, GetTasksQuery, GetTasksQueryVariables, Participant, Task, TaskStatus, UpdatedParticipantDocument, UpdatedParticipantSubscription, UpdatedParticipantSubscriptionVariables } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Skeleton } from "@/components/ui/skeleton";
import Modal from "@/components/modal";
import CreateParticipant from "@/components/createParticipant";
import Scrollable from "@/components/scrollable";
import CreateTask from "@/components/createTask";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const Participants: React.FC<{}> = () => {
  const router = useRouter();
  const partyId = router.query.partyId as string
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { loading } = useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, {
    skip: !partyId,
    variables: { partyId },
    onError: (result) => {
      console.error(result)
      toast.error("Couldnt retrieve tasks.")
    },
    onCompleted: (result) => {
      setTasks(result.getTasks?.items as Task[])
    }
  });

  const { loading: participantsLoading, data: participants, } = useQuery<GetParticipantsQuery, GetParticipantsQueryVariables>(GetParticipantsDocument, {
    skip: !partyId,
    variables: { partyId },
    onError: (result) => {
      console.error(result)
      toast.error("Couldnt retrieve participants.")
    },
  });

  // const { data: newParticipantData, error: newParticipantError } = useSubscription<CreatedParticipantSubscription, CreatedParticipantSubscriptionVariables>(CreatedParticipantDocument, {
  //   variables: { partyId },
  // });
  // const { data: deletedParticipantData, error: deletedParticipantError } = useSubscription<DeletedParticipantSubscription, DeletedParticipantSubscriptionVariables>(DeletedParticipantDocument, {
  //   variables: { partyId },
  // });
  // const { data: updatedParticipantData, error: updatedParticipantError } = useSubscription<UpdatedParticipantSubscription, UpdatedParticipantSubscriptionVariables>(UpdatedParticipantDocument, {
  //   variables: { partyId },
  // });

  // useEffect(() => {
  //   if (newParticipantError) {
  //     console.error("Error from subscription: " + JSON.stringify(newParticipantError))
  //     toast.error("Error in live update.")
  //   }
  //   if (newParticipantData) {
  //     const newP: Participant = newParticipantData?.createdParticipant as Participant
  //     setParticipants([...participants, newP])
  //   }
  // }, [newParticipantData, newParticipantError])

  // useEffect(() => {
  //   if (deletedParticipantError) {
  //     console.error("Error from subscription: " + JSON.stringify(newParticipantError))
  //     toast.error("Error in live update.")
  //   }
  //   if (deletedParticipantData) {
  //     const deletedP: Participant = deletedParticipantData?.deletedParticipant as Participant
  //     setParticipants([...participants.filter((participant) => participant.id != deletedP.id)])
  //   }
  // }, [deletedParticipantData, deletedParticipantError])

  // useEffect(() => {
  //   if (updatedParticipantError) {
  //     console.error("Error from subscription: " + JSON.stringify(newParticipantError))
  //     toast.error("Error in live update.")
  //   }
  //   if (updatedParticipantData) {
  //     const updatedP: Participant = updatedParticipantData?.updatedParticipant as Participant
  //     const updatedParticipants = participants.map((participant) => {
  //       if (participant.id != updatedP.id) return participant
  //       return updatedP
  //     })
  //     // sort the participants to prevent an order mismatch
  //     setParticipants(updatedParticipants)
  //   }

  // }, [updatedParticipantData, updatedParticipantError])

  const handleCloseModal = () => { setIsModalOpen(false); };

  return (<AppLayout title="Tasks" left={`/${partyId}/participants`} right={""}>

    <Scrollable>
      {loading ? skeleton() : sortedTasks(tasks).map((task) => getTaskDiv(task, partyId))}
    </Scrollable>
    <SubmitButton props={{ onClick: () => setIsModalOpen(true) }} text="+" />
    <div className="z-50">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={"New Task"} >
        <CreateTask participants={participants as Participant[]} participantsLoading={participantsLoading} />
      </Modal>
    </div>
  </AppLayout>
  )
}

function skeleton() {
  return <Skeleton className="h-9 bg-gray-200 rounded-sm" />
}

function sortedTasks(list: readonly Task[]) {
  const newList = [...list]
  newList.sort((a, b) => a.id!.localeCompare(b.id!))
  return newList
}

function getTaskDiv(task: Task, partyId: String) {
  return <a key={task.id} href={`/${partyId}/tasks/${task.id}`}>
    <div className="flex items-center justify-between h-10 border-b border-gray-500">
      {/* Text on the left */}
      <div className="text-white p-2">
        <div className="text-sm">{displayTaskStatus(task.status as TaskStatus)}{task.title || "?"}</div>
      </div >
      {/* Buttons on the right */}
      <div className="flex space-x-2 p-2">
        <a href={`/${partyId}/task/${task.id}/chat`}>
          <button className="bg-yellow-500 text-white h-6 mt-1 px-3 rounded">🗨</button>
        </a>
      </div>
    </div>
  </a>
}

function displayTaskStatus(status: TaskStatus) {
  switch (status) {
    case (TaskStatus.Todo): return "❗";
    case (TaskStatus.Done): return "☑";
    case (TaskStatus.Pending): return "👷"
    default: return "?"
  }
}

export default Participants
