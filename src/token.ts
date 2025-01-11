import Crypto from "jsrsasign";

/**
 * generateMeetingSignature
 * @param {string} sdkKey - The SDK key
 * @param {string} sdkSecret - The SDK secret
 * @param {1 | 2} role - The role type
 * @returns {JSX.Element} Avatar component
 */
export default async function generateMeetingSignature(
  sdkKey: string,
  sdkSecret: string,
  meetingNumber: number,
  role: 0 | 1
) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };
  const oPayload = {
    appKey: sdkKey,
    sdkKey: sdkKey,
    mn: meetingNumber,
    role,
    iat,
    exp,
    tokenExp: exp,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  // @ts-ignore
  const cobrowseJWT = Crypto.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    sdkSecret
  );
  return Promise.resolve(cobrowseJWT);
}
