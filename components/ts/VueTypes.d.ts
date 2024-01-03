// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { Ref } from 'vue'
import { Slots } from 'vue/types/v3-setup-context'
import { SelectOption } from './interfaces'

declare module 'vue/types/vue' {
    interface Vue {
      editId: number | string;
      deleteId: number | string;
      currentPage: number;
      pageCount:number;
      tableKey: number;
      popBack: boolean;
      editPage: number,
      deleteFunction: Function;
      requestFunction: Function;
      drawer: Function,
      modalHide: () => void;
      modalShow: () => void;
      hideModal: () => void;
      openDrawer: () => void;
      openFileModal: () => void;
      showModal: (() => void)|boolean;
      pagedData: any[];
      dynamicLinkQueries: string[];
      headCheckBox: boolean;
      customFilterValues: Object;
      slotsProceced: unknown[];
      filteringModel: { [x: string]: any } | null;
      slots: Slots;
      data: unknown[];
      currentProgress: Ref<string>
      dataValues: { [key: string]: SelectOption[] };
      filterModel: {
        [key: string]: Ref<String>
      };
      extendedItems: any[];
      pageRanges: any[];
      sorteds: string | string[];
      dataSet: unknown[];
      selected: unknown[];
      actionDropdowns: any[];
      fetchCompleted: boolean;
      searchTerm: string;
      title: string;
      headers:{
        [key: string]: {
          label: string,
          icon?: string,
          searchable?: boolean,
          sortable?: boolean,
          sticky: boolean,
          excludeFromLink?: boolean,
          value: string;
        }
      };
      deleteSubtext: string;
      deleteAction: Function;
      paginationTest: Function;
    }
  }
declare const maplibregl: any
