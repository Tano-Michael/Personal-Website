import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData } from './types';
import { defaultData } from './data';
import { db, auth } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface AppState extends SiteData {
  updateData: (key: keyof SiteData, value: any) => Promise<void>;
  addComment: (comment: any) => Promise<void>;
  deleteItemDb: (key: string, id: string) => Promise<void>;
  metrics: { uniqueVisits: number };
  user: User | null;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(defaultData);
  const [user, setUser] = useState<User | null>(null);
  const [metrics, setMetrics] = useState({ uniqueVisits: 0 });
  const isAdmin = user?.email === 'tanomichael65@gmail.com';

  useEffect(() => {
    // Record visit
    if (!sessionStorage.getItem('hasVisited')) {
      sessionStorage.setItem('hasVisited', 'true');
      setDoc(doc(db, 'metrics', 'visitors'), { uniqueVisits: increment(1) }, { merge: true }).catch(console.error);
    }
  }, []);

  useEffect(() => {
    // Listen to metrics
    if (!isAdmin) return;
    const unsubMetrics = onSnapshot(doc(db, 'metrics', 'visitors'), (doc) => {
      if (doc.exists()) {
        setMetrics({ uniqueVisits: doc.data().uniqueVisits || 0 });
      }
    });

    return () => unsubMetrics();
  }, [isAdmin]);

  useEffect(() => {
    // Seed initial data if config doesn't exist (only if admin)
    if (isAdmin) {
      getDoc(doc(db, 'config', 'site')).then(snap => {
        if (!snap.exists()) {
          setDoc(doc(db, 'config', 'site'), { hero: defaultData.hero, about: defaultData.about });
          defaultData.books.forEach(b => setDoc(doc(db, 'books', b.id), b));
          defaultData.articles.forEach(a => setDoc(doc(db, 'articles', a.id), a));
          defaultData.podcasts.forEach(p => setDoc(doc(db, 'podcasts', p.id), p));
        }
      }).catch(err => console.error("Error seeding data:", err));
    }
  }, [isAdmin]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const unsubBooks = onSnapshot(collection(db, 'books'), (snapshot) => {
      setData(prev => ({ ...prev, books: snapshot.docs.map(d => ({ ...d.data(), id: d.id } as any)) }));
    });

    const unsubArticles = onSnapshot(collection(db, 'articles'), (snapshot) => {
      setData(prev => ({ ...prev, articles: snapshot.docs.map(d => ({ ...d.data(), id: d.id } as any)).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) }));
    });

    const unsubPodcasts = onSnapshot(collection(db, 'podcasts'), (snapshot) => {
      setData(prev => ({ ...prev, podcasts: snapshot.docs.map(d => ({ ...d.data(), id: d.id } as any)) }));
    });

    const unsubComments = onSnapshot(collection(db, 'comments'), (snapshot) => {
      setData(prev => ({ ...prev, comments: snapshot.docs.map(d => ({ ...d.data(), id: d.id } as any)).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) }));
    });

    const unsubConfig = onSnapshot(doc(db, 'config', 'site'), (snapshot) => {
      if (snapshot.exists()) {
        const d = snapshot.data();
        setData(prev => ({ ...prev, hero: d.hero || prev.hero, about: d.about || prev.about }));
      }
    });

    return () => {
      unsubAuth();
      unsubBooks();
      unsubArticles();
      unsubPodcasts();
      unsubComments();
      unsubConfig();
    };
  }, []);

  const updateData = async (key: keyof SiteData, value: any) => {
    if (!isAdmin) return;
    
    // For arrays, we just update the Firestore logic
    if (key === 'books' || key === 'articles' || key === 'podcasts' || key === 'comments') {
      // Find deleted items
      const currentIds = (data[key] as any[]).map(x => x.id);
      const newIds = (value as any[]).map(x => x.id);
      const deletedIds = currentIds.filter(id => !newIds.includes(id));
      
      deletedIds.forEach(id => {
        deleteDoc(doc(db, key as string, id));
      });

      // Find added or updated items
      value.forEach((item: any) => {
        const id = item.id || Date.now().toString();
        const { id: _, ...rest } = item;
        setDoc(doc(db, key as string, id), rest);
      });
    } else if (key === 'hero' || key === 'about') {
      setDoc(doc(db, 'config', 'site'), { [key]: value }, { merge: true });
    }
  };

  const addComment = async (comment: any) => {
    const id = comment.id || Date.now().toString();
    const { id: _, ...rest } = comment;
    await setDoc(doc(db, 'comments', id), rest);
  };

  const deleteItemDb = async (key: string, id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, key, id));
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert("Delete failed: " + err.message);
    }
  };

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, addComment, deleteItemDb, metrics, user, isAdmin, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used within AppProvider");
  return ctx;
};
