import React, { useState, useEffect } from 'react';
import { zkProof, zkVerifier } from './contracts';
import firebase from 'firebase/app';
import 'firebase/firestore'; 

interface ChatProps {
  zkProofAddress: PublicKey;
  zkVerifierAddress: PublicKey;
}

interface Message { // Mesajlar için interface
  message: string;
  isVerified: boolean;
  timestamp: firebase.firestore.Timestamp; // Firebase için timestamp  
}

const Chat: React.FC<ChatProps> = ({ zkProofAddress, zkVerifierAddress }) => {
  const [messages, setMessages] = useState<Message[]>([]); // Doğru tip ataması
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu eklendi

  useEffect(() => {
    async function loadMessages() {
      setIsLoading(true); // Yükleme başlangıcı 

      const db = firebase.firestore(); // Firebase Firestore bağlantısı

      // Query Snapshot işlemi - Veritabanı sorgusu burada yer alır 
      const querySnapshot = await db.collection('messages').orderBy('timestamp').get();
      const messagesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(), // Firebase timestamp dönüşümü
      }));

      setMessages(messagesData as Message[]);  
      setIsLoading(false); // Yükleme işleminin tamamlandığının belirtilmesi 
    }

    loadMessages(); // Fonksiyonun ilk render sonrası tetiklenmesi  
  }, []);

  const sendMessage = async () => {

    const proof = zkProof.generateProof(message);

    // ... Mesajı ve proof'u veritabanına kaydetme kodları eklenecek


    const isVerified = await zkVerifier.verifyProof(proof, message);
    if (!isVerified) {
      console.error('Mesaj doğrulanamadı:', message);
      return;
    }


    const newMessages = [...messages, { message, isVerified }];
    setMessages(newMessages);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, i) => (
          <div key={i} className="message">
            {message.message} - {message.isVerified ? 'Doğrulandı' : 'Doğrulanamadı'}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={message} onChange={handleInputChange} />
        <button onClick={sendMessage}>Gönder</button>
      </div>
    </div>
  );
};

export default Chat;
