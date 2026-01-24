export function buildCreateMemorialPayload({
  type,
  privacy,
  name,
  birth,
  aboutAtBirth,
  family,
  siblings,
  visitors,
  parentsThoughts,
  letters,
}) {
  // ✅ normalize visitors safely
  const visitorsList = Array.isArray(visitors?.visitors)
    ? visitors.visitors
    : [];

  return {
    profileType:
      type === "memorial"
        ? "PASSED"
        : type === "livingProfile"
        ? "LIVING"
        : "NEWBORN",

    isPublic: privacy?.isPublic ?? false,

    fullName: name?.fullName || "",

    birthDetails: JSON.stringify({
      birthDate: birth?.birthDate,
      birthTime: birth?.birthTime,
      birthMetrics: {
        weightKg: Number(birth?.birthWeight) || null,
        lengthCm: Number(birth?.birthLength) || null,
      },
      birthPlace: birth?.birthPlace
        ? {
            name: birth.birthPlace.name,
            latitude: birth.birthPlace.latitude,
            longitude: birth.birthPlace.longitude,
            address: birth.birthPlace.address,
          }
        : null,
      doctorName: birth?.doctor,
    }),

    appearanceAtBirth: JSON.stringify({
      eyeColor: aboutAtBirth?.eyeColor,
      skinTone: aboutAtBirth?.skinTone,
      lookAlike: aboutAtBirth?.lookAlike,
      birthmarks: aboutAtBirth?.birthmarks,
      doctorComment: aboutAtBirth?.firstComment,
      doctorVoiceNote: aboutAtBirth?.voiceNote?.path || null,
    }),

    family: JSON.stringify({
      parents: {
        mother: family?.["Mother's Name"],
        father: family?.["Father's Name"],
      },
      grandParents: {
        maternal: family?.["Maternal Grandparents’ Names"],
        paternal: family?.["Paternal Grandparents’ Names"],
      },
      siblings: Array.isArray(siblings)
        ? siblings.map((s) => ({
            name: s.name,
            relationship: s.relationship,
          }))
        : [],
      familyPets: family?.["Family Pet(s)"],
    }),

    // ✅ FIXED visitors (stringified array of names)
    visitors: JSON.stringify(
      visitorsList
        .map((v) => v?.name)
        .filter(Boolean)
    ),

    // ✅ moved shared visitor text to notes (as per backend schema)
    notes: JSON.stringify({
      birthNotes: visitors?.firstMoment,
      favorites: visitors?.favorites,
    }),

    parentsThoughts: JSON.stringify({
      foundOut: parentsThoughts?.feltWhenFound,
      firstHeld: parentsThoughts?.firstHeld,
      fears: parentsThoughts?.fears,
      wishes: parentsThoughts?.biggestWish,
    }),

    letters: JSON.stringify(
      Object.entries(letters || {}).map(([from, content]) => ({
        from,
        content,
      }))
    ),
  };
}
