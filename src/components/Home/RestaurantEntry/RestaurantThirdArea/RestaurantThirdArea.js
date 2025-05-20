import React from 'react'
import CallService from './CallService/CallService'
import Payment from './Payment/Payment'
import Tips from './Tips/Tips'

const RestaurantThirdArea = ({ packageName, setIsActiveService, setSelectedMethod, setGuestMessage, setIsSuccess, setIsActivePayment, setIsActiveTips, t }) => {

    return (
        <>
            {(packageName === 'justtips' || packageName === 'gold') ?
                <div className='flex px-[28px] mt-3 pb-[14px] gap-2 w-full justify-center'>
                    {((packageName === 'silver' || packageName === 'gold' || packageName === 'platinium' || packageName === 'diamond') && (packageName !== 'bronze' || packageName !== 'gold+')) &&
                        <>
                            <CallService t={t} setIsSuccess={setIsSuccess} setGuestMessage={setGuestMessage} setIsActiveService={setIsActiveService} />
                            <Payment t={t} setSelectedMethod={setSelectedMethod} setIsSuccess={setIsSuccess} setIsActivePayment={setIsActivePayment} />
                        </>
                    }
                    {(packageName === 'gold+' || packageName === 'platinium' || packageName === 'diamond' || packageName === 'justtips') &&
                        <Tips t={t} setIsActiveTips={setIsActiveTips} />
                    }
                </div>
                :
                <div className='flex px-[28px] mt-3 pb-[14px] gap-2 w-full justify-between'>
                    {((packageName === 'silver' || packageName === 'gold' || packageName === 'platinium' || packageName === 'diamond') && (packageName !== 'bronze' || packageName !== 'gold+')) &&
                        <>
                            <CallService t={t} setIsSuccess={setIsSuccess} setGuestMessage={setGuestMessage} setIsActiveService={setIsActiveService} />
                            <Payment t={t} setSelectedMethod={setSelectedMethod} setIsSuccess={setIsSuccess} setIsActivePayment={setIsActivePayment} />
                        </>
                    }
                    {(packageName === 'gold+' || packageName === 'platinium' || packageName === 'diamond' || packageName === 'justtips') &&
                        <Tips t={t} setIsActiveTips={setIsActiveTips} />
                    }
                </div>
            }

        </>
    )
}

export default RestaurantThirdArea