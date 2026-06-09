/**
 * Authentication System
 * Handles login, register, and password reset functionality
 */

// Configuration
const API_CONFIG = {
  // Replace with your actual API endpoints
  loginEndpoint: '/api/auth/login',
  registerEndpoint: '/api/auth/register',
  forgotPasswordEndpoint: '/api/auth/forgot-password',
  checkEmailEndpoint: '/api/auth/check-email',
  checkUsernameEndpoint: '/api/auth/check-username',
  checkPhoneEndpoint: '/api/auth/check-phone',
};

// DOM Elements
const authContainer = document.getElementById('auth-container');
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const forgotPasswordPage = document.getElementById('forgot-password-page');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');

const alertModal = document.getElementById('alert-modal');
const successModal = document.getElementById('success-modal');

const authMessages = {
  ar: {
    emailFormat: 'صيغة البريد غير صحيحة',
    emailNotRegistered: 'البريد الإلكتروني غير مسجل',
    emailAlreadyRegistered: 'البريد الإلكتروني مسجل بالفعل',
    usernameFormat: 'اسم المستخدم يجب أن يكون 3-20 حرف إنجليزي أو رقم',
    usernameAvailable: '✓ اسم المستخدم متاح',
    usernameTaken: 'اسم المستخدم مستخدم بالفعل',
    phoneFormat: 'رقم الهاتف غير صحيح',
    phoneRegistered: 'رقم الهاتف مسجل بالفعل',
    passwordsMismatch: 'كلمات المرور غير متطابقة',
    weak: 'ضعيفة',
    fair: 'متوسطة',
    good: 'جيدة',
    strong: 'قوية',
    veryStrong: 'قوية جداً',
    errorTitle: 'خطأ',
    emailRequired: 'الرجاء إدخال بريد إلكتروني صحيح',
    passwordRequired: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    loginSuccess: 'تم التسجيل',
    welcome: 'مرحباً بك!',
    authFailed: 'خطأ في المصادقة',
    invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    networkError: 'حدث خطأ في الاتصال',
    regSuccess: 'تم الإنشاء بنجاح',
    regSuccessDetail: 'تم إنشاء حسابك بنجاح!',
    regFailed: 'فشل إنشاء الحساب',
    sent: 'تم الإرسال',
    spamFolder: 'تفقد بريدك الإلكتروني أو مجلد الرسائل المزعجة',
    resetFailed: 'فشل إرسال رسالة إعادة تعيين كلمة المرور',
    invalidUsername: 'اسم المستخدم غير صحيح',
    invalidFullName: 'الاسم الكامل غير صحيح',
    invalidEmail: 'البريد الإلكتروني غير صحيح',
    passwordWeak: 'كلمة المرور ضعيفة',
    selectCountry: 'الرجاء اختيار دولة',
    invalidPhone: 'رقم الهاتف غير صحيح',
    selectGender: 'الرجاء اختيار النوع',
    agreeTerms: 'يجب الموافقة على الشروط'
  },
  en: {
    emailFormat: 'Invalid email format',
    emailNotRegistered: 'Email not registered',
    emailAlreadyRegistered: 'Email already registered',
    usernameFormat: 'Username must be 3-20 English alphanumeric characters',
    usernameAvailable: '✓ Username available',
    usernameTaken: 'Username already taken',
    phoneFormat: 'Invalid phone number',
    phoneRegistered: 'Phone already registered',
    passwordsMismatch: 'Passwords do not match',
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
    veryStrong: 'Very Strong',
    errorTitle: 'Error',
    emailRequired: 'Please enter a valid email address',
    passwordRequired: 'Password must be at least 8 characters',
    loginSuccess: 'Login Success',
    welcome: 'Welcome back!',
    authFailed: 'Authentication Failed',
    invalidCredentials: 'Incorrect email or password',
    networkError: 'Network error occurred',
    regSuccess: 'Registration Success',
    regSuccessDetail: 'Your account has been created successfully!',
    regFailed: 'Registration failed',
    sent: 'Email Sent',
    spamFolder: 'Check your inbox or spam folder',
    resetFailed: 'Failed to send reset email',
    invalidUsername: 'Invalid username',
    invalidFullName: 'Invalid full name',
    invalidEmail: 'Invalid email',
    passwordWeak: 'Password too weak',
    selectCountry: 'Please select a country',
    invalidPhone: 'Invalid phone',
    selectGender: 'Please select gender',
    agreeTerms: 'You must agree to terms'
  },
  ru: {
    emailFormat: 'Неверный формат почты',
    emailNotRegistered: 'Email не зарегистрирован',
    emailAlreadyRegistered: 'Email уже зарегистрирован',
    usernameFormat: 'Имя пользователя должно состоять из 3-20 латинских букв или цифр',
    usernameAvailable: '✓ Имя пользователя свободно',
    usernameTaken: 'Имя пользователя уже занято',
    phoneFormat: 'Неверный номер телефона',
    phoneRegistered: 'Телефон уже зарегистрирован',
    passwordsMismatch: 'Пароли не совпадают',
    weak: 'Слабый',
    fair: 'Средний',
    good: 'Хороший',
    strong: 'Сильный',
    veryStrong: 'Очень сильный',
    errorTitle: 'Ошибка',
    emailRequired: 'Пожалуйста, введите корректный адрес электронной почты',
    passwordRequired: 'Пароль должен состоять минимум из 8 символов',
    loginSuccess: 'Вход выполнен',
    welcome: 'Добро пожаловать!',
    authFailed: 'Ошибка авторизации',
    invalidCredentials: 'Неверный email или пароль',
    networkError: 'Произошла ошибка сети',
    regSuccess: 'Регистрация успешна',
    regSuccessDetail: 'Ваш аккаунт успешно создан!',
    regFailed: 'Ошибка регистрации',
    sent: 'Отправлено',
    spamFolder: 'Проверьте входящие или спам',
    resetFailed: 'Не удалось отправить письмо сброса',
    invalidUsername: 'Неверное имя пользователя',
    invalidFullName: 'Неверное полное имя',
    invalidEmail: 'Неверный email',
    passwordWeak: 'Слишком слабый пароль',
    selectCountry: 'Пожалуйста, выберите страну',
    invalidPhone: 'Неверный телефон',
    selectGender: 'Пожалуйста, выберите пол',
    agreeTerms: 'Вы должны согласиться с условиями'
  }
};

function getMsg(key) {
  const lang = document.documentElement.lang || 'ar';
  const langMsgs = authMessages[lang] || authMessages['ar'];
  return langMsgs[key] || '';
}

// State
let currentPage = 'login';
let validationState = {};
let checkTimeouts = {};
let loggedInUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  loadSavedCredentials();
  restoreLoginState();
});

/**
 * Restore logged-in state if user was previously authenticated
 */
function restoreLoginState() {
  const authToken = localStorage.getItem('authToken');
  const currentUser = localStorage.getItem('currentUser');

  if (authToken && currentUser) {
    try {
      loggedInUser = JSON.parse(currentUser);
      firebaseAuth.authToken = authToken;
      firebaseAuth.userId = localStorage.getItem('userId');
      firebaseAuth.userEmail = localStorage.getItem('userEmail');
      firebaseAuth.currentUser = loggedInUser;

      // Update header with user profile
      updateHeaderProfileDisplay(loggedInUser);
    } catch (error) {
      console.error('Error restoring login state:', error);
      localStorage.clear();
    }
  }
}

// Event Listeners
function initializeEventListeners() {
  // Page Navigation
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      switchPage(page);
    });
  });

  // Form Submissions
  loginForm.addEventListener('submit', handleLoginSubmit);
  registerForm.addEventListener('submit', handleRegisterSubmit);
  forgotPasswordForm.addEventListener('submit', handleForgotPasswordSubmit);

  // Login Form
  setupFormValidation('login');
  setupFormValidation('register');
  setupFormValidation('forgot-password');

  // Toggle Password
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', togglePasswordVisibility);
  });

  // Remember Me checkbox: save/clear credentials immediately and keep stored values updated while typing
  const rememberCheckbox = document.getElementById('login-remember');
  const loginEmailInput = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');
  if (rememberCheckbox) {
    rememberCheckbox.addEventListener('change', (e) => {
      const checked = e.target.checked;
      if (checked) {
        const email = loginEmailInput ? loginEmailInput.value.trim() : '';
        const password = loginPasswordInput ? loginPasswordInput.value : '';
        if (email && password) saveCredentials(email, password);
      } else {
        clearCredentials();
      }
    });

    // update stored credentials while user types if checkbox is active
    const updateStored = () => {
      if (rememberCheckbox.checked) {
        const email = loginEmailInput ? loginEmailInput.value.trim() : '';
        const password = loginPasswordInput ? loginPasswordInput.value : '';
        if (email && password) saveCredentials(email, password);
      }
    };

    if (loginEmailInput) loginEmailInput.addEventListener('input', updateStored);
    if (loginPasswordInput) loginPasswordInput.addEventListener('input', updateStored);
  }

  // Header auth buttons (open auth container + switch page)
  const headerLoginBtn = document.getElementById('header-login-btn');
  const headerRegisterBtn = document.getElementById('header-register-btn');

  if (headerLoginBtn) {
    headerLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Open auth modal but keep the site background visible
      authContainer.classList.remove('hidden');
      authContainer.classList.add('no-bg');
      switchPage('login');
    });
  }

  if (headerRegisterBtn) {
    headerRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Open auth modal but keep the site background visible (no background overlay)
      authContainer.classList.remove('hidden');
      authContainer.classList.add('no-bg');
      switchPage('register');
    });
  }

  // Header Logout Button
  const headerLogoutBtn = document.getElementById('header-logout-btn');
  if (headerLogoutBtn) {
    headerLogoutBtn.addEventListener('click', handleLogout);
  }

  // Auth Container Close Button
  const authCloseBtn = document.getElementById('auth-close-btn');
  if (authCloseBtn) {
    authCloseBtn.addEventListener('click', closeAuthContainer);
  }

  // Close when clicking outside the form (on the overlay) or anywhere in authContainer but not inside .auth-form
  if (authContainer) {
    authContainer.addEventListener('click', (e) => {
      // if click is not inside a .auth-form element, close
      if (!e.target.closest('.auth-form')) {
        closeAuthContainer();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (!authContainer.classList.contains('hidden')) {
        closeAuthContainer();
      }
    }
  });

  // Profile Logout Button (Modal)
  const profileLogoutBtn = document.getElementById('profile-logout-btn');
  if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener('click', handleLogout);
  }

  // Modal Close
  document.getElementById('alert-close').addEventListener('click', closeAlertModal);
  document.getElementById('success-close').addEventListener('click', closeSuccessModal);

  // Real-time validation
  const emailInputs = [
    { form: 'login', field: 'login-email', callback: validateLoginEmail },
    { form: 'register', field: 'register-email', callback: validateRegisterEmail },
    { form: 'forgot-password', field: 'forgot-email', callback: validateForgotEmail },
  ];

  emailInputs.forEach(({ form, field, callback }) => {
    const input = document.getElementById(field);
    if (input) {
      // sanitize allowed characters for email fields (only A-Z a-z 0-9 and . @ - _ )
      const debounced = debounce(callback, 500);
      input.addEventListener('input', (e) => {
        let cleaned = e.target.value.replace(/[^A-Za-z0-9.@_-]/g, '');
        // force lowercase while typing
        const cleanedLower = cleaned.toLowerCase();
        if (cleanedLower !== e.target.value) e.target.value = cleanedLower;

        const wrapper = input.closest('.input-wrapper');
        // Basic format check (complete format)
        const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim());

        // If field is login email or forgot-email, show immediate border feedback
        if (field === 'login-email' || field === 'forgot-email') {
          if (!e.target.value.trim()) {
            // empty -> clear validation borders
            wrapper?.classList.remove('invalid-border', 'valid-border', 'loading');
          } else if (!isValidFormat) {
            // incomplete/invalid format -> show red corners
            wrapper?.classList.remove('valid-border', 'loading');
            wrapper?.classList.add('invalid-border');
          } else {
            // looks like a complete email -> start loading/check
            wrapper?.classList.remove('invalid-border', 'valid-border');
            wrapper?.classList.add('loading');
            debounced();
          }
        } else {
          // for other email fields (register) keep previous behavior
          debounced();
        }
      });
    }
  });

  // Login password length visual feedback (red if <6, green if >=6)
  // (loginPasswordInput is already declared above)
  if (loginPasswordInput) {
    loginPasswordInput.addEventListener('input', () => {
      const wrapper = loginPasswordInput.closest('.input-wrapper');
      if (!wrapper) return;
      if (loginPasswordInput.value.length >= 6) {
        wrapper.classList.remove('invalid-border');
        wrapper.classList.add('valid-border');
      } else {
        wrapper.classList.remove('valid-border');
        wrapper.classList.add('invalid-border');
      }
    });
  }

  // Username validation
  const usernameInput = document.getElementById('register-username');
  if (usernameInput) {
    usernameInput.addEventListener('input', debounce(validateUsername, 500));
  }

  // Phone validation
  const phoneInput = document.getElementById('register-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', debounce(validatePhone, 500));
  }

  // Password strength
  const passwordInput = document.getElementById('register-password');
  if (passwordInput) {
    passwordInput.addEventListener('input', updatePasswordStrength);
  }

  // Confirm password
  const confirmPasswordInput = document.getElementById('register-confirm-password');
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
  }
}

// Page Navigation
function switchPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.auth-page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const pageElement = document.getElementById(`${pageName}-page`);
  if (pageElement) {
    pageElement.classList.add('active');
    currentPage = pageName;

    // Move the close button next to the active form wrapper
    const authCloseBtn = document.getElementById('auth-close-btn');
    const wrapper = pageElement.querySelector('.auth-form-wrapper');
    if (authCloseBtn && wrapper) {
      wrapper.appendChild(authCloseBtn);
      authCloseBtn.classList.add('in-form');

      // If showing the register page, enlarge the form for better field layout
      const authForm = pageElement.querySelector('.auth-form');
      if (pageName === 'register') {
        wrapper.classList.add('large-form');
        if (authForm) authForm.classList.add('auth-form-large');
      } else {
        wrapper.classList.remove('large-form');
        if (authForm) authForm.classList.remove('auth-form-large');
      }
    }

    // Clear forms when switching pages
    if (pageName === 'login') {
      loginForm.reset();
      validationState = {};
    } else if (pageName === 'register') {
      registerForm.reset();
      validationState = {};
      resetPasswordStrength();
    } else if (pageName === 'forgot-password') {
      forgotPasswordForm.reset();
      validationState = {};
    }
  }
}

// Form Validation Setup
function setupFormValidation(formType) {
  const formId = formType === 'forgot-password' ? 'forgot-password-form' : `${formType}-form`;
  const form = document.getElementById(formId);

  if (!form) return;

  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    // Only add change listener for non-email/password fields during initial load
    if (!['email', 'password', 'username', 'phone'].includes(input.type) &&
        !input.name.includes('Email') && !input.name.includes('password')) {
      input.addEventListener('change', () => {
        validateField(formType, input.name, input.value);
      });
    }

    input.addEventListener('blur', () => {
      validateField(formType, input.name, input.value);
    });
  });
}

// Validation Functions
function validateField(formType, fieldName, value) {
  let isValid = true;
  let errorMessage = '';

  switch (fieldName) {
    case 'email':
    case 'Email':
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      errorMessage = isValid ? '' : 'صيغة البريد غير صحيحة / Invalid email format';
      break;

    case 'password':
      isValid = value.length >= 8;
      errorMessage = isValid ? '' : 'كلمة المرور يجب أن تكون 8 أحرف على الأقل / Password must be at least 8 characters';
      break;

    case 'confirmPassword':
      const passwordField = document.querySelector(`#${formType}-password`);
      const password = passwordField ? passwordField.value : '';
      isValid = value === password && value.length > 0;
      errorMessage = isValid ? '' : 'كلمات المرور غير متطابقة / Passwords do not match';
      break;

    case 'username':
      isValid = /^[A-Z0-9]{3,20}$/.test(value);
      errorMessage = isValid ? '' : 'اسم المستخدم يجب أن يكون 3-20 حرف إنجليزي أو رقم / Username must be 3-20 English letters or numbers';
      break;

    case 'phone':
      isValid = /^[0-9]{7,15}$/.test(value);
      errorMessage = isValid ? '' : 'رقم الهاتف غير صحيح / Invalid phone number';
      break;

    case 'fullName':
      isValid = value.trim().length >= 3;
      errorMessage = isValid ? '' : 'الاسم يجب أن يكون 3 أحرف على الأقل / Name must be at least 3 characters';
      break;

    case 'country':
      isValid = value !== '';
      errorMessage = isValid ? '' : 'الرجاء اختيار دولة / Please select a country';
      break;

    case 'gender':
      isValid = value !== '';
      errorMessage = isValid ? '' : 'الرجاء اختيار النوع / Please select gender';
      break;

    case 'agreeTerms':
      isValid = document.getElementById('register-agree-terms').checked;
      errorMessage = isValid ? '' : 'يجب الموافقة على الشروط / You must agree to terms';
      break;
  }

  updateFieldValidationUI(formType, fieldName, isValid, errorMessage);
  validationState[fieldName] = isValid;

  return isValid;
}

function updateFieldValidationUI(formType, fieldName, isValid, errorMessage) {
  // Map field names to IDs
  const fieldMap = {
    'email': `${formType}-email`,
    'Email': `${formType}-email`,
    'password': `${formType}-password`,
    'confirmPassword': `${formType}-confirm-password`,
    'username': `${formType}-username`,
    'phone': `${formType}-phone`,
    'fullName': `${formType}-fullname`,
    'country': `${formType}-country`,
    'gender': `${formType}-gender`,
    'agreeTerms': `${formType}-agree-terms`,
  };

  const fieldId = fieldMap[fieldName] || `${formType}-${fieldName.toLowerCase()}`;
  const field = document.getElementById(fieldId);
  const wrapper = field ? field.closest('.input-wrapper') : null;
  const errorElement = document.getElementById(`${fieldId}-error`);

  if (wrapper) {
    wrapper.classList.remove('valid', 'invalid', 'loading');
    if (isValid && field.value.trim()) {
      wrapper.classList.add('valid');
    } else if (!isValid && field.value.trim()) {
      wrapper.classList.add('invalid');
    }
  }

  if (errorElement && errorMessage) {
    errorElement.textContent = errorMessage;
    field?.closest('.form-group').classList.add('has-error');
  } else if (errorElement) {
    errorElement.textContent = '';
    field?.closest('.form-group').classList.remove('has-error');
  }
}

// Email Validation with API Check
async function validateLoginEmail() {
  const emailInput = document.getElementById('login-email');
  const email = emailInput.value.trim().toLowerCase();

  if (!email) return;

  // Basic format check
  const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidFormat) {
    updateFieldValidationUI('login', 'email', false, getMsg('emailFormat'));
    return;
  }

  // Show loading state
  const wrapper = emailInput.closest('.input-wrapper');
  wrapper?.classList.remove('valid-border','invalid-border');
  wrapper?.classList.add('loading');

  try {
    // Simulate API check
    const exists = await checkEmailExists(email);

    if (exists) {
      wrapper?.classList.remove('loading');
      updateFieldValidationUI('login', 'email', true, '');
      wrapper?.classList.add('valid-border');
      validationState['email'] = true;
    } else {
      wrapper?.classList.remove('loading');
      updateFieldValidationUI('login', 'email', false, getMsg('emailNotRegistered'));
      wrapper?.classList.add('invalid-border');
      validationState['email'] = false;
    }
  } catch (error) {
    wrapper?.classList.remove('loading');
    console.error('Error checking email:', error);
  }
}

async function validateRegisterEmail() {
  const emailInput = document.getElementById('register-email');
  const email = emailInput.value.trim().toLowerCase();

  if (!email) return;

  const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidFormat) {
    updateFieldValidationUI('register', 'email', false, getMsg('emailFormat'));
    return;
  }

  const wrapper = emailInput.closest('.input-wrapper');
  wrapper?.classList.add('loading');

  try {
    const exists = await checkEmailExists(email);

    if (!exists) {
      wrapper?.classList.remove('loading');
      wrapper?.classList.add('valid');
      updateFieldValidationUI('register', 'email', true, '');
      validationState['email'] = true;
    } else {
      wrapper?.classList.remove('loading');
      wrapper?.classList.add('invalid');
      updateFieldValidationUI('register', 'email', false, getMsg('emailAlreadyRegistered'));
      validationState['email'] = false;
    }
  } catch (error) {
    wrapper?.classList.remove('loading');
    console.error('Error checking email:', error);
  }
}

async function validateForgotEmail() {
  const emailInput = document.getElementById('forgot-email');
  const email = emailInput.value.trim().toLowerCase();

  if (!email) return;

  const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidFormat) {
    updateFieldValidationUI('forgot-password', 'email', false, getMsg('emailFormat'));
    return;
  }

  const wrapper = emailInput.closest('.input-wrapper');
  wrapper?.classList.remove('valid-border','invalid-border');
  wrapper?.classList.add('loading');

  try {
    const exists = await checkEmailExists(email);

    if (exists) {
      wrapper?.classList.remove('loading');
      updateFieldValidationUI('forgot-password', 'email', true, '');
      wrapper?.classList.add('valid-border');
      validationState['email'] = true;
    } else {
      wrapper?.classList.remove('loading');
      updateFieldValidationUI('forgot-password', 'email', false, getMsg('emailNotRegistered'));
      wrapper?.classList.add('invalid-border');
      validationState['email'] = false;
    }
  } catch (error) {
    wrapper?.classList.remove('loading');
    console.error('Error checking email:', error);
  }
}

async function validateUsername() {
  const usernameInput = document.getElementById('register-username');
  let username = usernameInput.value.toUpperCase();
  usernameInput.value = username;

  if (!username) return;

  const isValidFormat = /^[A-Z0-9]{3,20}$/.test(username);
  if (!isValidFormat) {
    updateFieldValidationUI('register', 'username', false, getMsg('usernameFormat'));
    return;
  }

  const wrapper = usernameInput.closest('.input-wrapper');
  wrapper?.classList.add('loading');

  try {
    const exists = await checkUsernameExists(username);

    if (!exists) {
      wrapper?.classList.remove('loading');
      wrapper?.classList.add('valid');
      updateFieldValidationUI('register', 'username', true, '');
      const hint = document.getElementById('register-username-hint');
      if (hint) {
        hint.textContent = getMsg('usernameAvailable');
        hint.style.color = 'var(--success)';
        hint.closest('.form-group').classList.add('has-hint');
      }
      validationState['username'] = true;
    } else {
      wrapper?.classList.remove('loading');
      wrapper?.classList.add('invalid');
      updateFieldValidationUI('register', 'username', false, getMsg('usernameTaken'));
      validationState['username'] = false;
    }
  } catch (error) {
    wrapper?.classList.remove('loading');
    console.error('Error checking username:', error);
  }
}

async function validatePhone() {
  const phoneInput = document.getElementById('register-phone');
  const phone = phoneInput.value.trim();

  if (!phone) return;

  const isValidFormat = /^[0-9]{7,15}$/.test(phone);
  if (!isValidFormat) {
    updateFieldValidationUI('register', 'phone', false, getMsg('phoneFormat'));
    return;
  }

  const wrapper = phoneInput.closest('.input-wrapper');
  wrapper?.classList.add('loading');

  try {
    const exists = await checkPhoneExists(phone);

    if (!exists) {
      wrapper?.classList.remove('loading');
      wrapper?.classList.add('valid');
      updateFieldValidationUI('register', 'phone', true, '');
      validationState['phone'] = true;
    } else {
      wrapper?.classList.remove('loading');
      wrapper?.classList.add('invalid');
      updateFieldValidationUI('register', 'phone', false, getMsg('phoneRegistered'));
      validationState['phone'] = false;
    }
  } catch (error) {
    wrapper?.classList.remove('loading');
    console.error('Error checking phone:', error);
  }
}

function validateConfirmPassword() {
  const passwordInput = document.getElementById('register-password');
  const confirmInput = document.getElementById('register-confirm-password');
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  const isValid = password === confirm && confirm.length > 0;
  const errorMessage = isValid ? '' : getMsg('passwordsMismatch');

  updateFieldValidationUI('register', 'confirmPassword', isValid, errorMessage);
  validationState['confirmPassword'] = isValid;
}

function updatePasswordStrength() {
  const passwordInput = document.getElementById('register-password');
  const password = passwordInput.value;
  const strengthDiv = document.getElementById('register-password-strength');
  const strengthBar = strengthDiv.querySelector('.strength-bar-inner');
  const strengthText = strengthDiv.querySelector('.strength-text');

  if (!password) {
    strengthDiv.classList.remove('active');
    return;
  }

  strengthDiv.classList.add('active');

  let strength = 0;
  let strengthLabel = '';

  // Calculate strength
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  // Determine label and color
  if (strength <= 1) {
    strengthLabel = getMsg('weak');
    strengthBar.style.width = '20%';
    strengthBar.style.background = 'linear-gradient(90deg, var(--error), var(--error))';
  } else if (strength <= 2) {
    strengthLabel = getMsg('fair');
    strengthBar.style.width = '40%';
    strengthBar.style.background = 'linear-gradient(90deg, var(--error), #FF9800)';
  } else if (strength <= 3) {
    strengthLabel = getMsg('good');
    strengthBar.style.width = '60%';
    strengthBar.style.background = 'linear-gradient(90deg, #FF9800, var(--primary))';
  } else if (strength <= 4) {
    strengthLabel = getMsg('strong');
    strengthBar.style.width = '80%';
    strengthBar.style.background = 'linear-gradient(90deg, var(--primary), #5cbf60)';
  } else {
    strengthLabel = getMsg('veryStrong');
    strengthBar.style.width = '100%';
    strengthBar.style.background = 'linear-gradient(90deg, #5cbf60, #00D000)';
  }

  // Visual border for register password based on length (green if >=6, red if <6)
  const regPasswordInput = document.getElementById('register-password');
  const regWrapper = regPasswordInput ? regPasswordInput.closest('.input-wrapper') : null;
  if (regWrapper) {
    if (password.length >= 6) {
      regWrapper.classList.remove('invalid-border');
      regWrapper.classList.add('valid-border');
    } else {
      regWrapper.classList.remove('valid-border');
      regWrapper.classList.add('invalid-border');
    }
  }

  strengthText.textContent = strengthLabel;
}

function resetPasswordStrength() {
  const strengthDiv = document.getElementById('register-password-strength');
  if (strengthDiv) {
    strengthDiv.classList.remove('active');
    strengthDiv.querySelector('.strength-bar-inner').style.width = '0%';
    strengthDiv.querySelector('.strength-text').textContent = '';
  }
}

// Form Submission Handlers
async function handleLoginSubmit(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('login-remember').checked;

  // Validate
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;

  if (!emailValid) {
    showAlert(getMsg('errorTitle'), getMsg('emailRequired'));
    return;
  }

  if (!passwordValid) {
    showAlert(getMsg('errorTitle'), getMsg('passwordRequired'));
    return;
  }

  setFormLoading('login-submit', true);

  try {
    // Use Firebase auth manager
    const success = await firebaseAuth.login(email, password);

    if (success) {
      if (rememberMe) {
        saveCredentials(email, password);
      } else {
        clearCredentials();
      }
      // Get logged-in user information from Firebase
      loggedInUser = await firebaseAuth.getCurrentUser();

      showSuccess(getMsg('loginSuccess'), getMsg('welcome'));
      setTimeout(() => {
        goToDashboard();
      }, 1200);
    } else {
      showAlert(getMsg('authFailed'), getMsg('invalidCredentials'));
    }
  } catch (error) {
    showAlert(getMsg('errorTitle'), getMsg('networkError'));
    console.error('Login error:', error);
  } finally {
    setFormLoading('login-submit', false);
  }
}

async function handleRegisterSubmit(e) {
  e.preventDefault();

  const username = document.getElementById('register-username').value.toUpperCase();
  const fullName = document.getElementById('register-fullname').value.trim();
  const email = document.getElementById('register-email').value.trim().toLowerCase();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  const country = document.getElementById('register-country').value;
  const countryCode = document.getElementById('register-country-code').value;
  const phone = countryCode + document.getElementById('register-phone').value;
  const gender = document.getElementById('register-gender').value;
  const agreeTerms = document.getElementById('register-agree-terms').checked;

  // Validate all fields
  const validations = [
    { valid: /^[A-Z0-9]{3,20}$/.test(username), message: getMsg('invalidUsername') },
    { valid: fullName.length >= 3, message: getMsg('invalidFullName') },
    { valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), message: getMsg('invalidEmail') },
    { valid: password.length >= 8, message: getMsg('passwordWeak') },
    { valid: password === confirmPassword, message: getMsg('passwordsMismatch') },
    { valid: country !== '', message: getMsg('selectCountry') },
    { valid: /^[0-9]{7,15}$/.test(phone), message: getMsg('invalidPhone') },
    { valid: gender !== '', message: getMsg('selectGender') },
    { valid: agreeTerms, message: getMsg('agreeTerms') },
  ];

  const failedValidation = validations.find(v => !v.valid);
  if (failedValidation) {
    showAlert(getMsg('errorTitle'), failedValidation.message);
    return;
  }

  setFormLoading('register-submit', true);

  try {
    // Register via Firebase
    const regResult = await firebaseAuth.register(email, password, fullName);

    if (regResult && regResult.uid) {
      // Save additional profile data to database
      await firebaseAuth.saveUserProfile(email, {
        username,
        fullName,
        phone,
        gender,
        country
      });

      // Refresh current user and update header
      loggedInUser = firebaseAuth.getCurrentUser();

      showSuccess(getMsg('regSuccess'), getMsg('regSuccessDetail'));
      setTimeout(() => {
        goToDashboard();
      }, 1200);
    } else {
      showAlert(getMsg('errorTitle'), getMsg('regFailed'));
    }
  } catch (error) {
    showAlert(getMsg('errorTitle'), getMsg('networkError'));
    console.error('Register error:', error);
  } finally {
    setFormLoading('register-submit', false);
  }
}

async function handleForgotPasswordSubmit(e) {
  e.preventDefault();

  const email = document.getElementById('forgot-email').value.trim().toLowerCase();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    showAlert(getMsg('errorTitle'), getMsg('emailRequired'));
    return;
  }

  setFormLoading('forgot-submit', true);

  try {
    const success = await simulateSendPasswordReset(email);

    if (success) {
      showSuccess(getMsg('sent'), getMsg('spamFolder'));
      setTimeout(() => {
        forgotPasswordForm.reset();
        switchPage('login');
      }, 2000);
    } else {
      showAlert(getMsg('errorTitle'), getMsg('resetFailed'));
    }
  } catch (error) {
    showAlert(getMsg('errorTitle'), getMsg('networkError'));
    console.error('Forgot password error:', error);
  } finally {
    setFormLoading('forgot-submit', false);
  }
}

// Password Visibility Toggle
function togglePasswordVisibility(e) {
  e.preventDefault();
  const targetId = this.dataset.target;
  const input = document.getElementById(targetId);

  if (input.type === 'password') {
    input.type = 'text';
    this.style.opacity = '1';
  } else {
    input.type = 'password';
    this.style.opacity = '0.6';
  }
}

// Modal Functions
function showAlert(title, message) {
  document.getElementById('alert-title').textContent = title;
  document.getElementById('alert-message').textContent = message;
  alertModal.classList.remove('hidden');
}

function closeAlertModal() {
  alertModal.classList.add('hidden');
}

function showSuccess(title, message) {
  document.getElementById('success-title').textContent = title;
  document.getElementById('success-message').textContent = message;
  successModal.classList.remove('hidden');
}

function closeSuccessModal() {
  successModal.classList.add('hidden');
}

// Form Loading State
function setFormLoading(buttonId, isLoading) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  const textSpan = button.querySelector('.btn-text');
  const loaderSpan = button.querySelector('.btn-loader');

  if (isLoading) {
    button.classList.add('loading');
    button.disabled = true;
    if (loaderSpan) loaderSpan.style.display = 'inline-block';
    if (textSpan) textSpan.style.opacity = '0';
  } else {
    button.classList.remove('loading');
    button.disabled = false;
    if (loaderSpan) loaderSpan.style.display = 'none';
    if (textSpan) textSpan.style.opacity = '1';
  }
}

// Credentials Management
function saveCredentials(email, password) {
  try {
    const credentials = { email, password, timestamp: Date.now() };
    localStorage.setItem('mec3_credentials', JSON.stringify(credentials));
    console.log('saveCredentials: stored', { email, length: password.length });
  } catch (e) {
    console.error('Failed to save credentials:', e);
  }
}

function loadSavedCredentials() {
  try {
    const stored = localStorage.getItem('mec3_credentials');
    if (stored) {
      const { email, password } = JSON.parse(stored);
      document.getElementById('login-email').value = email || '';
      document.getElementById('login-password').value = password || '';
      document.getElementById('login-remember').checked = true;
      console.log('loadSavedCredentials: loaded', { email, length: password ? password.length : 0 });
    }
  } catch (e) {
    console.error('Failed to load credentials:', e);
  }
}

function clearCredentials() {
  try {
    localStorage.removeItem('mec3_credentials');
    console.log('clearCredentials: removed stored credentials');
  } catch (e) {
    console.error('Failed to clear credentials:', e);
  }
}

// Simulated API Calls (Replace with actual API calls)
// Firebase Login Integration
async function simulateLogin(email, password) {
  try {
    await firebaseAuth.login(email, password);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

// Firebase Register Integration
async function simulateRegister(data) {
  try {
    await firebaseAuth.register(data.email, data.password, data.fullName);
    await firebaseAuth.saveUserProfile(data.email, {
      fullName: data.fullName,
      phone: data.phone || '',
      country: data.country || '',
      gender: data.gender || '',
      birthDate: data.birthDate || ''
    });
    return true;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

// Firebase Send Password Reset
async function simulateSendPasswordReset(email) {
  try {
    // Use firebaseAuth implementation (calls Firebase REST)
    return await firebaseAuth.sendPasswordReset(email);
  } catch (error) {
    console.error('simulateSendPasswordReset error:', error);
    return false;
  }
}

// Check if email exists in Firebase
async function checkEmailExists(email) {
  try {
    return await firebaseAuth.checkEmailExists(email);
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}

// Check if username exists
async function checkUsernameExists(username) {
  try {
    return await firebaseAuth.checkEmailExists(`${username.toLowerCase()}@example.com`);
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
}

// Check if phone exists
async function checkPhoneExists(phone) {
  return new Promise(resolve => {
    setTimeout(() => { resolve(false); }, 800);
  });
}

// Utility Functions
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function goToDashboard() {
  console.log('User logged in successfully, updating header...');
  
  // Get user data
  const user = firebaseAuth.getCurrentUser();
  
  if (user) {
    // Update header profile display
    updateHeaderProfileDisplay(user);
    
    // Hide logged-in profile modal section
    const loggedInSection = document.getElementById('logged-in-section');
    if (loggedInSection) {
      loggedInSection.classList.add('hidden');
    }
    
    // Close auth container
    closeAuthContainer();
  }
}

/**
 * Update header to show user profile
 */
function updateHeaderProfileDisplay(user) {
  // Hide login/register buttons
  const authButtonsGroup = document.getElementById('auth-buttons-group');
  if (authButtonsGroup) {
    authButtonsGroup.classList.add('hidden');
  }

  // Show user profile section
  const userProfileSection = document.getElementById('user-profile-section');
  if (userProfileSection) {
    userProfileSection.classList.remove('hidden');
    
    // Update profile info
    const profilePicture = document.getElementById('header-profile-picture');
    const userName = document.getElementById('header-user-name');
    const userUsername = document.getElementById('header-user-username');
    
    if (profilePicture) {
      profilePicture.src = user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=4CAF50&color=fff&size=120`;
      profilePicture.alt = user.fullName;
    }
    
    if (userName) {
      userName.textContent = user.fullName || 'User';
    }
    
    if (userUsername) {
      userUsername.textContent = `@${user.username || 'USER'}`;
    }
  }
}

// Close Auth Container
function closeAuthContainer() {
  authContainer.classList.add('hidden');
  // restore any hidden auth background
  authContainer.classList.remove('no-bg');
  // move close button back to the container and remove in-form styling
  const authCloseBtn = document.getElementById('auth-close-btn');
  if (authCloseBtn) {
    authCloseBtn.classList.remove('in-form');
    authContainer.appendChild(authCloseBtn);
  }
  // Reset to login page
  switchPage('login');
}

// Show Logged-In Profile
// Handle Logout
function handleLogout() {
  firebaseAuth.logout();
  loggedInUser = null;
  
  // Hide logged-in section
  const loggedInSection = document.getElementById('logged-in-section');
  if (loggedInSection) {
    loggedInSection.classList.add('hidden');
  }

  // Show login/register buttons
  const authButtonsGroup = document.getElementById('auth-buttons-group');
  if (authButtonsGroup) {
    authButtonsGroup.classList.remove('hidden');
  }

  // Hide user profile section
  const userProfileSection = document.getElementById('user-profile-section');
  if (userProfileSection) {
    userProfileSection.classList.add('hidden');
  }

  // Reset to login page
  switchPage('login');
  
  // Close the auth container
  setTimeout(() => {
    closeAuthContainer();
  }, 500);
}
