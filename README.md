# markumina.github.io

Source for [albaphet.org](https://www.albaphet.org/).

## City View

`city-view/` is a private, full-resolution photo viewer designed for touchscreens
and desktop browsers. It supports pinch/wheel zoom, drag-to-pan, large controls,
preview-first loading, and a clear full-detail-ready message.

The camera JPEGs are never modified or committed. They live locally in
`private/city-view-originals/`, which is ignored by Git. The public repository
contains AES-256-GCM encrypted payloads only. The passphrase is not stored in the
HTML, JavaScript, Git history, or generated files.

To rebuild the encrypted assets after placing the four exact source JPEGs in the
private directory:

```bash
CITY_VIEW_PASSPHRASE='your passphrase' node scripts/build-city-view-assets.mjs
```

Verify that every encrypted full image restores the exact camera-file bytes:

```bash
CITY_VIEW_PASSPHRASE='your passphrase' node scripts/verify-city-view-assets.mjs
```

The build creates separate temporary previews, encrypts both previews and exact
original bytes, then leaves the original JPEGs untouched. Do not commit anything
from `private/` or any `city-view/assets/*.jpg` file.

This static-site protection prevents anyone without the passphrase from viewing
the committed image data. It does not provide user accounts, password recovery,
rate limiting, or revocation; those require an authenticated hosting service.
