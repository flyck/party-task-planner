/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createParticipant(\n$args: CreateParticipant!\n) {\n createParticipant(\n  args: $args\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}": types.CreateParticipantDocument,
    "mutation createParty(\n  $args: CreateParty!\n) {\n createParty(args: $args) {\n    id\n  }\n}": types.CreatePartyDocument,
    "mutation createTask(\n$args: CreateTask!\n) {\n createTask(\n  args: $args\n  ) {\n    partyId\n    id\n    title\n    status\n    assignee {\n      name\n    }\n    description\n  }\n}": types.CreateTaskDocument,
    "subscription createdParticipant(\n  $partyId: String!\n) {\n createdParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}": types.CreatedParticipantDocument,
    "subscription createdTask(\n  $partyId: String!\n) {\n createdTask(\n    partyId: $partyId\n  ) {\n    partyId\n    id\n    title\n    status\n    assignee {\n      name\n    }\n    description\n  }\n}": types.CreatedTaskDocument,
    "mutation deleteParticipant(\n  $partyId: String!\n  $id: String!\n) {\n deleteParticipant(\n  partyId: $partyId\n  id: $id\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}": types.DeleteParticipantDocument,
    "mutation deleteParty(\n  $id: String!\n) {\n deleteParty(\n  id: $id\n  ) {\n    id\n  }\n}": types.DeletePartyDocument,
    "mutation deleteTask(\n  $partyId: String!\n  $id: String!\n) {\n deleteTask(\n  partyId: $partyId\n  id: $id\n  ) {\n    partyId\n    id\n  }\n}": types.DeleteTaskDocument,
    "subscription deletedParticipant(\n  $partyId: String!\n) {\n deletedParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}": types.DeletedParticipantDocument,
    "subscription deletedTask(\n  $partyId: String!\n) {\n deletedTask(\n  partyId: $partyId\n  ) {\n    id\n  }\n}": types.DeletedTaskDocument,
    "query getParticipant(\n  $partyId: String!\n  $id: String!\n) {\n getParticipant(\n  partyId: $partyId\n  id: $id\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}": types.GetParticipantDocument,
    "query getParticipants(\n  $partyId: String!\n  $limit: Int\n  $nextToken: String\n) {\n getParticipants(\n  partyId: $partyId\n  limit: $limit\n  nextToken: $nextToken\n  ) {\n    items {\n      id\n      name\n      email\n      invitationSent\n    }\n    nextToken\n  }\n}": types.GetParticipantsDocument,
    "query getParty(\n  $id: String!\n) {\n getParty(\n  id: $id\n  ) {\n    id\n    title\n    description\n    location\n    date\n  }\n}": types.GetPartyDocument,
    "query getTask(\n  $partyId: String!\n  $id: String!\n) {\n getTask(\n  partyId: $partyId\n  id: $id\n) {\n    id\n    title\n    description\n    status\n    assignee {\n      id\n      name\n    }\n  }\n}": types.GetTaskDocument,
    "query getTasks(\n  $partyId: String!\n  $limit: Int\n  $nextToken: String\n) {\n getTasks(\n  partyId: $partyId\n  limit: $limit\n  nextToken: $nextToken\n  ) {\n    items {\n      id\n      title\n      description\n      status\n      assignee {\n        name\n      }\n    }\n    nextToken\n  }\n}": types.GetTasksDocument,
    "mutation updateParticipant(\n$args: UpdateParticipant!\n) {\n updateParticipant(\n  args: $args\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}": types.UpdateParticipantDocument,
    "mutation updateParty(\n  $args: UpdateParty!\n) {\n  updateParty(args: $args) {\n    id\n    title\n    description\n    location\n    date\n  }\n}": types.UpdatePartyDocument,
    "mutation updateTask(\n$args: UpdateTask!\n) {\n updateTask(\n  args: $args\n ) {\n    partyId\n    id\n    title\n    description\n    status\n    assignee {\n      name\n    }\n  }\n}": types.UpdateTaskDocument,
    "subscription updatedParticipant(\n  $partyId: String!\n) {\n updatedParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}": types.UpdatedParticipantDocument,
    "subscription updatedParty(\n  $id: String!\n) {\n updatedParty(\n  id: $id\n) {\n    id\n    title\n    description\n    location\n    date\n  }\n}": types.UpdatedPartyDocument,
    "subscription updatedTask(\n  $partyId: String!\n) {\n updatedTask(\n  partyId: $partyId\n) {\n    id\n    title\n    description\n    status\n    assignee {\n      name\n    }\n  }\n}": types.UpdatedTaskDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createParticipant(\n$args: CreateParticipant!\n) {\n createParticipant(\n  args: $args\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}"): (typeof documents)["mutation createParticipant(\n$args: CreateParticipant!\n) {\n createParticipant(\n  args: $args\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createParty(\n  $args: CreateParty!\n) {\n createParty(args: $args) {\n    id\n  }\n}"): (typeof documents)["mutation createParty(\n  $args: CreateParty!\n) {\n createParty(args: $args) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createTask(\n$args: CreateTask!\n) {\n createTask(\n  args: $args\n  ) {\n    partyId\n    id\n    title\n    status\n    assignee {\n      name\n    }\n    description\n  }\n}"): (typeof documents)["mutation createTask(\n$args: CreateTask!\n) {\n createTask(\n  args: $args\n  ) {\n    partyId\n    id\n    title\n    status\n    assignee {\n      name\n    }\n    description\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription createdParticipant(\n  $partyId: String!\n) {\n createdParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"): (typeof documents)["subscription createdParticipant(\n  $partyId: String!\n) {\n createdParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription createdTask(\n  $partyId: String!\n) {\n createdTask(\n    partyId: $partyId\n  ) {\n    partyId\n    id\n    title\n    status\n    assignee {\n      name\n    }\n    description\n  }\n}"): (typeof documents)["subscription createdTask(\n  $partyId: String!\n) {\n createdTask(\n    partyId: $partyId\n  ) {\n    partyId\n    id\n    title\n    status\n    assignee {\n      name\n    }\n    description\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteParticipant(\n  $partyId: String!\n  $id: String!\n) {\n deleteParticipant(\n  partyId: $partyId\n  id: $id\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}"): (typeof documents)["mutation deleteParticipant(\n  $partyId: String!\n  $id: String!\n) {\n deleteParticipant(\n  partyId: $partyId\n  id: $id\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteParty(\n  $id: String!\n) {\n deleteParty(\n  id: $id\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation deleteParty(\n  $id: String!\n) {\n deleteParty(\n  id: $id\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteTask(\n  $partyId: String!\n  $id: String!\n) {\n deleteTask(\n  partyId: $partyId\n  id: $id\n  ) {\n    partyId\n    id\n  }\n}"): (typeof documents)["mutation deleteTask(\n  $partyId: String!\n  $id: String!\n) {\n deleteTask(\n  partyId: $partyId\n  id: $id\n  ) {\n    partyId\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription deletedParticipant(\n  $partyId: String!\n) {\n deletedParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"): (typeof documents)["subscription deletedParticipant(\n  $partyId: String!\n) {\n deletedParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription deletedTask(\n  $partyId: String!\n) {\n deletedTask(\n  partyId: $partyId\n  ) {\n    id\n  }\n}"): (typeof documents)["subscription deletedTask(\n  $partyId: String!\n) {\n deletedTask(\n  partyId: $partyId\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getParticipant(\n  $partyId: String!\n  $id: String!\n) {\n getParticipant(\n  partyId: $partyId\n  id: $id\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"): (typeof documents)["query getParticipant(\n  $partyId: String!\n  $id: String!\n) {\n getParticipant(\n  partyId: $partyId\n  id: $id\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getParticipants(\n  $partyId: String!\n  $limit: Int\n  $nextToken: String\n) {\n getParticipants(\n  partyId: $partyId\n  limit: $limit\n  nextToken: $nextToken\n  ) {\n    items {\n      id\n      name\n      email\n      invitationSent\n    }\n    nextToken\n  }\n}"): (typeof documents)["query getParticipants(\n  $partyId: String!\n  $limit: Int\n  $nextToken: String\n) {\n getParticipants(\n  partyId: $partyId\n  limit: $limit\n  nextToken: $nextToken\n  ) {\n    items {\n      id\n      name\n      email\n      invitationSent\n    }\n    nextToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getParty(\n  $id: String!\n) {\n getParty(\n  id: $id\n  ) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"): (typeof documents)["query getParty(\n  $id: String!\n) {\n getParty(\n  id: $id\n  ) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getTask(\n  $partyId: String!\n  $id: String!\n) {\n getTask(\n  partyId: $partyId\n  id: $id\n) {\n    id\n    title\n    description\n    status\n    assignee {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query getTask(\n  $partyId: String!\n  $id: String!\n) {\n getTask(\n  partyId: $partyId\n  id: $id\n) {\n    id\n    title\n    description\n    status\n    assignee {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getTasks(\n  $partyId: String!\n  $limit: Int\n  $nextToken: String\n) {\n getTasks(\n  partyId: $partyId\n  limit: $limit\n  nextToken: $nextToken\n  ) {\n    items {\n      id\n      title\n      description\n      status\n      assignee {\n        name\n      }\n    }\n    nextToken\n  }\n}"): (typeof documents)["query getTasks(\n  $partyId: String!\n  $limit: Int\n  $nextToken: String\n) {\n getTasks(\n  partyId: $partyId\n  limit: $limit\n  nextToken: $nextToken\n  ) {\n    items {\n      id\n      title\n      description\n      status\n      assignee {\n        name\n      }\n    }\n    nextToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateParticipant(\n$args: UpdateParticipant!\n) {\n updateParticipant(\n  args: $args\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}"): (typeof documents)["mutation updateParticipant(\n$args: UpdateParticipant!\n) {\n updateParticipant(\n  args: $args\n  ) {\n    partyId\n    id\n    name\n    email\n    invitationSent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateParty(\n  $args: UpdateParty!\n) {\n  updateParty(args: $args) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"): (typeof documents)["mutation updateParty(\n  $args: UpdateParty!\n) {\n  updateParty(args: $args) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateTask(\n$args: UpdateTask!\n) {\n updateTask(\n  args: $args\n ) {\n    partyId\n    id\n    title\n    description\n    status\n    assignee {\n      name\n    }\n  }\n}"): (typeof documents)["mutation updateTask(\n$args: UpdateTask!\n) {\n updateTask(\n  args: $args\n ) {\n    partyId\n    id\n    title\n    description\n    status\n    assignee {\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription updatedParticipant(\n  $partyId: String!\n) {\n updatedParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"): (typeof documents)["subscription updatedParticipant(\n  $partyId: String!\n) {\n updatedParticipant(\n  partyId: $partyId\n) {\n    id\n    name\n    email\n    invitationSent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription updatedParty(\n  $id: String!\n) {\n updatedParty(\n  id: $id\n) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"): (typeof documents)["subscription updatedParty(\n  $id: String!\n) {\n updatedParty(\n  id: $id\n) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription updatedTask(\n  $partyId: String!\n) {\n updatedTask(\n  partyId: $partyId\n) {\n    id\n    title\n    description\n    status\n    assignee {\n      name\n    }\n  }\n}"): (typeof documents)["subscription updatedTask(\n  $partyId: String!\n) {\n updatedTask(\n  partyId: $partyId\n) {\n    id\n    title\n    description\n    status\n    assignee {\n      name\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;