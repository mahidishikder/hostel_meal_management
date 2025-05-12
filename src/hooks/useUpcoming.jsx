import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"



function useUpcoming() {
  const axiosPublic = useAxiosPublic()
  const {data : upcomingCard = [],refetch} = useQuery({
    queryKey:['upcomingCard'],
    queryFn: async () => {
      const res = await axiosPublic.get('/upcoming')
      return res.data
    }
  })
  return [upcomingCard,refetch]
}

export default useUpcoming