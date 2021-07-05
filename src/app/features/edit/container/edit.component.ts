import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/core.module';
import { routeAnimations, NotificationService } from '@core/core.module';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { SidebarService } from '../../../services/sidebar.service';

import { Observable, Subject } from 'rxjs';
import { debounceTime, tap, switchMap, finalize, filter, take, takeUntil } from 'rxjs/operators';

//Graphql Support
import { UpsertFacetGQL, FacetGQL, CreateConnectionGQL, DeleteConnectionGQL, ConnectionGQL, ConnectionDocument, FacetSnippetDocument, Connection, DeleteFacetGQL } from '@app/graphql/schema'
import { FacetType, FacetSubType, FacetStatus, ConnectionType, Format, SecurityClassification } from '@app/graphql/schema'
import { arrFacetTypeSubType, IFacetTypesSubTypes, arrFacetConnections, iConnection } from '@gql/master'

//Utility
import { toCamelCase } from '@shared/utility/toCamelCase'

import { arrFacetDisplayFields, FacetDisplayFields } from '@gql/master'

@Component({
  selector: 'n4-facet-view',
  templateUrl: './edit.component.html',
  styleUrls: ['../edit.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditFacetComponent implements OnInit {

  //Connections Table
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isSmallDevice$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map((result) => result.matches));

  //Connections & Connections Table
  paginator: MatPaginator;
  sort: MatSort;
  dataSource: MatTableDataSource<Connection> = new MatTableDataSource<Connection>();
  displayedColumns: string[] = this.isSmallDevice$ ? ['id', 'display', 'toType', 'toName'] : ['id', 'fromName', 'fromType', 'display', 'toType', 'toName'];
  obs: Observable<any>;
  possibleConnections: iConnection[];
  groupConnectionsByType: any;
  chipControl = new FormControl(new Set());

  //General
  private readonly unsubscribe = new Subject<void>();
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tabIndex: number = 0
  overviewTitle: string = "";

  //Facet
  facetId: string;
  facetName: string;
  facetType: FacetType = null;
  facetDisplayFields: FacetDisplayFields;

  //Wiki
  wiki: string

  //Graphql Types
  oFacetType = FacetType;
  oFacetTypesSubTypes: IFacetTypesSubTypes;
  oFacetStatus = FacetStatus;
  oFormat = Format;
  oSecurityClassification = SecurityClassification;

  //AC Connections
  acConnIsLoading = false;
  acConnFilteredFacets: any;
  knowledgeAreaPlaceholder: String = ""
  acKAIsLoading = false;
  acKAFilteredFacets: any;
  parentPlaceholder: String = ""
  acParentIsLoading = false;
  acParentFilteredFacets: any;

  relatedElementPlaceholder: String = ""
  acREIsLoading = false;
  acREFilteredFacets: any;



  constructor(
    private breakpointObserver: BreakpointObserver,
    private upsertFacetGQL: UpsertFacetGQL,
    private createConnectionGQL: CreateConnectionGQL,
    private facetGQL: FacetGQL,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private connectionGQL: ConnectionGQL,
    private deleteConnectionGQL: DeleteConnectionGQL,
    private changeDetectorRef: ChangeDetectorRef,
    private sidebarService: SidebarService,
    private deleteFacetGQL: DeleteFacetGQL

  ) { }

  ngOnInit() {

    this.sidebarService.hideHamburger()

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.setInitialValues(params.id)
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.dataSource.sort = this.sort;
        this.loadConnections(params.id)

        this.activatedRoute.queryParams.subscribe(params => {
          if (params.tabIndex) {
            this.tabIndex = params.tabIndex;
          }
        })
      }
      else if (params.type) {
        this.setFacetSpecificValues(params.type)
      }
      else {
        this.router.navigate(['/error'])
      }
    })

    //Assign AC
    this.acConnAssign()
    this.acKAAssign()
    this.acParentAssign()
    this.acREAssign()

  }
  loadConnections(facetId) {
    this.connectionGQL.fetch({
      filter: {
        facetId: facetId,
      }
    },
      {
        fetchPolicy: "network-only"
      }
    )
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.dataSource.data = result.data.Connection
        }
        else {
          //
        }
      })
  }
  //Form Groups
  overviewForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl({ value: '', disabled: true }, Validators.required),
    subType: new FormControl({ value: '', disabled: false }, Validators.required),
    status: new FormControl({ value: FacetStatus.Published, disabled: false }, Validators.required),
    description: new FormControl(''),
    knowledgeArea: new FormControl('',),
    relatedElement: new FormControl('',),
    parent: new FormControl('',),
    acronym: new FormControl('',),
    synonym: new FormControl('',),
    validValue: new FormControl('',),

    primaryKey: new FormControl('',),
    format: new FormControl('',),
    dataType: new FormControl('',),
    pii: new FormControl('',),
    securityClassification: new FormControl('',),
    key: new FormControl('',),
    keyReason: new FormControl('',),
    accessGuidelines: new FormControl('',),
    stakeholderTitle: new FormControl('',),
    stakeholderEmailAddress: new FormControl('',),
    stakeholderPhoneNumber: new FormControl('',),
    tag: new FormControl('',),

  });

  connectionsForm = new FormGroup({
    leftFacet: new FormControl({ value: '', disabled: false }, Validators.required),
    connectionType: new FormControl({ value: '', disabled: false }, Validators.required),
    connectedFacet: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  //Control getters
  get name() { return this.overviewForm.get('name') }
  get type() { return this.overviewForm.get('type') }
  get subType() { return this.overviewForm.get('subType') }
  get status() { return this.overviewForm.get('status') }
  get description() { return this.overviewForm.get('description') }
  get knowledgeArea() { return this.overviewForm.get('knowledgeArea') }
  get relatedElement() { return this.overviewForm.get('relatedElement') }
  get parent() { return this.overviewForm.get('parent') }

  get acronym() { return this.overviewForm.get('acronym') }
  get synonym() { return this.overviewForm.get('synonym') }
  get validValue() { return this.overviewForm.get('validValue') }
  get primaryKey() { return this.overviewForm.get('primaryKey') }
  get format() { return this.overviewForm.get('format') }
  get dataType() { return this.overviewForm.get('dataType') }
  get pii() { return this.overviewForm.get('pii') }
  get securityClassification() { return this.overviewForm.get('securityClassification') }
  get key() { return this.overviewForm.get('key') }
  get keyReason() { return this.overviewForm.get('keyReason') }
  get accessGuidelines() { return this.overviewForm.get('accessGuidelines') }
  get stakeholderTitle() { return this.overviewForm.get('stakeholderTitle') }
  get stakeholderEmailAddress() { return this.overviewForm.get('stakeholderEmailAddress') }
  get stakeholderPhoneNumber() { return this.overviewForm.get('stakeholderPhoneNumber') }
  get tag() { return this.overviewForm.get('tag') }
  get connectionType() { return this.connectionsForm.get('connectionType') }
  get connectedFacet() { return this.connectionsForm.get('connectedFacet') }


  //Setting initial values
  setInitialValues(paramsId) {
    this.facetGQL.fetch({
      filter: {
        id: paramsId
      }
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          console.log(result)

          var parentValue = result.data.Facet[0].parentId ? { id: result.data.Facet[0].parentId, name: result.data.Facet[0].parentName } : {}
          var kaValue = result.data.Facet[0].knowledgeAreaId ? { id: result.data.Facet[0].knowledgeAreaId, name: result.data.Facet[0].knowledgeAreaName } : {}
          var reValue = result.data.Facet[0].relatedElementId ? { id: result.data.Facet[0].relatedElementId, name: result.data.Facet[0].relatedElementName } : {}

          this.setFacetSpecificValues(result.data.Facet[0].type)
          this.overviewTitle = "Editing " + result.data.Facet[0].name
          this.facetId = result.data.Facet[0].id;
          this.facetName = result.data.Facet[0].name;
          this.overviewForm.get('name').setValue(result.data.Facet[0].name)
          this.overviewForm.get('type').setValue(result.data.Facet[0].type)
          this.facetType = result.data.Facet[0].type
          this.overviewForm.get('subType').setValue(result.data.Facet[0].subType)
          this.overviewForm.get('status').setValue(result.data.Facet[0].status)
          this.overviewForm.get('description').setValue(result.data.Facet[0].description)
          this.overviewForm.get('parent').setValue(parentValue)
          this.overviewForm.get('knowledgeArea').setValue(kaValue)
          this.overviewForm.get('relatedElement').setValue(reValue)
          this.overviewForm.get('acronym').setValue(result.data.Facet[0].acronym)
          this.overviewForm.get('synonym').setValue(result.data.Facet[0].synonym)
          this.overviewForm.get('validValue').setValue(result.data.Facet[0].validValue)

          this.overviewForm.get('primaryKey').setValue(result.data.Facet[0].primaryKey)
          this.overviewForm.get('format').setValue(result.data.Facet[0].format)
          this.overviewForm.get('dataType').setValue(result.data.Facet[0].dataType)
          this.overviewForm.get('pii').setValue(result.data.Facet[0].pii)
          this.overviewForm.get('securityClassification').setValue(result.data.Facet[0].securityClassification)
          this.overviewForm.get('key').setValue(result.data.Facet[0].key)
          this.overviewForm.get('keyReason').setValue(result.data.Facet[0].keyReason)
          this.overviewForm.get('accessGuidelines').setValue(result.data.Facet[0].accessGuidelines)
          this.overviewForm.get('stakeholderTitle').setValue(result.data.Facet[0].stakeholderTitle)
          this.overviewForm.get('stakeholderEmailAddress').setValue(result.data.Facet[0].stakeholderEmailAddress)
          this.overviewForm.get('stakeholderPhoneNumber').setValue(result.data.Facet[0].stakeholderPhoneNumber)
          this.overviewForm.get('tag').setValue(result.data.Facet[0].tag)
          this.wiki = result.data.Facet[0].wiki
        }
        else {
          this.facetId = null;
          this.notificationService.error('A matching facet was not found to edit')
        }
      })
  }

  setFacetSpecificValues(facetType: FacetType) {
    this.facetType = FacetType[toCamelCase(facetType, true)]
    this.facetDisplayFields = arrFacetDisplayFields.find((f => f.facet === this.facetType)) ? arrFacetDisplayFields.find((f => f.facet === this.facetType)) : null;
    this.overviewForm.get('subType').setValue(this.facetDisplayFields.defaultSubType)

    if (this.facetType) {
      this.overviewTitle = "Creat a new " + this.facetType.toString()
      this.overviewForm.get('type').setValue(this.facetType)
      this.oFacetTypesSubTypes = arrFacetTypeSubType.find((f => f.type === this.facetType))

      this.possibleConnections = arrFacetConnections.filter((f => f.headType === this.facetType || f.tailType === this.facetType)).sort(function (a, b) {
        if (a.tailType < b.tailType) { return -1; }
        if (a.tailType > b.tailType) { return 1; }
        return 0;
      })

    } else {
      this.router.navigate(['/error'])
    }
  }

  //Form submissions
  upsertFacet(redirect: boolean) {
    if (this.overviewForm.dirty) {
      this.upsertFacetGQL.mutate({
        input: {
          id: this.facetId,
          name: this.name.value ? this.name.value : null,
          type: this.type.value ? this.type.value : null,
          subType: this.subType.value ? this.subType.value : null,
          status: this.status.value ? this.status.value : null,
          description: this.description.value ? this.description.value : null,
          knowledgeAreaId: this.knowledgeArea.value.id ? this.knowledgeArea.value.id : null,
          relatedElementId: this.relatedElement.value.id ? this.relatedElement.value.id : null,
          parentId: this.parent.value.id ? this.parent.value.id : null,
          acronym: this.acronym.value ? this.acronym.value : null,
          synonym: this.synonym.value ? this.synonym.value : null,
          validValue: this.validValue.value ? this.validValue.value : null,
          primaryKey: this.primaryKey.value ? this.primaryKey.value : null,
          format: this.format.value ? this.format.value : null,
          dataType: this.dataType.value ? this.dataType.value : null,
          pii: this.pii.value ? this.pii.value : null,
          securityClassification: this.securityClassification.value ? this.securityClassification.value : null,
          key: this.key.value ? this.key.value : null,
          keyReason: this.keyReason.value ? this.keyReason.value : null,
          accessGuidelines: this.accessGuidelines.value ? this.accessGuidelines.value : null,
          stakeholderTitle: this.stakeholderTitle.value ? this.stakeholderTitle.value : null,
          stakeholderEmailAddress: this.stakeholderEmailAddress.value ? this.stakeholderEmailAddress.value : null,
          stakeholderPhoneNumber: this.stakeholderPhoneNumber.value ? this.stakeholderPhoneNumber.value : null,
          tag: this.tag.value ? this.tag.value : null
        }
      },
        { refetchQueries: [{ query: FacetSnippetDocument }] }
      )
        .pipe(take(1))
        .subscribe((result) => {
          if (result.data.upsertFacet.id) {
            this.facetId = result.data.upsertFacet.id
            this.notificationService.success('The facet has been saved succesfully.')
            console.log('hey', redirect)
            if (redirect) {
              this.router.navigate(['/view', this.facetId])
            }
            else {

            }

          }
          else {
            this.notificationService.error('There was a problem. Please try again.')
          }
        })
    }
    else {
      this.notificationService.default('No changes made.')
    }
  }


  saveConnection() {
    if (this.connectionsForm.dirty) {
      this.createConnectionGQL.mutate({
        input: {
          fromId: this.connectionType.value.headType == this.facetType ? this.facetId : this.connectedFacet.value.id,
          fromType: this.connectionType.value.headType == this.facetType ? this.facetType : this.connectedFacet.value.type,
          connection: this.connectionType.value.connection,
          display: this.connectionType.value.headType == this.facetType ? this.connectionType.value.display : this.connectionType.value.displayAlternative,
          displayAlternative: this.connectionType.value.headType != this.facetType ? this.connectionType.value.display : this.connectionType.value.displayAlternative,
          toId: this.connectionType.value.headType != this.facetType ? this.facetId : this.connectedFacet.value.id,
          toType: this.connectionType.value.headType != this.facetType ? this.facetType : this.connectedFacet.value.type,
          source: 'Web',
        },
      },
        { refetchQueries: [{ query: ConnectionDocument }] }
      )
        .pipe(take(1))
        .subscribe((result) => {
          if (result.data.createConnection.fromId) {
            this.notificationService.success('The connection has been saved succesfully.')
            this.loadConnections(this.facetId)
          }
          else {
            this.notificationService.error('There was a problem. Please try again.')
          }
        })
    }
    else {
      this.notificationService.default('No changes made.')
    }
  }

  deleteFacet() {
    this.deleteFacetGQL.mutate({
      input: {
        id: this.facetId
      },
    },
      { refetchQueries: [{ query: ConnectionDocument }] }
    )
      .pipe(take(1))
      .subscribe((result) => {
        if (result.data.deleteFacet) {
          this.notificationService.success('The facet has been removed succesfully.')
          this.router.navigate(['/discover'])
        }
        else {
          this.notificationService.error('There was a problem. Please try again.')
        }
      })
  }


  deleteConnection(connectionId) {
    this.deleteConnectionGQL.mutate({
      input: {
        id: connectionId
      },
    },
      { refetchQueries: [{ query: ConnectionDocument }] }
    )
      .pipe(take(1))
      .subscribe((result) => {
        if (result.data.deleteConnection) {
          this.notificationService.success('The connection has been removed succesfully.')
          this.loadConnections(this.facetId)
        }
        else {
          this.notificationService.error('There was a problem. Please try again.')
        }
      })
  }

  upsertWiki() {
    this.upsertFacetGQL.mutate({
      input: {
        id: this.facetId,
        name: this.name.value,
        wiki: this.wiki,
      }
    })
      .pipe(take(1))
      .subscribe((result) => {
        if (result.data.upsertFacet.id) {
          this.notificationService.success('The wiki has been saved succesfully.')
          this.facetName = this.name.value
        }
        else {
          this.notificationService.error('There was a problem. Please try again.')
        }
      })
  }

  acConnAssign() {
    this.connectedFacet.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((value) => {
          if (!value || value.length < 2) {
            this.acConnFilteredFacets = []
          }
        }),
        filter(value => value && value.length >= 2),
        debounceTime(100),
        tap(() => {
          this.acConnFilteredFacets = [];
          this.acConnIsLoading = true;
        }),
        switchMap(value =>
          this.facetGQL.fetch({
            filter: {
              name: value,
              type: this.connectionType.value.headType == this.facetType ? this.connectionType.value.tailType : this.connectionType.value.headType
            }
          }))).subscribe((result) => {
            this.acConnIsLoading = false;
            if (result == undefined) {
              this.acConnFilteredFacets = [];
            } else {
              this.acConnFilteredFacets = result.data.Facet;
            }
          });
  }

  acKAAssign() {
    this.knowledgeArea.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((value) => {
          if (!value || value.length < 2) {
            this.acKAFilteredFacets = []
          }
        }),
        filter(value => value && value.length >= 2),
        debounceTime(100),
        tap(() => {
          this.acKAFilteredFacets = [];
          this.acKAIsLoading = true;
        }),
        switchMap(value =>
          this.facetGQL.fetch({
            filter: {
              name: value,
              type: [FacetType.KnowledgeArea]
            }
          }))).subscribe((result) => {
            this.acKAIsLoading = false;
            if (result == undefined) {
              this.acKAFilteredFacets = [];
            } else {
              this.acKAFilteredFacets = result.data.Facet;
            }
          });
  }

  acREAssign() {
    this.relatedElement.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((value) => {
          if (!value || value.length < 2) {
            this.acREFilteredFacets = []
          }
        }),
        filter(value => value && value.length >= 2),
        debounceTime(100),
        tap(() => {
          this.acREFilteredFacets = [];
          this.acREIsLoading = true;
        }),
        switchMap(value =>
          this.facetGQL.fetch({
            filter: {
              name: value,
              type: [FacetType.Element]
            }
          }))).subscribe((result) => {
            this.acREIsLoading = false;
            if (result == undefined) {
              this.acREFilteredFacets = [];
            } else {
              this.acREFilteredFacets = result.data.Facet;
            }
          });
  }

  acParentAssign() {
    this.parent.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((value) => {
          if (!value || value.length < 2) {
            this.acParentFilteredFacets = []
          }
        }),
        filter(value => value && value.length >= 2),
        debounceTime(100),
        tap(() => {
          this.acParentFilteredFacets = [];
          this.acParentIsLoading = true;
        }),
        switchMap(value =>
          this.facetGQL.fetch({
            filter: {
              name: value,
              type: [FacetType[this.facetType]]
            }
          }))).subscribe((result) => {
            this.acParentIsLoading = false;
            if (result == undefined) {
              this.acParentFilteredFacets = [];
            } else {
              this.acParentFilteredFacets = result.data.Facet;
            }
          });
  }

  connectionTypeChanged() {
    this.connectedFacet.reset()
  }

  getACDisplayValue(option) {
    console.log(option)
    return option ? option.name : '';
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  dummy() {

  }
}