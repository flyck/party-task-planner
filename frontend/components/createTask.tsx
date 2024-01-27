import React from "react"
import SubmitButton from "@/components/ui/minis/submitButton";
import Input from "@/components/ui/minis/input";
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client'
import { TaskStatus, CreateTaskMutationVariables, CreateTaskMutation, CreateTaskDocument, GetParticipantsQuery, GetParticipantsQueryVariables, GetParticipantsDocument, Participant } from "@/lib/gql/graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */

const CreateParticipant: React.FC<{ participants: Participant[], participantsLoading: boolean }> = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm({});
  const router = useRouter();
  const partyId = router.query.partyId as string
  const [createTask, { error, data, loading: createTaskLoading }] = useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    let id = ""
    try {
      const { data, errors } = await createTask({
        variables: {
          args: {
            partyId,
            status: TaskStatus.Todo,
            ...getValues()
          }
        }
      })
      if (errors != undefined) { throw "Found an error: " + JSON.stringify(errors) }
      id = data!.createTask!.id!
    } catch (error) {
      toast.error("Couldnt create task.")
      console.error("Caught: " + error)
    }
    console.log("Task created:" + id)
    window.location.assign(`/${partyId}/tasks`)
  };

  return (
    <form onSubmit={(event) => submit(event)}>
      <Input title="Title" props={{
        type: "text", onFocus: () => redirect(),
        required: true,
        ...register("title")
      }} />
      {/* TODO dropdown */}
      <Input title="Assignee" props={{
        type: "text", onFocus: () => redirect(),
        required: true,
        ...register("assigneeId")
      }} />
      <Input title="Description" props={{
        type: "text", onFocus: () => redirect(),
        ...register("description")
      }} />
      <SubmitButton loading={createTaskLoading} props={{ disabled: isUserSet() }} />
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
