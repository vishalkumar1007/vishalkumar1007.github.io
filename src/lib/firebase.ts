import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, set, runTransaction, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCah_QhLAN9NtRvykp_D7IHQhKCPhzV778",
  authDomain: "portfoliodata-1007.firebaseapp.com",
  databaseURL: "https://portfoliodata-1007-default-rtdb.firebaseio.com",
  projectId: "portfoliodata-1007",
  storageBucket: "portfoliodata-1007.appspot.com",
  messagingSenderId: "420137143564",
  appId: "1:420137143564:web:b90a04690b3f51fdd78d29",
  measurementId: "G-D79W4M7TK2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const generateRandomCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#%&_123456789';
  const minLength = 8;
  const maxLength = 10;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }
  return randomCode;
};

const findCodeInDB = async (code: string): Promise<boolean> => {
  try {
    const codeRef = ref(database, 'user_local_storage_code');
    const snapshot = await get(codeRef);
    if (snapshot.exists()) {
      let codeExists = false;
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().local_storage_userVisit_code === code) {
          codeExists = true;
        }
      });
      return codeExists;
    }
    return false;
  } catch (error) {
    console.log('Error fetching in findCodeInDB:', error);
    return false;
  }
};

const saveCodeToDB = async (code: string) => {
  try {
    const myMsgRef = ref(database, 'All_visited_user_local_storage_code');
    await push(myMsgRef).then((newRef) => {
      set(newRef, { local_storage_userVisit_code: code });
    });
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

const updateVisitCount = async () => {
  try {
    const userVisitRef = ref(database, 'users_visit_count/visit_count');
    await runTransaction(userVisitRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });
  } catch (error) {
    console.error("Error updating visit count:", error);
  }
};

export const messagesRef = ref(database, 'User_FeedBack_Data');

export const saveMessage = async (data: { name: string; email: string; message: string }) => {
  const newMessageRef = push(messagesRef);
  await set(newMessageRef, {
    Name: data.name,
    Email: data.email,
    Message: data.message,
    timestamp: Date.now(),
  });
};

export const initVisitorTracking = async (): Promise<number> => {
  const STORAGE_KEY = 'local_storage_userVisit_code';
  let LS_code = localStorage.getItem(STORAGE_KEY);

  if (LS_code === null) {
    let G_code: string;
    let codeInDatabase: boolean;
    
    do {
      G_code = generateRandomCode();
      codeInDatabase = await findCodeInDB(G_code);
    } while (codeInDatabase);

    localStorage.setItem(STORAGE_KEY, G_code);
    await saveCodeToDB(G_code);
    await updateVisitCount();
    console.log('WELCOME "This is first time you visit my portfolio Thank you" ');
  } else {
    console.log('WELCOME AGAIN "You already visited my portfolio before" ');
  }

  return getVisitCount();
};

export const getVisitCount = async (): Promise<number> => {
  try {
    const userVisitRef = ref(database, 'users_visit_count/visit_count');
    const snapshot = await get(userVisitRef);
    return snapshot.val() || 0;
  } catch (error) {
    console.error("Error fetching visit data:", error);
    return 0;
  }
};

export const subscribeToVisitCount = (callback: (count: number) => void) => {
  const userVisitRef = ref(database, 'users_visit_count');
  return onValue(userVisitRef, (snapshot) => {
    const count = snapshot.val()?.visit_count || 0;
    callback(count);
  });
};

export default app;
