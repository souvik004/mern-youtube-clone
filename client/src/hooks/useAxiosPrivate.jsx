import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { axiosPrivate } from '../apiRequest'
import { selectCurrentUser } from '../features/authSlice'

const useAxiosPrivate = () => {
  const currenUser = useSelector(selectCurrentUser)
//   const refresh = useRefreshToken()

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
        config => {
            console.log(config)
            if(!config?.headers['Authorization']){
                config.headers['Authorization'] = `Bearer ${currenUser?.accessToken}`
            }
            return config
        }, (error) => Promise.reject(error)
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            console.log(error)
            const prevRequest = error?.config

            // if(error?.response?.status === 403 && !prevRequest?.sent){
            //     prevRequest.sent = true
            //     const newAccessToken = await refresh()
            //     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            //     return axiosPrivate(prevRequest)
            // }
            return Promise.reject(error)
        }
    )
  
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [currenUser])
  
  return axiosPrivate
}

export default useAxiosPrivate