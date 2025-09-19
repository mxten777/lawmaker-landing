// Firestore utility functions
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  orderBy, 
  limit,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebaseClient';

// Mock data for local testing (when Firebase is not configured)
const mockPledges = [
  {
    id: '1',
    title: '일자리 창출과 경제 활성화',
    description: '지역 내 중소기업 지원을 통한 양질의 일자리 창출',
    category: '경제',
    priority: 1,
    status: 'active',
    createdAt: new Date('2025-01-15')
  },
  {
    id: '2',
    title: '교육 환경 개선',
    description: '모든 학생이 평등한 교육 기회를 받을 수 있는 환경 조성',
    category: '교육',
    priority: 2,
    status: 'active',
    createdAt: new Date('2025-01-20')
  },
  {
    id: '3',
    title: '의료 접근성 향상',
    description: '지역 내 의료 인프라 확충 및 의료비 부담 경감',
    category: '복지',
    priority: 3,
    status: 'active',
    createdAt: new Date('2025-01-25')
  }
];

const mockNews = [
  {
    id: '1',
    title: '지역 주민과의 만남 - 1월 정기 간담회',
    content: '지역 주민들과 함께하는 정기 간담회를 개최하여 현안 문제들을 논의했습니다. 주민들의 다양한 의견을 청취하고, 지역 발전을 위한 건설적인 논의가 이어졌습니다.',
    excerpt: '주민들의 목소리에 귀 기울이는 시간을 가졌습니다.',
    category: '활동',
    author: '김의원',
    publishedAt: new Date('2025-01-30'),
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800'
  },
  {
    id: '2',
    title: '교육예산 증액 법안 발의',
    content: '지역 교육 환경 개선을 위한 교육예산 증액 법안을 국회에 발의했습니다. 이번 법안은 학교 시설 현대화와 교육 프로그램 확충에 중점을 두고 있습니다.',
    excerpt: '우리 아이들의 더 나은 미래를 위한 투자입니다.',
    category: '정책',
    author: '김의원',
    publishedAt: new Date('2025-02-05'),
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800'
  },
  {
    id: '3',
    title: '소상공인 지원 방안 모색',
    content: '코로나19로 어려움을 겪는 소상공인들을 위한 실질적 지원 방안을 논의했습니다. 임대료 지원과 저금리 대출 확대 등의 방안을 검토하고 있습니다.',
    excerpt: '지역 경제의 버팀목인 소상공인을 적극 지원하겠습니다.',
    category: '경제',
    author: '김의원',
    publishedAt: new Date('2025-02-10'),
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800'
  }
];

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  };
  
  return config.apiKey && config.authDomain && config.projectId && 
         !config.apiKey.includes('demo') && !config.authDomain.includes('demo');
};

// Settings collection functions
export const getSettings = async () => {
  // Mock settings if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.log('🔧 Using mock settings (Firebase not configured)');
    return {
      siteName: '김의원 공식 홈페이지',
      description: '지역을 사랑하는 마음으로 더 나은 미래를 만들어가겠습니다.',
      contact: {
        phone: '02-1234-5678',
        email: 'contact@kimmp.kr',
        address: '서울특별시 영등포구 의사당대로 1'
      },
      social: {
        facebook: 'https://facebook.com/kimmp',
        instagram: 'https://instagram.com/kimmp',
        youtube: 'https://youtube.com/kimmp'
      }
    };
  }

  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'main'));
    if (settingsDoc.exists()) {
      return settingsDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

// Pledges collection functions
export const getPledges = async () => {
  // Use mock data if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.log('🔧 Using mock data for pledges (Firebase not configured)');
    return mockPledges;
  }

  try {
    const pledgesRef = collection(db, 'pledges');
    const q = query(pledgesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching pledges:', error);
    return mockPledges; // Fallback to mock data
  }
};

export const getPledgeById = async (id) => {
  // Use mock data if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.log('🔧 Using mock data for pledge detail (Firebase not configured)');
    return mockPledges.find(pledge => pledge.id === id) || null;
  }

  try {
    const pledgeDoc = await getDoc(doc(db, 'pledges', id));
    if (pledgeDoc.exists()) {
      return { id: pledgeDoc.id, ...pledgeDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching pledge:', error);
    return mockPledges.find(pledge => pledge.id === id) || null;
  }
};

// News collection functions
export const getNews = async (limitCount = 10) => {
  // Use mock data if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.log('🔧 Using mock data for news (Firebase not configured)');
    return mockNews.slice(0, limitCount);
  }

  try {
    const newsRef = collection(db, 'news');
    const q = query(newsRef, orderBy('publishedAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return mockNews.slice(0, limitCount); // Fallback to mock data
  }
};

export const getNewsById = async (id) => {
  // Use mock data if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.log('🔧 Using mock data for news detail (Firebase not configured)');
    return mockNews.find(news => news.id === id) || null;
  }

  try {
    const newsDoc = await getDoc(doc(db, 'news', id));
    if (newsDoc.exists()) {
      return { id: newsDoc.id, ...newsDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching news:', error);
    return mockNews.find(news => news.id === id) || null;
  }
};

// Contact form submission
export const submitContact = async (contactData) => {
  // Mock submission if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.log('🔧 Mock contact submission (Firebase not configured):', contactData);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, id: 'mock-' + Date.now() };
  }

  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactData,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    
    // Trigger webhook notification (implement separately)
    await triggerWebhook('contact', { id: docRef.id, ...contactData });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error: error.message };
  }
};

// Volunteer form submission
export const submitVolunteer = async (volunteerData) => {
  // Mock submission if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.log('🔧 Mock volunteer submission (Firebase not configured):', volunteerData);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, id: 'mock-volunteer-' + Date.now() };
  }

  try {
    const docRef = await addDoc(collection(db, 'volunteers'), {
      ...volunteerData,
      createdAt: Timestamp.now(),
      status: 'new'
    });
    
    // Trigger webhook notification
    await triggerWebhook('volunteer', { id: docRef.id, ...volunteerData });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting volunteer:', error);
    return { success: false, error: error.message };
  }
};

// Webhook notification function
const triggerWebhook = async (type, data) => {
  try {
    // Replace with your webhook URL (Slack, Discord, etc.)
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
    
    if (!webhookUrl) return;
    
    const message = {
      text: `새로운 ${type === 'contact' ? '문의' : '자원봉사 신청'}이 접수되었습니다!`,
      attachments: [
        {
          color: type === 'contact' ? '#3b82f6' : '#ef4444',
          fields: Object.entries(data).map(([key, value]) => ({
            title: key,
            value: value?.toString() || 'N/A',
            short: true
          }))
        }
      ]
    };
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};