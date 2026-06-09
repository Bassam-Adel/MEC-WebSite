/**
 * Firebase Authentication Module
 * وحدة المصادقة والتكامل مع Firebase
 */

class FirebaseAuthManager {
  constructor() {
    this.authToken = localStorage.getItem('authToken');
    this.userId = localStorage.getItem('userId');
    this.userEmail = localStorage.getItem('userEmail');
    this.currentUser = null;
  }

  /**
   * تسجيل الدخول عبر Firebase
   * Firebase Login
   */
  async login(email, password) {
    try {
      const response = await fetch(FIREBASE_CONFIG.AUTH_ENDPOINTS.SIGN_IN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'فشل تسجيل الدخول / Login failed');
      }

      // حفظ بيانات المصادقة
      this.authToken = data.idToken;
      this.userId = data.localId;
      this.userEmail = data.email;

      localStorage.setItem('authToken', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('refreshToken', data.refreshToken);

      // جلب بيانات المستخدم من Realtime Database
      await this.fetchUserProfile(email);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * إنشاء حساب جديد عبر Firebase
   * Firebase Sign Up
   */
  async register(email, password, displayName) {
    try {
      const response = await fetch(FIREBASE_CONFIG.AUTH_ENDPOINTS.SIGN_UP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          displayName: displayName,
          returnSecureToken: true
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'فشل الإنشاء / Registration failed');
      }

      // حفظ بيانات المصادقة
      this.authToken = data.idToken;
      this.userId = data.localId;
      this.userEmail = data.email;

      localStorage.setItem('authToken', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('refreshToken', data.refreshToken);

      return {
        uid: data.localId,
        email: data.email,
        displayName: displayName
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * جلب بيانات المستخدم من Realtime Database
   * Fetch user profile from Firebase Realtime Database
   */
  async fetchUserProfile(email) {
    try {
      if (!this.authToken) {
        throw new Error('Not authenticated');
      }

      // Try to query database by email
      const usernameFallback = email.split('@')[0].toUpperCase();
      let userProfileData = null;
      let username = usernameFallback;

      try {
        const queryUrl = `${FIREBASE_CONFIG.DatabaseUrl}/Users.json?auth=${this.authToken}&orderBy=${encodeURIComponent('"Email"')}&equalTo=${encodeURIComponent('"' + email.toLowerCase().trim() + '"')}`;
        const response = await fetch(queryUrl);

        if (response.ok) {
          const usersObj = await response.json();
          if (usersObj && Object.keys(usersObj).length > 0) {
            username = Object.keys(usersObj)[0];
            userProfileData = usersObj[username];
          }
        } else {
          console.warn('Failed to query user profile by email index, trying full scan fallback...');
          // Full scan fallback if index is not defined
          const scanUrl = `${FIREBASE_CONFIG.DatabaseUrl}/Users.json?auth=${this.authToken}`;
          const scanResp = await fetch(scanUrl);
          if (scanResp.ok) {
            const allUsers = await scanResp.json();
            if (allUsers) {
              for (const key of Object.keys(allUsers)) {
                if (allUsers[key] && allUsers[key].Email && allUsers[key].Email.toLowerCase().trim() === email.toLowerCase().trim()) {
                  username = key;
                  userProfileData = allUsers[key];
                  break;
                }
              }
            }
          }
        }
      } catch (queryErr) {
        console.warn('Error querying user profile by email index:', queryErr);
      }

      // Fallback: if query failed or returned no results, check the direct username node
      if (!userProfileData) {
        const directUrl = `${FIREBASE_CONFIG.DatabaseUrl}/Users/${usernameFallback}.json?auth=${this.authToken}`;
        const directResp = await fetch(directUrl);
        if (directResp.ok) {
          userProfileData = await directResp.json();
          if (userProfileData) {
            username = usernameFallback;
          }
        }
      }

      if (userProfileData) {
        // تخزين بيانات المستخدم
        this.currentUser = {
          email: email,
          username: username,
          fullName: userProfileData.FullName || 'User',
          phoneNumber: userProfileData.PhoneNumber || '',
          gender: userProfileData.Gender || '',
          birthDate: userProfileData.BirthDate || '',
          xp: userProfileData.XP || 0,
          level: userProfileData.Level || 1,
          onlineStatus: userProfileData.OnlineStatus || 'Offline',
          profilePicture: userProfileData.AvatarUrl || ''
        };

        // حفظ في localStorage مؤقتاً
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        // جلب صورة البروفايل من Storage إذا لم تكن موجودة في حقل AvatarUrl
        if (!this.currentUser.profilePicture) {
          await this.fetchProfilePicture(username);
        }

        // تحديث localStorage ببيانات المستخدم بعد جلب صورة البروفايل
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        return this.currentUser;
      }

      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * جلب صورة البروفايل من Firebase Storage
   * Fetch profile picture from Firebase Storage
   */
  async fetchProfilePicture(username) {
    try {
      const uName = username.toUpperCase();
      // Image is located in /Avatars/{USERNAME}.png in Firebase Storage
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_CONFIG.StorageBucket}/o/Avatars%2F${uName}.png?alt=media`;

      // Check if image exists
      const checkResponse = await fetch(imageUrl, {
        method: 'HEAD'
      }).catch(() => ({ ok: false }));

      if (checkResponse.ok) {
        this.currentUser.profilePicture = imageUrl;
        localStorage.setItem('profilePicture', imageUrl);
        return imageUrl;
      }

      // If not exists, use default fallback avatar
      const defaultPicture = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        this.currentUser?.fullName || 'User'
      )}&background=4CAF50&color=fff&size=120`;

      this.currentUser.profilePicture = defaultPicture;
      localStorage.setItem('profilePicture', defaultPicture);

      return defaultPicture;
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      // استخدام صورة افتراضية
      const defaultPicture = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        this.currentUser?.fullName || 'User'
      )}&background=4CAF50&color=fff&size=120`;
      this.currentUser.profilePicture = defaultPicture;
      return defaultPicture;
    }
  }

  /**
   * تسجيل الخروج
   * Logout
   */
  logout() {
    this.authToken = null;
    this.userId = null;
    this.userEmail = null;
    this.currentUser = null;

    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('profilePicture');
  }

  /**
   * التحقق من حالة المصادقة
   * Check authentication status
   */
  isAuthenticated() {
    return !!this.authToken;
  }

  /**
   * الحصول على بيانات المستخدم الحالي
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser || JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * حفظ بيانات المستخدم في Database بعد التسجيل
   * Save user profile to Database after registration
   */
  async saveUserProfile(email, registrationData) {
    try {
      if (!this.authToken) {
        throw new Error('Not authenticated');
      }

      // Use chosen username or fallback to email prefix
      const username = (registrationData.username || email.split('@')[0]).toUpperCase();

      // إنشاء كائن بيانات المستخدم
      const userData = {
        FullName: registrationData.fullName,
        Email: email,
        PhoneNumber: registrationData.phone,
        Gender: registrationData.gender,
        BirthDate: registrationData.birthDate || '',
        Country: registrationData.country || '',
        XP: 0,
        Level: 1,
        CreatedAt: new Date().toISOString(),
        OnlineStatus: 'Online'
      };

      // حفظ البيانات في Database
      const response = await fetch(
        `${FIREBASE_CONFIG.DatabaseUrl}/Users/${username}.json?auth=${this.authToken}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save user profile');
      }

      this.currentUser = {
        email: email,
        username: username,
        fullName: userData.FullName,
        phoneNumber: userData.PhoneNumber,
        gender: userData.Gender,
        birthDate: userData.BirthDate,
        country: userData.Country,
        xp: userData.XP,
        level: userData.Level,
        createdAt: userData.CreatedAt,
        onlineStatus: userData.OnlineStatus
      };

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      return true;
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  }

  /**
   * التحقق من توفر البريد الإلكتروني
   * Check if email exists
   */
  async checkEmailExists(email) {
    try {
      // Use Firebase Auth REST endpoint createAuthUri to check if identifier/email is registered
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${FIREBASE_CONFIG.WebApiKey}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, continueUri: 'http://localhost' })
      });

      console.log('checkEmailExists: createAuthUri status', resp.status);
      const respText = await resp.text();
      console.log('checkEmailExists: createAuthUri body', respText);

      if (!resp.ok) {
        // fallback: try checking Realtime DB using username key
        const username = email.split('@')[0].toUpperCase();
        const dbResp = await fetch(`${FIREBASE_CONFIG.DatabaseUrl}/Users/${username}.json`);
        console.log('checkEmailExists: DB fallback status', dbResp.status);
        const dbText = await dbResp.text();
        console.log('checkEmailExists: DB fallback body', dbText);
        if (!dbResp.ok) return false;
        const dbData = JSON.parse(dbText || 'null');
        return dbData !== null;
      }

      let data;
      try { data = JSON.parse(respText || '{}'); } catch (e) { data = {}; }
      // createAuthUri returns {registered: boolean, ...}
      if (typeof data.registered === 'boolean') {
        console.log('checkEmailExists: registered=', data.registered);
        return data.registered;
      }

      console.log('checkEmailExists: no registered flag, returning false');
      return false;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }

  /**
   * إرسال بريد إعادة تعيين كلمة المرور عبر Firebase Auth REST
   */
  async sendPasswordReset(email) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_CONFIG.WebApiKey}`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestType: 'PASSWORD_RESET', email })
      });

      const text = await resp.text();
      console.log('sendPasswordReset status', resp.status, 'body', text);
      if (!resp.ok) {
        // parse error message if available
        try {
          const j = JSON.parse(text || '{}');
          throw new Error(j.error?.message || 'Failed to send password reset');
        } catch (err) {
          throw new Error('Failed to send password reset');
        }
      }

      return true;
    } catch (error) {
      console.error('Error sending password reset:', error);
      throw error;
    }
  }
}

// إنشاء instance عام من مدير Firebase
const firebaseAuth = new FirebaseAuthManager();

console.log('✓ Firebase Auth Manager initialized');
