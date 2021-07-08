import { FacetType, FacetSubType, ConnectionType } from '@gql/schema'

export interface IFacetTypesSubTypes {
    type: FacetType,
    subType: FacetSubType[],
}

export interface iConnection {
    headType: FacetType,
    connection: ConnectionType
    tailType: FacetType,
    display: string,
    displayAlternative: string,
}

export interface FacetDisplayFields {
    facet: FacetType,
    fields: any[string],
    parentLabel: FacetType[],
    defaultSubType: FacetSubType

}


export const arrFacetType: string[] = [
    'Knowledge_Area',
    'Element',
    'Report',
    'System',
    'Table',
    'Attribute',
    'Stakeholder',
    'Control',
    'Artefact',
]

export const arrFacetStatus: string[] = [
    'Draft',
    'Published'
]

export const arrFacetTypeSubType: IFacetTypesSubTypes[] = [
    {
        type: FacetType.KnowledgeArea,
        subType: [
            FacetSubType.KnowledgeArea,
        ]
    }, {
        type: FacetType.Element,
        subType: [
            FacetSubType.BusinessTerm,
            FacetSubType.Metric,
            FacetSubType.KeyPerformanceIndicator,
        ]
    }, {
        type: FacetType.Report,
        subType: [
            FacetSubType.Report,
            FacetSubType.RegulatoryReport,
        ]
    }, {
        type: FacetType.System,
        subType: [
            FacetSubType.System,
        ]
    }, {
        type: FacetType.Table,
        subType: [
            FacetSubType.Table,
            FacetSubType.File,
            FacetSubType.Json,
            FacetSubType.Xml,
        ]
    }, {
        type: FacetType.Attribute,
        subType: [
            FacetSubType.ReportAttribute,
            FacetSubType.Column,
            FacetSubType.Field,
        ]
    }, {
        type: FacetType.Stakeholder,
        subType: [
            FacetSubType.Person,
        ]
    }, {
        type: FacetType.Artefact,
        subType: [
            FacetSubType.Policy,
            FacetSubType.Guideline,
            FacetSubType.Wiki,
            FacetSubType.Training
        ]
    },
]

export const arrFacetConnections: iConnection[] = [

    {
        headType: FacetType.Control,
        connection: ConnectionType.CtrlControls,
        tailType: FacetType.Report,
        display: "controls report",
        displayAlternative: "is controlled by control",
    },
    {
        headType: FacetType.Stakeholder,
        connection: ConnectionType.RoleOwner,
        tailType: FacetType.KnowledgeArea,
        display: "is data owner for knowledge area",
        displayAlternative: "is owned by stakeholder",
    },
    {
        headType: FacetType.Stakeholder,
        connection: ConnectionType.RoleSteward,
        tailType: FacetType.KnowledgeArea,
        display: "is steward for knowledge area",
        displayAlternative: "is stewarded by stakeholder",
    },
    {
        headType: FacetType.Stakeholder,
        connection: ConnectionType.RoleCustodian,
        tailType: FacetType.KnowledgeArea,
        display: "is the custodian for knowledge area",
        displayAlternative: "is managed by custodian",
    },

    {
        headType: FacetType.Stakeholder,
        connection: ConnectionType.StakeholderIsSmeForReport,
        tailType: FacetType.Report,
        display: "stakeholder is an SME for report",
        displayAlternative: "report has stakeholder as SME",
    },
    {
        headType: FacetType.Stakeholder,
        connection: ConnectionType.StakeholderIsSmeForSystem,
        tailType: FacetType.System,
        display: "stakeholder is an SME for system",
        displayAlternative: "system has stakeholder as SME",
    },

    {
        headType: FacetType.Element,
        connection: ConnectionType.ElementIsRelatedTo,
        tailType: FacetType.Element,
        display: "is related to",
        displayAlternative: "is related to element",
    },
    //Element


    /*#region redundant*/
    /*
        {
        headType: FacetType.Element,
        connection: ConnectionType.ElementIsImplementedVia,
        tailType: FacetType.Attribute,
        display: "is implemented via attribute",
        displayAlternative: "implements element",
    },
    {
        headType: FacetType.KnowledgeArea,
        connection: ConnectionType.KaContains,
        tailType: FacetType.Element,
        display: "knowledge area contains",
        displayAlternative: "is part of knowledge area",
    },
    {
        headType: FacetType.KnowledgeArea,
        connection: ConnectionType.KaContains,
        tailType: FacetType.Report,
        display: "knowledge area contains",
        displayAlternative: "is part of knowledge area",
    },
    {
        headType: FacetType.KnowledgeArea,
        connection: ConnectionType.KaContains,
        tailType: FacetType.System,
        display: "knowledge area contains",
        displayAlternative: "is part of knowledge area",
    },
    {
        headType: FacetType.KnowledgeArea,
        connection: ConnectionType.KaContains,
        tailType: FacetType.Stakeholder,
        display: "knowledge area contains",
        displayAlternative: "is part of knowledge area",
    },
    {
        headType: FacetType.KnowledgeArea,
        connection: ConnectionType.KaContains,
        tailType: FacetType.Control,
        display: "knowledge area contains",
        displayAlternative: "is part of knowledge area",
    },
    {
        headType: FacetType.KnowledgeArea,
        connection: ConnectionType.KaContains,
        tailType: FacetType.Artefact,
        display: "knowledge area contains",
        displayAlternative: "is part of knowledge area",
    },
    {
        headType: FacetType.KnowledgeArea,
        connection: ConnectionType.HasChild,
        tailType: FacetType.KnowledgeArea,
        display: "has child",
        displayAlternative: "has parent",
    },
    {
        headType: FacetType.Element,
        connection: ConnectionType.HasChild,
        tailType: FacetType.Element,
        display: "has child",
        displayAlternative: "has parent",
    },
    {
        headType: FacetType.Report,
        connection: ConnectionType.HasChild,
        tailType: FacetType.Report,
        display: "has child",
        displayAlternative: "has parent",
    },
    {
        headType: FacetType.System,
        connection: ConnectionType.HasChild,
        tailType: FacetType.System,
        display: "has child",
        displayAlternative: "has parent",
    },
    {
        headType: FacetType.Stakeholder,
        connection: ConnectionType.HasChild,
        tailType: FacetType.Stakeholder,
        display: "has child",
        displayAlternative: "has parent",
    },
    {
        headType: FacetType.Control,
        connection: ConnectionType.HasChild,
        tailType: FacetType.Control,
        display: "has child",
        displayAlternative: "has parent",
    },
    {
        headType: FacetType.Artefact,
        connection: ConnectionType.HasChild,
        tailType: FacetType.Artefact,
        display: "has child",
        displayAlternative: "has parent",
    }
    */
    /*#endregion*/
]

export const arrFacetDisplayFields: FacetDisplayFields[] = [
    {
        facet: FacetType.KnowledgeArea,
        fields: {
            knowledgeArea: false,
        },
        parentLabel: [FacetType.KnowledgeArea],
        defaultSubType: FacetSubType.KnowledgeArea,

    },
    {
        facet: FacetType.Element,
        fields: {
            knowledgeArea: true,
            acronym: true,
            synonym: true,
            validValue: true,
            format:true,
            pii: true,
            securityClassification:true,
            key:true,
            keyReason:false,
        },
        parentLabel: [FacetType.Element],
        defaultSubType: FacetSubType.BusinessTerm,
    },
    {
        facet: FacetType.Report,
        fields: {
            knowledgeArea: true,
            pii: false,
            securityClassification:false,
            key:true,
            keyReason:false,
            accessGuidelines: true,
        },
        parentLabel: [FacetType.Report],
        defaultSubType: FacetSubType.Report,
    },
    {
        facet: FacetType.System,
        fields: {
            knowledgeArea: true,
        },
        parentLabel: [FacetType.System],
        defaultSubType: FacetSubType.System,
    },
    {
        facet: FacetType.Table,
        fields: {
            knowledgeArea: true,
        },
        parentLabel: [FacetType.System],
        defaultSubType: FacetSubType.Table,
    },{
        facet: FacetType.Attribute,
        fields: {
            knowledgeArea: false,
            relatedElement: true,
            validValue: true,
            primaryKey: true,
            format: true,
            dataType: true,
            pii: true,
            securityClassification: true,
        },
        parentLabel: [FacetType.Table, FacetType.Report],
        defaultSubType: FacetSubType.Column,
    },
    {
        facet: FacetType.Control,
        fields: {
            knowledgeArea: true,
        },
        parentLabel: [FacetType.Control],
        defaultSubType: FacetSubType.Control,
    },
    {
        facet: FacetType.Stakeholder,
        fields: {
            knowledgeArea: false,
            stakeholderDetail: true,
        },
        parentLabel: [FacetType.Stakeholder],
        defaultSubType: FacetSubType.Person,
    },
    {
        facet: FacetType.Artefact,
        fields: {
            knowledgeArea: true,
        },
        parentLabel: [FacetType.Artefact],
        defaultSubType: FacetSubType.Wiki,
    }
]