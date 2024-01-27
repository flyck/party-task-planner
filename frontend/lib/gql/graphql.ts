/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateParticipant = {
  email?: InputMaybe<Scalars['String']['input']>;
  invitationSent?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partyId: Scalars['String']['input'];
};

export type CreateParty = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTask = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  partyId: Scalars['String']['input'];
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createParticipant?: Maybe<Participant>;
  createParty?: Maybe<Party>;
  createTask?: Maybe<Task>;
  deleteParticipant?: Maybe<Participant>;
  deleteParty?: Maybe<Party>;
  deleteTask?: Maybe<Task>;
  updateParticipant?: Maybe<Participant>;
  updateParty?: Maybe<Party>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateParticipantArgs = {
  args: CreateParticipant;
};


export type MutationCreatePartyArgs = {
  args: CreateParty;
};


export type MutationCreateTaskArgs = {
  args: CreateTask;
};


export type MutationDeleteParticipantArgs = {
  id: Scalars['String']['input'];
  partyId: Scalars['String']['input'];
};


export type MutationDeletePartyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
  partyId: Scalars['String']['input'];
};


export type MutationUpdateParticipantArgs = {
  args: UpdateParticipant;
};


export type MutationUpdatePartyArgs = {
  args: UpdateParty;
};


export type MutationUpdateTaskArgs = {
  args: UpdateTask;
};

export type Participant = {
  __typename?: 'Participant';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  invitationSent?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  partyId?: Maybe<Scalars['String']['output']>;
};

export type Participants = {
  __typename?: 'Participants';
  items?: Maybe<Array<Maybe<Participant>>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Party = {
  __typename?: 'Party';
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  participants?: Maybe<Participants>;
  tasks?: Maybe<Tasks>;
  title?: Maybe<Scalars['String']['output']>;
};


export type PartyParticipantsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type PartyTasksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getParticipant?: Maybe<Participant>;
  getParticipants?: Maybe<Participants>;
  getParty?: Maybe<Party>;
  getTask?: Maybe<Task>;
  getTasks?: Maybe<Tasks>;
};


export type QueryGetParticipantArgs = {
  id: Scalars['String']['input'];
  partyId: Scalars['String']['input'];
};


export type QueryGetParticipantsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  partyId: Scalars['String']['input'];
};


export type QueryGetPartyArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTaskArgs = {
  id: Scalars['String']['input'];
  partyId: Scalars['String']['input'];
};


export type QueryGetTasksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  partyId: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  createdParticipant?: Maybe<Participant>;
  createdTask?: Maybe<Task>;
  deletedParticipant?: Maybe<Participant>;
  deletedTask?: Maybe<Task>;
  updatedParticipant?: Maybe<Participant>;
  updatedParty?: Maybe<Party>;
  updatedTask?: Maybe<Task>;
};


export type SubscriptionCreatedParticipantArgs = {
  partyId: Scalars['String']['input'];
};


export type SubscriptionCreatedTaskArgs = {
  partyId: Scalars['String']['input'];
};


export type SubscriptionDeletedParticipantArgs = {
  partyId: Scalars['String']['input'];
};


export type SubscriptionDeletedTaskArgs = {
  partyId: Scalars['String']['input'];
};


export type SubscriptionUpdatedParticipantArgs = {
  partyId: Scalars['String']['input'];
};


export type SubscriptionUpdatedPartyArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionUpdatedTaskArgs = {
  partyId: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<Participant>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  partyId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TaskStatus>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum TaskStatus {
  Done = 'DONE',
  Pending = 'PENDING',
  Todo = 'TODO'
}

export type Tasks = {
  __typename?: 'Tasks';
  items?: Maybe<Array<Maybe<Task>>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type UpdateParticipant = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  invitationSent?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partyId: Scalars['String']['input'];
};

export type UpdateParty = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTask = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  invitationSent?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  partyId: Scalars['String']['input'];
};

export type CreateParticipantMutationVariables = Exact<{
  args: CreateParticipant;
}>;


export type CreateParticipantMutation = { __typename?: 'Mutation', createParticipant?: { __typename?: 'Participant', partyId?: string | null, id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null };

export type CreatePartyMutationVariables = Exact<{
  args: CreateParty;
}>;


export type CreatePartyMutation = { __typename?: 'Mutation', createParty?: { __typename?: 'Party', id?: string | null } | null };

export type CreateTaskMutationVariables = Exact<{
  args: CreateTask;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'Task', partyId?: string | null, id?: string | null, title?: string | null, status?: TaskStatus | null, description?: string | null, assignee?: { __typename?: 'Participant', name?: string | null } | null } | null };

export type CreatedParticipantSubscriptionVariables = Exact<{
  partyId: Scalars['String']['input'];
}>;


export type CreatedParticipantSubscription = { __typename?: 'Subscription', createdParticipant?: { __typename?: 'Participant', id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null };

export type DeleteParticipantMutationVariables = Exact<{
  partyId: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type DeleteParticipantMutation = { __typename?: 'Mutation', deleteParticipant?: { __typename?: 'Participant', partyId?: string | null, id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null };

export type DeletePartyMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePartyMutation = { __typename?: 'Mutation', deleteParty?: { __typename?: 'Party', id?: string | null } | null };

export type DeleteTaskMutationVariables = Exact<{
  partyId: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Task', id?: string | null, title?: string | null, description?: string | null, status?: TaskStatus | null, assignee?: { __typename?: 'Participant', name?: string | null } | null } | null };

export type DeletedParticipantSubscriptionVariables = Exact<{
  partyId: Scalars['String']['input'];
}>;


export type DeletedParticipantSubscription = { __typename?: 'Subscription', deletedParticipant?: { __typename?: 'Participant', id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null };

export type GetParticipantQueryVariables = Exact<{
  partyId: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type GetParticipantQuery = { __typename?: 'Query', getParticipant?: { __typename?: 'Participant', id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null };

export type GetParticipantsQueryVariables = Exact<{
  partyId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetParticipantsQuery = { __typename?: 'Query', getParticipants?: { __typename?: 'Participants', nextToken?: string | null, items?: Array<{ __typename?: 'Participant', id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null> | null } | null };

export type GetPartyQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPartyQuery = { __typename?: 'Query', getParty?: { __typename?: 'Party', id?: string | null, title?: string | null, description?: string | null, location?: string | null, date?: string | null } | null };

export type GetTaskQueryVariables = Exact<{
  partyId: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask?: { __typename?: 'Task', id?: string | null, title?: string | null, description?: string | null, status?: TaskStatus | null, assignee?: { __typename?: 'Participant', name?: string | null } | null } | null };

export type GetTasksQueryVariables = Exact<{
  partyId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTasksQuery = { __typename?: 'Query', getTasks?: { __typename?: 'Tasks', nextToken?: string | null, items?: Array<{ __typename?: 'Task', id?: string | null, title?: string | null, description?: string | null, status?: TaskStatus | null, assignee?: { __typename?: 'Participant', name?: string | null } | null } | null> | null } | null };

export type UpdateParticipantMutationVariables = Exact<{
  args: UpdateParticipant;
}>;


export type UpdateParticipantMutation = { __typename?: 'Mutation', updateParticipant?: { __typename?: 'Participant', partyId?: string | null, id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null };

export type UpdatePartyMutationVariables = Exact<{
  args: UpdateParty;
}>;


export type UpdatePartyMutation = { __typename?: 'Mutation', updateParty?: { __typename?: 'Party', id?: string | null, title?: string | null, description?: string | null, location?: string | null, date?: string | null } | null };

export type UpdateTaskMutationVariables = Exact<{
  args: UpdateTask;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', id?: string | null, title?: string | null, description?: string | null, status?: TaskStatus | null, assignee?: { __typename?: 'Participant', name?: string | null } | null } | null };

export type UpdatedParticipantSubscriptionVariables = Exact<{
  partyId: Scalars['String']['input'];
}>;


export type UpdatedParticipantSubscription = { __typename?: 'Subscription', updatedParticipant?: { __typename?: 'Participant', id?: string | null, name?: string | null, email?: string | null, invitationSent?: boolean | null } | null };

export type UpdatedPartySubscriptionVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UpdatedPartySubscription = { __typename?: 'Subscription', updatedParty?: { __typename?: 'Party', id?: string | null, title?: string | null, description?: string | null, location?: string | null, date?: string | null } | null };

export type UpdatedTaskSubscriptionVariables = Exact<{
  partyId: Scalars['String']['input'];
}>;


export type UpdatedTaskSubscription = { __typename?: 'Subscription', updatedTask?: { __typename?: 'Task', id?: string | null, title?: string | null, description?: string | null, status?: TaskStatus | null, assignee?: { __typename?: 'Participant', name?: string | null } | null } | null };


export const CreateParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateParticipant"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partyId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}}]}}]} as unknown as DocumentNode<CreateParticipantMutation, CreateParticipantMutationVariables>;
export const CreatePartyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createParty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateParty"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createParty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePartyMutation, CreatePartyMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTask"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partyId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreatedParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"createdParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}}]}}]} as unknown as DocumentNode<CreatedParticipantSubscription, CreatedParticipantSubscriptionVariables>;
export const DeleteParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partyId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}}]}}]} as unknown as DocumentNode<DeleteParticipantMutation, DeleteParticipantMutationVariables>;
export const DeletePartyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteParty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteParty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePartyMutation, DeletePartyMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const DeletedParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"deletedParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletedParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}}]}}]} as unknown as DocumentNode<DeletedParticipantSubscription, DeletedParticipantSubscriptionVariables>;
export const GetParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}}]}}]} as unknown as DocumentNode<GetParticipantQuery, GetParticipantQueryVariables>;
export const GetParticipantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getParticipants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getParticipants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"nextToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextToken"}}]}}]}}]} as unknown as DocumentNode<GetParticipantsQuery, GetParticipantsQueryVariables>;
export const GetPartyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getParty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getParty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GetPartyQuery, GetPartyQueryVariables>;
export const GetTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetTaskQuery, GetTaskQueryVariables>;
export const GetTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"nextToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextToken"}}]}}]}}]} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const UpdateParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateParticipant"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partyId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}}]}}]} as unknown as DocumentNode<UpdateParticipantMutation, UpdateParticipantMutationVariables>;
export const UpdatePartyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateParty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateParty"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateParty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<UpdatePartyMutation, UpdatePartyMutationVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTask"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdatedParticipantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"updatedParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitationSent"}}]}}]}}]} as unknown as DocumentNode<UpdatedParticipantSubscription, UpdatedParticipantSubscriptionVariables>;
export const UpdatedPartyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"updatedParty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedParty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<UpdatedPartySubscription, UpdatedPartySubscriptionVariables>;
export const UpdatedTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"updatedTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatedTaskSubscription, UpdatedTaskSubscriptionVariables>;