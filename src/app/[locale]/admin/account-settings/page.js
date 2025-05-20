import React from "react";
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import AccountSettings from "@/components/Admin/AccountSettings/AccountSettings";

const page = ()=>{
    return(
        <AdminLayout>
            <AccountSettings/>
        </AdminLayout>
    )
}

export default page