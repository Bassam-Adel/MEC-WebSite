/**
 * BACKEND INTEGRATION EXAMPLES
 * أمثلة على التكامل مع خوادم مختلفة
 */

// ============================================
// مثال 1: Firebase Authentication
// Example 1: Firebase Authentication
// ============================================

/*
// في auth.js، استبدل simulateLogin بـ:

async function simulateLogin(email, password) {
  try {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_FIREBASE_API_KEY', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.idToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', data.localId);
    
    return true;
  } catch (error) {
    showAlert('خطأ في المصادقة / Auth Error', error.message);
    return false;
  }
}

async function simulateRegister(data) {
  try {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_FIREBASE_API_KEY', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        displayName: data.fullName,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const firebaseData = await response.json();
    
    // حفظ بيانات إضافية في قاعدة البيانات
    await fetch('https://your-server.com/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firebaseData.idToken}`
      },
      body: JSON.stringify({
        userId: firebaseData.localId,
        username: data.username,
        country: data.country,
        phone: data.phone,
        gender: data.gender
      })
    });

    localStorage.setItem('authToken', firebaseData.idToken);
    return true;
  } catch (error) {
    showAlert('خطأ في الإنشاء / Registration Error', error.message);
    return false;
  }
}
*/

// ============================================
// مثال 2: Express.js / Node.js Backend
// Example 2: Express.js / Node.js Backend
// ============================================

/*
// في auth.js:

const API_BASE = 'https://your-api.com/api';

async function simulateLogin(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.user.id);
    
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

async function simulateRegister(data) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return true;
  } catch (error) {
    console.error('Register error:', error);
    return false;
  }
}

async function checkEmailExists(email) {
  try {
    const response = await fetch(`${API_BASE}/auth/check-email?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error('Check email error:', error);
    return false;
  }
}

async function checkUsernameExists(username) {
  try {
    const response = await fetch(`${API_BASE}/auth/check-username?username=${encodeURIComponent(username)}`);
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error('Check username error:', error);
    return false;
  }
}
*/

// ============================================
// مثال 3: ASP.NET Core / C# Backend
// Example 3: ASP.NET Core / C# Backend
// ============================================

/*
async function simulateLogin(email, password) {
  try {
    const response = await fetch('https://your-api.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (response.status === 401) {
      showAlert('خطأ / Error', 'البريد أو كلمة المرور غير صحيحة');
      return false;
    }

    if (!response.ok) {
      const error = await response.json();
      showAlert('خطأ / Error', error.message);
      return false;
    }

    const data = await response.json();
    localStorage.setItem('jwtToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return true;
  } catch (error) {
    showAlert('خطأ / Error', 'حدث خطأ في الاتصال بالخادم');
    return false;
  }
}

async function simulateRegister(data) {
  try {
    const response = await fetch('https://your-api.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      if (error.errors) {
        const errorMessages = Object.values(error.errors).flat().join('\n');
        showAlert('أخطاء التحقق / Validation Errors', errorMessages);
      } else {
        showAlert('خطأ / Error', error.message);
      }
      return false;
    }

    return true;
  } catch (error) {
    showAlert('خطأ / Error', 'حدث خطأ في الاتصال بالخادم');
    return false;
  }
}

async function checkEmailExists(email) {
  try {
    const response = await fetch(`https://your-api.com/api/auth/check-email/${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error('Check email error:', error);
    return false;
  }
}
*/

// ============================================
// مثال 4: Python / Django Backend
// Example 4: Python / Django Backend
// ============================================

/*
const CSRF_TOKEN = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

async function simulateLogin(email, password) {
  try {
    const response = await fetch('/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': CSRF_TOKEN
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      const error = await response.json();
      showAlert('خطأ / Error', error.detail || 'Login failed');
      return false;
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    
    return true;
  } catch (error) {
    showAlert('خطأ / Error', error.message);
    return false;
  }
}

async function simulateRegister(data) {
  try {
    const response = await fetch('/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': CSRF_TOKEN
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMessages = Object.values(error)
        .flat()
        .map(e => typeof e === 'object' ? e.message : e)
        .join('\n');
      showAlert('خطأ / Error', errorMessages);
      return false;
    }

    return true;
  } catch (error) {
    showAlert('خطأ / Error', error.message);
    return false;
  }
}
*/

// ============================================
// مثال 5: MongoDB / GraphQL Backend
// Example 5: MongoDB / GraphQL Backend
// ============================================

/*
const GRAPHQL_ENDPOINT = 'https://your-api.com/graphql';

async function simulateLogin(email, password) {
  const query = `
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
          username
          fullName
        }
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { email, password }
      })
    });

    const result = await response.json();

    if (result.errors) {
      showAlert('خطأ / Error', result.errors[0].message);
      return false;
    }

    const { token, user } = result.data.login;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return true;
  } catch (error) {
    showAlert('خطأ / Error', error.message);
    return false;
  }
}

async function checkEmailExists(email) {
  const query = `
    query CheckEmail($email: String!) {
      checkEmail(email: $email) {
        exists
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { email }
      })
    });

    const result = await response.json();

    if (result.errors) {
      return false;
    }

    return result.data.checkEmail.exists;
  } catch (error) {
    console.error('Check email error:', error);
    return false;
  }
}
*/

// ============================================
// مثال 6: JWT Token Management
// Example 6: JWT Token Management
// ============================================

class AuthTokenManager {
  static getToken() {
    return localStorage.getItem('authToken');
  }

  static setToken(token) {
    localStorage.setItem('authToken', token);
  }

  static getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  static isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  }

  static refreshToken(refreshToken) {
    return fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })
      .then(res => res.json())
      .then(data => {
        this.setToken(data.token);
        return data.token;
      });
  }

  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}

// ============================================
// مثال على الاستخدام / Usage Example
// ============================================

// قبل كل طلب API، تحقق من انتهاء الـ Token:
async function makeAuthenticatedRequest(url, options = {}) {
  if (AuthTokenManager.isTokenExpired()) {
    const refreshToken = localStorage.getItem('refreshToken');
    await AuthTokenManager.refreshToken(refreshToken);
  }

  return fetch(url, {
    ...options,
    headers: {
      ...AuthTokenManager.getAuthHeaders(),
      ...options.headers
    }
  });
}

// استخدم هذه الدالة في جميع الطلبات المحمية:
/*
async function getUserProfile() {
  const response = await makeAuthenticatedRequest('/api/user/profile');
  return response.json();
}
*/
