import type { Locale } from './i18n';

export type AuthScreen =
  | 'signup'
  | 'login'
  | 'email-login'
  | 'sso'
  | 'forgot-password';

export type AuthProvider = 'google' | 'github' | 'linkedin';

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
    customerLink: string;
    testimonials: readonly {
      quote: string;
      person: string;
      company: string;
    }[];
    previousTestimonial: string;
    nextTestimonial: string;
    blog: string;
    docs: string;
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
    providers: Record<AuthProvider, string>;
    termsPrefix: string;
    terms: string;
    termsJoin: string;
    dataAgreement: string;
    termsSuffix: string;
  };
  signup: {
    title: string;
    providerPrefix: string;
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
      mixedCase: string;
      number: string;
      special: string;
      match: string;
    };
    humanVerification: string;
    humanVerificationHelp: string;
    createAccount: string;
    changeEmail: string;
    successTitle: string;
    successDescription: string;
    goToLogin: string;
    resend: string;
    resendSuccess: string;
  };
  login: {
    title: string;
    providerPrefix: string;
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
    genericError: string;
    providerReady: string;
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
    statement: 'Build. Tune. Scale.',
    description:
      'Open models at production speed, optimized for your work and ready to scale globally with AURINOVA.',
    benefits: [
      {
        title: 'Own Your AI:',
        body: 'Control your models, data, and costs',
        href: '/aurinova-reference#platform',
      },
      {
        title: 'Customize Your AI:',
        body: 'Tune model quality, speed, and cost to your use case',
        href: '/aurinova-reference#platform',
      },
      {
        title: 'Scale with confidence:',
        body: 'Move from first request to dedicated production capacity',
        href: '/aurinova-reference/pricing',
      },
      {
        title: 'Access frontier models:',
        body: 'Run leading open models through one consistent platform',
        href: '/aurinova-reference#models',
      },
    ],
    customerLead: 'What our customers are saying:',
    customerLink: 'customers',
    testimonials: [
      {
        quote:
          'Uses AURINOVA infrastructure to support production coding experiences at large scale.',
        person: 'Sualeh Asif, CPO',
        company: 'CURSOR',
      },
      {
        quote:
          'Combines model serving and reinforcement learning to keep up with rapid coding-model progress.',
        person: 'Malte Ubl, CTO',
        company: 'VERCEL',
      },
    ],
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
    blog: 'Blog',
    docs: 'Docs',
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
    providers: {
      google: 'Google',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    termsPrefix: 'By continuing, you agree to our',
    terms: 'Terms of service',
    termsJoin: 'and',
    dataAgreement: 'Data Processing Agreement',
    termsSuffix: '.',
  },
  signup: {
    title: 'Create Account',
    providerPrefix: 'Sign up with {provider}',
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
      mixedCase: 'Password contains uppercase and lowercase characters.',
      number: 'Password has a number.',
      special: 'Password has a special character.',
      match: 'Passwords match.',
    },
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
  },
  login: {
    title: 'Log In',
    providerPrefix: 'Continue with {provider}',
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
    description: 'Enter your work email to continue to your company SSO.',
    workEmail: 'Work email',
    workEmailPlaceholder: 'you@company.com',
    accountId: 'Account ID',
    accountIdPlaceholder: 'your-company-account',
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
    genericError:
      'We could not complete that request. Check your connection and try again.',
    providerReady:
      '{provider} authentication is ready for the identity-service endpoint.',
  },
};

const zh: AuthContent = {
  meta: {
    signup: {
      title: '注册 | AURINOVA',
      description: '创建 AURINOVA 账户，开始使用开放模型。',
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
    statement: '构建。调优。扩展。',
    description:
      '以生产级速度运行开放模型，围绕你的业务调优，并通过 AURINOVA 扩展至全球。',
    benefits: [
      {
        title: '掌控你的 AI：',
        body: '掌控模型、数据和成本',
        href: '/aurinova-reference#platform',
      },
      {
        title: '定制你的 AI：',
        body: '按场景调优模型质量、速度与成本',
        href: '/aurinova-reference#platform',
      },
      {
        title: '稳健扩展：',
        body: '从首次调用扩展到专属生产容量',
        href: '/aurinova-reference/pricing',
      },
      {
        title: '使用前沿模型：',
        body: '在统一平台中运行领先的开放模型',
        href: '/aurinova-reference#models',
      },
    ],
    customerLead: '客户如此评价：',
    customerLink: '客户',
    testimonials: [
      {
        quote: '使用 AURINOVA 基础设施，支撑大规模生产级编程体验。',
        person: 'Sualeh Asif，CPO',
        company: 'CURSOR',
      },
      {
        quote: '结合模型服务与强化学习，持续跟上编程模型的快速发展。',
        person: 'Malte Ubl，CTO',
        company: 'VERCEL',
      },
    ],
    previousTestimonial: '上一条客户评价',
    nextTestimonial: '下一条客户评价',
    blog: '博客',
    docs: '文档',
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
    providers: { google: 'Google', github: 'GitHub', linkedin: 'LinkedIn' },
    termsPrefix: '继续操作即表示你同意',
    terms: '服务条款',
    termsJoin: '与',
    dataAgreement: '数据处理协议',
    termsSuffix: '。',
  },
  signup: {
    title: '创建账户',
    providerPrefix: '使用 {provider} 注册',
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
      mixedCase: '密码同时包含大写和小写字母。',
      number: '密码包含数字。',
      special: '密码包含特殊字符。',
      match: '两次输入的密码一致。',
    },
    humanVerification: '请确认你是真人',
    humanVerificationHelp: '创建账户前需要完成验证。',
    createAccount: '创建账户',
    changeEmail: '更换邮箱',
    successTitle: '请查收邮件',
    successDescription: '验证链接已发送至 {email}。打开链接即可完成账户设置。',
    goToLogin: '前往登录',
    resend: '重新发送验证邮件',
    resendSuccess: '新的验证邮件已发送。',
  },
  login: {
    title: '登录',
    providerPrefix: '使用 {provider} 继续',
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
    description: '输入工作邮箱，继续使用公司的单点登录。',
    workEmail: '工作邮箱',
    workEmailPlaceholder: 'you@company.com',
    accountId: '账户 ID',
    accountIdPlaceholder: 'your-company-account',
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
    genericError: '请求未能完成。请检查网络后重试。',
    providerReady: '{provider} 身份验证已预留接口，可直接对接身份服务。',
  },
};

export const authDictionaries = {
  'en-US': en,
  'zh-CN': zh,
} as const satisfies Record<Locale, AuthContent>;
