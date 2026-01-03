# Storage Verification Checklist

This document provides step-by-step verification that `/designs` correctly lists ALL items from the Supabase storage bucket.

## Quick Verification Steps

### 1. Check Environment Variables

```bash
# In your terminal (local development)
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Or check .env.local file
cat .env.local
```

**Expected:** Both variables should be set. URL should be `https://ecdastbzvypuidplpryf.supabase.co`

### 2. Run the Debug API Endpoint

```bash
# Start the dev server
npm run dev

# In another terminal, or browser:
curl http://localhost:3000/api/storage-debug | jq
# Or visit: http://localhost:3000/api/storage-debug
```

**Check for:**
- `detection.detected: true` - Bucket was found
- `detection.config.bucket` - Shows which bucket is being used
- `listResult.totalObjects` - Should match Supabase dashboard count
- `listResult.error` - Should be `null`

### 3. Verify on /designs Page

1. Go to `http://localhost:3000/designs`
2. Click the "Debug" button in the stats bar
3. Verify:
   - **Total Objects** matches Supabase dashboard
   - **Folders Scanned** shows all subfolders
   - **Errors** section is empty
   - **First 20 Paths** shows expected files

### 4. Test Fresh Upload Detection

1. Upload a new image to your Supabase storage bucket via the Supabase dashboard
2. On `/designs`, click the **"Refresh"** button
3. Verify the new image appears without redeploying

### 5. Compare Counts with Supabase Dashboard

1. Go to Supabase Dashboard → Storage → Your Bucket
2. Count total files (or use the object count if shown)
3. Compare with the count shown on `/designs` debug panel

---

## Supabase Storage Policies

If files are not listing, you may need to configure storage policies.

### Check Current Bucket Settings

1. Go to Supabase Dashboard → Storage
2. Click on your bucket (`catalog` or `designs`)
3. Check "Bucket settings" → Is it Public or Private?

### For Public Bucket (Recommended for Catalog)

If your bucket should be public:

```sql
-- Policy: Allow public read access to catalog bucket
CREATE POLICY "Public read access for catalog"
ON storage.objects
FOR SELECT
USING (bucket_id = 'catalog');
```

### For Private Bucket with Anon Key Access

If you want the bucket private but accessible via anon key:

```sql
-- Policy: Allow authenticated/anon read access to catalog bucket
CREATE POLICY "Allow read access for catalog"
ON storage.objects
FOR SELECT
TO authenticated, anon
USING (bucket_id = 'catalog');
```

### Make Bucket Public via Dashboard

1. Storage → Select bucket → Settings
2. Toggle "Public bucket" ON
3. This allows `getPublicUrl()` to work without signed URLs

---

## Troubleshooting

### Issue: "No files returned"

1. Check bucket name spelling (case-sensitive)
2. Verify bucket exists in Supabase dashboard
3. Check if files are in subfolders - our code handles this now
4. Run `/api/storage-debug` to see detection results

### Issue: "Error listing bucket"

1. Check RLS policies allow SELECT on storage.objects
2. Verify anon key has correct permissions
3. Check bucket visibility (public vs private)

### Issue: "Files show but URLs don't load"

1. Bucket must be public OR use signed URLs
2. Check `next.config.js` has correct remote pattern for images
3. Verify CORS settings in Supabase if images blocked

### Issue: "Count doesn't match dashboard"

1. Our listing is recursive - includes subfolders
2. We filter to image files only (jpg, png, gif, webp, svg, avif)
3. Hidden files (starting with `.`) are excluded
4. Check debug panel "Folders Scanned" to verify all folders checked

---

## Configuration Reference

### Storage Config (`lib/storage.js`)

```javascript
export const STORAGE_CONFIG = {
  bucket: 'catalog',      // Change if your bucket name differs
  rootPath: '',           // Empty = bucket root, or 'subfolder'
  pageSize: 1000,         // Max items per API call
  imageExtensions: /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i,
}
```

### Fallback Behavior

The code tries two configurations:
1. Primary: Bucket `catalog` at root
2. Fallback: Bucket `designs` with folder `catalog`

This handles both naming conventions.

---

## Files Modified

| File | Purpose |
|------|---------|
| `lib/storage.js` | New recursive listing utility |
| `lib/supabase.js` | Updated deprecated functions |
| `components/catalog/CatalogGrid.js` | Uses new listing, adds refresh/debug |
| `app/api/storage-debug/route.js` | Debug API endpoint |

---

## Next Steps After Verification

1. If everything works, you can remove the Debug button for production
2. Consider adjusting `ITEMS_PER_PAGE` in CatalogGrid.js for performance
3. Monitor the stats (API calls, duration) to ensure acceptable load times
