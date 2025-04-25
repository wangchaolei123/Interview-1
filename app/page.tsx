'use client';
import React, { useState } from 'react';
import './home.css';

const regMobile = /^1[3-9]\d{9}$/;
const regCode = /^\d{6}$/;

type ChangeEvent = React.ChangeEventHandler<HTMLInputElement>;
type FormEventHandler = React.FormEventHandler<HTMLFormElement>;

export default function Home() {
  const [disabled, setDisabled] = useState(false);
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeError, setCodeError] = useState('');

  // 验证手机号
  const validateMobile = (value: string): boolean => {
    if (!value) {
      setMobileError('请输入手机号');
      return false;
    }
    if (!regMobile.test(value)) {
      setMobileError('手机号格式错误');
      return false;
    }
    setMobileError('');
    return true;
  };

  const validateCode = (value: string): boolean => {
    if (!value) {
      setCodeError('请输入验证码');
      return false;
    }
    if (!regCode.test(value)) {
      setCodeError('验证码格式错误');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleMobileChange: ChangeEvent = (e) => {
    const value = e.target.value;
    setMobile(value);
    const validate = validateMobile(value);
    // if (!validate) {
    //   setDisabled(true);
    // }
    setDisabled(!validate);
  };

  const handleCodeChange: ChangeEvent = (e) => {
    const value = e.target.value;
    setCode(value);
    validateCode(value);
  };

  const sleep = (delay = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    console.log('onSubmit', e);
    const mobileValidate = validateMobile(mobile);
    const codeValidate = validateCode(code);
    const validate = mobileValidate && codeValidate;
    if (validate) {
      // 登录
      setIsSubmitting(true);
      await sleep(1000);
      // 打印1
      console.log({ mobile, code });
      const form = new FormData(e.target as HTMLFormElement);
      // 打印2
      const data: Partial<Record<string, string>> = {};
      for (const [key, value] of form.entries()) {
        data[key] = value as string;
      }
      console.log(data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <input
          placeholder="手机号"
          name="mobile"
          value={mobile}
          onChange={handleMobileChange}
        />
        {mobileError && <p className="form-error">{mobileError}</p>}
        {/* 表单错误提示，会出现两种情况
        1.必填校验，错误提示“请输入手机号”
        2.格式校验，需满足国内手机号规则，错误提示“手机号格式错误”
        举例：<p className="form-error">手机号格式错误</p> */}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input
            placeholder="验证码"
            name="code"
            value={code}
            onChange={handleCodeChange}
          />
          {/* getcode默认disabled=true，当mobile满足表单验证条件后才位false */}
          <button className="getcode" disabled={disabled}>
            获取验证码
          </button>
        </div>
        {codeError && <p className="form-error">{codeError}</p>}
        {/* 表单错误提示，会出现两种情况
        
        1.必填校验，错误提示“请输入验证码”
        2.格式校验，6位数字，错误提示“验证码格式错误”
        举例：<p className="form-error">验证码格式错误</p> */}
      </div>

      {/* 表单提交中，按钮内的文字会变成“submiting......” */}
      <button className="submit-btn">
        {isSubmitting ? 'submiting......' : '登录'}
      </button>
    </form>
  );
}
