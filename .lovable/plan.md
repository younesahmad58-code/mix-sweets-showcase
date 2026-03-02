

## Delete 67 Products from Database

All 67 product codes have been verified and exist in the database. The deletion will be done using a single SQL DELETE statement.

### Products to Remove (67 total)
1179, 1180, 1322, 1323, 1324, 1025, 730, 1160, 1161, 962, 1123, 1020, 1413, 383, 1021, 1358, 1329, 1040, 1133, 951, 1135, 1132, 942, 977, 1150, 1149, 278, 234, 1325, 1122, 644, 1023, 960, 837, 137, 431, 1327, 1328, 678, 994, 736, 941, 952, 966, 990, 939, 1218, 1224, 1225, 1014, 1195, 1234, 1236, 1128, 1130, 1257, 1255, 1261, 1433, 1434, 1137, 997, 936, 1239, 197, 438, 402, 1390, 1294, 1078

### Action
- Run a single `DELETE FROM products WHERE slug IN (...)` query to remove all 67 products at once
- No code changes needed -- the app already fetches products dynamically from the database

### Technical Details
- The deletion requires admin authentication (RLS policy enforces `has_role(auth.uid(), 'admin')`)
- The database tool will handle this with service-level access
- Product images in the `/public/products/` folder will remain but won't be referenced anymore

