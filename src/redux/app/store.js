import { configureStore } from '@reduxjs/toolkit'
import adminSidebarReducer from '../features/adminSidebarSlice'
import adminProfileBarReducer from '../features/adminProfileBarSlice'
import editProductReducer from '../features/editProductSlice'
import categorySlugReducer from '../features/categorySlugSlice'
import favoritesReducer from '../features/favoriteSlice'
import searchReducer from '../features/searchSlice'
import paymentReducer from '../features/makePaymentSlice'
import serviceReducer from '../features/callServiceSlice'
import queryReducer from '../features/queryParamsSlice'
import scrollReducer from '../features/scrollSlice'
import activeAdminReducer from '../features/activeAdminSlice'
import activeServiceReducer from '../features/activeService'
import restaurantPlanReducer from '../features/restaurantPlan'
import feedbackReducer from '../features/feedbackSlice'
import tipSlice from '../features/tipSlice'
import identifyUserReducer from '../features/identifyUser'

export const store = configureStore({
  reducer: {
    sidebar: adminSidebarReducer,
    profileToggle: adminProfileBarReducer,
    editproduct: editProductReducer,
    categorySlug: categorySlugReducer,
    favorites: favoritesReducer,
    searchFilter: searchReducer,
    makePayment: paymentReducer,
    callService: serviceReducer,
    queryParams: queryReducer,
    scrollSlice: scrollReducer,
    activeAdminSlice: activeAdminReducer,
    activeService: activeServiceReducer,
    restaurantPlan: restaurantPlanReducer,
    feedbackService: feedbackReducer,
    tipSlice: tipSlice,
    identifyUser: identifyUserReducer
  },
})
