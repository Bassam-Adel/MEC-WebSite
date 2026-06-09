/**
 * Firebase Configuration
 * إعدادات الاتصال بخدمات Firebase
 */

const FIREBASE_CONFIG = {
  // Firebase Web API Key للمصادقة
  WebApiKey: 'AIzaSyBCogJEtcrgoYBnJ9L0MVXP0104Gl2Pnmk',
  
  // Realtime Database URL
  DatabaseUrl: 'https://mec3-launcher-default-rtdb.firebaseio.com',
  
  // Storage Bucket للصور
  StorageBucket: 'mec3-launcher.firebasestorage.app',
  
  // Authentication endpoints
  AUTH_ENDPOINTS: {
    SIGN_UP: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCogJEtcrgoYBnJ9L0MVXP0104Gl2Pnmk`,
    SIGN_IN: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCogJEtcrgoYBnJ9L0MVXP0104Gl2Pnmk`,
    GET_USER: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBCogJEtcrgoYBnJ9L0MVXP0104Gl2Pnmk`
  }
};

// التحقق من أن الإعدادات قد تم تحميلها بنجاح
if (FIREBASE_CONFIG.WebApiKey && FIREBASE_CONFIG.DatabaseUrl) {
  console.log('✓ Firebase Config loaded successfully');
}
