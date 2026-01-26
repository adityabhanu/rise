// ================= HELPERS =================

export const isEmptyValue = (v) =>
  v === null ||
  v === undefined ||
  (typeof v === "string" && v.trim() === "") ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === "object" &&
    !Array.isArray(v) &&
    Object.keys(v).length === 0);

export const cleanObject = (obj) =>
  Object.fromEntries(
    Object.entries(obj || {}).filter(
      ([, value]) => !isEmptyValue(value)
    )
  );

export const stripEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => !isEmptyValue(value)
    )
  );

