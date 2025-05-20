import React from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import TableBronTable from '../../../../components/Admin/TableBronTable/TableBronTable'
import AddTableBronPopup from '../../../../components/Admin/AddTableBronPopup/AddTableBronPopup'
import EditTableBronPopup from '../../../../components/Admin/EditTableBronPopup/EditTableBronPopup'

const page = () => {
  return (
    <AdminLayout>
      <TableBronTable />
      <AddTableBronPopup />
      <EditTableBronPopup />
    </AdminLayout>
  )
}

export default page
