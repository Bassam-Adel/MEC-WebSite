# نظام المصادقة والتسجيل - Authentication System
# Authentication & Registration System for MEC 3

## نظرة عامة / Overview

تم بناء نظام مصادقة حديث متكامل يشمل:
- ✅ صفحة تسجيل الدخول (Login)
- ✅ صفحة إنشاء حساب جديد (Registration)
- ✅ صفحة استرجاع كلمة المرور (Password Recovery)
- ✅ التحقق من صحة البيانات في الوقت الفعلي (Real-time Validation)
- ✅ تحقق من توفر البريد الإلكتروني واسم المستخدم والهاتف
- ✅ حفظ بيانات المستخدم (Remember Me)
- ✅ واجهة جذابة بتصميم Glassmorphism
- ✅ دعم اللغات (عربي/إنجليزي/روسي)

## الملفات المضافة / Added Files

### 1. `auth.js` - نظام المصادقة الرئيسي
يحتوي على:
- إدارة صفحات المصادقة والملاحة بينها
- التحقق من صحة النماذج وحقول الإدخال
- معالجة تسجيل الدخول والتسجيل وإعادة تعيين كلمة المرور
- إدارة حالة التطبيق والنماذج
- التفاعل مع APIs (محاكاة حالياً)

### 2. تحديثات في `styles.css`
إضافة أنماط شاملة لـ:
- نماذج المصادقة والحقول
- تأثيرات التحقق الفوري
- الأزرار وحالاتها
- النوافذ المنفثقة (Modals)
- التصميم المتجاوب

### 3. تحديثات في `index.html`
إضافة:
- حاويات صفحات المصادقة
- نماذج التسجيل والدخول والبحث عن كلمة المرور
- نوافذ التنبيهات والنجاح

## المتطلبات الفنية / Technical Requirements

### الحقول المطلوبة / Required Fields

#### تسجيل الدخول / Login
```
- البريد الإلكتروني (Email) - مطلوب
- كلمة المرور (Password) - مطلوب (8 أحرف على الأقل)
- تذكرني (Remember Me) - اختياري
```

#### إنشاء الحساب / Registration
```
- اسم المستخدم (Username) - 3-20 حرف إنجليزي/أرقام
- الاسم الكامل (Full Name) - 3 أحرف على الأقل
- البريد الإلكتروني (Email) - صيغة صحيحة
- الدولة (Country) - مطلوب
- رقم الهاتف (Phone) - 7-15 رقم
- النوع (Gender) - مطلوب
- كلمة المرور (Password) - 8 أحرف على الأقل
- تأكيد كلمة المرور - متطابقة
- الموافقة على الشروط - مطلوب
```

#### استرجاع كلمة المرور / Password Recovery
```
- البريد الإلكتروني (Email) - مطلوب وموجود
```

## التحقق من صحة البيانات / Validation

### التحقق الفوري / Real-time Validation
- البريد الإلكتروني: تنسيق صحيح + التحقق من وجوده
- اسم المستخدم: حروف إنجليزية وأرقام فقط + عدم وجوده مسبقاً
- رقم الهاتف: أرقام فقط + عدم وجوده مسبقاً
- كلمة المرور: قوة كلمة المرور + تطابق التأكيد
- جميع الحقول: عدم ترك فراغات + صيغة صحيحة

### الألوان والحالات / Status Colors
- 🟢 أخضر: البيانات صحيحة ومقبولة (Valid)
- 🔴 أحمر: البيانات غير صحيحة أو مكررة (Invalid)
- 🟠 برتقالي: جاري التحقق (Checking)
- ⚫ رمادي: لم يتم التحقق بعد (Neutral)

## دمج مع الـ Backend / Backend Integration

### خطوات التكامل / Integration Steps

#### 1. تحديث نقاط النهاية / Update API Endpoints

في `auth.js`، حدث `API_CONFIG`:

```javascript
const API_CONFIG = {
  loginEndpoint: 'https://your-api.com/api/auth/login',
  registerEndpoint: 'https://your-api.com/api/auth/register',
  forgotPasswordEndpoint: 'https://your-api.com/api/auth/forgot-password',
  checkEmailEndpoint: 'https://your-api.com/api/auth/check-email',
  checkUsernameEndpoint: 'https://your-api.com/api/auth/check-username',
  checkPhoneEndpoint: 'https://your-api.com/api/auth/check-phone',
};
```

#### 2. استبدال الدوال المحاكاة / Replace Simulated Functions

استبدل الدوال التالية برسائل API الفعلية:

```javascript
// استبدال simulateLogin
async function simulateLogin(email, password) {
  const response = await fetch(API_CONFIG.loginEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  
  // احفظ التوكن
  localStorage.setItem('authToken', data.token);
  return true;
}

// استبدال simulateRegister
async function simulateRegister(data) {
  const response = await fetch(API_CONFIG.registerEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) throw new Error('Registration failed');
  return true;
}

// استبدال checkEmailExists
async function checkEmailExists(email) {
  const response = await fetch(`${API_CONFIG.checkEmailEndpoint}?email=${email}`);
  const data = await response.json();
  return data.exists;
}

// استبدال checkUsernameExists
async function checkUsernameExists(username) {
  const response = await fetch(`${API_CONFIG.checkUsernameEndpoint}?username=${username}`);
  const data = await response.json();
  return data.exists;
}

// استبدال checkPhoneExists
async function checkPhoneExists(phone) {
  const response = await fetch(`${API_CONFIG.checkPhoneEndpoint}?phone=${phone}`);
  const data = await response.json();
  return data.exists;
}
```

#### 3. معالجة الأخطاء / Error Handling

تأكد من أن API تعيد رسائل خطأ واضحة:

```javascript
// مثال على استجابة API للخطأ
{
  "success": false,
  "error": "Email already exists",
  "code": "EMAIL_EXISTS"
}
```

#### 4. إدارة التوكنات / Token Management

احفظ التوكن وأرسله مع كل طلب:

```javascript
function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}
```

## استخدام الواجهة / How to Use

### تسجيل الدخول / Login
1. أدخل البريد الإلكتروني الصحيح
2. أدخل كلمة المرور (8 أحرف على الأقل)
3. (اختياري) اختر "تذكرني" لحفظ بيانات المستخدم
4. انقر على "تسجيل الدخول"

### إنشاء حساب / Registration
1. أدخل جميع البيانات المطلوبة
2. سيتم التحقق من توفر اسم المستخدم والبريد الإلكتروني تلقائياً
3. تأكد من قوة كلمة المرور (تتحسن مع إضافة أحرف كبيرة وأرقام ورموز)
4. أدخل كلمة المرور مرة أخرى للتأكيد
5. وافق على الشروط والأحكام
6. انقر على "إنشاء الحساب"

### استرجاع كلمة المرور / Password Recovery
1. أدخل البريد الإلكتروني المسجل
2. سيتم التحقق من وجود الحساب
3. انقر على "إرسال الرابط"
4. تفقد بريدك الإلكتروني للرابط

## الميزات الأمنية / Security Features

✅ **التحقق من صحة البيانات على جانب العميل** - يقلل من طلبات API غير الضرورية
✅ **عدم حفظ كلمات المرور بوضوح** - مشفرة باستخدام localStorage
✅ **معالجة الأخطاء الآمنة** - لا تكشف عن معلومات حساسة
✅ **حماية من CSRF** - استخدم توكنات في الطلبات
✅ **نقل آمن** - استخدم HTTPS في الإنتاج

## التوافقية / Compatibility

- ✅ جميع المتصفحات الحديثة (Chrome, Firefox, Safari, Edge)
- ✅ الهواتف الذكية والأجهزة اللوحية
- ✅ دعم اللغات ثنائية الاتجاه (RTL/LTR)

## استكشاف الأخطاء / Troubleshooting

### مشكلة: لا تظهر رسائل الخطأ
**الحل**: تحقق من أن العناصر بمعرّفات صحيحة في HTML

### مشكلة: عدم اتصال API
**الحل**: تحقق من:
- صحة URL لـ API
- CORS headers من الخادم
- حالة الشبكة في Network tab

### مشكلة: الناموذج لا يُرسل
**الحل**: تحقق من:
- جميع الحقول المطلوبة ممتلئة
- الحقول تجتاز التحقق (أخضر اللون)
- لا توجد أخطاء JavaScript في Console

## الدعم والمساعدة / Support

للمزيد من المساعدة، راجع:
- ملفات المشروع الأصلي في `new-version/FrontEnd`
- وثائق Firebase Auth (إذا كنت تستخدمها)
- وثائق API الخاص بك

---

**ملاحظة**: هذا النظام جاهز للاستخدام الفوري مع بعض التعديلات البسيطة للربط مع API الخاصة بك.
