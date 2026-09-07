import type { Locale } from './i18n';

export type AuthScreen =
  | 'signup'
  | 'login'
  | 'email-login'
  | 'sso'
  | 'forgot-password';

export type AuthContent = {
  meta: Record<AuthScreen, { title: string; description: string }>;
  shell: {
    homeLabel: string;
    switchLanguage: string;
    alternateLocaleName: string;
    statement: string;
    description: string;
    benefits: readonly { title: string; body: string; href: string }[];
    customerLead: string;
    testimonials: readonly {
      quote: string;
      person: string;
      company: string;
    }[];
    previousTestimonial: string;
    nextTestimonial: string;
    blog: string;
    docs: string;
    resourcesLabel: string;
    authenticationSection: string;
  };
  common: {
    back: string;
    email: string;
    password: string;
    showPassword: string;
    hidePassword: string;
    next: string;
    continue: string;
    or: string;
    submitPending: string;
    retry: string;
    termsPrefix: string;
    terms: string;
    termsJoin: string;
    dataAgreement: string;
    termsSuffix: string;
    opensInNewTab: string;
  };
  preview: {
    banner: string;
    signupTitle: string;
    signupDescription: string;
    loginTitle: string;
    loginDescription: string;
    ssoTitle: string;
    ssoDescription: string;
    resetTitle: string;
    resetDescription: string;
    verificationHelp: string;
    verificationUnavailable: string;
    verificationLoadError: string;
  };
  legal: {
    termsTitle: string;
    dataAgreementTitle: string;
    status: string;
    description: string;
    assurance: string;
    backToSignup: string;
    termsMetaDescription: string;
    dataAgreementMetaDescription: string;
  };
  docsPage: {
    title: string;
    metaDescription: string;
    intro: string;
    backToLogin: string;
    browserContractTitle: string;
    browserContractDescription: string;
    endpointsTitle: string;
    endpoints: readonly { method: string; path: string; purpose: string }[];
    liveReadinessTitle: string;
    liveReadinessItems: readonly string[];
    securityTitle: string;
    securityDescription: string;
  };
  signup: {
    title: string;
    existingAccount: string;
    login: string;
    detailsTitle: string;
    detailsDescription: string;
    fullName: string;
    fullNamePlaceholder: string;
    passwordHint: string;
    confirmPassword: string;
    passwordRules: {
      minLength: string;
      lowercase: string;
      uppercase: string;
      number: string;
      special: string;
      match: string;
    };
    passwordProgress: string;
    humanVerification: string;
    humanVerificationHelp: string;
    createAccount: string;
    changeEmail: string;
    successTitle: string;
    successDescription: string;
    goToLogin: string;
    resend: string;
    resendSuccess: string;
    acceptTerms: string;
  };
  login: {
    title: string;
    emailLogin: string;
    ssoLogin: string;
    noAccount: string;
    signup: string;
    emailTitle: string;
    forgotPassword: string;
    loginAction: string;
    successTitle: string;
    successDescription: string;
  };
  sso: {
    title: string;
    description: string;
    workEmail: string;
    workEmailPlaceholder: string;
    accountId: string;
    accountIdPlaceholder: string;
    exclusiveHint: string;
    workEmailSelected: string;
    accountIdSelected: string;
    successTitle: string;
    successDescription: string;
  };
  reset: {
    title: string;
    description: string;
    send: string;
    successTitle: string;
    successDescription: string;
    backToLogin: string;
  };
  validation: {
    requiredEmail: string;
    invalidEmail: string;
    requiredName: string;
    shortPassword: string;
    passwordMismatch: string;
    humanVerification: string;
    requiredPassword: string;
    ssoIdentifier: string;
    invalidAccountId: string;
    genericError: string;
    termsAcceptance: string;
    apiErrors: {
      credentials: string;
      invalidRequest: string;
      invalidResponse: string;
      notConfigured: string;
      rateLimited: string;
      rejected: string;
      ssoDestination: string;
      timeout: string;
      unavailable: string;
    };
  };
};

const en: AuthContent = {
  meta: {
    signup: {
      title: 'Create account | AURINOVA',
      description:
        'Create an AURINOVA account and start building with open models.',
    },
    login: {
      title: 'Log in | AURINOVA',
      description: 'Log in to your AURINOVA account.',
    },
    'email-login': {
      title: 'Email login | AURINOVA',
      description: 'Log in to AURINOVA with your email and password.',
    },
    sso: {
      title: 'Enterprise SSO | AURINOVA',
      description: 'Continue to your organization through enterprise SSO.',
    },
    'forgot-password': {
      title: 'Reset password | AURINOVA',
      description: 'Request a secure AURINOVA password reset link.',
    },
  },
  shell: {
    homeLabel: 'AURINOVA home',
    switchLanguage: 'Switch to Chinese',
    alternateLocaleName: '中文',
    statement: 'Context. Verify. Learn.',
    description:
      'Connect real engineering work with task context, verification and reusable enterprise knowledge through FormSy.',
    benefits: [
      {
        title: 'Own Your AI:',
        body: 'Control your models, data, and costs',
        href: '/aurinova-reference#platform',
      },
      {
        title: 'Build useful context:',
        body: 'Connect task goals, knowledge and evidence',
        href: '/aurinova-reference#platform',
      },
      {
        title: 'Scale with confidence:',
        body: 'Explore pilot evaluation and enterprise deployment',
        href: '/aurinova-reference/pricing',
      },
      {
        title: 'Keep model choice:',
        body: 'Plan model access around your deployment boundaries',
        href: '/aurinova-reference#models-deployment',
      },
    ],
    customerLead: 'Platform principles:',
    testimonials: [
      {
        quote:
          'Keep model choice, data, cost, and deployment capacity legible in one operational layer.',
        person: 'PLATFORM PRINCIPLE 01',
        company: 'AURINOVA',
      },
      {
        quote:
          'Define acceptance criteria before execution and retain evidence with every task.',
        person: 'PLATFORM PRINCIPLE 02',
        company: 'AURINOVA',
      },
    ],
    previousTestimonial: 'Previous platform principle',
    nextTestimonial: 'Next platform principle',
    blog: 'Blog',
    docs: 'Docs',
    resourcesLabel: 'AURINOVA resources',
    authenticationSection: 'Authentication',
  },
  common: {
    back: 'Back',
    email: 'Email',
    password: 'Password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    next: 'Next',
    continue: 'Continue',
    or: 'OR',
    submitPending: 'Please wait…',
    retry: 'Try again',
    termsPrefix: 'By continuing, you agree to our',
    terms: 'Terms of service',
    termsJoin: 'and',
    dataAgreement: 'Data Processing Agreement',
    termsSuffix: '.',
    opensInNewTab: 'opens in a new tab',
  },
  preview: {
    banner:
      'Preview mode — interactions are simulated locally and no account, session, or email is created.',
    signupTitle: 'Signup flow complete',
    signupDescription:
      'This preview validated the complete signup flow for {email}. No account or verification email was created.',
    loginTitle: 'Login flow complete',
    loginDescription:
      'This preview validated the email-login flow. No session was created.',
    ssoTitle: 'SSO flow complete',
    ssoDescription:
      'This preview validated the organization lookup. No identity provider was opened.',
    resetTitle: 'Reset flow complete',
    resetDescription:
      'This preview validated the reset request for {email}. No email was sent.',
    verificationHelp:
      'Local preview check; no verification service is contacted.',
    verificationUnavailable:
      'Human verification is not configured. Add the Turnstile site key before enabling live signup.',
    verificationLoadError:
      'Human verification could not load. Check your connection and try again.',
  },
  legal: {
    termsTitle: 'Terms of service',
    dataAgreementTitle: 'Data Processing Agreement',
    status: 'Legal document preview',
    description:
      'The approved AURINOVA legal document has not been connected to this demonstration yet.',
    assurance:
      'Live account creation remains disabled by default. The reviewed document will replace this notice before authentication is enabled.',
    backToSignup: 'Back to signup',
    termsMetaDescription: 'AURINOVA terms of service status.',
    dataAgreementMetaDescription: 'AURINOVA data processing agreement status.',
  },
  docsPage: {
    title: 'Authentication integration',
    metaDescription:
      'Integrate AURINOVA phone, WeChat, email, SSO, and recovery flows with an identity service.',
    intro:
      'The browser talks only to same-origin AURINOVA endpoints. The server adapter validates each request, forwards a narrow contract to your identity service, and returns public response shapes to the interface.',
    backToLogin: 'Back to Log In',
    browserContractTitle: 'Browser contract',
    browserContractDescription:
      'Keep these same-origin routes stable while the upstream identity provider evolves. Live destinations remain server-side configuration.',
    endpointsTitle: 'Available routes',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/signup/prepare',
        purpose: 'Start email signup and receive a short-lived signup token.',
      },
      {
        method: 'POST',
        path: '/api/auth/signup/complete',
        purpose: 'Submit profile, password, verification, and consent.',
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        purpose: 'Exchange email credentials for a safe workspace destination.',
      },
      {
        method: 'POST',
        path: '/api/auth/sso/resolve',
        purpose: 'Resolve exactly one work email or account ID to an IdP.',
      },
      {
        method: 'POST',
        path: '/api/auth/password/reset-request',
        purpose: 'Request recovery without exposing whether an account exists.',
      },
      {
        method: 'POST',
        path: '/api/auth/phone/code',
        purpose: 'Send a one-time code for phone login or signup.',
      },
      {
        method: 'POST',
        path: '/api/auth/phone/verify',
        purpose:
          'Verify the phone code and return a safe workspace destination.',
      },
      {
        method: 'POST',
        path: '/api/auth/wechat/session',
        purpose: 'Create a short-lived WeChat QR login session.',
      },
    ],
    liveReadinessTitle: 'Live readiness',
    liveReadinessItems: [
      'Configure the server-only identity-service base URL and cookie allowlist.',
      'Enable authentication explicitly; signup also requires Turnstile and approved legal destinations.',
      'Return only same-origin relative redirect destinations from login and SSO.',
    ],
    securityTitle: 'Security boundary',
    securityDescription:
      'Requests are origin checked, schema validated, byte limited, and sent without browser access to upstream secrets. Session cookies are relayed only from the configured allowlist. Unknown upstream client errors are replaced with stable public messages.',
  },
  signup: {
    title: 'Create Account',
    existingAccount: 'Already have an account?',
    login: 'Log In',
    detailsTitle: 'Finish creating your account',
    detailsDescription:
      'Use a strong password to secure your AURINOVA workspace.',
    fullName: 'Full name',
    fullNamePlaceholder: 'Ada Lovelace',
    passwordHint: 'Use at least 8 characters.',
    confirmPassword: 'Confirm password',
    passwordRules: {
      minLength: 'Password has at least 8 characters.',
      lowercase: 'Password has a lowercase letter.',
      uppercase: 'Password has an uppercase letter.',
      number: 'Password has a number.',
      special: 'Password has a special character.',
      match: 'Passwords match.',
    },
    passwordProgress: 'Password requirements met: {completed} of {total}.',
    humanVerification: 'Verify you are human',
    humanVerificationHelp: 'Required before account creation.',
    createAccount: 'Create account',
    changeEmail: 'Use a different email',
    successTitle: 'Check your inbox',
    successDescription:
      'We sent a verification link to {email}. Open it to finish setting up your account.',
    goToLogin: 'Go to Log In',
    resend: 'Resend verification email',
    resendSuccess: 'A new verification email is on its way.',
    acceptTerms: 'I accept the',
  },
  login: {
    title: 'Log In',
    emailLogin: 'Email Login',
    ssoLogin: 'Custom SSO Login',
    noAccount: "Don't have an account?",
    signup: 'Sign Up',
    emailTitle: 'Email Login',
    forgotPassword: 'Forgot Password?',
    loginAction: 'Next',
    successTitle: 'Welcome back',
    successDescription:
      'Your login request was accepted. Your workspace will open after the account service returns a destination.',
  },
  sso: {
    title: 'Custom SSO Login',
    description:
      'Enter either your work email or account ID to continue to your company SSO.',
    workEmail: 'Work email',
    workEmailPlaceholder: 'you@company.com',
    accountId: 'Account ID',
    accountIdPlaceholder: 'your-company-account',
    exclusiveHint:
      'Use one identifier. Filling one clears and disables the other.',
    workEmailSelected: 'Work email selected. Clear it to use an account ID.',
    accountIdSelected: 'Account ID selected. Clear it to use a work email.',
    successTitle: 'Organization found',
    successDescription:
      'Your organization’s identity service will open when the SSO endpoint is connected.',
  },
  reset: {
    title: 'Reset your password',
    description:
      'Enter your account email and we’ll send you a secure reset link.',
    send: 'Send reset link',
    successTitle: 'Check your inbox',
    successDescription:
      'If an account exists for {email}, a password reset link has been sent.',
    backToLogin: 'Back to Log In',
  },
  validation: {
    requiredEmail: 'Enter your email address.',
    invalidEmail: 'Enter a valid email address.',
    requiredName: 'Enter your full name.',
    shortPassword: 'Use at least 8 characters.',
    passwordMismatch: 'The passwords do not match.',
    humanVerification: 'Complete the human verification.',
    requiredPassword: 'Enter your password.',
    ssoIdentifier: 'Enter a work email or account ID.',
    invalidAccountId:
      'Use letters, numbers, periods, underscores, or hyphens for the account ID.',
    genericError:
      'We could not complete that request. Check your connection and try again.',
    termsAcceptance: 'Accept the terms to create your account.',
    apiErrors: {
      credentials: 'The email or password could not be verified.',
      invalidRequest: 'Review the highlighted fields and try again.',
      invalidResponse:
        'The account service returned an unexpected response. Try again shortly.',
      notConfigured: 'Live authentication has not been enabled yet.',
      rateLimited: 'Too many attempts. Wait a moment and try again.',
      rejected: 'This authentication request could not be verified.',
      ssoDestination:
        'Your organization’s identity provider could not be opened. Try again or contact your administrator.',
      timeout: 'The account service took too long to respond. Try again.',
      unavailable: 'The account service is temporarily unavailable. Try again.',
    },
  },
};

const zh: AuthContent = {
  meta: {
    signup: {
      title: '注册 | AURINOVA',
      description: '创建 AURINOVA 账户。服务可用性以页面状态为准。',
    },
    login: {
      title: '登录 | AURINOVA',
      description: '登录你的 AURINOVA 账户。',
    },
    'email-login': {
      title: '邮箱登录 | AURINOVA',
      description: '使用邮箱和密码登录 AURINOVA。',
    },
    sso: {
      title: '企业 SSO | AURINOVA',
      description: '通过企业 SSO 进入你的组织。',
    },
    'forgot-password': {
      title: '重置密码 | AURINOVA',
      description: '申请安全的 AURINOVA 密码重置链接。',
    },
  },
  shell: {
    homeLabel: 'AURINOVA 首页',
    switchLanguage: '切换到英文',
    alternateLocaleName: 'EN',
    statement: '上下文。验证。学习。',
    description:
      '通过 FormSy 连接真实工程任务、上下文、验证与可复用的企业知识。',
    benefits: [
      {
        title: '掌控你的 AI：',
        body: '掌控模型、数据和成本',
        href: '/aurinova-reference#platform',
      },
      {
        title: '组织任务上下文：',
        body: '连接任务目标、企业知识与执行证据',
        href: '/aurinova-reference#platform',
      },
      {
        title: '稳健扩展：',
        body: '探索试点验证与企业部署方案',
        href: '/aurinova-reference/pricing',
      },
      {
        title: '保留模型选择权：',
        body: '围绕部署边界规划模型接入',
        href: '/aurinova-reference#models-deployment',
      },
    ],
    customerLead: '平台原则：',
    testimonials: [
      {
        quote: '在统一操作层中，让模型选择、数据、成本与部署容量清晰可控。',
        person: '平台原则 01',
        company: 'AURINOVA',
      },
      {
        quote: '执行前定义完成标准，为每个任务保留可复核的证据。',
        person: '平台原则 02',
        company: 'AURINOVA',
      },
    ],
    previousTestimonial: '上一条平台原则',
    nextTestimonial: '下一条平台原则',
    blog: '博客',
    docs: '文档',
    resourcesLabel: 'AURINOVA 资源',
    authenticationSection: '身份验证',
  },
  common: {
    back: '返回',
    email: '邮箱',
    password: '密码',
    showPassword: '显示密码',
    hidePassword: '隐藏密码',
    next: '下一步',
    continue: '继续',
    or: '或',
    submitPending: '处理中…',
    retry: '重试',
    termsPrefix: '继续操作即表示你同意',
    terms: '服务条款',
    termsJoin: '与',
    dataAgreement: '数据处理协议',
    termsSuffix: '。',
    opensInNewTab: '在新标签页中打开',
  },
  preview: {
    banner: '预览模式：交互仅在本地模拟，不会创建账户、会话或发送邮件。',
    signupTitle: '注册流程验证完成',
    signupDescription:
      '已完成 {email} 的注册流程验证。本次预览未创建账户或发送验证邮件。',
    loginTitle: '登录流程验证完成',
    loginDescription: '已完成邮箱登录流程验证。本次预览未创建会话。',
    ssoTitle: 'SSO 流程验证完成',
    ssoDescription: '已完成组织查询流程验证。本次预览未打开身份提供商。',
    resetTitle: '重置流程验证完成',
    resetDescription: '已完成 {email} 的密码重置请求验证。本次预览未发送邮件。',
    verificationHelp: '本地预览校验，不会请求验证服务。',
    verificationUnavailable:
      '尚未配置真人验证。启用正式注册前，请先配置 Turnstile 站点密钥。',
    verificationLoadError: '真人验证加载失败，请检查网络后重试。',
  },
  legal: {
    termsTitle: '服务条款',
    dataAgreementTitle: '数据处理协议',
    status: '法律文件预览',
    description: '此演示尚未接入经过审核的 AURINOVA 法律文件。',
    assurance:
      '正式账户创建默认保持关闭。启用身份验证前，此提示将替换为已审核文件。',
    backToSignup: '返回注册',
    termsMetaDescription: 'AURINOVA 服务条款状态。',
    dataAgreementMetaDescription: 'AURINOVA 数据处理协议状态。',
  },
  docsPage: {
    title: '身份验证接入文档',
    metaDescription:
      '将 AURINOVA 手机、微信、邮箱、企业 SSO 与账户恢复流程接入身份服务。',
    intro:
      '浏览器只访问 AURINOVA 同源接口。服务端适配层会验证请求，将收窄后的契约转发至身份服务，并向界面返回稳定的公开响应。',
    backToLogin: '返回登录',
    browserContractTitle: '浏览器契约',
    browserContractDescription:
      '上游身份服务可持续演进，同时保持这些同源路由稳定。正式服务地址仅通过服务端配置提供。',
    endpointsTitle: '可用路由',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/signup/prepare',
        purpose: '开始邮箱注册并获取短期注册令牌。',
      },
      {
        method: 'POST',
        path: '/api/auth/signup/complete',
        purpose: '提交账户资料、密码、真人验证与条款同意状态。',
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        purpose: '验证邮箱凭据并返回安全的工作区目标。',
      },
      {
        method: 'POST',
        path: '/api/auth/sso/resolve',
        purpose: '使用工作邮箱或账户 ID 二者之一查找身份提供商。',
      },
      {
        method: 'POST',
        path: '/api/auth/password/reset-request',
        purpose: '申请账户恢复，同时隐藏账户是否存在。',
      },
      {
        method: 'POST',
        path: '/api/auth/phone/code',
        purpose: '发送用于手机登录或注册的一次性验证码。',
      },
      {
        method: 'POST',
        path: '/api/auth/phone/verify',
        purpose: '验证手机验证码并返回安全的工作区目标。',
      },
      {
        method: 'POST',
        path: '/api/auth/wechat/session',
        purpose: '创建短时有效的微信扫码登录会话。',
      },
    ],
    liveReadinessTitle: '正式接入准备',
    liveReadinessItems: [
      '配置仅服务端可见的身份服务地址与 Cookie 白名单。',
      '显式启用身份验证；正式注册还需要 Turnstile 与经过审核的法律文件地址。',
      '登录与 SSO 仅返回同源相对跳转地址。',
    ],
    securityTitle: '安全边界',
    securityDescription:
      '请求会经过来源校验、结构校验与字节上限控制，浏览器无法接触上游密钥。会话 Cookie 仅按配置白名单转发，未知上游客户端错误会被替换为稳定公开信息。',
  },
  signup: {
    title: '创建账户',
    existingAccount: '已有账户？',
    login: '登录',
    detailsTitle: '完成账户创建',
    detailsDescription: '使用高强度密码保护你的 AURINOVA 工作区。',
    fullName: '姓名',
    fullNamePlaceholder: '张三',
    passwordHint: '至少使用 8 个字符。',
    confirmPassword: '确认密码',
    passwordRules: {
      minLength: '密码至少包含 8 个字符。',
      lowercase: '密码包含小写字母。',
      uppercase: '密码包含大写字母。',
      number: '密码包含数字。',
      special: '密码包含特殊字符。',
      match: '两次输入的密码一致。',
    },
    passwordProgress: '已满足密码要求：{completed} / {total}。',
    humanVerification: '请确认你是真人',
    humanVerificationHelp: '创建账户前需要完成验证。',
    createAccount: '创建账户',
    changeEmail: '更换邮箱',
    successTitle: '请查收邮件',
    successDescription: '验证链接已发送至 {email}。打开链接即可完成账户设置。',
    goToLogin: '前往登录',
    resend: '重新发送验证邮件',
    resendSuccess: '新的验证邮件已发送。',
    acceptTerms: '我同意',
  },
  login: {
    title: '登录',
    emailLogin: '邮箱登录',
    ssoLogin: '企业 SSO 登录',
    noAccount: '还没有账户？',
    signup: '注册',
    emailTitle: '邮箱登录',
    forgotPassword: '忘记密码？',
    loginAction: '下一步',
    successTitle: '欢迎回来',
    successDescription:
      '登录请求已接收。账户服务返回目标地址后，将自动进入工作区。',
  },
  sso: {
    title: '企业 SSO 登录',
    description: '输入工作邮箱或账户 ID 二者之一，继续使用公司的单点登录。',
    workEmail: '工作邮箱',
    workEmailPlaceholder: 'you@company.com',
    accountId: '账户 ID',
    accountIdPlaceholder: 'your-company-account',
    exclusiveHint: '请选择一种标识。填写其中一项后，另一项会被清空并禁用。',
    workEmailSelected: '已选择工作邮箱。清空后可改用账户 ID。',
    accountIdSelected: '已选择账户 ID。清空后可改用工作邮箱。',
    successTitle: '已找到组织',
    successDescription: '接入 SSO 接口后，此处将打开你所属组织的身份服务。',
  },
  reset: {
    title: '重置密码',
    description: '输入账户邮箱，我们会发送安全的密码重置链接。',
    send: '发送重置链接',
    successTitle: '请查收邮件',
    successDescription: '如果 {email} 已注册，密码重置链接已发送。',
    backToLogin: '返回登录',
  },
  validation: {
    requiredEmail: '请输入邮箱地址。',
    invalidEmail: '请输入有效的邮箱地址。',
    requiredName: '请输入姓名。',
    shortPassword: '密码至少需要 8 个字符。',
    passwordMismatch: '两次输入的密码不一致。',
    humanVerification: '请完成真人验证。',
    requiredPassword: '请输入密码。',
    ssoIdentifier: '请输入工作邮箱或账户 ID。',
    invalidAccountId: '账户 ID 仅可包含字母、数字、点、下划线或连字符。',
    genericError: '请求未能完成。请检查网络后重试。',
    termsAcceptance: '请先同意相关条款，再创建账户。',
    apiErrors: {
      credentials: '邮箱或密码无法验证。',
      invalidRequest: '请检查标出的内容后重试。',
      invalidResponse: '账户服务返回了异常响应，请稍后重试。',
      notConfigured: '正式身份验证尚未启用。',
      rateLimited: '尝试次数过多，请稍候再试。',
      rejected: '此身份验证请求无法通过校验。',
      ssoDestination: '无法打开组织身份服务，请重试或联系管理员。',
      timeout: '账户服务响应超时，请重试。',
      unavailable: '账户服务暂时不可用，请稍后重试。',
    },
  },
};

export const authDictionaries = {
  'en-US': en,
  'zh-CN': zh,
} as const satisfies Record<Locale, AuthContent>;
