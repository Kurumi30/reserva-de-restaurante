import type { Secret, SignOptions } from "jsonwebtoken";

export default {
  local: `http://localhost:`,
  jwt: {
    secret: 'comiocudequemtalendo',
    expiresIn: '10m',
  }
} satisfies {
  local: string,
  jwt: {
    secret: Secret,
    expiresIn: SignOptions["expiresIn"],
  }
}