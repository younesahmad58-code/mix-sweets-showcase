

## Update "Baxuri pe Palet" Values in Database

The product detail page already displays "Baxuri pe Palet" alongside COD, Gramaj, Cutii pe Bax, and Bucati pe Cutie -- but only when the value is not empty. No code changes are needed.

### What will be done
- Run multiple `UPDATE` SQL statements to set the `baxuri_palet` column for each product identified by its slug (COD)
- Approximately 300 products will be updated
- No code, layout, or structure changes

### Technical Details
- The updates will use the data insertion tool (not migrations) since this is a data change, not a schema change
- Updates will be batched into groups of SQL statements for efficiency
- Each statement: `UPDATE products SET baxuri_palet = '<value>' WHERE slug = '<cod>';`
- The `baxuri_palet` column is a text field, so numeric values will be stored as strings (matching existing convention)

### Verification
- After updating, any product detail page will automatically show the "Baxuri pe Palet" row if the value is now populated

