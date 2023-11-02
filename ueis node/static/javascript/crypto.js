class CryptoHandler {
    constructor(options, onConnect, onDisconnect) {
		this.encoder = new TextEncoder();
		this.decoder = new TextDecoder();
	}
    async sha256Hash(data) {
        // Convert the input data (string) to an array buffer
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);

        // Use the SubtleCrypto API to calculate the hash
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

        // Convert the hash buffer to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        return hashHex;
    }

}
