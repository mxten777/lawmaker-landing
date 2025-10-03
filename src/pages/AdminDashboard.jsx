import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firestore';
// ...existing code...

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 실시간 데이터 구독
  useEffect(() => {
    setLoading(true);
    const unsubContacts = onSnapshot(
      query(collection(db, 'contacts'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );
    const unsubVolunteers = onSnapshot(
      query(collection(db, 'volunteers'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setVolunteers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );
    return () => {
      unsubContacts();
      unsubVolunteers();
    };
  }, []);

  // 통계 계산
  const totalContacts = contacts.length;
  const totalVolunteers = volunteers.length;
  const today = new Date().toISOString().slice(0, 10);
  const todayContacts = contacts.filter(c => c.createdAt?.startsWith(today)).length;
  const todayVolunteers = volunteers.filter(v => v.createdAt?.startsWith(today)).length;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-8 text-primary-700">관리자 대시보드</h1>
      <div className="grid gap-6 md:grid-cols-4 mb-10">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-500 mb-1">전체 문의</div>
          <div className="text-2xl font-bold text-primary-700">{totalContacts}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-500 mb-1">오늘 문의</div>
          <div className="text-2xl font-bold text-primary-700">{todayContacts}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-500 mb-1">전체 자원봉사</div>
          <div className="text-2xl font-bold text-primary-700">{totalVolunteers}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-sm text-gray-500 mb-1">오늘 자원봉사</div>
          <div className="text-2xl font-bold text-primary-700">{todayVolunteers}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 문의 리스트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">문의 내역</h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {contacts.slice(0, 10).map((c) => (
              <div key={c.id} className="p-4 hover:bg-gray-50">
                <div className="font-bold text-primary-700">{c.subject}</div>
                <div className="text-sm text-gray-600">{c.name} · {c.email}</div>
                <div className="text-xs text-gray-400">{c.createdAt?.replace('T', ' ').slice(0, 16)}</div>
                <div className="text-gray-700 mt-1 line-clamp-2">{c.message}</div>
              </div>
            ))}
            {contacts.length === 0 && <div className="p-4 text-gray-400">문의 내역이 없습니다.</div>}
          </div>
        </div>
        {/* 자원봉사 리스트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">자원봉사 신청 내역</h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {volunteers.slice(0, 10).map((v) => (
              <div key={v.id} className="p-4 hover:bg-gray-50">
                <div className="font-bold text-primary-700">{v.name} ({v.age})</div>
                <div className="text-sm text-gray-600">{v.email} · {v.phone}</div>
                <div className="text-xs text-gray-400">{v.createdAt?.replace('T', ' ').slice(0, 16)}</div>
                <div className="text-gray-700 mt-1 line-clamp-2">{v.motivation}</div>
              </div>
            ))}
            {volunteers.length === 0 && <div className="p-4 text-gray-400">신청 내역이 없습니다.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
