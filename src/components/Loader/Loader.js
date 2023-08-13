import { useSelector } from "react-redux";
import { selectIsLoading } from "redux/contactListReduser";

const { Bars } = require("react-loader-spinner");

export const Loader =()=>{
    const isLoading = useSelector(selectIsLoading)
    
    return (
<Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={isLoading}
  
/>
    )
}
