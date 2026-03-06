import { useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { Check, X, LogOut, Loader2 } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  company: string;
  phone: string;
  message: string;
  createdAt: Timestamp;
  status: 'new' | 'read' | 'replied';
}

const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[];
      setContacts(contactsData);
    }, (err) => {
      console.error("Error fetching contacts:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다. 권한이 있는지 확인해주세요.");
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      setError("로그인에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateStatus = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("상태 업데이트 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-zinc-100 text-center">
          <h1 className="text-2xl font-bold mb-2">관리자 로그인</h1>
          <p className="text-zinc-500 mb-8">문의 내역을 확인하려면 로그인이 필요합니다.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google 계정으로 로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">문의 관리</h1>
            <p className="text-zinc-500 mt-1">접수된 상담 신청 내역을 관리합니다.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 hidden md:inline">{user.email}</span>
            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-black transition-colors"
              title="로그아웃"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
                <tr>
                  <th className="px-6 py-4 w-24">상태</th>
                  <th className="px-6 py-4 w-40">접수일시</th>
                  <th className="px-6 py-4 w-32">성함</th>
                  <th className="px-6 py-4 w-40">업체명</th>
                  <th className="px-6 py-4 w-40">연락처</th>
                  <th className="px-6 py-4">문의 내용</th>
                  <th className="px-6 py-4 w-32 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-400">
                      아직 접수된 문의가 없습니다.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${contact.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                            contact.status === 'read' ? 'bg-zinc-100 text-zinc-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {contact.status === 'new' ? '신규' : 
                           contact.status === 'read' ? '읽음' : '완료'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">
                        {contact.createdAt?.toDate().toLocaleString('ko-KR', {
                          year: '2-digit', month: '2-digit', day: '2-digit',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 font-medium text-black">{contact.name}</td>
                      <td className="px-6 py-4 text-zinc-600">{contact.company}</td>
                      <td className="px-6 py-4 text-zinc-600 font-mono">{contact.phone}</td>
                      <td className="px-6 py-4 text-zinc-600 max-w-xs truncate" title={contact.message}>
                        {contact.message}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <select
                          value={contact.status}
                          onChange={(e) => updateStatus(contact.id, e.target.value as any)}
                          className="text-xs border border-zinc-200 rounded-lg p-1.5 bg-white focus:border-black focus:outline-none"
                        >
                          <option value="new">신규</option>
                          <option value="read">읽음</option>
                          <option value="replied">완료</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
