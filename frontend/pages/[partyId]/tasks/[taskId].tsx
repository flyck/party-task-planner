import React from "react"
import AppLayout from "@/components/appLayout"
import SubmitButton from "@/components/ui/minis/submitButton";
import Input from "@/components/ui/minis/input";
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from "@apollo/client";
import { DeleteTaskDocument, DeleteTaskMutation, DeleteTaskMutationVariables, GetTaskDocument, GetTaskQuery, GetTaskQueryVariables, UpdateTaskDocument, UpdateTaskMutation, UpdateTaskMutationVariables } from "@/lib/gql/graphql";
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
  const id = router.query.taskId as string
  const {
    register,
    getValues,
    setValue,
    watch,
  } = useForm();

  // TODO assignee dropdown
  // TODO task status dropdown
  const [deleteTask] = useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument);

  const { loading: loadingTask } = useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, {
    variables: { partyId, id },
    onCompleted: (result) => {
      if (!result.getTask) {
        console.error(result)
        // TODO redirect to 404 page in certain conditions
        toast.error("Couldnt find task.")
      }
      const { title, assignee, status, description } = result.getTask!
      setValue("title", title)
      setValue("assignee", assignee?.name)
      setValue("description", description)
      setValue("status", status)
    },
    onError: (result) => {
      console.error(result)
      // TODO redirect to 404 page in certain conditions
      toast.error("Couldnt retrieve task.")
    }
  });

  const [updateTask, { loading: updateTaskLoading }] = useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument);

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
      const { data, errors } = await updateTask({
        variables: { args: { partyId, id, ...getValues() } }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt update task.")
      console.error("Caught: " + error)
    }
    window.location.assign(`/${partyId}/tasks`)
  };

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { errors } = await deleteTask({
        variables: { partyId, id }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
    } catch (error) {
      toast.error("Couldnt delete task.")
      console.error("Caught: " + error)
    }
    window.location.assign(`/${partyId}/tasks`)
  }

  return (<AppLayout title="Task Details" left={""} right={""}>
    <form onSubmit={(event) => submit(event)}>
      <Scrollable>
        <div className="flex-1">
          <Input title="Title" loading={loadingTask} props={{
            type: "text", onFocus: () => redirect(),
            required: true,
            ...register("title")
          }} />
          <Input title="Status" loading={loadingTask} props={{
            type: "text", onFocus: () => redirect(),
            ...register("status")
          }} />
          <Input title="Description" loading={loadingTask} props={{
            type: "text", onFocus: () => redirect(),
            ...register("description")
          }} />
          <Input title="Assignee" loading={loadingTask} props={{
            type: "text", onFocus: () => redirect(),
            ...register("assignee")
          }} />
          <div className="p-2 border-b border-gray-500">
            <button className="bg-red-600 text-gray-200 rounded-sm w-full" onClick={(event) => handleDelete(event)}>
              Delete
            </button>
          </div>
        </div>
      </Scrollable>
      <SubmitButton loading={updateTaskLoading} props={{ disabled: isUserSet() }} />
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
