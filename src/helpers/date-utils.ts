export function dateUtils() {
  const formatDate = (date: Date | string, format: string): string => {
    const dateObj = new Date(date);
    
    const pad = (num: number): string => num.toString().padStart(2, '0');
    
    const tokens: Record<string, string> = {
      'yyyy': dateObj.getFullYear().toString(),
      'MM': pad(dateObj.getMonth() + 1),
      'dd': pad(dateObj.getDate()),
      'HH': pad(dateObj.getHours()),
      'mm': pad(dateObj.getMinutes()),
    };
    
    let formattedDate = format;
    for (const [token, value] of Object.entries(tokens)) {
      formattedDate = formattedDate.replace(token, value);
    }
    
    return formattedDate;
  };

  const toISOString = (date: Date | string): string => {
    return new Date(date).toISOString();
  };

  return {
    formatDate,
    toISOString
  };
}
