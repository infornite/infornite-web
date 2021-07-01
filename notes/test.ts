/*#region Facet ***************************************************************************************************************/

export interface FacetStub {
    id: string
    name: string
    label: FacetLabel
    type: FacetType
}

export interface FacetWiki extends FacetStub {
    wikiWorkspace?: boolean
    wikiTreeMenu?: string
    wikiHTML?: string
    wikiType?: WikiType
    parentId?: string
    hasChildren?: [FacetWiki]
    numOutgoingEntities: number
    numIncomingEntities: number
}

export interface Facet extends FacetStub {
    longName: string
    cde: string
    description: string
    descriptionRaw: string
    businessLogic: string
    example: string
    formatType: FormatType
    securityClassification: SecurityClassification
    ciaConfidentiality: LMHRating
    ciaIntegrity: LMHRating
    ciaAvailability: LMHRating
    aux:String
    lifecycle: FacetLifecycle
    reference: string
    link: string
    controlLogic: string
    accelerator: string
    acceleratorReference: string
    wikiWorkspace: boolean
    wikiTreeMenu: string
    wikiHTML: string
    wikiType: WikiType
    parentId: string
    parentDomainId: string
    //Value Fields
    reach: LMHRating
    relevance: LMHRating
    frequency: LMHRating
    value: LMHRating
    //System Fields
    isDefault:string
    isSystemFacet:string
    //Calculated Values Below Here
    numOutgoingEntities: number
    numIncomingEntities: number
    edges: [FacetEdgeDetails]
    lastModified: CreateModify
    firstCreated: CreateModify
    qualityScore: number
    relatedScore: number
    communityScore: number
    overallScore: number
    numStates: number
    numChildren: number
    hasChildren: [Facet]
    parent: Parent
    topLevel: boolean
    numDescriptionLikes: number
    first: number
    offset: number
    orderBy: [_Ordering]
}

export interface FacetTree {
    id: string
    name: string
    label: FacetLabel
    type: FacetType
    wikiWorkspace: boolean
    wikiTreeMenu: string
    wikiHTML: string
    wikiType: WikiType
    parentId: string
    hasChildren: [FacetTree]
}

export enum _Ordering {
    name_asc = 'name_asc',
    name_desc = 'name_desc',
    type_asc = 'type_asc',
    type_desc = 'type_desc',
    longName_asc = 'longName_asc',
    longName_desc = 'longName_desc',
    cde_asc = 'cde_asc',
    cde_desc = 'cde_desc',
    description_asc = 'description_asc',
    description_desc = 'description_desc',
    example_asc = 'example_asc',
    example_desc = 'example_desc',
    formatType_asc = 'formatType_asc',
    formatType_desc = 'formatType_desc',
    securityClassification_asc = 'securityClassification_asc',
    securityClassification_desc = 'securityClassification_desc',
    ciaConfidentiality_asc = 'ciaConfidentiality_asc',
    ciaConfidentiality_desc = 'ciaConfidentiality_desc',
    ciaIntegrity_asc = 'ciaIntegrity_asc',
    ciaIntegrity_desc = 'ciaIntegrity_desc',
    ciaAvailability_asc = 'ciaAvailability_asc',
    ciaAvailability_desc = 'ciaAvailability_desc',
    lifecycle_asc = 'lifecycle_asc',
    lifecycle_desc = 'lifecycle_desc',
    reach_asc = 'reach_asc',
    reach_desc = 'reach_desc',
    relevance_asc = 'relevance_asc',
    relevance_desc = 'relevance_desc',
    frequency_asc = 'frequency_asc',
    frequency_desc = 'frequency_desc',
    value_asc = 'value_asc',
    value_desc = 'value_desc',
}

export interface Parent {
    id: string
    name: string
    type: string
    label: FacetLabel
    reference: string
}

export enum FacetLabel {
    Idiom = 'Idiom',
    Domain = "Domain",
    Data_Element = 'Data_Element',
    System = 'System',
    Report = 'Report',
    Dataset = 'Dataset',
    Attribute = 'Attribute',
    Control = 'Control',
    Organization = 'Organization',
    Product = 'Product',
    Project = 'Project',
    Person = 'Person',
    List = 'List',
    Collection = 'Collection',
    Regulation = 'Regulation',
    Page = 'Page',
    Artefact = 'Artefact',
    Course = 'Course',
    UNKNOWN = 'Unknown',
}
export const arrFacetLabel: string[] = [
    'Idiom',
    'Domain',
    'Data_Element',
    'System',
    'Report',
    'Dataset',
    'Attribute',
    'Control',
    'Organization',
    'Product',
    'Project',
    'Person',
    'List',
    'Collection',
    'Regulation',
    'Page',
    'Artefact',
    'Course',
    'UNKNOWN'
]

export enum FacetType {
    Workspace = 'Workspace',
    //#Idiom
    Entity = 'Entity',
    Term = 'Term',
    //#Domain
    Domain = 'Domain',
    //#Data_Element
    Data_Element = 'Data_Element',
    //#System
    System = 'System',
    Database = 'Database',
    Database_Schema = 'Database_Schema',
    

    //#Report
    Report = 'Report',
    Regulatory_Report = 'Regulatory_Report',
    Tableau_Project = 'Tableau_Project',
    Tableau_Workbook = 'Tableau_Workbook',
    Tableau_Dashboard = 'Tableau_Dashboard',
    Tableau_Report = 'Tableau_Report',
    //#Dataset
    Table = 'Table',
    View = 'View',
    Dataset = 'Dataset',
    Excel_Workbook = 'Excel_Workbook',
    Flat_File = 'Flat_File',
    Tableau_Dataset = 'Tableau_Dataset',
    //#Attribute
    Metric = 'Metric',
    Report_Attribute = 'Report_Attribute',
    Attribute = 'Attribute',
    Column = 'Column',
    View_Column = 'View_Column',
    Field = 'Field',
    Tableau_Dimension = 'Tableau_Dimension',
    Tableau_Measure = 'Tableau_Measure',
    Tableau_Attribute = 'Tableau_Attribute',
    //#Control
    Data_Quality_Control = 'Data_Quality_Control',
    Reconciliation = 'Reconciliation',
    Validation_Control = 'Validation_Control',
    //#Organization
    Company = "Company",
    Organization = 'Organization',
    Department = 'Department',
    Group = 'Group',
    Vendor = 'Vendor',
    //#Product
    Product = 'Product',
    Service = 'Service',
    //#Project
    Project = 'Project',
    Project_Page = 'Project_Page',
    //#List
    Dimension = 'Dimension',
    Dimension_Value = 'Dimension_Value',
    Code_Set = 'Code_Set',
    Code_Value = 'Code_Value',
    List = 'List',
    List_Item = 'List_Item',
    //#Person
    Person = 'Person',
    //#Collection
    Collection = 'Collection',
    //#Regulation
    Regulation = 'Regulation',
    Regulation_Section = 'Regulation_Section',
    //#Page
    Page = 'Page',
    //#Artefact
    Artefact = 'Artefact',
    Artefact_Section = 'Artefact_Section',
    //#Course
    Course = 'Course',
    Course_Page = 'Course_Page',


}
export const arrFacetType: string[] = [
    //#Idiom
    'Domain',
    'Entity',
    'Term',
    //#Data_Element
    'Data_Element',
    //#System
    'System',
    //#Dataset
    'Table',
    'Dataset',
    //#Report
    'Report',
    //#Attribute
    'Attribute',
    'Column',
    'Field',
    'Metric',
    'Dimension',
    //#Control
    'Data_Quality_Control',
    'Reconciliation',
    //#Organization
    'Company',
    'Regulator',
    'Line_of_Business',
    'Department',
    'Group',
    //#Product
    'Product',
    'Service',
    //#Project
    'Project',
    'Project_Page',
    'Program',
    //#List
    'Dimension',
    'Dimension_Value',
    'Code_Set',
    'Code_Value',
    'List',
    'List_Item',
    //#Person
    'Person',
    //#Collection
    'Collection',
    //#Regulation
    'Regulation',
    'Regulation_Section',
    //#Page
    'Page',
    //#Artefact
    'Artefact',
    'Artefact_Section',
    //#Course
    'Course',
    'Course_Page',
    //#Domain
    'Domain',
]

export enum FacetLifecycle {
    Triage = 'Triage',
    Draft = 'Draft',
    Published = 'Published',
    Certified = 'Certified',
    Obsolete = 'Obsolete',
    Archived = 'Archived',
}

export enum FacetLifecycleCreatable {
    Draft = 'Draft',
    Published = 'Published',
}

export const arrFacetLifecycle: string[] = [
    'Triage',
    'Draft',
    'Published',
    'Certified',
    'Obsolete',
    'Archived',
]

export enum FacetLifecycleReason {
    Triage_Proposed = 'Triage_Proposed',
    Triage_Demoted_Draft = 'Triage_Demoted_Draft',
    Draft_Promoted_From_Proposed = 'Draft_Promoted_From_Proposed',
    Draft_Promoted_From_Archive = 'Draft_Promoted_From_Archive',
    Draft_Newly_Created = 'Draft_Newly_Created',
    Draft_Demoted_From_Published = 'Draft_Demoted_From_Published',
    Draft_Rejected_From_Published = 'Draft_Rejected_From_Published',
    Published_Promoted_From_Draft = 'Published_Promoted_From_Draft',
    Published_Demoted_From_Approved = 'Published_Demoted_From_Approved',
    Approved_Promoted_From_Published = 'Approved_Promoted_From_Published',
    Obsolete_Demoted_From_Published = 'Obsolete_Demoted_From_Published',
    Obsolete_Demoted_From_Approved = 'Obsolete_Demoted_From_Approved',
    Archived_From_Triage = 'Archived_From_Triage',
    Archived_From_Draft = 'Archived_From_Draft',
    Archived_From_Published = 'Archived_From_Published',
    Archived_From_Approved = 'Archived_From_Approved',
    Archived_From_Obsolete = 'Archived_From_Obsolete',
}

export const arrFacetLifecycleReason: string[] = [
    'Triage_Proposed',
    'Triage_Demoted_Draft',
    'Draft_Promoted_From_Proposed',
    'Draft_Promoted_From_Archive',
    'Draft_Newly_Created',
    'Draft_Demoted_From_Published',
    'Draft_Rejected_From_Published',
    'Published_Promoted_From_Draft',
    'Published_Demoted_From_Approved',
    'Approved_Promoted_From_Published',
    'Obsolete_Demoted_From_Published',
    'Obsolete_Demoted_From_Approved',
    'Archived_From_Triage',
    'Archived_From_Draft',
    'Archived_From_Published',
    'Archived_From_Approved',
    'Archived_From_Obsolete',
]

export enum SecurityClassification {
    Public = 'Public',
    Internal = 'Internal',
    Restricted = 'Restricted',
    Confidential = 'Confidential',
}
export const arrSecurityClassification: string[] = [
    'Public',
    'Internal',
    'Restricted',
    'Confidential',
]

export enum LMHRating {
    None = 'None',
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}
export const arrLMHRating: string[] = [
    'None',
    'Low',
    'Medium',
    'High',
]

export enum FormatType {
    Text = 'Text',
    Number = 'Number',
    Decimal = 'Decimal',
    Percentage = 'Percentage',
    Boolean = 'Boolean',
    Date = 'Date',
    Time = 'Time',
    Datetime = 'Datetime',
}
export const arrFormatType: string[] = [
    'Text',
    'Number',
    'Decimal',
    'Percentage',
    'Boolean',
    'Date',
    'Time',
    'Datetime',
]

export enum WikiType {
    Wiki = 'Wiki',
    University = 'University',
    Regulation = 'Regulation',
    Artefact = 'Artefact',
}
export const arrWikiType: string[] = [
    'Wiki',
    'University',
    'Regulation',
    'Artefact',
]

/*#endregion ****************************** *****************************************************************************/

/*#region Search *******************************************************************************************************/
//Note that work is needed to align this section with the GraphQL Schema 

export interface IFacetCounts {
    Idiom: number
    Domain: number
    Data_Element: number
    System: number
    Report: number
    Dataset: number
    Attribute: number
    Control: number
    Organization: number
    Product: number
    Project: number
    Person: number
    List: number
    Collection: number
    Regulation: number
    Page: number
    Artefact: number
    Course: number

}

export interface IFacetSearch {
    searchResults: [Facet]
    searchConnections: [Facet]
}
export interface ISearchFacet {
    searchResults: [Facet]
    searchConnections: [Facet]
}

export interface ISearchSummary {
    search: [ISearchSummaryResult]
    connections: [ISearchSummaryResult]
}

export interface ISearchSummaryResult {
    facet: string
    count: number
}

export interface ISearchBase {
    searchCriteria: string,
    searchFacet: string,
    searchContext: string,
    aux: string,
    depth: string,
    returnType: string,
    orderBy: string,
    offset: number,
    first: number,
}

export interface ISearchCriterion extends ISearchBase {
    searchValuePlaceholder?: string
}

export interface ISearchFacetPayload extends ISearchBase {
    tenantDomain: string,
}

/*#endregion ***********************************************************************************************************/

/*#region Graph ***************************************************************************************************************/

export interface MapGraph {
    metadata: Metadata
    nodes: [Facet]
    edges: [Edge]
}

export interface Edge {
    sourceId: string
    sourceName: string
    sourceType: string
    sourceLabel: string
    edgeId: string
    edgeType: string
    edgeStatus: string
    directed: string
    targetId: string
    targetName: string
    targetType: string
    targetLabel: string
}

export interface Metadata {
    countEdges: number
    countNodes: number
}
/*#endregion ***********************************************************************************************************/

/*#region Stats ********************************************************************************************************/

export interface StatFacetCounts {
    facet: FacetLabel
    type: FacetType
    count: number
    created: Date
}

/*#endregion ***********************************************************************************************************/

/*#region Edges ********************************************************************************************************/

export enum EdgeDirection {
    Incoming = 'Incoming',
    Outgoing = 'Outgoing',
}

export enum EdgeType {
    //General
    HAS_CHILD = 'HAS_CHILD',
    HAS_ACRONYM = 'HAS_ACRONYM',
    //Domain
    DOMAIN_CONTAINS = 'DOMAIN_CONTAINS',
    //Person
    ROLE_OWNER = 'ROLE_OWNER',
    ROLE_STEWARD = 'ROLE_STEWARD',
    ROLE_CUSTODIAN = 'ROLE_CUSTODIAN',
    IS_PART_OF_ORGANIZATION = 'IS_PART_OF_ORGANIZATION',
    HAS_COMPLETED_COURSE = 'HAS_COMPLETED_COURSE',
    IS_WORKING_ON_PROJECT = 'IS_WORKING_ON_PROJECT',
    PERSON_MAINTAINS_ARTEFACT = 'PERSON_MAINTAINS_ARTEFACT',
    //Regulation
    REGULATION_IS_RELATED_TO = 'REGULATION_IS_RELATED_TO',
    REGULATION_GOVERNS_USAGE_OF = 'REGULATION_GOVERNS_USAGE_OF',
    REGULATION_IMPLEMENTED_VIA = 'REGULATION_IMPLEMENTED_VIA',
    //System
    SYSTEM_IS_MASTER_SOURCE_FOR = 'SYSTEM_IS_MASTER_SOURCE_FOR',
    //Organization
    ORGANIZATION_MANAGES_ASSET = 'ORGANIZATION_MANAGES_ASSET',
    //Dataset
    DATASET_IS_DEPENDENT_ON = 'DATASET_IS_DEPENDENT_ON',
    DATASET_IS_A_DEPENDENT_OF_DATASET = 'DATASET_IS_A_DEPENDENT_OF_DATASET',
    //Glossary Term
    IDIOM_IS_RELATED_TO = 'IDIOM_IS_RELATED_TO',
    //Project
    PROJECT_IMPACTS = 'PROJECT_IMPACTS',
    //List
    CLASSIFIES = 'CLASSIFIES',
    //Data Element
    DATA_ELEMENT_IS_IMPLEMENTED_VIA = 'DATA_ELEMENT_IS_IMPLEMENTED_VIA',
    //Control
    CONTROLS = 'CONTROLS',
    //Lineage
    ATTRIBUTE_PROVIDES_DATA_TO_ATTRIBUTE = 'ATTRIBUTE_PROVIDES_DATA_TO_ATTRIBUTE',

    //Archive
    IS_RELATED_TO = 'IS_RELATED_TO',
    IS_MADE_UP_OF = 'IS_MADE_UP_OF',
    IMPACTS = 'IMPACTS',
    IS_IMPLEMENTED_VIA = 'IS_IMPLEMENTED_VIA',


}

export interface FacetEdgeDetails {
    facetId: string
    facetName: string
    facetLabel: FacetLabel
    facetType: FacetType
    facetDescription: string
    relatedFacetId: string
    relatedFacetName: string
    relatedFacetLabel: FacetLabel
    relatedFacetType: FacetType
    relatedFacetDescription: string
    edgeId: string
    edgeType: EdgeType
    edgeDirection: EdgeDirection
}
export interface IFacetEdgeDetails {
    facetId: string
    facetName: string,
    facetLabel: FacetLabel,
    facetType: FacetType,
    facetDescription: string,
    relatedFacetId: string
    relatedFacetName: string,
    relatedFacetLabel: FacetLabel,
    relatedFacetType: FacetType,
    relatedFacetDescription: string,
    edgeId: string,
    edgeType: EdgeType,
    edgeDirection: EdgeDirection,
}


export interface AddRemoveEdge {
    parentId: string
    parentName: string
    parentLabel: FacetLabel
    childId: string
    childName: string
    childLabel: FacetLabel
    edgeId: string
    edgeType: EdgeType
    edgeIsAcive: boolean
}


/*#endregion ***********************************************************************************************************/

/*#region Shared ******************************************************************************************************/

export enum ReturnType {
    Flat = 'Flat',
    Tree = 'Tree',
}
export const arrReturnType: string[] = [
    'Flat',
    'Tree',
]

export interface CreateModify {
    userName: string
    userId: string
    dateTime: string
}

export enum BooleanYesNo {
    true = 'Yes',
    false = 'No',
}
/*#endregion ***********************************************************************************************************/

/*#region Magic ******************************************************************************************************/




export const arrFacetLabelType: FacetLabelType[] = [
    {
        facet: FacetLabel.Idiom,
        type: [
            FacetType.Entity,
            FacetType.Term
        ]
    },
    {
        facet: FacetLabel.Data_Element,
        type: [
            FacetType.Data_Element
        ]
    },
    {
        facet: FacetLabel.System,
        type: [
            FacetType.System,
            FacetType.Database,
            FacetType.Database_Schema,
        ]
    },
    {
        facet: FacetLabel.Dataset,
        type: [
            FacetType.Table,
            FacetType.Dataset,
            FacetType.View,
            FacetType.Excel_Workbook,
            FacetType.Flat_File,
            FacetType.Tableau_Dataset,
        ]
    },
    {
        facet: FacetLabel.Report,
        type: [
            FacetType.Report,
            FacetType.Regulatory_Report,
            FacetType.Tableau_Project,
            FacetType.Tableau_Workbook,
            FacetType.Tableau_Dashboard,
            FacetType.Tableau_Report,
        ]
    },
    {
        facet: FacetLabel.Attribute,
        type: [
            FacetType.Attribute,
            FacetType.Column,
            FacetType.Field,
            FacetType.Metric,
            FacetType.Dimension,
            FacetType.Report_Attribute,
            FacetType.View_Column,
            FacetType.Tableau_Dimension,
            FacetType.Tableau_Measure,
            FacetType.Tableau_Attribute,
        ]
    },
    {
        facet: FacetLabel.Control,
        type: [
            FacetType.Data_Quality_Control,
            FacetType.Reconciliation,
            FacetType.Validation_Control,
        ]
    },
    {
        facet: FacetLabel.Organization,
        type: [
            FacetType.Company,
            FacetType.Organization,
            FacetType.Department,
            FacetType.Group,
            FacetType.Vendor,
        ]
    },
    {
        facet: FacetLabel.Product,
        type: [
            FacetType.Product,
            FacetType.Service,
        ]
    },
    {
        facet: FacetLabel.Project,
        type: [
            FacetType.Project,
            FacetType.Project_Page,
        ]
    },
    {
        facet: FacetLabel.List,
        type: [
            FacetType.Code_Set,
            FacetType.Code_Value,
            FacetType.List,
            FacetType.List_Item,
        ]
    },
    {
        facet: FacetLabel.Person,
        type: [
            FacetType.Person,
        ]
    },
    {
        facet: FacetLabel.Collection,
        type: [
            FacetType.Collection,
        ]
    },
    {
        facet: FacetLabel.Regulation,
        type: [
            FacetType.Regulation,
        ]
    },
    {
        facet: FacetLabel.Page,
        type: [
            FacetType.Page,
        ]
    },
    {
        facet: FacetLabel.Artefact,
        type: [
            FacetType.Artefact,
            FacetType.Artefact_Section,
        ]
    },
    {
        facet: FacetLabel.Course,
        type: [
            FacetType.Course,
            FacetType.Course_Page,
        ]
    },
    {
        facet: FacetLabel.Domain,
        type: [
            FacetType.Domain
        ]
    }
]
export interface FacetLabelType {
    facet: FacetLabel,
    type: FacetType[],
}

export const arrFacetDisplayFields: FacetDisplayFields[] = [
    {
        facet: FacetLabel.Idiom,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: true,
            example: true,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: true,
        },
        parentLabel: FacetLabel.Idiom,

    },
    {
        facet: FacetLabel.Data_Element,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: true,
            example: true,
            dataElementDetails: true,
            securityDetails: true,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: true,
        },
        parentLabel: FacetLabel.Idiom
    },
    {
        facet: FacetLabel.System,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: true,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Data_Element
    },
    {
        facet: FacetLabel.Dataset,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: true,
            dataElementDetails: false,
            securityDetails: true,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.System
    },
    {
        facet: FacetLabel.Report,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: true,
            dataElementDetails: false,
            securityDetails: true,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Report
    },
    {
        facet: FacetLabel.Attribute,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: true,
            example: true,
            dataElementDetails: true,
            securityDetails: true,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Dataset
    },

    {
        facet: FacetLabel.List,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.List
    },

    {
        facet: FacetLabel.Control,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: true,
            example: true,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: true,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Control
    },

    {
        facet: FacetLabel.Organization,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Organization
    },

    {
        facet: FacetLabel.Project,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: true,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Project
    },

    {
        facet: FacetLabel.Person,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Person
    },

    {
        facet: FacetLabel.Collection,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Collection
    },
    {
        facet: FacetLabel.Regulation,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: true,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Regulation
    },
    {
        facet: FacetLabel.Artefact,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: true,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Artefact
    },
    {
        facet: FacetLabel.Page,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: true,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Page
    },
    {
        facet: FacetLabel.Course,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: true,
            showDomain: true,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Course
    },
    {
        facet: FacetLabel.Domain,
        fields: {
            basicDetails: true,
            additionalDetails: true,
            businessLogic: false,
            example: false,
            dataElementDetails: false,
            securityDetails: false,
            controlDetails: false,
            wikiWorkspace: false,
            showDomain: false,
            requireDomain: false,
        },
        parentLabel: FacetLabel.Domain
    }
]
export interface FacetDisplayFields {
    facet: FacetLabel,
    fields: any[string],
    parentLabel:FacetLabel
}



export enum Permission {
    APP_ADMIN = 'app-admin',
    TENANT_ADMIN = 'tenant-admin',
    TENANT_CERTIFY = 'tenant-certify',
    TENANT_WRITE = 'tenant-write',
    TENANT_READ = 'view:facets',


    view_facets = 'view:facets',
    create_facets = 'create:facets',
    create_technical_facets = 'create:technical_facets',
    create_business_facets = 'create:business_facets',
    create_connections = 'create:connections',
    archive_connections = 'archive:connections',
    archive_facets = 'archive:facets',
    approve_data_office_facets ='approve:data_office_facets',
    manage_domains = 'manage:domains',

}

export const arrPermission: string[] = [

    'view_facets',
    'create:facets',
    'create:technical_facets',
    'create:business_facets',
    'create:connections',
    'archive:connections',
    'archive:facets',
    'approve:data_office_facets',
    'manage:domains',


]


export const arrFacetEdges: FacetEdge[] = [

    /*#region Domain */
    {
        headFacetLabel: FacetLabel.Domain,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Domain,
        edgeDisplayOutgoing: "has child domain",
        edgeDisplayIncoming: "has parent domain",
        permissions:[Permission.manage_domains]
    },
    {
        headFacetLabel: FacetLabel.Domain,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Domain,
        edgeDisplayOutgoing: "has parent domain",
        edgeDisplayIncoming: "has child domain",
        permissions:[Permission.manage_domains]
    },
    {
        headFacetLabel: FacetLabel.Domain,
        edgeType: EdgeType.DOMAIN_CONTAINS,
        tailFacetLabel: FacetLabel.Idiom,
        edgeDisplayOutgoing: "contains glossary term",
        edgeDisplayIncoming: "is part of domain",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Domain,
        edgeType: EdgeType.DOMAIN_CONTAINS,
        tailFacetLabel: FacetLabel.Data_Element,
        edgeDisplayOutgoing: "contains data element",
        edgeDisplayIncoming: "is part of domain",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Domain,
        edgeType: EdgeType.DOMAIN_CONTAINS,
        tailFacetLabel: FacetLabel.Dataset,
        edgeDisplayOutgoing: "contains dataset",
        edgeDisplayIncoming: "is part of domain",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Domain,
        edgeType: EdgeType.DOMAIN_CONTAINS,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "contains attribute",
        edgeDisplayIncoming: "is part of domain",
        permissions:[]
    },
    /*#endregion */

    /*#region Person */
    //Stewardship - Owner
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.ROLE_OWNER,
        tailFacetLabel: FacetLabel.Domain,
        edgeDisplayOutgoing: "is trustee of domain",
        edgeDisplayIncoming: "has person as trustee",
        permissions:[Permission.manage_domains]
    },
    //Stewardship - Steward
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.ROLE_STEWARD,
        tailFacetLabel: FacetLabel.Domain,
        edgeDisplayOutgoing: "is a steward of domain",
        edgeDisplayIncoming: "has person as steward",
        permissions:[Permission.manage_domains]
    },
    //Stewardship - Custodian
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.ROLE_CUSTODIAN,
        tailFacetLabel: FacetLabel.Domain,
        edgeDisplayOutgoing: "is a custodian of domain",
        edgeDisplayIncoming: "has person as custodian",
        permissions:[Permission.manage_domains]
    },
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.ROLE_CUSTODIAN,
        tailFacetLabel: FacetLabel.System,
        edgeDisplayOutgoing: "is a custodian of system",
        edgeDisplayIncoming: "has person as custodian",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.IS_PART_OF_ORGANIZATION,
        tailFacetLabel: FacetLabel.Organization,
        edgeDisplayOutgoing: "is part of organization",
        edgeDisplayIncoming: "includes person",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.HAS_COMPLETED_COURSE,
        tailFacetLabel: FacetLabel.Course,
        edgeDisplayOutgoing: "has completed course",
        edgeDisplayIncoming: "has been completed by",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.IS_WORKING_ON_PROJECT,
        tailFacetLabel: FacetLabel.Project,
        edgeDisplayOutgoing: "is working on project",
        edgeDisplayIncoming: "has person working on",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Person,
        edgeType: EdgeType.PERSON_MAINTAINS_ARTEFACT,
        tailFacetLabel: FacetLabel.Artefact,
        edgeDisplayOutgoing: "maintains artefact",
        edgeDisplayIncoming: "is maintained by person",
        permissions:[]
    },

    /*#endregion */

    /*#region Regulation */
    {
        headFacetLabel: FacetLabel.Regulation,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Regulation,
        edgeDisplayOutgoing: "has sub section",
        edgeDisplayIncoming: "is part of regulation",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Regulation,
        edgeType: EdgeType.REGULATION_IS_RELATED_TO,
        tailFacetLabel: FacetLabel.Artefact,
        edgeDisplayOutgoing: "is related to artefact",
        edgeDisplayIncoming: "is related to regulation",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Regulation,
        edgeType: EdgeType.REGULATION_GOVERNS_USAGE_OF,
        tailFacetLabel: FacetLabel.Dataset,
        edgeDisplayOutgoing: "governs dataset",
        edgeDisplayIncoming: "is governed by regulation",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Regulation,
        edgeType: EdgeType.REGULATION_IMPLEMENTED_VIA,
        tailFacetLabel: FacetLabel.Artefact,
        edgeDisplayOutgoing: "implemented via artefact",
        edgeDisplayIncoming: "implements regulation",
        permissions:[]
    },
    /*#endregion */

    /*#region System */
    {
        headFacetLabel: FacetLabel.System,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Dataset,
        edgeDisplayOutgoing: "contains dataset",
        edgeDisplayIncoming: "is contained in system",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.System,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Report,
        edgeDisplayOutgoing: "contains report",
        edgeDisplayIncoming: "is contained in system",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.System,
        edgeType: EdgeType.SYSTEM_IS_MASTER_SOURCE_FOR,
        tailFacetLabel: FacetLabel.Domain,
        edgeDisplayOutgoing: "is master source for domain",
        edgeDisplayIncoming: "is mastered in system",
        permissions:[]
    },
    /*#endregion */

    /*#region Glossary Term */
    {
        headFacetLabel: FacetLabel.Idiom,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Idiom,
        edgeDisplayOutgoing: "has child glossary term",
        edgeDisplayIncoming: "is child of glossary term",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Idiom,
        edgeType: EdgeType.HAS_ACRONYM,
        tailFacetLabel: FacetLabel.Idiom,
        edgeDisplayOutgoing: "has glossary term as acronym",
        edgeDisplayIncoming: "is acronym of glossary term",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Idiom,
        edgeType: EdgeType.IDIOM_IS_RELATED_TO,
        tailFacetLabel: FacetLabel.Idiom,
        edgeDisplayOutgoing: "is related to glossary term",
        edgeDisplayIncoming: "is related to glossary term",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Idiom,
        edgeType: EdgeType.IDIOM_IS_RELATED_TO,
        tailFacetLabel: FacetLabel.Data_Element,
        edgeDisplayOutgoing: "is related to data element",
        edgeDisplayIncoming: "is related to glossary term",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Idiom,
        edgeType: EdgeType.IDIOM_IS_RELATED_TO,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "is related to attribute",
        edgeDisplayIncoming: "is related to glossary term",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Idiom,
        edgeType: EdgeType.IDIOM_IS_RELATED_TO,
        tailFacetLabel: FacetLabel.Dataset,
        edgeDisplayOutgoing: "is related to dataset",
        edgeDisplayIncoming: "is related to glossary term",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Idiom,
        edgeType: EdgeType.IDIOM_IS_RELATED_TO,
        tailFacetLabel: FacetLabel.System,
        edgeDisplayOutgoing: "is related to system",
        edgeDisplayIncoming: "is related to glossary term",
        permissions:[]
    },
    /*#endregion */

    /*#region Project */
    {
        headFacetLabel: FacetLabel.Project,
        edgeType: EdgeType.PROJECT_IMPACTS,
        tailFacetLabel: FacetLabel.System,
        edgeDisplayOutgoing: "impacts system",
        edgeDisplayIncoming: "is impacted by project",
        permissions:[]
    },
    /*#endregion */

    /*#region Report */
    {
        headFacetLabel: FacetLabel.Report,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Report,
        edgeDisplayOutgoing: "has sub report",
        edgeDisplayIncoming: "is part overall report",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Report,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "contains attribute",
        edgeDisplayIncoming: "is contained in report",
        permissions:[]
    },
    /*#endregion */

    /*#region Dataset */
    {
        headFacetLabel: FacetLabel.Dataset,
        edgeType: EdgeType.DATASET_IS_DEPENDENT_ON,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "depends on attribute",
        edgeDisplayIncoming: "is an input to dataset",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Dataset,
        edgeType: EdgeType.DATASET_IS_A_DEPENDENT_OF_DATASET,
        tailFacetLabel: FacetLabel.Dataset,
        edgeDisplayOutgoing: "dataset is a dependent of dataset",
        edgeDisplayIncoming: "dataset depends on dataset",
        permissions:[]
    },
    /*#endregion */

    /*#region Report */
    {
        headFacetLabel: FacetLabel.Dataset,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "contains attribute",
        edgeDisplayIncoming: "is contained in dataset",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Dataset,
        edgeType: EdgeType.DATASET_IS_DEPENDENT_ON,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "depends on attribute",
        edgeDisplayIncoming: "is an input to dataset",
        permissions:[]
    },
    /*#endregion */

    /*#region List */
    {
        headFacetLabel: FacetLabel.List,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.List,
        edgeDisplayOutgoing: "has sub list item",
        edgeDisplayIncoming: "is part of list",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.List,
        edgeType: EdgeType.CLASSIFIES,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "classifies attribute",
        edgeDisplayIncoming: "is classified by list",
        permissions:[]
    },
    /*#endregion */

    /*#region Page */
    {
        headFacetLabel: FacetLabel.Page,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Page,
        edgeDisplayOutgoing: "has sub page",
        edgeDisplayIncoming: "is parent page of",
        permissions:[]
    },
    /*#endregion */

    /*#region Control */
    {
        headFacetLabel: FacetLabel.Control,
        edgeType: EdgeType.CONTROLS,
        tailFacetLabel: FacetLabel.Dataset,
        edgeDisplayOutgoing: "controls dataset",
        edgeDisplayIncoming: "is controlled by control",
        permissions:[]
    },
    //Control
    {
        headFacetLabel: FacetLabel.Control,
        edgeType: EdgeType.CONTROLS,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "controls attribute",
        edgeDisplayIncoming: "is controlled by control",
        permissions:[]
    },
    /*#endregion */

    /*#region Organization */
    {
        headFacetLabel: FacetLabel.Organization,
        edgeType: EdgeType.HAS_CHILD,
        tailFacetLabel: FacetLabel.Organization,
        edgeDisplayOutgoing: "is made up of organization",
        edgeDisplayIncoming: "is part of organization",
        permissions:[]
    },
    {
        headFacetLabel: FacetLabel.Organization,
        edgeType: EdgeType.ORGANIZATION_MANAGES_ASSET,
        tailFacetLabel: FacetLabel.System,
        edgeDisplayOutgoing: "manages system",
        edgeDisplayIncoming: "is managed by organization",
        permissions:[]
    },
    /*#endregion */

    /*#region Data Element */
    {
        headFacetLabel: FacetLabel.Data_Element,
        edgeType: EdgeType.DATA_ELEMENT_IS_IMPLEMENTED_VIA,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "is implemented via attribute",
        edgeDisplayIncoming: "implements data element",
        permissions:[]
    },
    /*#endregion */

    /*#region Attribute */
    {
        headFacetLabel: FacetLabel.Attribute,
        edgeType: EdgeType.ATTRIBUTE_PROVIDES_DATA_TO_ATTRIBUTE,
        tailFacetLabel: FacetLabel.Attribute,
        edgeDisplayOutgoing: "provides data to downstream attribute",
        edgeDisplayIncoming: "sources data from upstream attribute",
        permissions:[]
    },
    /*#endregion */

]

export interface FacetEdge {
    headFacetLabel: FacetLabel,
    tailFacetLabel: FacetLabel,
    edgeDisplayOutgoing: string,
    edgeDisplayIncoming: string,
    edgeType: EdgeType,
    permissions:Permission[]
}


/*#endregion ***********************************************************************************************************/

/*#region Front End  ******************************************************************************************************/

export interface IFacetTabValues {
    facet: string;
    details: IFacetTabValueDetails
}

interface IFacetTabValueDetails {
    title: string;
    active?: boolean;
    totalCount?: number;
    resultCount?: number;
}

/*#endregion ***********************************************************************************************************/

/*#region User & Organization ******************************************************************************************/
export interface UserScore {
    name: string
    score: number
}

export interface User {
    id: string
    tenant: string
    email: string
}

export interface AuthUser extends User {
    permissions: Permission[]
}

export interface Tenant {
    id: string
    name: string
    tenantDomain: string
    firstCreated: string
}

export interface UserTenantPerson {
    tenant: Tenant
    user: User
    person: Facet
}


export interface EarlyAccessRequest {
    email: String
    firstCreated: String
}



/*#region Wiki */

export interface IWikiSetup {
    facet: FacetLabel,
    options: IWikiOptions,
}

export interface IWikiOptions {
    label: FacetLabel,
    subType: FacetType,
    lifecycle: FacetLifecycle
}

export const WikiOptions: IWikiSetup[] = [
    {
        facet: FacetLabel.Regulation,
        options: {
            label: FacetLabel.Regulation,
            subType: FacetType.Regulation_Section,
            lifecycle: FacetLifecycle.Published
        }
    },
    {
        facet: FacetLabel.Project,
        options: {
            label: FacetLabel.Project,
            subType: FacetType.Project_Page,
            lifecycle: FacetLifecycle.Published
        }
    },
    {
        facet: FacetLabel.Page,
        options: {
            label: FacetLabel.Page,
            subType: FacetType.Page,
            lifecycle: FacetLifecycle.Published
        }
    },
    {
        facet: FacetLabel.Artefact,
        options: {
            label: FacetLabel.Artefact,
            subType: FacetType.Artefact_Section,
            lifecycle: FacetLifecycle.Published
        }
    },
    {
        facet: FacetLabel.Course,
        options: {
            label: FacetLabel.Course,
            subType: FacetType.Course_Page,
            lifecycle: FacetLifecycle.Published
        }
    }
]

/*#endregion */

/*#region stewardship*/
export enum Role {
    Citizen = 'Citizen',
    Contributor = 'Contributor',
    Custodian = 'Custodian',
    Steward = 'Steward',
    Owner = 'Owner',
    Evangelist = 'Evangelist',
    Mayor = 'Mayor',
}

export const arrRole: string[] = [
    'Citizen',
    'Contributor',
    'Custodian',
    'Steward',
    'Owner',
    'Evangelist',
    'Mayor',
]

export enum StewardshipModel {
    Business = 'Business', //Term, Data Element, Report [Proposed - Draft - Published - Approved]
    Technical = 'Technical', //System, Dataset, Attribute, Ref Data, Controls [Draft - Published]
    Custodian = 'Basic', //Organization, Person, Project, Page, Regulation, Course [Draft - Published]
    Data_Officer = 'Data_Officer', //Artefact, Domain [Proposed - Draft - Published - Approved]
}

export const arrStewardshipModel: string[] = [
    'Business',
    'Technical',
    'Basic',
    'Data_Officer',
]
/*#endregion */