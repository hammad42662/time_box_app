import LeftPane from "./leftPane";
import RightPane from "./rightPane";

export default function LoginContent({
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
    <div className=" flex">
      <LeftPane />
      <RightPane
        handleSubmit={handleSubmit}
        isLogin={isLogin}
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
        success={success}
        loading={loading}
        setIsLogin={setIsLogin}
      />
    </div>
  );
}
