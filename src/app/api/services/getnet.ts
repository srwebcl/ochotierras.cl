import crypto from 'crypto';

interface GetnetAuth {
    login: string;
    tranKey: string;
    nonce: string;
    seed: string;
}

export class GetnetService {
    private login: string;
    private secretKey: string;
    private endpoint: string;

    constructor() {
        this.login = process.env.GETNET_LOGIN || '';
        this.secretKey = process.env.GETNET_SECRET_KEY || '';
        this.endpoint = process.env.GETNET_ENDPOINT || '';

        if (!this.login || !this.secretKey || !this.endpoint) {
            console.error("Getnet environment variables are missing!");
        }
    }

    private generateAuth(): GetnetAuth {
        const seed = new Date().toISOString();
        // Nonce must be random. Using purely random bytes.
        // Getnet (PlaceToPay) expects Base64 encoded nonce in the payload, 
        // but for the digest it uses the RAW nonce.
        const rawNonce = crypto.randomBytes(16);
        const nonceBase64 = rawNonce.toString('base64');

        // Digest = Base64( SHA256( Nonce + Seed + SecretKey ) )
        // Note: The 'Nonce' in the digest calculation must be the same raw bytes (or string) 
        // that is represented by the base64 nonce in the data.
        // Standard P2P impl: sha256( nonce + seed + secret )
        const hash = crypto.createHash('sha256');
        hash.update(rawNonce);
        hash.update(seed);
        hash.update(this.secretKey);
        const tranKey = hash.digest('base64');

        return {
            login: this.login,
            tranKey,
            nonce: nonceBase64,
            seed
        };
    }

    public async createSession(orderData: any) {
        const auth = this.generateAuth();

        const payload = {
            auth,
            ...orderData
        };

        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Getnet API Error:", errorText);
                throw new Error(`Getnet API responded with ${response.status}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Getnet Create Session Error:", error);
            throw error;
        }
    }

    public async getRequestStatus(requestId: string) {
        const auth = this.generateAuth();
        const payload = { auth };

        try {
            // Check status URL: endpoint + /requestId
            // Assumption: endpoint is .../api/session. We need .../api/session/{requestId}
            const statusUrl = `${this.endpoint}/${requestId}`;

            const response = await fetch(statusUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Getnet Status Error:", errorText);
                throw new Error(`Getnet Status API responded with ${response.status}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Getnet Check Status Error:", error);
            throw error;
        }
    }
}
