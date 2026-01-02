import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { logo } from "./assets"
import { Home, CreatePost } from './pages'
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  RedirectToSignIn
} from '@clerk/clerk-react'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔒 SIGN IN ROUTE */}
        <Route
          path="/sign-in"
          element={
            <div className="min-h-screen flex items-center justify-center bg-black">
              <SignIn />
            </div>
          }
        />

        {/* ✅ PROTECTED APP */}
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                <header className="w-full flex justify-between items-center bg-yellow-500 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
                  <Link to="/">
                    <img src={logo} alt="logo" className="w-40 object-contain" />
                  </Link>

                  <div className="flex gap-4 items-center">
                    <Link
                      to="/create-post"
                      className="font-inter font-medium bg-black text-white px-4 py-2 rounded-md"
                    >
                      Create
                    </Link>
                    <UserButton afterSignOutUrl="/sign-in" />
                  </div>
                </header>

                <main className="sm:p-8 px-4 py-8 w-full bg-black min-h-[calc(100vh-73px)]">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-post" element={<CreatePost />} />
                  </Routes>
                </main>
              </SignedIn>

              {/* ❌ If NOT signed in → redirect */}
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App

// we will use react-router
// first Clerk sign-in screen appears
// once authenticated → dashboard always until logout
