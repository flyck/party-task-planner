import React, { useEffect, useState } from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import { useQuery, useSubscription } from "@apollo/client";
import { CreatedTaskDocument, CreatedTaskSubscription, CreatedTaskSubscriptionVariables, DeletedTaskDocument, DeletedTaskSubscription, DeletedTaskSubscriptionVariables, GetParticipantsDocument, GetParticipantsQuery, GetParticipantsQueryVariables, GetTasksDocument, GetTasksQuery, GetTasksQueryVariables, Participant, Task, TaskStatus, UpdatedTaskDocument, UpdatedTaskSubscription, UpdatedTaskSubscriptionVariables } from "@/lib/gql/graphql";
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

  const { data: newTaskData, error: newTaskError } = useSubscription<CreatedTaskSubscription, CreatedTaskSubscriptionVariables>(CreatedTaskDocument, {
    variables: { partyId },
  });
  const { data: deletedTaskData, error: deletedTaskError } = useSubscription<DeletedTaskSubscription, DeletedTaskSubscriptionVariables>(DeletedTaskDocument, {
    variables: { partyId },
  });
  const { data: updatedTaskData, error: updatedTaskError } = useSubscription<UpdatedTaskSubscription, UpdatedTaskSubscriptionVariables>(UpdatedTaskDocument, {
    variables: { partyId },
  });

  useEffect(() => {
    console.log("woo newTask called")
    if (newTaskError) {
      console.error("Error from subscription: " + JSON.stringify(newTaskError))
      toast.error("Error in live update.")
    }
    if (newTaskData) {
      const newTask: Task = newTaskData?.createdTask as Task
      setTasks([...tasks, newTask])
    }
  }, [newTaskData, newTaskError])

  useEffect(() => {
    console.log("woo deletedTask called")
    if (deletedTaskError) {
      console.error("Error from subscription: " + JSON.stringify(newTaskError))
      toast.error("Error in live update.")
    }
    if (deletedTaskData) {
      const deletedTask: Task = deletedTaskData?.deletedTask as Task
      setTasks([...tasks.filter((task) => task.id != deletedTask.id)])
    }
  }, [deletedTaskData, deletedTaskError])

  useEffect(() => {
    console.log("woo updatedTask called")
    if (updatedTaskError) {
      console.error("Error from subscription: " + JSON.stringify(newTaskError))
      toast.error("Error in live update.")
    }
    if (updatedTaskData) {
      const updatedTask: Task = updatedTaskData?.updatedTask as Task
      const updatedTasks = tasks.map((task) => {
        if (task.id != updatedTask.id) return task
        return updatedTask
      })
      // sort the participants to prevent an order mismatch
      setTasks(updatedTasks)
    }

  }, [updatedTaskData, updatedTaskError])

  const handleCloseModal = () => { setIsModalOpen(false); };

  return (<AppLayout title="Tasks" left={`/${partyId}/participants`} right={""}>

    <Scrollable>
      {loading ? skeleton() : sortedTasks(tasks).map((task) => getTaskDiv(task, partyId))}
    </Scrollable>
    <SubmitButton props={{ onClick: () => setIsModalOpen(true) }} text="+" />
    <div className="z-50">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={"New Task"} >
        <CreateTask participants={participants?.getParticipants?.items as Participant[]} participantsLoading={participantsLoading} />
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
      <div className="text-gray-800 dark:text-white p-2">
        <div className="text-sm">{displayTaskStatus(task.status as TaskStatus)}{task.title || "?"}</div>
      </div >
      {/* Buttons on the right */}
      {/*<div className="flex space-x-2 p-2">
        <button className="bg-yellow-500 h-6 mt-1 px-3 rounded" onClick={() => window.location.assign("/chat")}>🗨</button>
        </div>*/}
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
