import React from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import AdditionalServiceTable from '../../../../components/Admin/AdditionalServiceTable/AdditionalServiceTable'
import AddServicePopup from '../../../../components/Admin/AddServicePopup/AddServicePopup'
import EditCustomerServicePopup from '../../../../components/Admin/EditCustomerServicePopup/EditCustomerServicePopup'

const page = () => {
    return (
        <AdminLayout>
            <AdditionalServiceTable />
            <AddServicePopup />
            <EditCustomerServicePopup />
        </AdminLayout>
    )
}

export default page