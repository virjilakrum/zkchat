import * as O1 from '@o1labs/o1-js';
import { Field, Mina, PrivateKey, PublicKey, shutdown } from 'snarkyjs';
import { zkProof, zkVerifier } from './contracts';
import Chat from './components/Chat';

// Değişkenler ve Sabitler
const MINA_RPC_URL = 'http://localhost:3085'; // Mina RPC düğümünüzün URL'si
const ZK_PROGRAM_PATH = './build/zkchat.exe'; // Derlenmiş ZK programınızın yolu

// ZK Sözleşmeleri Dağıtım Fonksiyonları
async function deployZkProofContract(): Promise<PublicKey> {
  Mina.setActiveInstance(new Mina(MINA_RPC_URL)); // Mina bağlantısı başlatma

  const deployerAccount = PrivateKey.random(); // Dağıtım yapacak hesabın rasgele oluşturulması
  const zkAppPrivateKey = PrivateKey.random(); // ZK Uygulama özel anahtarı oluşturulması
  const zkAppAddress = zkAppPrivateKey.toPublicKey(); // ZK Uygulama genel anahtarı
  const zkApp = new zkProof(zkAppAddress); // zkProof sözleşmesinin başlatılması

  try {
    await Mina.transaction(deployerAccount, async () => {
      deployerAccount.balance.subInPlace(Field(1)); // İşlem ücreti kesintisi

      await zkApp.deploy({ zkappKey: zkAppPrivateKey }); // ZK Sözleşmesinin dağıtımı
    })
      .send()
      .wait();

    console.log('zkProof sözleşmesi dağıtıldı:', zkApp.address.toString());
    return zkApp.address;
  } catch (error) {
    console.error('zkProof sözleşmesi dağıtılırken hata:', error);
    throw error; // Hatayıı yeniden ilet
  }
}

async function deployZkVerifierContract(zkProofAddress: PublicKey): Promise<PublicKey> {
     // Mina bağlantısı başlatma
     Mina.setActiveInstance(new Mina(MINA_RPC_URL));
   
     const deployerAccount = PrivateKey.random(); // Dağıtım yapacak hesabın rasgele oluşturulması
     const zkAppPrivateKey = PrivateKey.random(); // ZK Uygulama özel anahtarı oluşturulması
     const zkAppAddress = zkAppPrivateKey.toPublicKey(); // ZK Uygulama genel anahtarı
     const zkApp = new zkVerifier(zkAppAddress); // zkVerifier sözleşmesinin başlatılması
   
     try {
       await Mina.transaction(deployerAccount, async () => {
         deployerAccount.balance.subInPlace(Field(1)); // gas fee
   
         await zkApp.deploy({
           zkappKey: zkAppPrivateKey,
           zkProofAddress: zkProofAddress, // Bağımlılık olarak zkProof adresinin iletilmesi
         });
       })
         .send()
         .wait();
   
       console.log('zkVerifier sözleşmesi dağıtıldı:', zkApp.address.toString());
       return zkApp.address;
     } catch (error) {
       console.error('zkVerifier sözleşmesi dağıtılırken hata:', error);
       throw error; // Hatayı yeniden ilet
     }
   }
   

// Zkapp Run
async function main() {
  await shutdown(); // Clear old network

  try {
    const zkProofAddress = await deployZkProofContract();
    const zkVerifierAddress = await deployZkVerifierContract(zkProofAddress);

    // React Render
    const root = document.getElementById('root');
    if (!root) {
      console.error('DOM elementi "root" hazır değil.');
      return; 
    }

    ReactDOM.render(
      <Chat zkProofAddress={zkProofAddress} zkVerifierAddress={zkVerifierAddress} />,
      root
    );
  } catch (error) {
    console.error('Zkapp başlatılamadı:', error);
  }
}

main(); // execute
