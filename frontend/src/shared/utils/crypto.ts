import forge from "node-forge";
export const generatePrivateKeyAndPublicKey = () => {
  const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);
  const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
  return { publicKeyPem, privateKeyPem };
};
