import { Link } from "react-router-dom"

type Props = {}

const NotFoundPage = (props: Props) => {
  return (
    <div>
        <h1>Not Found Page</h1>
        <Link to={"/"}>Home</Link>
    </div>
  )
}

export default NotFoundPage