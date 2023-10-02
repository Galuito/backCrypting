const {generateKeyPairSync} = require('crypto');

const {privateKey, publicKey} = generateKeyPairSync('rsa',{
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
})

console.log(publicKey);
console.log(privateKey);

// The Generated Public Key was:
/*

-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAm91jVhe173UamaYnR8Hm
hFZW+SzPryMaJtOSGngNkZD9fCbA5enCsiBL2GnUYVkPGdGaaEYlDSmoeITMeIcz
hSb6pRjAPnJMRn1RIDjI/ArIYXrRaZlMH/STg3BYaAL/eKT1hOjM+nZlexHf6QLh
OeKFp7uk6sGBAWZJXYIEYgL6D96yT+kcB8BmTkpEGaW3m60462NoPb0/patgEQs7
LHzrniYKEIodVRpyy187qLENuh3i4n/zx5RqjLahTr4agGeGD4fhO5err5X+a/j/
r67n1MxIect+O0x7FLJkOyRCl5BY2ze+mPy3K8HlssZ9Ci0OgZ0MhEgDmgwb5u49
feYhra5yyF9tmvsoTprjXjPWdSnFOL4J4MS0uqe7sEiXGhg21Hc+F5CpTbiMT5RL
jyHsX8r/EKKvMN9FeYv4yIfHeD4ifx8AnuZCOXaz+42wmPYr/hc4P+QJtu8d5la8
LQ3l1kaboPIdwhiuKaI2/sZuYUR9c8iU4BDzKtZfGKQ9Hdpalqax63OD8y5fPOMi
0Konj/vuXSygkc27LEhN6WJsmx8YKrfj08opEpi6K4tYgHeVp5z1LEFDAkSHLdjP
i01kvAc+mMlG7c7OFqTHF9W7qPGRnDEiNZ+HDrNvF/WiubylAGngix9U1FFemnAP
glGXl3ks0562MCN6Nt/Q1fUCAwEAAQ==
-----END PUBLIC KEY-----

*/

//The Generated Private Key was:
/*

-----BEGIN PRIVATE KEY-----
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
XHSxwxtjuHpthJ+Fxyfe2VbGL7hj
-----END PRIVATE KEY-----

*/