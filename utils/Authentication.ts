import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
	public static passwordHash(password: string): Promise<String> {
		return bcyrpt.hash(password, 10);
	}

	public static comparePassword(
		password: string,
		encryptedPassword: string
	): Promise<boolean> {
		return bcyrpt.compare(password, encryptedPassword);
	}

	public static generateToken(payload: { [key: string]: string }): String {
		const secretKey: string = process.env.secretKey || "rahasia";
		return jwt.sign(payload, secretKey);
	}
}

export default Authentication;
