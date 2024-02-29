import React, { useState } from "react";
import { Link } from "react-router-dom";

const FormRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cfmpassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    //Tên không được để trống
    if (!formData.username.trim()) {
      newErrors.username = "Vui lòng nhập tên của bạn";
    }
    //Email không được để trống
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email";
    }
    //Mật khẩu k được bỏ trống
    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else {
      //Mật khẩu phải từ 6 đến 20 kí tự
      if (formData.password.length < 6 || formData.password.length > 20) {
        newErrors.password = "Mật khẩu phải từ 6 đến 20 kí tự";
      }
    }
    //Phải nhập lại mật khẩu
    if (!formData.cfmpassword.trim()) {
      newErrors.cfmpassword = "Vui lòng nhập lại mật khẩu";
    } else {
      //Nhập lại mật khẩu phải khớp với mật khẩu ở trên
      if (formData.cfmpassword !== formData.password) {
        newErrors.cfmpassword = "Nhập lại mật khẩu không chính xác";
      }
    }
    //Phải nhập số điện thoại
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
    } else {
      //Số điện thoại phải là số và có 10 chữ số
      const numbericValue = formData.phoneNumber.replace(/\D/g, "");
      const isValid = /^\d{10}$/.test(numbericValue);
      if (!isValid) {
        newErrors.phoneNumber = "Số điện thoại không hợp lệ";
      }
      //Số điện thoại phải bắt đầu bằng số 0
      if (!formData.phoneNumber.startsWith("0")) {
        newErrors.phoneNumber = "Số điện thoại không hợp lệ";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", formData);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen py-14">
      <div>
        <div className="w-8/12 bg-[#FBFFF1] rounded-xl mx-auto shadow-2xl overflow-hidden flex">
          <div className="w-1/2 bg-img"></div>
          <div className="w-1/2 py-8 px-16 relative">
            <Link to="/">
              <i
                class="fa-solid fa-house cursor-pointer text-2xl text-blue-700 
              float-end absolute top-2 right-4 hover:text-[#C6AB00] transition-all"
              ></i>
            </Link>
            <h1 className="text-3xl font-bold uppercase mb-1">Xin chào!</h1>
            <h3 className="mb-4 text-[#6E757F] ">
              Hãy tạo tài khoản để đặt vé máy bay
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Tên của bạn
                </span>
                <input
                  className={`peer border border-gray-400 py-2 px-2
                  rounded focus:border-[#C6AB00] focus:outline-none w-full
                  ${!errors.username ? "border-gray-400" : "border-red-400"}`}
                  type="text"
                  name="username"
                  placeholder="Nhập tên của bạn"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs absolute">
                    {errors.username}
                  </p>
                )}
              </label>
              <label className="block mt-5">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </span>
                <input
                  className={`peer border border-gray-400 py-2 px-2
                  rounded focus:border-[#C6AB00] focus:outline-none w-full
                  ${!errors.email ? "border-gray-400" : "border-red-400"}`}
                  type="email"
                  name="email"
                  placeholder="Nhập địa chỉ Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs absolute">
                    {errors.email}
                  </p>
                )}
                <p className="invisible peer-invalid:visible text-red-500 text-xs absolute">
                  Địa chỉ email không hợp lệ
                </p>
              </label>
              <div className="flex gap-1 mt-5">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700 mb-2">
                    Mật khẩu
                  </span>
                  <input
                    className={`peer border border-gray-400 py-2 px-2
                  rounded focus:border-[#C6AB00] focus:outline-none w-full
                  ${!errors.password ? "border-gray-400" : "border-red-400"}`}
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs absolute">
                      {errors.password}
                    </p>
                  )}
                </label>
                <label className="block">
                  <div className="flex gap-5">
                    <div className="block text-sm font-medium text-slate-700 mb-2">
                      Nhập lại mật khẩu
                    </div>
                  </div>
                  <input
                    className={`peer border border-gray-400 py-2 px-2
                  rounded focus:border-[#C6AB00] focus:outline-none w-full
                  ${
                    !errors.cfmpassword ? "border-gray-400" : "border-red-400"
                  }`}
                    type="password"
                    name="cfmpassword"
                    placeholder="Xác nhận mật khẩu"
                    value={formData.cfmpassword}
                    onChange={handleInputChange}
                  />
                  {errors.cfmpassword && (
                    <p className="text-red-500 text-xs absolute">
                      {errors.cfmpassword}
                    </p>
                  )}
                </label>
              </div>
              <label className="block mt-5">
                <span className="block text-sm font-medium text-slate-700 mb-2">
                  Số điện thoại
                </span>
                <input
                  className={`peer border border-gray-400 py-2 px-2
                  rounded focus:border-[#C6AB00] focus:outline-none w-full
                  ${
                    !errors.phoneNumber ? "border-gray-400" : "border-red-400"
                  }`}
                  type="text"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs absolute">
                    {errors.phoneNumber}
                  </p>
                )}
              </label>

              <button
                className="mt-5 text-white font-semibold py-2 px-10 bg-blue-700 border rounded
                hover:bg-[#C6AB00] hover:text-white transition-all float-start"
                type="submit"
              >
                Đăng ký
              </button>
              {/* <i
                  class="text-2xl cursor-pointer fa-solid fa-house text-blue-700 hover:text-3xl transition-all
                hover:text-[#C6AB00]"
                ></i> */}
            </form>
            <div className="mt-5 cursor-default float-end">
              Bạn đã có tài khoản hãy{" "}
              <div className="text-blue-700 font-semibold cursor-pointer hover:text-[#C6AB00]">
                đăng nhập.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormRegister;
