import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import TechnicalServiceTable from '../../../../components/Admin/TechnicalServiceTable/TechnicalServiceTable'
import AddTechnicalServicePopup from '../../../../components/Admin/AddTechnicalServicePopup/AddTechnicalServicePopup'
import EditServicePopup from '../../../../components/Admin/EditServicePopup/EditServicePopup'

const page = () => {


  return (
    <AdminLayout>
      <TechnicalServiceTable />
      <AddTechnicalServicePopup />
      <EditServicePopup />
    </AdminLayout>
  )
}

export default page