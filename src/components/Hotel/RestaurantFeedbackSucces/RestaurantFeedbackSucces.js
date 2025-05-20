import Button from '../../common/UI/Button/Button'
import Xmark from '../../common/UI/Xmark/Xmark'
import HappyUser from '../../common/HappyUser/HappyUser'
import FeedbackSucces from '../../common/FeedbackSucces/FeedbackSucces'

const RestaurantFeedbackSucces = () => {
  return (
    <>
      <Xmark />
      <HappyUser />
      <FeedbackSucces
        buttonCss={'mt-[42px] active:bg-[#259ee4] !bg-[#59C3FF]'}
      />
    </>
  )
}

export default RestaurantFeedbackSucces
