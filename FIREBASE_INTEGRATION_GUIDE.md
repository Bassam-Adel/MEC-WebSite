  
# Firebase Integration - شرح التكامل مع Firebase

## نظرة عامة / Overview

تم تطبيق تكامل كامل مع Firebase يتضمن:

✅ **تسجيل الدخول (Login) عبر Firebase Authentication**
✅ **إنشاء حساب (Registration) عبر Firebase Authentication**
✅ **جلب بيانات المستخدم من Realtime Database**
✅ **جلب صورة البروفايل من Firebase Storage**
✅ **عرض بيانات المستخدم في Header بدل أزرار تسجيل الدخول**
✅ **تسجيل الخروج (Logout) مع مسح البيانات**

---

## الملفات الجديدة / New Files

### 1. `firebase-config.js`
يحتوي على إعدادات Firebase:
```javascript
{
  WebApiKey: 'AIzaSyBCogJEtcrgoYBnJ9L0MVXP0104Gl2Pnmk',
  DatabaseUrl: 'https://mec3-launcher-default-rtdb.firebaseio.com',
  StorageBucket: 'mec3-launcher.firebasestorage.app'
}
```

### 2. `firebase-auth.js`
فئة `FirebaseAuthManager` تتعامل مع:
- تسجيل الدخول والتسجيل
- جلب بيانات المستخدم
- حفظ بيانات المستخدم
- التحقق من توفر البريد الإلكتروني
- إدارة الجلسات (Session Management)

---

## آلية العمل / How It Works

### 1. عند تسجيل الدخول / On Login

```
1. المستخدم يدخل البريد وكلمة المرور
2. النظام يرسل البيانات إلى Firebase Auth
3. Firebase يُرجع معرف المستخدم (ID) وتوكن المصادقة (Token)
4. النظام يحفظ التوكن في localStorage
5. يجلب بيانات المستخدم من Realtime Database باستخدام البريد
6. يجلب صورة البروفايل من Firebase Storage
7. يغلق نافذة تسجيل الدخول
8. يظهر بيانات المستخدم في Header
```

### 2. بيانات المستخدم في Database / User Data Structure

```json
{
  "Users": {
    "USERNAME": {
      "FullName": "أحمد محمد",
      "Email": "user@example.com",
      "PhoneNumber": "+20 1001234567",
      "Gender": "Male",
      "BirthDate": "1995-10-15",
      "Country": "Egypt",
      "XP": 0,
      "Level": 1,
      "CreatedAt": "2026-05-24T12:00:00Z",
      "OnlineStatus": "Online"
    }
  }
}
```

### 3. صورة البروفايل / Profile Picture

الصورة يتم جلبها من:
```
/Users/{USERNAME}/profile.jpg
```

إذا لم توجد الصورة، يتم استخدام صورة افتراضية مُنشأة بناءً على اسم المستخدم:
```javascript
https://ui-avatars.com/api/?name=USERNAME&background=4CAF50&color=fff&size=120
```

---

## التدفق الكامل / Complete Flow

### تسجيل دخول ناجح:

```
1. Login Form يُظهر معلومة النجاح
        ↓
2. بعد 1.5 ثانية يتم غلق النافذة
        ↓
3. بيانات المستخدم تظهر في Header:
   - صورة البروفايل (40x40px)
   - الاسم الكامل
   - اسم المستخدم (@USERNAME)
        ↓
4. زر الخروج (Logout) يظهر بجانب البيانات
```

### عند تسجيل الخروج / On Logout:

```
1. المستخدم يضغط زر Logout
        ↓
2. جميع البيانات يتم حذفها من localStorage
        ↓
3. بيانات المستخدم في Header تختفي
        ↓
4. أزرار تسجيل الدخول وإنشاء الحساب تظهر مرة أخرى
```

---

## البيانات المُحفوظة / Saved Data

عند تسجيل الدخول بنجاح، يتم حفظ البيانات التالية في localStorage:

```javascript
authToken        // Firebase Authentication Token
userId           // معرف المستخدم الفريد
userEmail        // البريد الإلكتروني
refreshToken     // Token للتحديث
currentUser      // بيانات المستخدم الكاملة (JSON)
profilePicture   // رابط صورة البروفايل
```

---

## استعادة الجلسة / Session Restoration

عند فتح الصفحة مرة أخرى، النظام يتحقق من:

1. هل يوجد `authToken` في localStorage؟
2. هل يوجد `currentUser` مُحفوظ؟

إذا كانا موجودين، يتم:
- استعادة بيانات المستخدم تلقائياً
- عرض الملف الشخصي في Header بدون الحاجة لإدخال كلمة المرور مرة أخرى

---

## معالجة الأخطاء / Error Handling

| الخطأ | الحل |
|------|------|
| Firebase API Key غير صحيح | تحديث الـ API Key في firebase-config.js |
| لا يمكن الاتصال بقاعدة البيانات | التحقق من الإنترنت والـ Database URL |
| صورة البروفايل غير موجودة | استخدام صورة افتراضية |
| البريد أو كلمة المرور غير صحيحة | عرض رسالة خطأ واضحة |

---

## المتغيرات المهمة / Key Variables

### في firebase-auth.js:

```javascript
this.authToken        // Firebase ID Token
this.userId           // معرف المستخدم
this.userEmail        // البريد الإلكتروني
this.currentUser      // كائن بيانات المستخدم
  {
    email,            // البريد
    username,         // اسم المستخدم
    fullName,         // الاسم الكامل
    phoneNumber,      // رقم الهاتف
    gender,           // النوع
    birthDate,        // تاريخ الميلاد
    xp,               // نقاط الخبرة
    level,            // المستوى
    profilePicture    // رابط الصورة
  }
```

---

## التعديلات المطلوبة / Required Modifications

### إذا كان لديك Firebase Project مختلف:

1. افتح `firebase-config.js`
2. استبدل القيم التالية:

```javascript
WebApiKey: 'YOUR_FIREBASE_API_KEY',
DatabaseUrl: 'YOUR_DATABASE_URL',
StorageBucket: 'YOUR_STORAGE_BUCKET'
```

### إذا كنت تستخدم Backend مختلف:

يمكنك استبدال الدوال التالية في `firebase-auth.js`:
- `login()`
- `register()`
- `fetchUserProfile()`

---

## اختبار التكامل / Testing Integration

### Test Case 1: تسجيل دخول بنجاح
```
1. أدخل بريد صحيح وكلمة مرور
2. يجب أن تظهر رسالة النجاح
3. يجب أن تغلق النافذة تلقائياً
4. يجب أن تظهر بيانات المستخدم في Header
```

### Test Case 2: تسجيل حساب جديد
```
1. انقر على "إنشاء حساب"
2. ملأ جميع الحقول بالبيانات الصحيحة
3. يجب أن ينشئ الحساب في Firebase
4. يجب أن يحفظ البيانات في Database
5. يجب أن يعيد تحجيل الدخول تلقائياً
```

### Test Case 3: تسجيل الخروج
```
1. اضغط على زر الخروج بجانب الملف الشخصي
2. يجب أن تختفي بيانات المستخدم
3. يجب أن تظهر أزرار تسجيل الدخول وإنشاء الحساب
4. يجب أن يتم مسح localStorage
```

---

## الميزات الإضافية / Additional Features

✨ **حفظ كلمات المرور**: عند تفعيل "Remember Me"
✨ **التحقق الفوري**: تتحقق من توفر البريد والمستخدم فوراً
✨ **دعم اللغات**: واجهة ثنائية اللغة (عربي/إنجليزي/روسي)
✨ **استعادة الجلسة**: المستخدم يبقى مسجل دخول حتى يقوم بتسجيل الخروج

---

## الدعم والمساعدة / Support

إذا واجهت مشاكل:

1. **تحقق من وحدة التحكم (Console)**: اضغط F12 وانظر للأخطاء
2. **تحقق من إعدادات Firebase**: تأكد من صحة المفاتيح والـ URLs
3. **تحقق من الإنترنت**: تأكد من الاتصال بالإنترنت
4. **امسح الـ localStorage**: افتح DevTools وامسح البيانات المحفوظة

---

## ملخص / Summary

✅ تكامل Firebase كامل وجاهز للاستخدام
✅ واجهة مستخدم احترافية وسهلة الاستخدام
✅ معالجة أخطاء شاملة
✅ دعم اللغات المتعددة
✅ حفظ واستعادة الجلسات تلقائياً
