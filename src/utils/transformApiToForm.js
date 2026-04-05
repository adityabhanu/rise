const safeParse = (value) => {
  if (!value) return null;

  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return null;
  }
};

export const transformApiToForm = (res) => {
  const profileType = res?.ProfileType;
  const isNewBorn = profileType === "NEWBORN";

  const birth = safeParse(res.BirthDetails);
  const family = safeParse(res.Family);
  const parents = safeParse(res.ParentThoughts);
  const letters = safeParse(res.Letters);
  const notes = safeParse(res.Notes);
  const media = safeParse(res.Media);
  const aboutAtBirth = safeParse(res.AppearanceAtBirth);
  const lifeDetails = safeParse(res.LifeDetails);
  const hobbies = safeParse(res.Hobbies);
  const personality = safeParse(res.Personalities);
  const passingDetails = safeParse(res.PassingDetails);

  // 🔥 Media needs double parsing
  const parsedMedia = media
    ? {
        ...media,
        photos: safeParse(media.photos) || [],
        footprints: safeParse(media.footprints) || [],
        familyPhotos: safeParse(media.familyPhotos) || [],
        weddingPhotos: safeParse(media.weddingPhotos) || [],
        videos: safeParse(media.videos) || [],
        voiceNotes: safeParse(media.voiceNotes) || [],
        handwrittenNotes: safeParse(media.handwrittenNotes) || [],
      }
    : {};

  const { siblings = [], ...restFamily } = family || {};

  return {
    privacy: {
      isPrivate: !res.IsPublic,
    },

    name: {
      fullName: res.FullName || "",
    },

    birth: birth
      ? {
          birthDate: birth.birthDate || "",
          birthTime: birth.birthTime || "",
          birthWeight: birth.birthMetrics?.weightKg || "",
          birthLength: birth.birthMetrics?.lengthCm || "",
          hospital: birth.birthPlace?.address || "",
          doctor: birth.doctorName || "",
          birthPlace: birth.birthPlace || null,
        }
      : {},
    passingDetails: passingDetails || {},
    family: restFamily,
    siblings,

    visitors: {
      visitors: safeParse(res.Visitors)?.map((v) => ({ name: v })) || [],
      firstMoment: notes?.birthNotes || "",
      favorites: notes?.favorites || "",
    },
    aboutAtBirth: {
      ...(aboutAtBirth || {}),
      ...(isNewBorn ? { voiceNotes: parsedMedia?.voiceNotes || [] } : {}),
    },
    parentsThoughts: {
      feltWhenFound: parents?.foundOut || "",
      firstHeld: parents?.firstHeld || "",
      fears: parents?.fears || "",
      biggestWish: parents?.wishes || "",
    },

    earlyLife: lifeDetails?.earlyLife || {},
    career: lifeDetails?.career || {},
    finalDays: lifeDetails?.finalDays || {},
    hobbies: {
      petAnimals: hobbies?.petAnimals || "",
      familyTraditions: hobbies?.familyTraditions || "",
    },

    lifeLessons: {
      lifeLessons: hobbies?.lifeLessons || "",
    },
    personality: personality || {},

    letters: letters
      ? Object.fromEntries(letters.map((l) => [l.from, l.content]))
      : {},

    media: isNewBorn
      ? {
          ...parsedMedia,
          voiceNotes: [], // remove from media
        }
      : parsedMedia,
  };
};

export const mapProfileTypeToUI = (profileType) => {
  if (profileType === "NEWBORN") return "newBorn";
  if (profileType === "LIVING") return "livingProfile";
  if (profileType === "PASSED") return "memorial";
  return "newBorn";
};
