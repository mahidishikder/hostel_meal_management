import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"


function useReview() {
  const axiosPublic = useAxiosPublic()
  const {data : userReview = [],refetch} = useQuery({
    queryKey:['userReview'],
    queryFn: async () => {
      const res = await axiosPublic.get('/reviews')
      return res.data
    }
  })
  return [userReview,refetch]
}

export default useReview