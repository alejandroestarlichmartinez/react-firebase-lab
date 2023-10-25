import { useUserContext } from "../context/UserContext"

export const Dashboard = () => {
  const { user }: any = useUserContext();
  console.log(user)
  return (
    <div>Welcome { user.name }</div>
  )
}