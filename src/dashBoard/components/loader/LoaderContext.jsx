import React,{createContext,useState} from 'react'

const LoadContext = createContext({})








export const LoaderProvider = ({children}) => {

    const [loader, setLoader] = useState(false)
    
  return (
    <LoadContext.Provider value={{loader , setLoader}}>
        {children}
    </LoadContext.Provider>
  )
}

export default LoadContext