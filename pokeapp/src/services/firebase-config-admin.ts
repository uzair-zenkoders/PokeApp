import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
  credential: cert({
    projectId: "pokeapp-210a0",
    clientEmail:
      "firebase-adminsdk-yunfy@pokeapp-210a0.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDo+mTgDpplpmUs\nyUyQ1HZrvHbS5kJ3JUmmX0DTeM5MWU3raXgzs3K07+JnHIYW0MMqFuk0lwlQzBXZ\nN5eAnnQmd/HAZK/ogzMAfJpqHYYlgen2ZF57hsuf2qhjlVqcx0NQh5TvqAyG/3p3\nwJSAt5hw91SFzG4GACB0EghSWleBirlCpkg1Vha/OJ7JV/ePiu+G6QQMAcPWClGh\ncdJWZsYGSlBW4qOZtKmgRC4fuIvQyH/BqY7P0FzbfWEl8MLUxXpU+Pc5l05LYO89\nsv9ixWY716cpx6twRaAJVAIpVtSgkmFwD0olqciX+UteHrl1OLJQ21xMozulETCz\n4M0u6EWFAgMBAAECggEAB0vkQeIjMsDJ1WO+iqCkzs35uLQua7XWvyeni5fyehCn\n8JH+ijv6ATGsGQebKXbDTfumtRdv2sBxhLqJe6U6xQOnphthKPqG6+J7IYyoKV+O\nuME+9kZr9Scvc+L3EgbplEmSwAi2z7mLl9mHrRpS42LTmlcjMPvrCEeSTCX5LJzg\n0IwKQFJ4KJ79JqzyqUSPBT3hVrG7C2JrBhPfUB7OGnfDpfYm1/5aL6YB+PcZo6pS\nFEoC0t/iH9mB+vaebPrvztTX60ML7RN1G8/KTRmQFfjvs+NmubHn3hP6daz3PQ2t\nXW1sr8ALRlFWDImfQzfBjwR6T+IfMF+r7TcxqC9doQKBgQD5VWxWstflzkNbop+w\njFk/46dNyg7+ICdvTETK6PMz72ss5Ytb2zcSFyYrm7Zee1pfrMN+PpmT95YWrAme\nDTLh05zldosp2yWowbBI2AVy0NURB5f2lKAMJBGVI76PxDm19J9MNhfHdd0Bu/FC\nllf16VRfjtNKoWmnMicrDjKEtQKBgQDvNQY1EOcGlePESNHtznhOsC2e/KeIZLHA\n6B2zjN4e/uDewMECgMoGyoMF0wNpSzUoTMPAQgywmhyR8qAQT+pN8rd2Vxn2phC4\ng0HfZ0hAzln/XJuEk7nWgFAkGa9an32ZUk3dfDuA/py1qXPlpbBOzG0QxvzlalI/\n3sFxz8KPkQKBgQDPX8kX4u/GZuOHF58Ry+l/Re0kueX2Xu/tldWxnkaI75yIXvKl\nl5IaLb7FjmED/DySTrLaEV7Svp3KhZQKLJghU0uvXgUo7uhHj7D7JRCDCkXsQBCY\nOc1Ty7wD+xLHqEEHoUnMrUDh2JnUk2h6JWlLUqGmSLhb3hxtvzzshoZl8QKBgQDW\nfkd4ohVm9FTulxWXFgMPHC9sVsWrKg+yGPE5JWGvjYD6fQEVS4LcoA7o1BRFAGlE\nH8GPziou2aIwxMz+k4pYJwKXnPbtEm//48LXnndNlTtiHhpdwVFspFY4aMeyjT1E\nlGa56kI5IxZGVxJTpET6A5jw6F2xIatrFkWD1nZx4QKBgFC3/CjBipL21FYcLXgN\nygY/scSBUN754cSejWUF6RudkpO/2k0Cr+ZyqQ4MwlhNIEt+vwRhaX2Cwe3xYrv1\nSe88pbjxIfwFGUOH+rCY6zr/1nfTYB/R4YyINAyYsbMthBiRB3XjyHZnOulLG6fK\n0D+7gdAnHczRJl53HUO8wdbo\n-----END PRIVATE KEY-----\n",
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
