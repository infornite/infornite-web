import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type Connection = {
  __typename?: 'Connection';
  id?: Maybe<Scalars['ID']>;
  tenant?: Maybe<Scalars['String']>;
  fromId?: Maybe<Scalars['ID']>;
  fromName?: Maybe<Scalars['String']>;
  fromType?: Maybe<FacetType>;
  fromSubType?: Maybe<FacetSubType>;
  fromDescription?: Maybe<Scalars['String']>;
  connection?: Maybe<ConnectionType>;
  display?: Maybe<Scalars['String']>;
  displayAlternative?: Maybe<Scalars['String']>;
  toId?: Maybe<Scalars['ID']>;
  toName?: Maybe<Scalars['String']>;
  toType?: Maybe<FacetType>;
  toSubType?: Maybe<FacetSubType>;
  toDescription?: Maybe<Scalars['String']>;
  targetId?: Maybe<Scalars['ID']>;
  targetName?: Maybe<Scalars['String']>;
  targetType?: Maybe<FacetType>;
  createdAt?: Maybe<Scalars['String']>;
  createdById?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedById?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export type ConnectionStub = {
  __typename?: 'ConnectionStub';
  id?: Maybe<Scalars['ID']>;
  fromId?: Maybe<Scalars['ID']>;
  fromName?: Maybe<Scalars['String']>;
  fromType?: Maybe<FacetType>;
  connection?: Maybe<ConnectionType>;
  toId?: Maybe<Scalars['ID']>;
  toName?: Maybe<Scalars['String']>;
  toType?: Maybe<FacetType>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export enum ConnectionType {
  HasChild = 'HAS_CHILD',
  KaContains = 'KA_CONTAINS',
  CtrlControls = 'CTRL_CONTROLS',
  /** Stakeholder */
  RoleOwner = 'ROLE_OWNER',
  RoleSteward = 'ROLE_STEWARD',
  RoleCustodian = 'ROLE_CUSTODIAN'
}

export type CreateConnectionInput = {
  fromId?: Maybe<Scalars['ID']>;
  fromType?: Maybe<FacetType>;
  connection?: Maybe<ConnectionType>;
  display?: Maybe<Scalars['String']>;
  displayAlternative?: Maybe<Scalars['String']>;
  toId?: Maybe<Scalars['ID']>;
  toType?: Maybe<FacetType>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export type DeleteConnectionInput = {
  id: Scalars['ID'];
};

export type DeleteConnectionResponse = {
  __typename?: 'DeleteConnectionResponse';
  success?: Maybe<Scalars['Boolean']>;
};

export type Explore = {
  __typename?: 'Explore';
  id?: Maybe<Scalars['ID']>;
  tenant?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['ID']>;
  sourceName?: Maybe<Scalars['String']>;
  sourceType?: Maybe<FacetType>;
  sourceSubType?: Maybe<FacetSubType>;
  sourceParentId?: Maybe<Scalars['ID']>;
  target?: Maybe<Scalars['ID']>;
  targetName?: Maybe<Scalars['String']>;
  targetType?: Maybe<FacetType>;
  targetSubType?: Maybe<FacetSubType>;
  targetParentId?: Maybe<Scalars['ID']>;
  connection?: Maybe<ConnectionType>;
  display?: Maybe<Scalars['String']>;
  displayAlternative?: Maybe<Scalars['String']>;
};

/**
 * ################################################################################
 * ########################           FACET           #########################
 * ################################################################################
 */
export type Facet = {
  __typename?: 'Facet';
  id?: Maybe<Scalars['ID']>;
  tenant?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<FacetType>;
  subType?: Maybe<FacetSubType>;
  status?: Maybe<FacetStatus>;
  description?: Maybe<Scalars['String']>;
  acronym?: Maybe<Scalars['String']>;
  synonym?: Maybe<Array<Maybe<Scalars['String']>>>;
  validValue?: Maybe<Array<Maybe<Scalars['String']>>>;
  primaryKey?: Maybe<Scalars['Boolean']>;
  format?: Maybe<Format>;
  dataType?: Maybe<Scalars['String']>;
  pii?: Maybe<Scalars['Boolean']>;
  securityClassification?: Maybe<SecurityClassification>;
  key?: Maybe<Scalars['Boolean']>;
  keyReason?: Maybe<Scalars['String']>;
  accessGuidelines?: Maybe<Scalars['String']>;
  stakeholderTitle?: Maybe<Scalars['String']>;
  stakeholderEmailAddress?: Maybe<Scalars['String']>;
  stakeholderPhoneNumber?: Maybe<Scalars['String']>;
  tag?: Maybe<Array<Maybe<Scalars['String']>>>;
  wiki?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  parentName?: Maybe<Scalars['String']>;
  knowledgeAreaId?: Maybe<Scalars['String']>;
  knowledgeAreaName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdById?: Maybe<Scalars['String']>;
  createdByName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedById?: Maybe<Scalars['String']>;
  updatedByName?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export type FacetBreadcrumb = {
  __typename?: 'FacetBreadcrumb';
  tenant?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<FacetType>;
  subType?: Maybe<FacetSubType>;
};

export type FacetSearch = {
  __typename?: 'FacetSearch';
  rank?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<FacetType>;
  subType?: Maybe<FacetSubType>;
  status?: Maybe<FacetStatus>;
  description?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  parentName?: Maybe<Scalars['String']>;
  knowledgeAreaId?: Maybe<Scalars['String']>;
  knowledgeAreaName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdById?: Maybe<Scalars['String']>;
  createdByName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedById?: Maybe<Scalars['String']>;
  updatedByName?: Maybe<Scalars['String']>;
};

export type FacetSnippet = {
  __typename?: 'FacetSnippet';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<FacetType>;
  subType?: Maybe<FacetSubType>;
  status?: Maybe<FacetStatus>;
  description?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  parentName?: Maybe<Scalars['String']>;
  knowledgeAreaId?: Maybe<Scalars['String']>;
  knowledgeAreaName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdById?: Maybe<Scalars['String']>;
  createdByName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedById?: Maybe<Scalars['String']>;
  updatedByName?: Maybe<Scalars['String']>;
};

export enum FacetStatus {
  Draft = 'Draft',
  Published = 'Published'
}

export enum FacetSubType {
  /** Knowledge_Area */
  KnowledgeArea = 'Knowledge_Area',
  /** Term */
  BusinessTerm = 'Business_Term',
  Metric = 'Metric',
  KeyPerformanceIndicator = 'Key_Performance_Indicator',
  /** Report */
  Report = 'Report',
  RegulatoryReport = 'Regulatory_Report',
  /** System */
  System = 'System',
  ManualProcess = 'Manual_Process',
  /** Table */
  Table = 'Table',
  File = 'File',
  Json = 'JSON',
  Xml = 'XML',
  /** Attribute */
  ReportAttribute = 'Report_Attribute',
  Column = 'Column',
  Field = 'Field',
  /** Control */
  Control = 'Control',
  /** Person */
  Person = 'Person',
  /** Artefact */
  Policy = 'Policy',
  Guideline = 'Guideline',
  Wiki = 'Wiki',
  Training = 'Training'
}

export type FacetTree = {
  __typename?: 'FacetTree';
  tenant?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<FacetType>;
  subType?: Maybe<FacetSubType>;
};

/**
 * ################################################################################
 * ########################              ENUMS            #########################
 * ################################################################################
 */
export enum FacetType {
  KnowledgeArea = 'Knowledge_Area',
  Element = 'Element',
  Report = 'Report',
  System = 'System',
  Table = 'Table',
  Attribute = 'Attribute',
  Stakeholder = 'Stakeholder',
  Control = 'Control',
  Artefact = 'Artefact'
}

export enum Format {
  Code = 'Code',
  String = 'String',
  Date = 'Date',
  Boolean = 'Boolean',
  Number = 'Number',
  Ratio = 'Ratio'
}

/**
 * ################################################################################
 * ########################            MUTATION           #########################
 * ################################################################################
 */
export type Mutation = {
  __typename?: 'Mutation';
  upsertFacet: Facet;
  createConnection: Connection;
  deleteConnection: DeleteConnectionResponse;
  upsertUser: User;
};


/**
 * ################################################################################
 * ########################            MUTATION           #########################
 * ################################################################################
 */
export type MutationUpsertFacetArgs = {
  input: UpsertFacetInput;
};


/**
 * ################################################################################
 * ########################            MUTATION           #########################
 * ################################################################################
 */
export type MutationCreateConnectionArgs = {
  input: CreateConnectionInput;
};


/**
 * ################################################################################
 * ########################            MUTATION           #########################
 * ################################################################################
 */
export type MutationDeleteConnectionArgs = {
  input: DeleteConnectionInput;
};


/**
 * ################################################################################
 * ########################            MUTATION           #########################
 * ################################################################################
 */
export type MutationUpsertUserArgs = {
  input: UpsertUserInput;
};

/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type Query = {
  __typename?: 'Query';
  Facet?: Maybe<Array<Maybe<Facet>>>;
  FacetSnippet?: Maybe<Array<Maybe<FacetSnippet>>>;
  FacetSearch?: Maybe<Array<Maybe<FacetSearch>>>;
  FacetBreadcrumb?: Maybe<Array<Maybe<FacetBreadcrumb>>>;
  FacetTree?: Maybe<Array<Maybe<FacetTree>>>;
  Connection?: Maybe<Array<Maybe<Connection>>>;
  ConnectionStub?: Maybe<Array<Maybe<ConnectionStub>>>;
  Explore?: Maybe<Array<Maybe<Explore>>>;
  Random?: Maybe<Array<Maybe<Random>>>;
  User?: Maybe<Array<Maybe<User>>>;
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryFacetArgs = {
  filter?: Maybe<QueryFacetInput>;
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryFacetSnippetArgs = {
  filter?: Maybe<QueryFacetInput>;
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryFacetSearchArgs = {
  filter?: Maybe<QueryFacetSearchInput>;
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryFacetBreadcrumbArgs = {
  id: Scalars['ID'];
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryFacetTreeArgs = {
  id: Scalars['ID'];
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryConnectionArgs = {
  filter?: Maybe<QueryConnectionInput>;
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryConnectionStubArgs = {
  filter?: Maybe<QueryConnectionInput>;
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryExploreArgs = {
  filter?: Maybe<QueryConnectionInput>;
};


/**
 * ################################################################################
 * ########################              QUERY            #########################
 * ################################################################################
 */
export type QueryUserArgs = {
  filter?: Maybe<QueryUserInput>;
};

export type QueryConnectionInput = {
  facetId?: Maybe<Scalars['ID']>;
  fromId?: Maybe<Scalars['ID']>;
  fromType?: Maybe<Array<Maybe<FacetType>>>;
  connection?: Maybe<Array<Maybe<ConnectionType>>>;
  toId?: Maybe<Scalars['ID']>;
  toType?: Maybe<Array<Maybe<FacetType>>>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_Ordering>>>;
};

export type QueryFacetInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Array<Maybe<FacetType>>>;
  subType?: Maybe<Array<Maybe<FacetSubType>>>;
  status?: Maybe<Array<Maybe<FacetStatus>>>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_Ordering>>>;
};

export type QueryFacetSearchInput = {
  search?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Array<Maybe<FacetType>>>;
  subType?: Maybe<Array<Maybe<FacetSubType>>>;
  status?: Maybe<Array<Maybe<FacetStatus>>>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_Ordering>>>;
};

export type QueryUserInput = {
  id?: Maybe<Scalars['ID']>;
  authId?: Maybe<Scalars['String']>;
  facetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_Ordering>>>;
};

export type Random = {
  __typename?: 'Random';
  id?: Maybe<Scalars['ID']>;
};

export enum SecurityClassification {
  Public = 'Public',
  Internal = 'Internal',
  Restricted = 'Restricted',
  Confidential = 'Confidential'
}

export type UpsertFacetInput = {
  id?: Maybe<Scalars['ID']>;
  tenant?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<FacetType>;
  subType?: Maybe<FacetSubType>;
  status?: Maybe<FacetStatus>;
  description?: Maybe<Scalars['String']>;
  acronym?: Maybe<Scalars['String']>;
  synonym?: Maybe<Array<Maybe<Scalars['String']>>>;
  validValue?: Maybe<Array<Maybe<Scalars['String']>>>;
  primaryKey?: Maybe<Scalars['Boolean']>;
  format?: Maybe<Format>;
  dataType?: Maybe<Scalars['String']>;
  pii?: Maybe<Scalars['Boolean']>;
  securityClassification?: Maybe<SecurityClassification>;
  key?: Maybe<Scalars['Boolean']>;
  keyReason?: Maybe<Scalars['String']>;
  accessGuidelines?: Maybe<Scalars['String']>;
  stakeholderTitle?: Maybe<Scalars['String']>;
  stakeholderEmailAddress?: Maybe<Scalars['String']>;
  stakeholderPhoneNumber?: Maybe<Scalars['String']>;
  tag?: Maybe<Array<Maybe<Scalars['String']>>>;
  parentId?: Maybe<Scalars['String']>;
  knowledgeAreaId?: Maybe<Scalars['String']>;
  wiki?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UpsertUserInput = {
  tenant?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  authId?: Maybe<Scalars['String']>;
  facetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  tenant?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  authId?: Maybe<Scalars['String']>;
  facetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdById?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedById?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
};

/**
 * ################################################################################
 * ########################              UTILITY            #########################
 * ################################################################################
 */
export enum _Ordering {
  NameAsc = 'name_asc',
  NameDesc = 'name_desc',
  UpdatedAtAsc = 'updated_at_asc',
  UpdatedAtDesc = 'updated_at_desc',
  RankAsc = 'rank_asc',
  RankDesc = 'rank_desc',
  TypeAsc = 'type_asc',
  TypeDesc = 'type_desc',
  SubTypeAsc = 'subType_asc',
  SubTypeDesc = 'subType_desc',
  StatusAsc = 'status_asc',
  StatusDesc = 'status_desc'
}

export type FacetQueryVariables = Exact<{
  filter?: Maybe<QueryFacetInput>;
}>;


export type FacetQuery = (
  { __typename?: 'Query' }
  & { Facet?: Maybe<Array<Maybe<(
    { __typename?: 'Facet' }
    & Pick<Facet, 'id' | 'tenant' | 'name' | 'type' | 'subType' | 'status' | 'description' | 'acronym' | 'synonym' | 'validValue' | 'primaryKey' | 'format' | 'dataType' | 'pii' | 'securityClassification' | 'key' | 'keyReason' | 'accessGuidelines' | 'stakeholderTitle' | 'stakeholderEmailAddress' | 'stakeholderPhoneNumber' | 'tag' | 'wiki' | 'knowledgeAreaId' | 'knowledgeAreaName' | 'parentId' | 'parentName' | 'createdAt' | 'createdById' | 'createdByName' | 'updatedAt' | 'updatedById' | 'updatedByName'>
  )>>> }
);

export type FacetStubQueryVariables = Exact<{
  filter?: Maybe<QueryFacetInput>;
}>;


export type FacetStubQuery = (
  { __typename?: 'Query' }
  & { Facet?: Maybe<Array<Maybe<(
    { __typename?: 'Facet' }
    & Pick<Facet, 'id' | 'name' | 'type'>
  )>>> }
);

export type FacetSnippetQueryVariables = Exact<{
  filter?: Maybe<QueryFacetInput>;
}>;


export type FacetSnippetQuery = (
  { __typename?: 'Query' }
  & { FacetSnippet?: Maybe<Array<Maybe<(
    { __typename?: 'FacetSnippet' }
    & Pick<FacetSnippet, 'id' | 'name' | 'type' | 'subType' | 'status' | 'description' | 'knowledgeAreaId' | 'knowledgeAreaName' | 'parentId' | 'parentName' | 'createdAt' | 'createdById' | 'createdByName' | 'updatedAt' | 'updatedById' | 'updatedByName'>
  )>>> }
);

export type FacetSearchQueryVariables = Exact<{
  filter?: Maybe<QueryFacetSearchInput>;
}>;


export type FacetSearchQuery = (
  { __typename?: 'Query' }
  & { FacetSearch?: Maybe<Array<Maybe<(
    { __typename?: 'FacetSearch' }
    & Pick<FacetSearch, 'rank' | 'id' | 'name' | 'type' | 'subType' | 'status' | 'description' | 'knowledgeAreaId' | 'knowledgeAreaName' | 'parentId' | 'parentName' | 'createdAt' | 'createdById' | 'createdByName' | 'updatedAt' | 'updatedById' | 'updatedByName'>
  )>>> }
);

export type FacetBreadcrumbQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FacetBreadcrumbQuery = (
  { __typename?: 'Query' }
  & { FacetBreadcrumb?: Maybe<Array<Maybe<(
    { __typename?: 'FacetBreadcrumb' }
    & Pick<FacetBreadcrumb, 'tenant' | 'depth' | 'id' | 'parentId' | 'name' | 'type' | 'subType'>
  )>>> }
);

export type FacetTreeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FacetTreeQuery = (
  { __typename?: 'Query' }
  & { FacetTree?: Maybe<Array<Maybe<(
    { __typename?: 'FacetTree' }
    & Pick<FacetTree, 'tenant' | 'depth' | 'id' | 'parentId' | 'name' | 'type' | 'subType'>
  )>>> }
);

export type UpsertFacetMutationVariables = Exact<{
  input: UpsertFacetInput;
}>;


export type UpsertFacetMutation = (
  { __typename?: 'Mutation' }
  & { upsertFacet: (
    { __typename?: 'Facet' }
    & Pick<Facet, 'id' | 'tenant' | 'name' | 'type' | 'subType' | 'status' | 'description' | 'knowledgeAreaId' | 'parentId' | 'acronym' | 'synonym' | 'validValue' | 'primaryKey' | 'format' | 'dataType' | 'pii' | 'securityClassification' | 'key' | 'keyReason' | 'accessGuidelines' | 'stakeholderTitle' | 'stakeholderEmailAddress' | 'stakeholderPhoneNumber' | 'tag' | 'wiki' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreateConnectionMutationVariables = Exact<{
  input: CreateConnectionInput;
}>;


export type CreateConnectionMutation = (
  { __typename?: 'Mutation' }
  & { createConnection: (
    { __typename?: 'Connection' }
    & Pick<Connection, 'id' | 'fromId' | 'fromName' | 'fromType' | 'fromSubType' | 'fromDescription' | 'connection' | 'toId' | 'toName' | 'toType' | 'toSubType' | 'toDescription' | 'createdAt' | 'updatedAt' | 'source'>
  ) }
);

export type DeleteConnectionMutationVariables = Exact<{
  input: DeleteConnectionInput;
}>;


export type DeleteConnectionMutation = (
  { __typename?: 'Mutation' }
  & { deleteConnection: (
    { __typename?: 'DeleteConnectionResponse' }
    & Pick<DeleteConnectionResponse, 'success'>
  ) }
);

export type ConnectionQueryVariables = Exact<{
  filter?: Maybe<QueryConnectionInput>;
}>;


export type ConnectionQuery = (
  { __typename?: 'Query' }
  & { Connection?: Maybe<Array<Maybe<(
    { __typename?: 'Connection' }
    & Pick<Connection, 'id' | 'fromId' | 'fromName' | 'fromType' | 'fromSubType' | 'fromDescription' | 'connection' | 'display' | 'displayAlternative' | 'toId' | 'toName' | 'toType' | 'toSubType' | 'toDescription' | 'targetId' | 'targetName' | 'targetType' | 'createdAt' | 'updatedAt' | 'source'>
  )>>> }
);

export type ExploreQueryVariables = Exact<{
  filter?: Maybe<QueryConnectionInput>;
}>;


export type ExploreQuery = (
  { __typename?: 'Query' }
  & { Explore?: Maybe<Array<Maybe<(
    { __typename?: 'Explore' }
    & Pick<Explore, 'id' | 'source' | 'sourceName' | 'sourceType' | 'sourceSubType' | 'sourceParentId' | 'target' | 'targetName' | 'targetType' | 'targetSubType' | 'targetParentId' | 'connection' | 'display' | 'displayAlternative'>
  )>>> }
);

export type RandomQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomQuery = (
  { __typename?: 'Query' }
  & { Random?: Maybe<Array<Maybe<(
    { __typename?: 'Random' }
    & Pick<Random, 'id'>
  )>>> }
);

export type ConnectionStubQueryVariables = Exact<{
  filter?: Maybe<QueryConnectionInput>;
}>;


export type ConnectionStubQuery = (
  { __typename?: 'Query' }
  & { ConnectionStub?: Maybe<Array<Maybe<(
    { __typename?: 'ConnectionStub' }
    & Pick<ConnectionStub, 'id' | 'fromId' | 'fromName' | 'fromType' | 'connection' | 'toId' | 'toName' | 'toType'>
  )>>> }
);

export const FacetDocument = gql`
    query Facet($filter: QueryFacetInput) {
  Facet(filter: $filter) {
    id
    tenant
    name
    type
    subType
    status
    description
    acronym
    synonym
    validValue
    primaryKey
    format
    dataType
    pii
    securityClassification
    key
    keyReason
    accessGuidelines
    stakeholderTitle
    stakeholderEmailAddress
    stakeholderPhoneNumber
    tag
    wiki
    knowledgeAreaId
    knowledgeAreaName
    parentId
    parentName
    createdAt
    createdById
    createdByName
    updatedAt
    updatedById
    updatedByName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FacetGQL extends Apollo.Query<FacetQuery, FacetQueryVariables> {
    document = FacetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FacetStubDocument = gql`
    query FacetStub($filter: QueryFacetInput) {
  Facet(filter: $filter) {
    id
    name
    type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FacetStubGQL extends Apollo.Query<FacetStubQuery, FacetStubQueryVariables> {
    document = FacetStubDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FacetSnippetDocument = gql`
    query FacetSnippet($filter: QueryFacetInput) {
  FacetSnippet(filter: $filter) {
    id
    name
    type
    subType
    status
    description
    knowledgeAreaId
    knowledgeAreaName
    parentId
    parentName
    createdAt
    createdById
    createdByName
    updatedAt
    updatedById
    updatedByName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FacetSnippetGQL extends Apollo.Query<FacetSnippetQuery, FacetSnippetQueryVariables> {
    document = FacetSnippetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FacetSearchDocument = gql`
    query FacetSearch($filter: QueryFacetSearchInput) {
  FacetSearch(filter: $filter) {
    rank
    id
    name
    type
    subType
    status
    description
    knowledgeAreaId
    knowledgeAreaName
    parentId
    parentName
    createdAt
    createdById
    createdByName
    updatedAt
    updatedById
    updatedByName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FacetSearchGQL extends Apollo.Query<FacetSearchQuery, FacetSearchQueryVariables> {
    document = FacetSearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FacetBreadcrumbDocument = gql`
    query FacetBreadcrumb($id: ID!) {
  FacetBreadcrumb(id: $id) {
    tenant
    depth
    id
    parentId
    name
    type
    subType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FacetBreadcrumbGQL extends Apollo.Query<FacetBreadcrumbQuery, FacetBreadcrumbQueryVariables> {
    document = FacetBreadcrumbDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FacetTreeDocument = gql`
    query FacetTree($id: ID!) {
  FacetTree(id: $id) {
    tenant
    depth
    id
    parentId
    name
    type
    subType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FacetTreeGQL extends Apollo.Query<FacetTreeQuery, FacetTreeQueryVariables> {
    document = FacetTreeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpsertFacetDocument = gql`
    mutation upsertFacet($input: UpsertFacetInput!) {
  upsertFacet(input: $input) {
    id
    tenant
    name
    type
    subType
    status
    description
    knowledgeAreaId
    parentId
    acronym
    synonym
    validValue
    primaryKey
    format
    dataType
    pii
    securityClassification
    key
    keyReason
    accessGuidelines
    stakeholderTitle
    stakeholderEmailAddress
    stakeholderPhoneNumber
    tag
    wiki
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpsertFacetGQL extends Apollo.Mutation<UpsertFacetMutation, UpsertFacetMutationVariables> {
    document = UpsertFacetDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateConnectionDocument = gql`
    mutation createConnection($input: CreateConnectionInput!) {
  createConnection(input: $input) {
    id
    fromId
    fromName
    fromType
    fromSubType
    fromDescription
    connection
    toId
    toName
    toType
    toSubType
    toDescription
    createdAt
    updatedAt
    source
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateConnectionGQL extends Apollo.Mutation<CreateConnectionMutation, CreateConnectionMutationVariables> {
    document = CreateConnectionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteConnectionDocument = gql`
    mutation deleteConnection($input: DeleteConnectionInput!) {
  deleteConnection(input: $input) {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteConnectionGQL extends Apollo.Mutation<DeleteConnectionMutation, DeleteConnectionMutationVariables> {
    document = DeleteConnectionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ConnectionDocument = gql`
    query Connection($filter: QueryConnectionInput) {
  Connection(filter: $filter) {
    id
    fromId
    fromName
    fromType
    fromSubType
    fromDescription
    connection
    display
    displayAlternative
    toId
    toName
    toType
    toSubType
    toDescription
    targetId
    targetName
    targetType
    createdAt
    updatedAt
    source
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ConnectionGQL extends Apollo.Query<ConnectionQuery, ConnectionQueryVariables> {
    document = ConnectionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ExploreDocument = gql`
    query Explore($filter: QueryConnectionInput) {
  Explore(filter: $filter) {
    id
    source
    sourceName
    sourceType
    sourceSubType
    sourceParentId
    target
    targetName
    targetType
    targetSubType
    targetParentId
    connection
    display
    displayAlternative
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExploreGQL extends Apollo.Query<ExploreQuery, ExploreQueryVariables> {
    document = ExploreDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RandomDocument = gql`
    query Random {
  Random {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RandomGQL extends Apollo.Query<RandomQuery, RandomQueryVariables> {
    document = RandomDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ConnectionStubDocument = gql`
    query ConnectionStub($filter: QueryConnectionInput) {
  ConnectionStub(filter: $filter) {
    id
    fromId
    fromName
    fromType
    connection
    toId
    toName
    toType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ConnectionStubGQL extends Apollo.Query<ConnectionStubQuery, ConnectionStubQueryVariables> {
    document = ConnectionStubDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }