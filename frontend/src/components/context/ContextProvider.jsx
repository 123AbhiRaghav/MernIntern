import {createContext, useState} from 'react'

export const addData = createContext()
export const updateData = createContext()
export const deletedata = createContext()

const ContextProvider = ({children}) => {
    const [userAdd, setUserAdd] = useState("")
    const [update, setUpdate] = useState("")
    const [deleteuser, setDeleteUser] = useState("")
  return (
    <>
      <addData.Provider value={{userAdd, setUserAdd}}>
          <updateData.Provider value={{update,setUpdate}}>
            <deletedata.Provider value={{deleteuser, setDeleteUser}}>
            {children}
            </deletedata.Provider>
          </updateData.Provider>
      </addData.Provider>
    </>
  )
}

export default ContextProvider
