import Visit from "./visit.model";
import { TTrafficStats } from "./visit.interface";

const trackVisit = async (userId?: string, path?: string) => {
  // ✅ path-কেও conditional spread এ আনতে হবে:
  const visit = await Visit.create({
    ...(path ? { path } : {}),
    ...(userId ? { userId } : {}),
  });

  return visit;
};

const getTrafficStats = async (): Promise<TTrafficStats> => {
  const totalVisits = await Visit.countDocuments();
  const registeredVisits = await Visit.countDocuments({
    userId: { $exists: true },
  });
  const guestVisits = totalVisits - registeredVisits;

  return {
    totalVisits,
    registeredVisits,
    guestVisits,
  };
};

export const visitServices = {
  trackVisit,
  getTrafficStats,
};
