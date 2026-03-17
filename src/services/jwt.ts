interface JWTHeader {
  alg: string;
  typ: string;
  [key: string]: unknown; // any extra fields
}

export interface Claims {
  sub: string;
  firstName: string;
  exp: number;
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = str.length % 4;
  if (pad) {
    str += "=".repeat(4 - pad);
  }
  return Buffer.from(str, "base64").toString("utf-8");
}

export default function deconstructJWT(token: string): {
  header: JWTHeader;
  claims: Claims;
  signature: string;
} {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format");

  const [encodedHeader, encodedPayload, signature] = parts;

  const header: JWTHeader = JSON.parse(base64UrlDecode(encodedHeader));
  const claims: Claims = JSON.parse(base64UrlDecode(encodedPayload));

  return { header, claims, signature };
}
