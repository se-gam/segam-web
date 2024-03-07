export default function getIdfromToken(token: string) {
  try {
    const parts = token.split('.');
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const decodedObject = JSON.parse(decodedPayload);

    return decodedObject.studentId.toString();
  } catch (e) {
    return undefined;
  }
}
