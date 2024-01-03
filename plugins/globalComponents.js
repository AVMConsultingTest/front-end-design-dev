import Vue from 'vue'

import OtpInput from '@bachdgvn/vue-otp-input'
import VueApexCharts from 'vue-apexcharts'
import VueJsonToCsv from 'vue-json-to-csv'
import VueExcelXlsx from 'vue-excel-xlsx'
import VueHtml2pdf from 'vue-html2pdf'

import VTooltip from 'v-tooltip'
import AddDriver from '../pages/carrier/dashboard/safety-management/driver-management/add-driver.vue'
import AddDrug from '../pages/carrier/dashboard/safety-management/driver-management/add-drug.vue'
import EditDrugTest from '../pages/carrier/dashboard/safety-management/driver-management/edit-drug-test/index.vue'
import AddTrainings from '../pages/carrier/dashboard/safety-management/driver-management/add-trainings.vue'
import EditTraining from '../pages/carrier/dashboard/safety-management/driver-management/edit-training/index.vue'
import AddApplicants from '../pages/carrier/dashboard/safety-management/driver-management/add-applicants.vue'
import PayrollAddDriver from '../pages/carrier/dashboard/accounting/payroll/add-drivers.vue'
import AddVendorGeneral from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-add-general.vue'
import EditGeneralPage from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-edit-general.vue'
import EditAccountingBroker from '../pages/carrier/dashboard/accounting/receivables/brokers/_id/edit-broker/index.vue'
import AddVendorAsset from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-add-asset-information.vue'
import EditVendorAsset from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-edit-asset-information.vue'
import AddAssetTransaction from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-add-transactions-asset.vue'
import EditAssetTransaction from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-edit-asset-transactions.vue'
import AddOperationalTransaction from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-add-operational-transaction.vue'
import EditOperationalTransaction from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-edit-operational-transaction.vue'
import AddVendorPayments from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-add-vendor-payments.vue'
import EditVendorPayments from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-edit-vendor-payments.vue'
import EditVendor from '../pages/carrier/dashboard/accounting/payables/vendor-profile/_id/-edit-vendor.vue'
import CreateInvoice from '../pages/carrier/dashboard/accounting/receivables/-create-invoice.vue'
import PayrollEditDriver from '../pages/carrier/dashboard/accounting/payroll/drivers-details/_id/-edit-drivers.vue'
// import PayrollAddDriver2 from '../pages/dashboard/accounting/payroll/add-driver.vue'

import EditCompanyProfile from '../pages/broker/dashboard//company-profile/-edit-company-profile.vue'
import EditListeningProfile from '../pages/broker/dashboard/listening-profile/_id/-edit-listening-profile.vue'
import EditCarrierProfile from '../pages/broker/dashboard/listening-profile-carriers/_id/edit-carrier.vue'

import AddFiles from '../pages/carrier/dashboard/safety-management/driver/_id/add-files'
import EditFiles from '../pages/carrier/dashboard/safety-management/driver/_id/edit-files'
import ApplicantAddFiles from '../pages/carrier/dashboard/safety-management/applicant/_id/add-files'
import AddQuotes from '../pages/broker/dashboard/quotes/add-quotes'
import EditQuotes from '../pages/broker/dashboard/quotes/edit-quotes'
import AddShipmentsQuotes from '../pages/broker/dashboard/shipments/add-quotes'
import AddNewCarrier from '../pages/broker/dashboard/listening-profile-carriers/add-new-carrier/first-step.vue'
import AddNewCarrierTwo from '../pages/broker/dashboard/listening-profile-carriers/add-new-carrier/second-step.vue'
import AddNewCustomer from '../pages/broker/dashboard/listening-profile/add-new-customer'
import Form from '@/components/Form'
import Input from '@/components/Input'
import FileInput from '@/components/FileInput'
import PhoneInput from '@/components/PhoneInput'
import SelectInput from '@/components/SelectInput'
import CheckBox from '@/components/CheckBox'
import Pagination from '@/components/Pagination'
import Select from '@/components/Select'
import MSelect from '@/components/MSelect'
import StateSelects from '@/components/StateSelects'
import ProfileComment from '@/components/ProfileComment'
import Button from '@/components/Button'
import TabButton from '@/components/TabButton'
import TabManager from '~/components/TabManager.vue'
import Badge from '@/components/Badge'
import Widget from '@/components/Widget'
import Icon from '@/components/Icon/Icon'
import Icomoon from '@/components/Icon/Icomoon'
import SnackBar from '@/components/SnackBar'
import Modal from '@/components/Modal'
import Drawer from '@/components/Drawer'
import SectionHeader from '@/components/SectionHeader'
import ChatRoom from '@/components/ChatRoom'
import PageHeader from '@/components/PageHeader'
import Table from '@/components/Table'
import StatTracking from '@/components/StatTracking'
import InfoBox from '@/components/InfoBox'
import DetailBox from '@/components/DetailBox'
import DeleteModal from '~/components/DeleteModal'
import TheAddSegment from '@/components/TheAddSegment'
import LoadCardShipment from '~/components/LoadCardShipment.vue'
import BrokerCustomersCard from '~/components/BrokerCustomersCard.vue'
import MapCard from '~/components/MapCard.vue'
import BrokerMapCard from '~/components/BrokerMapCard.vue'
import NotesEdit from '~/components/NotesEdit.vue'
import Status from '~/components/Status.vue'

import LandingFooter from '~/components/LandingFooter.vue'
import LandingHeader from '~/components/LandingHeader.vue'
import BaseAccordion from '~/components/BaseAccordion.vue'

import BrokerDetailCard from '~/components/BrokerDetailCard.vue'
import BrokerShipmentsCard from '~/components/BrokerShipmentsCard.vue'
import BrokerMarketPlaceCard from '~/components/BrokerMarketPlaceCard.vue'
import DispatchMarketPlaceCard from '~/components/DispatchMarketPlaceCard.vue'
import MapCardDetails from '~/components/MapCardDetails.vue'
import BrokerMapCardDetails from '~/components/BrokerMapCardDetails.vue'
import EldOperationalMapCard from '~/components/EldOperationalMapCard.vue'

import AddTruckPage from '~/pages/carrier/dashboard/safety-management/fleet-management/add-truck.vue'
import AddTrailerPage from '@/pages/carrier/dashboard/safety-management/fleet-management/add-trailer/index.vue'
import AddAlertPage from '@/pages/carrier/dashboard/safety-management/carrier-management/add-alert/index.vue'
import AddPermit from '@/pages/carrier/dashboard/safety-management/fleet-management/add-permit'
import AddDevice from '@/pages/carrier/dashboard/safety-management/fleet-management/add-devices'
import AddService from '@/pages/carrier/dashboard/safety-management/fleet-management/add-services'
import AddCheckList from '@/pages/carrier/dashboard/safety-management/fleet-management/add-check-list'
import AddInspectionReport from '@/pages/carrier/dashboard/safety-management/carrier-management/add-inspection-report'
import AddIncidentRegistry from '@/pages/carrier/dashboard/safety-management/carrier-management/add-incident-report'
import AddAccidentReport from '@/pages/carrier/dashboard/safety-management/carrier-management/add-accident-registry'

import EditAccidentReport from '@/pages/carrier/dashboard/safety-management/carrier-management/edit-accident-registry'
import EditIncidentRegistry from '@/pages/carrier/dashboard/safety-management/carrier-management/edit-incident-report'
import EditInspectionReport from '@/pages/carrier/dashboard/safety-management/carrier-management/edit-inspection-report'

import EditAlertPage from '@/pages/carrier/dashboard/safety-management/carrier-management/edit-alert/index.vue'

import EditGenerateInvoice from '~/pages/carrier/dashboard/accounting/payroll/edit-generate-invoice.vue'

import EditTrailer from '~/pages/carrier/dashboard/safety-management/trailer-profile/_id/edit-trailer/index.vue'
import EditPermit from '~/pages/carrier/dashboard/safety-management/fleet-management/edit-permit/edit-permit.vue'
import EditCheckList from '~/pages/carrier/dashboard/safety-management/fleet-management/edit-check-list/edit-check-list.vue'
import EditTrailerMaintenance from '~/pages/carrier/dashboard/safety-management/trailer-profile/_id/edit-trailer/maintenance.vue'
import EditTruck from '~/pages/carrier/dashboard/safety-management/truck-profile/_id/edit-truck/index.vue'
import EditDriver from '~/pages/carrier/dashboard/safety-management/driver/_id/edit-driver/index.vue'
import EditDriverBoard from '~/pages/carrier/dashboard/dispatch/driver-board/edit-driver/index.vue'
import EditApplicant from '~/pages/carrier/dashboard/safety-management/applicant/_id/edit-applicant/index.vue'
import EditTruckMaintenance from '~/pages/carrier/dashboard/safety-management/truck-profile/_id/edit-truck/maintenance.vue'
import MapWidget from '~/components/MapWidget.vue'
import TableTest from '~/components/table-test.vue'
import LoadCard from '~/components/LoadCard.vue'
import MarketPlaceItemDetail from '~/components/MarketPlaceItemDetail.vue'
import LoadDrawer from '~/components/LoadDrawer.vue'
import BrokerInvoicing from '~/components/BrokerInvoicing.vue'
import BrokerCard from '~/components/BrokerCard.vue'
import BrokerSettingsCard from '~/components/BrokerSettingsCard.vue'
import BrokerCreateInvoice from '~/pages/broker/dashboard/invoicing/-create-invoice.vue'
import BrokerEditInvoice from '~/pages/broker/dashboard/invoicing/-edit-invoice.vue'
import CompanyProfileAddContact from '~/pages/broker/dashboard/company-profile/-add-contacts.vue'
import CompanyProfileAddContract from '~/pages/broker/dashboard/company-profile/-add-contract-rates.vue'
import CompanyProfileAddNotes from '~/pages/broker/dashboard/company-profile/-add-notes.vue'
import AddDriverBoardPage from '~/pages/carrier/dashboard/dispatch/driver-board/add-driver-board.vue'
import AddLocationsPage from '~/pages/carrier/dashboard/dispatch/locations/add-locations.vue'
import EditLocationsPage from '~/pages/carrier/dashboard/dispatch/locations/edit-locations.vue'
import EditDevice from '~/pages/carrier/dashboard/safety-management/fleet-management/edit-devices/edit-devices.vue'
import EditServices from '~/pages/carrier/dashboard/safety-management/fleet-management/edit-services/edit-services.vue'
import AddBrokerPage from '~/pages/carrier/dashboard/accounting/receivables/brokers/add-broker/add-broker-first-step.vue'
import AddFactoring from '~/pages/carrier/dashboard/accounting/receivables/add-factoring'
import AssetsPage from '~/pages/carrier/dashboard/accounting/payables/assets/add-assets/index.vue'
import AddVendorsPage from '~/pages/carrier/dashboard/accounting/payables/vendors-list-first-step'

import UploadFullReport from '@/pages/carrier/dashboard/accounting/payroll/upload-full-report.vue'
import UploadTollReport from '@/pages/carrier/dashboard/accounting/payroll/upload-toll-report.vue'
import UploadMileageReport from '@/pages/carrier/dashboard/accounting/payroll/upload-mileage-report.vue'
import TransactionsAssetStep from '@/pages/carrier/dashboard/accounting/payables/transactions/transactions-asset-step.vue'
import TransactionsOperationalStep from '@/pages/carrier/dashboard/accounting/payables/transactions/transactions-operational-step.vue'
import AddTransaction from '~/pages/carrier/dashboard/accounting/payables/vendors-add-transaction'
import CreateTask from '~/pages/carrier/dashboard/accounting/payables/task-create'
import EditTask from '~/pages/carrier/dashboard/accounting/payables/-edit-task'

Vue.use(VTooltip)
Vue.use(VueApexCharts)
Vue.use(VueExcelXlsx)

Vue.component('VueJsonToCsv', VueJsonToCsv)
Vue.component('VueExcelXlsx', VueExcelXlsx)
Vue.component('Apexchart', VueApexCharts)
Vue.component('VueHtml2pdf', VueHtml2pdf)
Vue.component(Button.name, Button)
Vue.component(TabButton.name, TabButton)
Vue.component(TabManager.name, TabManager)
Vue.component(Widget.name, Widget)
Vue.component(MapWidget.name, MapWidget)
Vue.component(TableTest.name, TableTest)
Vue.component(LoadCard.name, LoadCard)
Vue.component(MarketPlaceItemDetail.name, MarketPlaceItemDetail)
Vue.component(BrokerCustomersCard.name, BrokerCustomersCard)
Vue.component(BrokerShipmentsCard.name, BrokerShipmentsCard)
Vue.component(MapCard.name, MapCard)
Vue.component(BrokerMapCard.name, BrokerMapCard)
Vue.component(NotesEdit.name, NotesEdit)
Vue.component(Status.name, Status)
Vue.component(MapCardDetails.name, MapCardDetails)
Vue.component(BrokerMapCardDetails.name, BrokerMapCardDetails)

Vue.component(EldOperationalMapCard.name, EldOperationalMapCard)

Vue.component(LoadDrawer.name, LoadDrawer)
Vue.component(BrokerCard.name, BrokerCard)
Vue.component(BrokerSettingsCard.name, BrokerSettingsCard)
Vue.component(Badge.name, Badge)
Vue.component(Icomoon.name, Icomoon)
Vue.component(ProfileComment.name, ProfileComment)
Vue.component(Icon.name, Icon)
Vue.component(PhoneInput.name, PhoneInput)
Vue.component(FileInput.name, FileInput)
Vue.component(SelectInput.name, SelectInput)
Vue.component(Input.name, Input)
Vue.component(CheckBox.name, CheckBox)
Vue.component(Pagination.name, Pagination)
Vue.component(Select.name, Select)
Vue.component(MSelect.name, MSelect)
Vue.component(StateSelects.name, StateSelects)
Vue.component(Form.name, Form)
Vue.component(SnackBar.name, SnackBar)
Vue.component(Modal.name, Modal)
Vue.component(Drawer.name, Drawer)
Vue.component(SectionHeader.name, SectionHeader)
Vue.component(ChatRoom.name, ChatRoom)
Vue.component(PageHeader.name, PageHeader)
Vue.component(StatTracking.name, StatTracking)
Vue.component(Table.name, Table)
Vue.component(InfoBox.name, InfoBox)
Vue.component(DetailBox.name, DetailBox)
Vue.component(DeleteModal.name, DeleteModal)
Vue.component(TheAddSegment.name, TheAddSegment)
Vue.component(LoadCardShipment.name, LoadCardShipment)
Vue.component(BrokerDetailCard.name, BrokerDetailCard)
Vue.component(BrokerMarketPlaceCard.name, BrokerMarketPlaceCard)
Vue.component(DispatchMarketPlaceCard.name, DispatchMarketPlaceCard)
Vue.component(BrokerInvoicing.name, BrokerInvoicing)
Vue.component(LandingHeader.name, LandingHeader)
Vue.component(LandingFooter.name, LandingFooter)
Vue.component(BaseAccordion.name, BaseAccordion)

Vue.component('AddTruckPage', AddTruckPage)
Vue.component('AddService', AddService)
Vue.component('AddPermit', AddPermit)
Vue.component('AddCheckList', AddCheckList)
Vue.component('AddDevice', AddDevice)
Vue.component('AddTrailerPage', AddTrailerPage)
Vue.component('AddAlertPage', AddAlertPage)
Vue.component('AddDriver', AddDriver)
Vue.component('AddDrug', AddDrug)
Vue.component('EditDrugTest', EditDrugTest)
Vue.component('AddVendorGeneral', AddVendorGeneral)
Vue.component('EditGeneralPage', EditGeneralPage)
Vue.component('EditAccountingBroker', EditAccountingBroker)
Vue.component('AddVendorAsset', AddVendorAsset)
Vue.component('EditVendorAsset', EditVendorAsset)
Vue.component('AddAssetTransaction', AddAssetTransaction)
Vue.component('EditAssetTransaction', EditAssetTransaction)
Vue.component('AddOperationalTransaction', AddOperationalTransaction)
Vue.component('EditOperationalTransaction', EditOperationalTransaction)
Vue.component('AddVendorPayments', AddVendorPayments)
Vue.component('EditVendorPayments', EditVendorPayments)
Vue.component('EditVendor', EditVendor)
Vue.component('PayrollEditDriver', PayrollEditDriver)
// Vue.component('PayrollAddDriver2', PayrollAddDriver2)

Vue.component('AddApplicants', AddApplicants)
Vue.component('AddTrainings', AddTrainings)
Vue.component('EditTraining', EditTraining)
Vue.component('AddFiles', AddFiles)
Vue.component('EditFiles', EditFiles)
Vue.component('ApplicantAddFiles', ApplicantAddFiles)
Vue.component('PayrollAddDriver', PayrollAddDriver)
Vue.component('AddQuotes', AddQuotes)
Vue.component('EditQuotes', EditQuotes)
Vue.component('AddShipmentsQuotes', AddShipmentsQuotes)
Vue.component('AddNewCarrier', AddNewCarrier)
Vue.component('AddNewCarrierTwo', AddNewCarrierTwo)
Vue.component('AddNewCustomer', AddNewCustomer)
Vue.component('EditTruck', EditTruck)
Vue.component('EditDriver', EditDriver)
Vue.component('EditDriverBoard', EditDriverBoard)
Vue.component('EditPermit', EditPermit)
Vue.component('BrokerCreateInvoice', BrokerCreateInvoice)
Vue.component('BrokerEditInvoice', BrokerEditInvoice)
Vue.component('CompanyProfileAddContact', CompanyProfileAddContact)
Vue.component('CompanyProfileAddContract', CompanyProfileAddContract)
Vue.component('CompanyProfileAddNotes', CompanyProfileAddNotes)
Vue.component('EditGenerateInvoice', EditGenerateInvoice)
Vue.component('EditApplicant', EditApplicant)
Vue.component('EditCheckList', EditCheckList)
Vue.component('EditTrailer', EditTrailer)
Vue.component('EditPermit', EditPermit)
Vue.component('EditTrailerMaintenance', EditTrailerMaintenance)
Vue.component('EditTruckMaintenance', EditTruckMaintenance)
// Vue.component(AddressDetails.name, AddressDetails)
Vue.component('AddDriverBoardPage', AddDriverBoardPage)
Vue.component('AddLocationsPage', AddLocationsPage)
Vue.component('EditLocationsPage', EditLocationsPage)
Vue.component('EditCompanyProfile', EditCompanyProfile)
Vue.component('EditListeningProfile', EditListeningProfile)
Vue.component('EditCarrierProfile', EditCarrierProfile)

Vue.component('AddInspectionReport', AddInspectionReport)
Vue.component('AddIncidentRegistry', AddIncidentRegistry)
Vue.component('AddAccidentReport', AddAccidentReport)

Vue.component('EditAccidentReport', EditAccidentReport)
Vue.component('EditIncidentRegistry', EditIncidentRegistry)
Vue.component('EditInspectionReport', EditInspectionReport)

Vue.component('EditAlertPage', EditAlertPage)

Vue.component('AddBrokerPage', AddBrokerPage)
Vue.component('AddFactoring', AddFactoring)
Vue.component('UploadMileageReport', UploadMileageReport)
Vue.component('UploadFullReport', UploadFullReport)
Vue.component('UploadTollReport', UploadTollReport)
Vue.component('TransactionsAssetStep', TransactionsAssetStep)
Vue.component('TransactionsOperationalStep', TransactionsOperationalStep)
Vue.component('AssetsPage', AssetsPage)
Vue.component('AddVendorsPage', AddVendorsPage)
Vue.component('AddTransaction', AddTransaction)
Vue.component('CreateTask', CreateTask)
Vue.component('EditTask', EditTask)
Vue.component('AddTransaction', AddTransaction)
Vue.component('CreateTask', CreateTask)
Vue.component('CreateInvoice', CreateInvoice)
Vue.component('TransactionsAssetStep', TransactionsAssetStep)
Vue.component('TransactionsOperationalStep', TransactionsOperationalStep)
Vue.component('UploadMileageReport', UploadMileageReport)
Vue.component('EditDevice', EditDevice)
Vue.component('EditServices', EditServices)

Vue.component('VOtpInput', OtpInput)

Vue.filter('toCurrency', function (value) {
  if (typeof value !== 'number') {
    value = parseInt(value)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })
  return formatter.format(value)
})

Vue.filter('formatNumber', function (value) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 6
  })
  return formatter.format(value.toFixed(3)) + ' ml.'
  // return parseInt(value).toLocaleString()
})

// Vue.filter('kFormat', function (value) {
//   return Math.abs(value) > 999
//     ? Math.sign(value) * ((Math.abs(value) / 1000).toFixed(1)) + 'k'
//     : Math.sign(value) * Math.abs(value)
// })
