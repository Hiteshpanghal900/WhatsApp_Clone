import React, { useState } from "react"
import { Route, Routes } from 'react-router-dom'

import Login from "./components/Login"
import Home from "./components/Home"
import PageNotFound from "./components/PageNotFound"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home ></Home>
        </ProtectedRoute>}></Route>

      <Route path="/:chatid" element={
          <ProtectedRoute><Home></Home></ProtectedRoute>
        }></Route>

        <Route path="/login" element={<Login ></Login>}></Route>
        <Route path="*" element={< PageNotFound />} />
      </Routes>
    </>
  )
}

export default App