# Credenciales locales (no se suben a Git)

Para enviar builds a Google Play con EAS Submit, colocá aquí el JSON de la **cuenta de servicio** de Google Play Console.

- Renombrá el archivo como quieras (por ejemplo `play-service-account.json`).
- En `eas.json` → `submit.production.android`, configurá `serviceAccountKeyPath` apuntando a ese archivo **solo en tu máquina**; no commitees claves.
