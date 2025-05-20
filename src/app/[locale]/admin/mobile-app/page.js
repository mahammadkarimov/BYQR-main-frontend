import React from 'react'
import AdminLayout from '../../../../components/AdminCommon/AdminLayout/AdminLayout'
import MobileAppHead from '../../../../components/Admin/MobileApp/MobileAppHead/index'
import MobileAppCard from '../../../../components/Admin/MobileApp/MobileAppCard/index'
import Container from '../../../../components/Admin/MobileApp/Container/index'
import history from '../../../../assets/icons/Admin/mainAdmin/history.svg'
import music from '../../../../assets/icons/Admin/mainAdmin/music.svg'


const page = () => {
    return (
        <AdminLayout>
            <MobileAppHead />
            <Container>
                <MobileAppCard cardIcon={history} urlCreatePath={'add-event'} urlPath={'mobile-story'} textHead={'Hekayə'} textBody={'Kompaniyalar, tədbirlər və menu haqqında məlumatlar əlavə edə bilərsiniz.'} />
                <MobileAppCard cardIcon={music} urlCreatePath={'add-event'} urlPath={'mobile-event'} textHead={'Tədbir'} textBody={'Təşkil olunacaq canlı musiqi gecəsi haqqında məlumatlar əlavə edə bilərsiniz.'} />
            </Container>
        </AdminLayout>
    )
}

export default page