import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../config";

const Login = () => {
  const [loginData, setLoginData] = useState({}); // ✅ initialize with empty object
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const newData = { ...loginData };
    newData[name] = value;
    setLoginData(newData);
  };

  console.log("Login Data", loginData); // ✅ should now log correctly

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await baseUrl.post("/user/login", loginData);
      console.log("Login Response", res); // check full response

      if (res.status === 200) {
        localStorage.setItem("loginData", JSON.stringify(res.data));
        navigate("/chat");
      }
    } catch (error) {
      console.error("Login Failed", error?.response?.data || error.message);
    }
  };

  return (
    <div className="">
      <div className="bg-indigo-100 flex justify-center items-center h-screen">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="border w-[400px] h-11  rounded-md mb-2 p-2"
            placeholder="Email"
            name="email"
            onChange={handleChange} // ✅ use onChange instead of onBlur
          />
          <br />
          <input
            type="password"
            className="border w-[400px] h-11 rounded-md mb-2 p-2"
            placeholder="Password"
            name="password"
            onChange={handleChange} // ✅ use onChange instead of onBlur
          />
          <br />
          <input
            type="submit"
            className="bg-indigo-500 text-white border w-[400px] h-11 rounded-md mb-2 p-2 cursor-pointer"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
