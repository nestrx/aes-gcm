# AES-GCM
The module encryption AES GCM for [NestJS framework](https://nestjs.com/).

## Installation

npm: 
```bash
npm i @nestrx/aes-gcm
```
yan
```bash
yan add @nestrx/aes-gcm
```

## Configure


app.module.ts
```ts
...
@Module({
	...
	imports: [
    ...
    AesGcmModule.forRoot(AES_SECRET_KEY),
    ...
	],
	...
})
...
```

your.service.ts

```ts
...
@Injectable()
export class YourService{
	constructor(public readonly aes: AesGcmService){
	}
	
	encrypt(text: string): string{
		return this.aes.encrypt(text);
	}
	
	decryption(encrypted: string): string{
		return this.aes.decrypt(encrypted);
	}
	
	md5(text: string): string{
		return this.aes.md5(text);
	}
	
	// Generate AES_SECRET_KEY or the random string base64
	generate(){
		console.log(this.aes.generateRandomKey());
	}
}
...
```

