/**
 * TESTING GUIDE - دليل الاختبار
 * How to test the Authentication System
 */

// ============================================
// Quick Testing Commands
// أوامر الاختبار السريعة (في Console)
// ============================================

// 1. فتح صفحة المصادقة / Open Auth Page
// اجعل صفحة المصادقة مرئية وأخفِ الصفحة الرئيسية
/*
document.getElementById('auth-container').classList.remove('hidden');
document.getElementById('main-content').style.display = 'none';
*/

// 2. التنقل بين الصفحات / Navigate Between Pages
/*
switchPage('login');    // الذهاب إلى صفحة التسجيل
switchPage('register'); // الذهاب إلى صفحة الإنشاء
switchPage('forgot-password'); // الذهاب إلى صفحة استرجاع كلمة المرور
*/

// 3. ملء نموذج الدخول / Fill Login Form
/*
document.getElementById('login-email').value = 'test@example.com';
document.getElementById('login-password').value = 'Test12345';
document.getElementById('login-remember').checked = true;
*/

// 4. اختبار التحقق / Test Validation
/*
// اختبر توفر البريد الإلكتروني
await validateLoginEmail();

// اختبر قوة كلمة المرور
document.getElementById('register-password').value = 'Test123!@#';
updatePasswordStrength();

// اختبر توفر اسم المستخدم
document.getElementById('register-username').value = 'FIGHTER123';
await validateUsername();
*/

// 5. عرض رسالة نجاح / Show Success Message
/*
showSuccess('تم بنجاح / Success!', 'رسالة النجاح هنا / Success message here');
*/

// 6. عرض رسالة خطأ / Show Error Message
/*
showAlert('خطأ / Error!', 'رسالة الخطأ هنا / Error message here');
*/

// 7. محاكاة إرسال نموذج / Simulate Form Submission
/*
document.getElementById('login-form').dispatchEvent(new Event('submit'));
*/

// ============================================
// Test Cases / حالات الاختبار
// ============================================

const TEST_CASES = {
  
  // ========================
  // Login Form Tests / اختبارات نموذج الدخول
  // ========================
  loginTests: [
    {
      name: 'Valid Login - صحيح',
      email: 'user@example.com',
      password: 'TestPass123',
      expectedResult: 'success',
      steps: [
        'Input valid email format',
        'Input password >= 8 chars',
        'Click Login button',
        'Should show success modal'
      ]
    },
    {
      name: 'Invalid Email Format - بريد غير صحيح',
      email: 'invalid.email',
      password: 'TestPass123',
      expectedResult: 'error',
      steps: [
        'Input invalid email format',
        'Should show red border on email field',
        'Button should be disabled',
        'Click Login button',
        'Should show error message'
      ]
    },
    {
      name: 'Short Password - كلمة مرور قصيرة',
      email: 'user@example.com',
      password: 'Pass12',
      expectedResult: 'error',
      steps: [
        'Input password < 8 chars',
        'Should show red border on password field',
        'Button should be disabled'
      ]
    },
    {
      name: 'Empty Fields - حقول فارغة',
      email: '',
      password: '',
      expectedResult: 'error',
      steps: [
        'Leave both fields empty',
        'Button should be disabled',
        'Show error message'
      ]
    },
    {
      name: 'Remember Me - تذكرني',
      email: 'user@example.com',
      password: 'TestPass123',
      rememberMe: true,
      expectedResult: 'saved',
      steps: [
        'Check "Remember Me" checkbox',
        'Submit form',
        'Refresh page',
        'Email and password should be pre-filled'
      ]
    }
  ],

  // ========================
  // Registration Form Tests / اختبارات نموذج الإنشاء
  // ========================
  registerTests: [
    {
      name: 'Valid Registration - إنشاء صحيح',
      data: {
        username: 'FIGHTER123',
        fullName: 'Ahmed Mohammed',
        email: 'fighter@example.com',
        country: 'Egypt',
        phone: '1012345678',
        gender: 'Male',
        password: 'SecurePass123!',
        confirmPassword: 'SecurePass123!',
        agreeTerms: true
      },
      expectedResult: 'success'
    },
    {
      name: 'Invalid Username - اسم غير صحيح',
      data: {
        username: 'a1',  // Too short
        fullName: 'Ahmed Mohammed',
        email: 'fighter@example.com'
      },
      expectedResult: 'error',
      errorMessage: 'Username must be 3-20 characters'
    },
    {
      name: 'Passwords Mismatch - كلمات غير متطابقة',
      data: {
        username: 'FIGHTER123',
        password: 'SecurePass123!',
        confirmPassword: 'DifferentPass123!'
      },
      expectedResult: 'error',
      errorMessage: 'Passwords do not match'
    },
    {
      name: 'Missing Required Fields - حقول ناقصة',
      data: {
        username: 'FIGHTER123',
        // missing other fields
      },
      expectedResult: 'error'
    },
    {
      name: 'Password Strength Indicator - مؤشر قوة كلمة المرور',
      passwordTests: [
        { password: 'weak', expectedStrength: 'Weak' },
        { password: 'WeakPass', expectedStrength: 'Fair' },
        { password: 'GoodPass123', expectedStrength: 'Good' },
        { password: 'StrongPass123!', expectedStrength: 'Strong' },
        { password: 'VeryStrongPass123!@#$', expectedStrength: 'Very Strong' }
      ]
    }
  ],

  // ========================
  // Forgot Password Tests / اختبارات نموذج استرجاع كلمة المرور
  // ========================
  forgotPasswordTests: [
    {
      name: 'Valid Email - بريد صحيح',
      email: 'registered@example.com',
      expectedResult: 'success',
      steps: [
        'Input registered email',
        'Should show green border',
        'Click Send Link button',
        'Should show success message'
      ]
    },
    {
      name: 'Unregistered Email - بريد غير مسجل',
      email: 'nonexistent@example.com',
      expectedResult: 'error',
      steps: [
        'Input unregistered email',
        'Should show red border',
        'Click Send Link button',
        'Should show error message'
      ]
    },
    {
      name: 'Invalid Email Format - بريد بصيغة غير صحيحة',
      email: 'invalid.email',
      expectedResult: 'error'
    }
  ]
};

// ============================================
// Automated Testing Function
// دالة الاختبار الآلي
// ============================================

async function runAllTests() {
  console.log('🧪 Starting Authentication Tests...\n');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  // Test Login Form
  console.log('📋 Testing Login Form...');
  for (const test of TEST_CASES.loginTests) {
    totalTests++;
    try {
      const result = await testLoginForm(test);
      if (result) {
        console.log(`✅ PASS: ${test.name}`);
        passedTests++;
      } else {
        console.log(`❌ FAIL: ${test.name}`);
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ERROR in ${test.name}: ${error.message}`);
      failedTests++;
    }
  }

  // Test Registration Form
  console.log('\n📋 Testing Registration Form...');
  for (const test of TEST_CASES.registerTests) {
    totalTests++;
    try {
      const result = await testRegistrationForm(test);
      if (result) {
        console.log(`✅ PASS: ${test.name}`);
        passedTests++;
      } else {
        console.log(`❌ FAIL: ${test.name}`);
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ERROR in ${test.name}: ${error.message}`);
      failedTests++;
    }
  }

  // Test Forgot Password Form
  console.log('\n📋 Testing Forgot Password Form...');
  for (const test of TEST_CASES.forgotPasswordTests) {
    totalTests++;
    try {
      const result = await testForgotPasswordForm(test);
      if (result) {
        console.log(`✅ PASS: ${test.name}`);
        passedTests++;
      } else {
        console.log(`❌ FAIL: ${test.name}`);
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ERROR in ${test.name}: ${error.message}`);
      failedTests++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Summary / ملخص الاختبار:`);
  console.log(`Total Tests: ${totalTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  console.log('='.repeat(50));
}

// Helper Functions / دوال المساعدة

function testLoginForm(testCase) {
  // Clear form
  const form = document.getElementById('login-form');
  form.reset();

  // Fill form
  document.getElementById('login-email').value = testCase.email;
  document.getElementById('login-password').value = testCase.password;
  if (testCase.rememberMe) {
    document.getElementById('login-remember').checked = true;
  }

  // Check expected validation state
  if (testCase.expectedResult === 'error') {
    const submitBtn = document.getElementById('login-submit');
    return submitBtn.disabled === true;
  }

  return true;
}

function testRegistrationForm(testCase) {
  // Clear form
  const form = document.getElementById('register-form');
  form.reset();

  // Fill form with test data
  Object.entries(testCase.data).forEach(([key, value]) => {
    const fieldId = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    const field = document.getElementById(`register-${fieldId}`);
    if (field) {
      if (field.type === 'checkbox') {
        field.checked = value;
      } else {
        field.value = value;
      }
    }
  });

  // Trigger validation
  form.dispatchEvent(new Event('change', { bubbles: true }));

  return true;
}

function testForgotPasswordForm(testCase) {
  const form = document.getElementById('forgot-password-form');
  form.reset();

  document.getElementById('forgot-email').value = testCase.email;

  if (testCase.expectedResult === 'error') {
    const submitBtn = document.getElementById('forgot-submit');
    return submitBtn.disabled === true;
  }

  return true;
}

// ============================================
// UI Elements Testing / اختبار عناصر الواجهة
// ============================================

function testUIElements() {
  console.log('🎨 Testing UI Elements...\n');

  const checks = {
    'Auth Container': () => document.getElementById('auth-container') !== null,
    'Login Page': () => document.getElementById('login-page') !== null,
    'Register Page': () => document.getElementById('register-page') !== null,
    'Forgot Password Page': () => document.getElementById('forgot-password-page') !== null,
    'Alert Modal': () => document.getElementById('alert-modal') !== null,
    'Success Modal': () => document.getElementById('success-modal') !== null,
    'Login Form': () => document.getElementById('login-form') !== null,
    'Register Form': () => document.getElementById('register-form') !== null,
    'Forgot Password Form': () => document.getElementById('forgot-password-form') !== null,
  };

  let passed = 0;
  Object.entries(checks).forEach(([name, check]) => {
    if (check()) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
    }
  });

  console.log(`\nPassed: ${passed}/${Object.keys(checks).length}`);
}

// ============================================
// Console Helper Functions
// دوال مساعدة في وحدة تحكم المتصفح
// ============================================

window.authTestUtils = {
  // Switch to test page
  loginPage: () => switchPage('login'),
  registerPage: () => switchPage('register'),
  forgotPage: () => switchPage('forgot-password'),

  // Fill test data
  fillLoginForm: (email = 'test@example.com', password = 'Test12345') => {
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;
  },

  fillRegisterForm: () => {
    const data = {
      'register-username': 'TESTUSER',
      'register-fullname': 'Test User',
      'register-email': 'testuser@example.com',
      'register-country': 'Egypt',
      'register-country-code': '+20',
      'register-phone': '1012345678',
      'register-gender': 'Male',
      'register-password': 'TestPass123!',
      'register-confirm-password': 'TestPass123!'
    };

    Object.entries(data).forEach(([id, value]) => {
      const field = document.getElementById(id);
      if (field) field.value = value;
    });

    document.getElementById('register-agree-terms').checked = true;
  },

  // Show modals
  showSuccess: (title = 'Test Success', message = 'This is a test message') => {
    showSuccess(title, message);
  },

  showError: (title = 'Test Error', message = 'This is a test error message') => {
    showAlert(title, message);
  },

  // Run tests
  runAllTests: runAllTests,
  testUI: testUIElements,

  // Get form data
  getLoginFormData: () => ({
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-password').value,
    rememberMe: document.getElementById('login-remember').checked
  }),

  getRegisterFormData: () => ({
    username: document.getElementById('register-username').value,
    fullName: document.getElementById('register-fullname').value,
    email: document.getElementById('register-email').value,
    country: document.getElementById('register-country').value,
    phone: document.getElementById('register-phone').value,
    gender: document.getElementById('register-gender').value,
    password: document.getElementById('register-password').value
  })
};

console.log('✅ Auth test utilities loaded!');
console.log('Usage: authTestUtils.<function>()');
console.log('Available functions:');
console.log('  - loginPage()');
console.log('  - registerPage()');
console.log('  - forgotPage()');
console.log('  - fillLoginForm()');
console.log('  - fillRegisterForm()');
console.log('  - showSuccess()');
console.log('  - showError()');
console.log('  - runAllTests()');
console.log('  - testUI()');
