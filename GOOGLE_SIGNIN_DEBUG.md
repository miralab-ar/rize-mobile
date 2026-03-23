# Google Sign-In (Android) — notas de depuración

## Flujo típico

1. Tocás "Continuar con Google" en la app.
2. Iniciás sesión en Google → Google redirige a `com.miralab.rizemobile:/oauthredirect?...`
3. La app recibe el intent y completa el flujo.

**Scheme unificado:** usamos `com.miralab.rizemobile`, que coincide con el redirect de OAuth.

## Comprobar intent (Android)

Con el dispositivo conectado por USB:

```bash
adb shell pm resolve-activity -a android.intent.action.VIEW -d "com.miralab.rizemobile:/oauthredirect"
```

Debería devolver algo como `com.miralab.rizemobile/...MainActivity`. Si no devuelve nada o no menciona tu package, el intent filter no está bien configurado.

## Errores comunes

- **SHA-1** del keystore no coincide con el de Google Cloud (Android OAuth client).
- **Package name** distinto: debe ser `com.miralab.rizemobile` en Google Console y en `app.config.js`.

## Formas de URL

Google puede devolver:

- `com.miralab.rizemobile:/oauthredirect` (un slash)  
- o variantes con triple slash según el cliente; `Linking` debería manejarlas igual.
