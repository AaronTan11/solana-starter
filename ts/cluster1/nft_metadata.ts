import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/4927LhWxVmSj3Ri4g4E6Ret7NHwaFs8yhRQzWMotYcyZ";
        const metadata = {
            name: "Jeff Eyes",
            symbol: "JE",
            description: "Jeff Eyes",
            image: image,
            attributes: [
                {trait_type: 'Eyes', value: 'Jeff'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: [
                {
                    address: "6DvfoE1pA8C4jKhgAA28WbDpNGQiSQewua16TvTiradz",
                    share: 10
                }
            ]
        };

        
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// https://arweave.net/2qW5uWaRKHFRaDpsjoegeqLJPCtKnkgHEzCKHd1FV4C4
// https://gateway.irys.xyz/2qW5uWaRKHFRaDpsjoegeqLJPCtKnkgHEzCKHd1FV4C4