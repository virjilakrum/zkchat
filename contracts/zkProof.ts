import { ZKProof, generateProof } from "@o1js/contracts";

enum MessageType {
  Transfer,
  Vote,
  Registration,
}

interface ProofData {
  messageType: MessageType;
  data: any;
}

class DanteZKProof extends ZKProof {
  // special generateProof founction
  async generateProof(message: ProofData): Promise<string> {
    const messageHash = keccak256(abi.encodePacked(message.messageType, message.data));
    const proof = await super.generateProof(messageHash);


    async verifyProof(proof: string): Promise<boolean> {
      const messageHash = keccak256(abi.encodePacked(message.messageType, message.data));
      return await super.verifyProof(messageHash, proof);
    }

    return proof;
  }
}

const zkProof = new DanteZKProof();

const message: ProofData = {
  messageType: MessageType.Transfer,
  data: {
    sender: "0x1234567890123456789012345678901234567890", //test address
    receiver: "0x9876543210987654321098765432109876543210", //test address
    amount: 100,
  },
};

const proof = await zkProof.generateProof(message);

console.log("Proof:", proof);

const isVerified = await zkProof.verifyProof(proof);

console.log("Is proof verified?", isVerified);
