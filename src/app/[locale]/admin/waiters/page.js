import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import WaiterTable from '../../../../components/Admin/WaiterTable/WaiterTable'
import WaiterAddPopup from '../../../../components/Admin/WaiterAddPopup/WaiterAddPopup'
import WaiterEditPopup from '../../../../components/Admin/WaiterEditPopup/WaiterEditPopup'

const page = () => {


  return (
    <AdminLayout>
      <WaiterTable />
      <WaiterAddPopup />
      <WaiterEditPopup />
    </AdminLayout>
  )
}

export default page