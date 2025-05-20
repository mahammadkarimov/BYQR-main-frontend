'use client'
import Image from 'next/image'
import React from 'react'
import styles from './login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '@/firebaseConfig'
import salad from '../../../assets/images/Admin/Login/salad.jpg'
import hidePass from '../../../assets/icons/Admin/mainAdmin/hidePass.svg'

import { useMutation } from 'react-query'
import { useRef } from 'react'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import { GetRestaurantListFromHotel, LoginUser } from '../../../services/api/dataApi'
import { useDispatch } from 'react-redux'
import { handleIdentifyUser, handleRestFeedbackState } from '@/redux/features/identifyUser'

const Login = () => {
  const emailInpRef = useRef(null)
  const passInpRef = useRef(null)
  const pathname = usePathname()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Please fill in the box'),
      password: Yup.string().required('Please fill in the box'),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      resetForm()
    },
  })

  // LoginUserFirebase
  const LoginUserFirebase = async () => {
    const auth = getAuth(app)
    await signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }

  const { mutate: login } = useMutation({
    mutationFn: (userData) => LoginUser(userData),
    onSuccess: async (data) => {
      console.log(data)
      if (data?.data?.user_type === 'hotel') {
        const hotelRestData = await GetRestaurantListFromHotel(data?.data?.username)
        if (hotelRestData.data?.results[0]?.username) {
          Cookies.set('user-type', 'hotel')
          Cookies.set('hotel-rest-username', hotelRestData.data?.results[0]?.username)
          location.href = `/${pathname.slice(1, 3)}/admin`
        } else {
          Cookies.set('user-type', 'hotel')
          location.href = `/${pathname.slice(1, 3)}/admin?user-type=hotel`
        }
      } else {
        dispatch(handleIdentifyUser(data?.data?.user_type))
        dispatch(handleRestFeedbackState(data?.data?.package?.feedback))
        Cookies.set('hotel-rest-username', data?.data?.username)
        if(data?.data?.username === 'obaoschuman'){
          location.href = `/en/admin/products`
        }else {
          location.href = `/${pathname.slice(1, 3)}/admin`
        } 
      }
      Cookies.set('access_token', data?.data?.access)
      Cookies.set('restaurant_username', data?.data?.username)
      toast.success('Login process is successful')
      LoginUserFirebase()
    },
    onError: () => {
      toast.error("Oops, something didn't go right!")
    },
  })

  const handleUser = () => {
    validateEmailPass()
  }

  const validateEmailPass = () => {
    const emailInp = emailInpRef.current
    const passInp = passInpRef.current
    if (emailInp.value && passInp.value) {
      login({
        email: emailInp.value,
        password: passInp.value,
      })
    } else {
      toast.error('Please, enter email and password!')
    }
  }

  const showPass = (e) => {
    if (passInpRef.current.type === 'password') {
      passInpRef.current.type = 'text';
    } else {
      passInpRef.current.type = 'password';
    }
  }

  return (
    <div className="flex">
      <div className={styles['imageContainer']}>
        <Image
          src={salad}
          fill={true}
          loading="eager"
          alt="salad"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles['inputContainer']}>
        <div className="flex flex-col gap-3 h-[60%] w-[85%] md:w-[50%]">
          <h1>Login to Account</h1>
          <p>Please enter your email and password to continue</p>
          <form onSubmit={formik.handleSubmit}>
            <label>Email Address</label>
            <br />
            <input
              ref={emailInpRef}
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email Address"
            />
            <br />
            {formik.errors.email && formik.touched.email && (
              <div
                style={{
                  color: 'red',
                  marginBottom: '20px',
                  fontSize: '12px',
                }}
              >
                {formik.errors.email}
              </div>
            )}
            <label>Password</label>
            <br />
            <div className='relative'>
              <input
                ref={passInpRef}
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
              />
              <span onClick={showPass} className='absolute w-[22px] cursor-pointer top-2 right-6'>
                <Image src={hidePass} className='w-[24px]' alt="hide-pass" />
              </span>
            </div>
            <br />
            {formik.errors.password && formik.touched.password && (
              <div style={{ color: 'red', fontSize: '12px' }}>
                {formik.errors.password}
              </div>
            )}
            <button type="submit" onClick={() => handleUser()}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
