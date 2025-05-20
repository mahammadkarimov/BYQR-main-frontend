import AdminCategoryTable from '@/components/AdminCommon/AdminCategoryTable/AdminCategoryTable'
import React from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import CategoryPopup from '../../../../components/Admin/CategoryPopup/CategoryPopup'
import EditCategoryPopup from '../../../../components/Admin/EditCategoryPopup/EditCategoryPopup'
import AddSubcategoryPopup from '../../../../components/Admin/AddSubcategoryPopup/AddSubcategoryPopup'
import EditSubcategory from '../../../../components/Admin/EditSubcategory/EditSubcategory'

const page = () => {
  return (
    <AdminLayout>
      <AdminCategoryTable />
      <CategoryPopup />
      <EditCategoryPopup />
      <AddSubcategoryPopup />
      <EditSubcategory />
    </AdminLayout>
  )
}

export default page