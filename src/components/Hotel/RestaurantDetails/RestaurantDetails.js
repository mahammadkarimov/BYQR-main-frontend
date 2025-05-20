import DetailFirst from '../Common/DetailFirst/DetailFirst'
import Description from '../Common/Description/Description'
import Feedback from '../Common/Feedback/Feedback'
import InfoDetail from '../Common/InfoDetail/InfoDetail'
import Rating from '../Common/Rating/Rating'
import Stories from '../Common/Stories/Stories'
import Comment from '../Common/Comment/Comment'

const RestaurantDetails = () => {
  return (
    <>
      <DetailFirst />
      <InfoDetail />
      <Stories />
      <Description />
      <Feedback />
      <Rating />
      <Comment buttonStyleCss="!mt-[42px] sm:!mt-[60px]" />
    </>
  )
}

export default RestaurantDetails
