export function Footer() {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-100 to-pink-100 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center items-center">
          <div>
            <p className="text-sm text-purple-800/70">
              &copy; {new Date().getFullYear()} PGNear.me. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

