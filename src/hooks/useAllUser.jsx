import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"


function useAllUser() {
  const axiosPublic = useAxiosPublic()
  const {data : mealsCard = [],refetch} = useQuery({
    queryKey:['mealsCard'],
    queryFn: async () => {
      const res = await axiosPublic.get('/meals')
      return res.data
    }
  })
  return [mealsCard,refetch]
}

export default useAllUser