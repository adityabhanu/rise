import { cleanObject, isEmptyValue } from "./helpers";

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
  earlyLife,
  career,
  personality,
  hobbies,
  lifeLessons,
  finalDays,
  passingDetails,
}) {
  const payload = {
    profileType:
      type === "memorial"
        ? "PASSED"
        : type === "livingProfile"
          ? "LIVING"
          : "NEWBORN",

    isPublic: privacy?.isPrivate === false,
    fullName: name?.fullName || "",
  };

  /* ---------------- Birth Details ---------------- */
  const birthDetails = cleanObject({
    birthDate: birth?.birthDate,
    birthTime: birth?.birthTime,
    birthMetrics: cleanObject({
      weightKg: Number(birth?.birthWeight) || null,
      lengthCm: Number(birth?.birthLength) || null,
    }),
    birthPlace: birth?.birthPlace
      ? cleanObject({
          name: birth.birthPlace.name,
          latitude: birth.birthPlace.latitude,
          longitude: birth.birthPlace.longitude,
          address: birth.birthPlace.address,
        })
      : null,
    doctorName: birth?.doctor,
  });

  if (!isEmptyValue(birthDetails)) {
    payload.birthDetails = JSON.stringify(birthDetails);
  }

  /* ---------------- Appearance at Birth (NEWBORN) ---------------- */
  const appearanceAtBirth = cleanObject({
    eyeColor: aboutAtBirth?.eyeColor,
    skinTone: aboutAtBirth?.skinTone,
    lookAlike: aboutAtBirth?.lookAlike,
    birthmarks: aboutAtBirth?.birthmarks,
    doctorComment: aboutAtBirth?.firstComment,
  });

  if (!isEmptyValue(appearanceAtBirth)) {
    payload.appearanceAtBirth = JSON.stringify(appearanceAtBirth);
  }

  /* ---------------- Family ---------------- */
  const familyBlock = cleanObject({
  ...family,

  ...(Array.isArray(siblings) && siblings.length
    ? { siblings }
    : {}),
});

if (!isEmptyValue(familyBlock)) {
  payload.family = JSON.stringify(familyBlock);
}

  /* ---------------- Visitors ---------------- */
  const visitorsList = Array.isArray(visitors?.visitors)
    ? visitors.visitors.map((v) => v?.name).filter(Boolean)
    : [];

  if (visitorsList.length) {
    payload.visitors = JSON.stringify(visitorsList);
  }

  const visitorNotes = cleanObject({
    birthNotes: visitors?.firstMoment,
    favorites: visitors?.favorites,
  });

  if (!isEmptyValue(visitorNotes)) {
    payload.notes = JSON.stringify(visitorNotes);
  }

  /* ---------------- Parents Thoughts ---------------- */
  const parentsBlock = cleanObject({
    foundOut: parentsThoughts?.feltWhenFound,
    firstHeld: parentsThoughts?.firstHeld,
    fears: parentsThoughts?.fears,
    wishes: parentsThoughts?.biggestWish,
  });

  if (!isEmptyValue(parentsBlock)) {
    payload.parentThoughts = JSON.stringify(parentsBlock);
  }

  /* ---------------- Letters ---------------- */
  const lettersArr = Object.entries(letters || {})
    .map(([from, content]) => ({ from, content }))
    .filter((l) => !isEmptyValue(l.content));

  if (lettersArr.length) {
    payload.letters = JSON.stringify(lettersArr);
  }

  /* ---------------- Personalities ---------------- */
  if (!isEmptyValue(personality)) {
    payload.personalities = JSON.stringify(cleanObject(personality));
  }

  /* ---------------- Hobbies (includes life lessons) ---------------- */
  const hobbiesBlock = cleanObject({
    ...hobbies,
    ...(lifeLessons?.lifeLessons
      ? { lifeLessons: lifeLessons.lifeLessons }
      : {}),
  });

  if (!isEmptyValue(hobbiesBlock)) {
    payload.hobbies = JSON.stringify(hobbiesBlock);
  }

  /* ---------------- Life Details (WRAPPED) ---------------- */
  const lifeDetails = cleanObject({
    earlyLife: !isEmptyValue(earlyLife) ? cleanObject(earlyLife) : undefined,
    career: !isEmptyValue(career) ? cleanObject(career) : undefined,
    finalDays: !isEmptyValue(finalDays) ? cleanObject(finalDays) : undefined,
  });

  if (!isEmptyValue(lifeDetails)) {
    payload.lifeDetails = JSON.stringify(lifeDetails);
  }

  /* ---------------- Passing Details ---------------- */
  if (!isEmptyValue(passingDetails)) {
    payload.passingDetails = JSON.stringify(cleanObject(passingDetails));
  }

  return payload;
}
