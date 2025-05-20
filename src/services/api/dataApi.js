import { instanceAxiosAdmin, token } from '@/helper/instanceAxiosAdmin'
import Cookies from 'js-cookie'

// UserUpdate
export const UserUpdate = async data => {
  try {
    const response = await instanceAxiosAdmin.put('/userupdate', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    throw response
  } catch (error) {
    throw error
  }
}

// UserUpdatePatch
export const UserUpdatePatch = async data => {
  try {
    const response = await instanceAxiosAdmin.patch('/userupdate', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    throw response
  } catch (error) {
    throw error
  }
}

// RefreshToken
export const RefreshToken = async () => {
  try {
    const response = await instanceAxiosAdmin.post('/refresh-token/')
    return response
  } catch (error) {
    throw error
  }
}

// Get User
export const UserList = async () => {
  try {
    const response = await instanceAxiosAdmin.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
        // Accept: "application/json",
        // "Content-Type": "multipart/form-data",
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// Register
export const Register = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/register/', data)
    return response
  } catch (error) {
    throw error
  }
}

// Login
export const LoginUser = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/login/', data)
    return response
  } catch (error) {
    throw error
  }
}

// MealGetCategory
export const MealCategoryList = async () => {
  try {
    const response = await instanceAxiosAdmin.get('/meal-category/az', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// GetProductCategory
export const ProductFromCategory = async slug => {
  try {
    const response = await instanceAxiosAdmin.get(`/meals/?category=${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
        //   "Content-Type": "multipart/form-data",
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// MealPostCategory
export const MealCategoryCreate = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      `/hotel-restaurant-admin/mealcategory/${Cookies.get(
        'hotel-rest-username'
      )}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealOrderPatch
export const MealOrderUpdate = async data => {
  try {
    if (data) {
      const response = await instanceAxiosAdmin.patch(
        '/meals/bulk-update/',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// MealCategoryRead
export const MealCategoryRead = async slug => {
  try {
    if (slug) {
      const response = await instanceAxiosAdmin.get(
        `/hotel-restaurant-admin/mealcategory/${slug}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// MealSubCategoryRead
export const MealSubCategoryRead = async (slug, lang) => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/subcategory/${slug}/?lang=${lang}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealCategoryUpdate
export const MealCategoryUpdate = async (data, categorySlug) => {
  try {
    if (categorySlug) {
      const response = await instanceAxiosAdmin.put(
        `/hotel-restaurant-admin/mealcategory/${categorySlug}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// MealCategoryPatch
export const MealCategoryPatch = async data => {
  try {
    const response = await instanceAxiosAdmin.patch(`/mealcategory/${data}`)
    return response
  } catch (error) {
    throw error
  }
}

// MealCategoryDelete
export const MealCategoryDelete = async slug => {
  try {
    const response = await instanceAxiosAdmin.delete(`/mealcategory/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
        // Accept: "application/json",
        // "Content-Type": "multipart/form-data",
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// MealGetSubCategory
export const MealSubCategoryList = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/subcategory/az/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealCreaateSubCategory
export const MealSubCategoryCreate = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      `/hotel-restaurant-admin/subcategory/${Cookies.get(
        'hotel-rest-username'
      )}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealUpdateSubCategory
export const MealSubCategoryUpdate = async (data, subcategoryslug) => {
  try {
    if (subcategoryslug) {
      const response = await instanceAxiosAdmin.put(
        `/hotel-restaurant-admin/subcategory/${subcategoryslug}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// MealSubCategoryDelete
export const MealSubCategoryDelete = async slug => {
  try {
    const response = await instanceAxiosAdmin.delete(`/subcategory/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// DiscountsList
export const DiscountsList = async () => {
  try {
    const response = await instanceAxiosAdmin.get('/discounts/', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// DiscountsRead
export const DiscountsRead = async slug => {
  try {
    const response = await instanceAxiosAdmin.get(`/discounts/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// DiscountsCreate
export const DiscountsCreate = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/discounts/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// DiscountsUpdate
export const DiscountsUpdate = async data => {
  try {
    const response = await instanceAxiosAdmin.put(
      `/discounts/${data?.slug}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// DiscountsPatch
export const DiscountsPatch = async data => {
  try {
    const response = await instanceAxiosAdmin.patch(`/discounts/${data}`)
    return response
  } catch (error) {
    throw error
  }
}

// DiscountsDelete
export const DiscountsDelete = async slug => {
  try {
    const response = await instanceAxiosAdmin.delete(`/discounts/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// MealsList
export const MealsList = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/meal/list-create/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealsListCreate
export const MealsListCreate = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      `/hotel-restaurant-admin/meal/list-create/${Cookies.get(
        'hotel-rest-username'
      )}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealsRead
export const MealsRead = async (slug, lang) => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/meal/${slug}?lang=${lang}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealsUpdate
export const MealsUpdate = async (data, productSlug) => {
  try {
    if (productSlug) {
      const response = await instanceAxiosAdmin.patch(
        `/hotel-restaurant-admin/meal/${productSlug}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
            // Accept: 'application/json',
            // 'Content-Type': 'multipart/form-data',
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// MealsPatch
export const MealsPatch = async data => {
  try {
    const response = await instanceAxiosAdmin.patch(
      `/meals/${data?.slug}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// MealsDelete
export const MealsDelete = async slug => {
  try {
    const response = await instanceAxiosAdmin.delete(`/meals/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// Get Category with QR Code

export const MealCategoriesWithQr = async (username, clientLang) => {
  try {
    if (username) {
      const response = await instanceAxiosAdmin.get(
        `/qr-client/list/${clientLang}/${username}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// Get Category Slug With QR Code

export const MealCategorySlugWithQr = async (
  selActiveParam,
  selCategorySlug
) => {
  try {
    if (selCategorySlug) {
      const response = await instanceAxiosAdmin.get(
        `/qr/${selActiveParam}/${selCategorySlug}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// Get Meal with Slug QR Code

export const GetMealWithSlugQr = async (selCategorySlug, clientLang) => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/qr-client/retrieve/${clientLang}/${selCategorySlug}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// Get SubCategory With Slug QR

export const GetSubCategoryWithSlug = async (
  selSubCategorySlug,
  clientLang
) => {
  try {
    if (selSubCategorySlug) {
      const response = await instanceAxiosAdmin.get(
        `/qr-client/subcategory-list/${clientLang}/${Cookies.get(
          'activeParams'
        )}/${selSubCategorySlug}?limit=100`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// GetMealsWithName MealsSearch

export const GetMealsWithName = async mealName => {
  try {
    if (mealName) {
      const response = await instanceAxiosAdmin.get(
        `/qr/search/${Cookies.get('activeParams')}/${mealName}/`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const MealsWithNameGet = async (lang, mealName) => {
  try {
    if (mealName) {
      const response = await instanceAxiosAdmin.get(
        `/qr-client/search/${lang}/${Cookies.get('activeParams')}/${mealName}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const Distance = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/distance/', data)
    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelWithQr = async hotelName => {
  try {
    if (hotelName) {
      const response = await instanceAxiosAdmin.get(`/hotel/${hotelName}`, {
        headers: {
          Accept: 'application/json'
        }
      })
      return response
    }
  } catch (error) {
    throw error
  }
}

export const GetHotelFilterRestMeals = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/meal/list-create/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelServiceWithUsername = async (hotelName, clientLang) => {
  try {
    if (hotelName) {
      const response = await instanceAxiosAdmin.get(
        `/hotel/service/list/${clientLang}/${hotelName}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// CreateHotelService
export const CreateHotelService = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/hotel/service/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const LoginHotel = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/hotel/login/', data)
    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelServices = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/hotel/admin/services/?limit=1000&ofset=1000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const GetRestaurantListFromHotel = async hotel_rest_username => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel/restaurant/list/${hotel_rest_username}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelServiceWithSlug = async serviceSlug => {
  try {
    if (serviceSlug) {
      const response = await instanceAxiosAdmin.get(
        `/hotel/service/client/az/${serviceSlug}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const getTechnicalServiceHotel = async serviceSlug => {
  try {
    if (serviceSlug) {
      const response = await instanceAxiosAdmin.get(
        `/hotel/service/${serviceSlug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const HotelServiceUpdate = async (data, serviceSlug) => {
  try {
    if (serviceSlug) {
      const response = await instanceAxiosAdmin.put(
        `/hotel/service/${serviceSlug}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const HotelServiceDelete = async slug => {
  try {
    if (slug) {
      const response = await instanceAxiosAdmin.delete(
        `/hotel/service/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const HotelGetCustomerServices = async (hotelUsername, clientLang) => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel/customer/services/${clientLang}/${hotelUsername}?limit=1000`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const HotelCustomerServiceDelete = async slug => {
  try {
    if (slug) {
      const response = await instanceAxiosAdmin.delete(
        `/hotel/customer/service/admin/delete/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const CreateHotelBron = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      `/hotel-restaurant-table-admin/table-list-create/${Cookies.get(
        'hotel-rest-username'
      )}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelBronTables = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/restaurant-table-admin/tables/?limit=1000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const HotelUserUpdate = async data => {
  try {
    const response = await instanceAxiosAdmin.put(`/hotel/update/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelUserInfo = async () => {
  try {
    if (Cookies.get('login_type' === 'isHotel')) {
      const response = await instanceAxiosAdmin.get('/hotel/admin/', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      return response
    }
  } catch (error) {
    throw error
  }
}

export const GetHotelCustomerServices = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/hotel/customer/service/admin/list/?limit=1000&ofset=1000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const CreateHotelCustomerService = async data => {
  try {
    const formData = new FormData()

    Object.keys(data).forEach(key => {
      if (key !== 'images') {
        formData.append(key, data[key])
      }
    })

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        formData.append(`images`, image)
      })
    }

    const response = await instanceAxiosAdmin.post(
      '/hotel/customer/service/',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelCustomerServiceWithSlug = async serviceSlug => {
  try {
    if (serviceSlug) {
      const response = await instanceAxiosAdmin.get(
        `/hotel/customer/service/${serviceSlug}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const HotelCustomerServiceUpdate = async (data, serviceSlug) => {
  try {
    const formData = new FormData()

    Object.keys(data).forEach(key => {
      // `photo` boşdursa (null, undefined və ya ""), `FormData`-ya əlavə etmə
      if (key !== 'images' && !(key === 'photo' && !data[key])) {
        formData.append(key, data[key])
      }
    })

    // if (!data.images || data.images.length === 0) {
    //   delete data.images; // `data` obyektindən `images` açarını sil
    // }

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) => {
        formData.append(`images`, image)
      })
    }

    if (serviceSlug) {
      const response = await instanceAxiosAdmin.patch(
        `/hotel/customer/service/admin/update/${serviceSlug}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const GetWaiterList = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/waiter/list/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const GetWaiterWithSlug = async waiterSlug => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/waiter/get/${waiterSlug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const CreateWaiter = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      `/hotel-restaurant-admin/waiter/register/${Cookies.get(
        'hotel-rest-username'
      )}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const EditWaiterInfo = async (data, waiterSlug) => {
  try {
    const response = await instanceAxiosAdmin.patch(
      `/hotel-restaurant-admin/waiter/update/${waiterSlug}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const EditWaiterPass = async (data, waiterSlug) => {
  try {
    const response = await instanceAxiosAdmin.put(
      `/hotel-restaurant-admin/waiter/password/update/${waiterSlug}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteWaiter = async waiterSlug => {
  try {
    const response = await instanceAxiosAdmin.delete(
      `/hotel-restaurant-admin/waiter/delete/${waiterSlug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const GetHotelCustomerServicesClient = async hotelName => {
  try {
    if (hotelName) {
      const response = await instanceAxiosAdmin.get(
        `/hotel/customer/services/${hotelName}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const GetRestaurantBronTables = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-table-admin/table-list-create/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const RestaurantBronTableDelete = async slug => {
  try {
    if (slug) {
      const response = await instanceAxiosAdmin.delete(
        `/restaurant-table-admin/table/delete/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const RestaurantBronTableUpdate = async (data, slug) => {
  try {
    if (slug) {
      const response = await instanceAxiosAdmin.put(
        `/restaurant-table-admin/table/update/${slug}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const GetRestaurantBronTableWithSlug = async slug => {
  try {
    if (slug) {
      const response = await instanceAxiosAdmin.get(
        `/restaurant-table-admin/table/get/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const GetHotelRestMeals = async (lang) => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/qr-client/list/${lang}/${Cookies.get('hotel-rest-username')}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const HotelSubcategoryList = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/subcategory/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const HotelMainCategoryList = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/mealcategory/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const HotelRestMaincategoryList = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/mealcategory/${Cookies.get(
        'hotel-rest-username'
      )}?limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const NotifyWaiterData = async data => {
  try {
    if (data) {
      const response = await instanceAxiosAdmin.post('/waiter/notify/', data, {
        headers: {
          Accept: 'application/json'
        }
      })
      return response
    }
  } catch (error) {
    throw error
  }
}

export const getTableID = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/restaurant-table/${Cookies.get('activeParams')}/${Cookies.get(
        'activeTable'
      )}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const addFeedback = async data => {
  try {
    if (data) {
      const response = await instanceAxiosAdmin.post(
        '/feedback/question',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const editFeedbackQuestion = async data => {
  try {
    const response = await instanceAxiosAdmin.put(
      `/feedback/question/${data.questionID}`,
      data.question,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getFeedback = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/feedback/question?limit=1000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getFeedbackList = async filter => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/feedback/list?created_at=${filter}&limit=10000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getQuestionList = async filter => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/feedback/question-with-feedback?created_at=${filter}&limit=10000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getFeedbackDetail = async feedbackId => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/feedback/detail/${feedbackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getFeedbackStatistics = async () => {
  try {
    const response = await instanceAxiosAdmin.get('/feedback/statistic', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getRoomId = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-room/id/${Cookies.get('activeParams')}/${Cookies.get(
        'activeRoom'
      )}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getFeedbackQuestion = async clientLang => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/feedback/question/${clientLang}/${Cookies.get(
        'activeParams'
      )}?limit=1000`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getFeedbackWithID = async question_id => {
  try {
    if (question_id) {
      const response = await instanceAxiosAdmin.get(
        `/feedback/question/${question_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const deleteQuestion = async question_id => {
  try {
    if (question_id) {
      const response = await instanceAxiosAdmin.delete(
        `/feedback/question/${question_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const sendCustomerFeedback = async data => {
  try {
    if (data) {
      const response = await instanceAxiosAdmin.post('/feedback', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'

          // 'Content-Type': 'multipart/form-data'
        }
      })
      return response
    }
  } catch (error) {
    throw error
  }
}

export const sendTipToWaiter = async data => {
  try {
    if (data) {
      const response = await instanceAxiosAdmin.post('/payment/create', data, {
        headers: {
          Accept: 'application/json'
        }
      })
      return response
    }
  } catch (error) {
    throw error
  }
}

export const getRestaurantWaiterFeedbackList = async time => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/restaurant-admin-feedback/waiter/?time=${time}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteImg = async img_id => {
  try {
    if (img_id) {
      const response = await instanceAxiosAdmin.delete(
        `/hotel-restaurant-admin/meal/image/delete/${img_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

export const AddImg = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      '/hotel-restaurant-admin/meal/image/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const EditImg = async data => {
  try {
    const response = await instanceAxiosAdmin.put(
      `/hotel-restaurant-admin/meal/image/update/${data.img_id}`,
      {
        image: data.image
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const EditDeleteVideoDb = async data => {
  try {
    const response = await instanceAxiosAdmin.put(
      `/hotel-restaurant-admin/meal/video/delete-update/${data.meal_slug}`,
      {
        video: data.video
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const createPayment = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      '/payment/token/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getUserAuth = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/hotel-restaurant-admin/user-auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const createRestCampaign = async data => {
  try {
    const response = await instanceAxiosAdmin.post(
      '/restaurant-admin-campaign/create',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getRestCampaign = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/restaurant-admin-campaign/list?limit=1000',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const createRestInfo = async data => {
  try {
    const response = await instanceAxiosAdmin.patch(
      '/restaurant-admin/social-media/review/update/az',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getInfo = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/restaurant-admin/social-media/review/get/az',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const deleteCampaign = async () => {
  try {
    const response = await instanceAxiosAdmin.delete(
      `/restaurant-admin-campaign/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const putRestInfo = async data => {
  try {
    const response = await instanceAxiosAdmin.patch(
      '/restaurant-admin/social-media/update/az',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getInfo2 = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/restaurant-admin/social-media/get/az',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

//Get Facebook Pixel Id
export const getPixelId = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      '/restaurant-admin/get/fbpixel',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

// Add & Edit Facebook Pixel Id
export const changeFacebokPixelId = async data => {
  try {
    const response = await instanceAxiosAdmin.put(
      '/restaurant-admin/update/fbpixel',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

//Get Event Genre
export const getEventGenre = async () => {
  try {
    const response = await instanceAxiosAdmin.get('/event/genres/', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

//Get Event Music Type
export const getMusicType = async () => {
  try {
    const response = await instanceAxiosAdmin.get('/event/types/', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const createRestEvent = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/events/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// Change Rest Event
export const changeRestEvent = async data => {
  try {
    if (data.id) {
      const response = await instanceAxiosAdmin.put(
        `/events/${data.id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

//Get Events
export const getEvents = async offset => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/events/?offset=${offset}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

//Get Events
export const getAllEvents = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/events/?offset=0&limit=1000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

//Get Events
export const getEvent = async id => {
  try {
    if (id) {
      const response = await instanceAxiosAdmin.get(`/events/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
      return response
    }
  } catch (error) {
    throw error
  }
}

// Delete Rest Event
export const deleteRestEvent = async id => {
  try {
    if (id) {
      const response = await instanceAxiosAdmin.delete(`/events/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    }
  } catch (error) {
    throw error
  }
}

// Create Exhibit
export const createExhibit = async data => {
  try {
    const response = await instanceAxiosAdmin.post('/exhibits/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

// Edit Exhibit
export const editExhibit = async data => {
  try {
    const response = await instanceAxiosAdmin.patch(
      `/exhibits/${data?.ids?.museumId}/${data?.ids?.exhibitId}/`,
      data?.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getExhibit = async searchedValue => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/exhibits?name=${searchedValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getQrCodes = async () => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/download-exhibit-qrcodes/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getExhibitData = async (museumId, exhibitId) => {
  try {
    const response = await instanceAxiosAdmin.get(
      `/exhibits/${museumId}/${exhibitId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}

export const getMuseumData = async data => {
  try {
    if (data?.museumName && data?.exhibitName) {
      const response = await instanceAxiosAdmin.get(
        `/exhibits/${data?.museumName}/${data?.exhibitName}/`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      return response
    }
  } catch (error) {
    throw error
  }
}

// Delete Exhibit
export const deleteExhibit = async ids => {
  try {
    const response = await instanceAxiosAdmin.delete(
      `/exhibits/${ids.museumId}/${ids.id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    throw error
  }
}
