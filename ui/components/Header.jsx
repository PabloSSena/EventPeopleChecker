import React from 'react'

export const Header = () => {

  return (
    <>
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
              <h1 className="flex no-underline">
                  <img height="40" width="40" alt="logo" className="h-8 w-8 mr-1 object-contain" src="/icon1.png" />
                  <span className="text-palette-primary text-xl font-primary font-extrabold tracking-tight pt-1">
                      Checkall
                  </span>
              </h1>
          </div>
    </header>
        <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
            Your favorite event manager
        </h1></>
  )
}