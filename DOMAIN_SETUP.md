# Dominio rize.miralab.ar (plantilla)

Pasos típicos para enlazar el subdominio y los **universal links** con la app (`com.miralab.rizemobile`). Ajustá DNS y Vercel según tu hosting.

## Vercel

1. **Vercel Dashboard** → proyecto del API / web → **Settings** → **Domains**
2. Añadí `rize.miralab.ar` si aún no está
3. **DNS:** CNAME `rize` → el valor que indique Vercel (p. ej. `cname.vercel-dns.com`)

## Android — Digital Asset Links

Archivo: `https://rize.miralab.ar/.well-known/assetlinks.json`

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.miralab.rizemobile",
      "sha256_cert_fingerprints": ["YOUR_RELEASE_SHA256"]
    }
  }
]
```

El SHA-256 sale del keystore de release (Play / EAS).

## iOS — Apple App Site Association

Archivo: `https://rize.miralab.ar/.well-known/apple-app-site-association`

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.miralab.rizemobile",
        "paths": ["/t/*"]
      }
    ]
  }
}
```

Sustituí `TEAMID` por tu Apple Team ID.

## Web fallback

Quien abra `https://rize.miralab.ar/t/{token}` sin la app instalada debería ver una página con CTA a Play Store / App Store (`id=com.miralab.rizemobile` en Play).

**Formato de ruta:** `https://rize.miralab.ar/t/{token}`
