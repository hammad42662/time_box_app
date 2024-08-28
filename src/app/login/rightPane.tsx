export default function RightPane({
  handleSubmit,
  isLogin,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  error,
  success,
  loading,
  setIsLogin,
}: any) {
  return (
    <div className="flex items-center justify-center flex-1 ml-2 mr-2 text-black">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              {isLogin ? "Username or Email" : "Username"}
            </label>
            <input
              type="text"
              id="username"
              className="form-input w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <button
            type="submit"
            className="bg-blue-400 w-20 text-white px-2 py-2 rounded-md hover:bg-blue-700"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          {isLogin ? (
            <p>
              Don&apos;t have an account?
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-500 ml-2 cursor-pointer"
              >
                Sign up here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-500 ml-2 cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
