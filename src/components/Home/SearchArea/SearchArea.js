import Search from '@/components/common/Search/Search'
import { handleActiveSearch } from '@/redux/features/searchSlice'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import closeIcon from '../../../assets/icons/Home/Close.svg'

const SearchArea = () => {
  const selSearch = useSelector((state) => state.searchFilter.isActiveSearch)
  const dispatch = useDispatch()

  useEffect(() => {
    if (selSearch) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selSearch])

  return (
    <div
      className={`fixed overflow-y-auto bg-white opacity-100 ${
        !selSearch ? 'h-[0%]' : 'h-[100%]'
      } transition-all delay-200 ease-in w-full z-[999] bottom-0`}
    >
      <div
        className={`${
          selSearch ? 'opacity: 1' : 'opacity-0'
        }  transition-all delay-200 ease-in mb-[0px]`}
        onClick={() => dispatch(handleActiveSearch())}
      >
        <Image
          src={closeIcon}
          alt="closebtn"
          className={`fixed right-[5px] top-[5px] z-[9999] ${
            selSearch ? 'd-block' : 'd-none'
          }`}
        />
      </div>
      {selSearch && <Search />}
    </div>
  )
}

export default SearchArea
