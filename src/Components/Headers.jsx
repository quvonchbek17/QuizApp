import React from 'react'

function Headers() {
  return (
    <header className="bg-black mx-auto  px-4">
      <div className="flex justify-between">
        <h2 className="text-sky-600 text-4xl border-r-2 py-4 px-4">QuizApp</h2>
        <a className="text-white pr-6" href="https://sardorcode/QuizApp">
          <i className="fa-brands fa-github text-5xl border-l-2 py-4 px-4"></i>
        </a>
      </div>
    </header>
  );
}

export default Headers
