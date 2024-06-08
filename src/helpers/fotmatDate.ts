import { format } from "date-fns";

export const formatDate = () => {
  const deletedAt = new Date();

  return format(deletedAt, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
};
