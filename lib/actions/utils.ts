export interface ActionResponse<T> {
  success: boolean; 
  message?: string; 
  data?: T|null; 
}


export function   ActionResponseHandler<T>(
  success: boolean,
  message: string,
  data?: T | null
): { success: boolean; message?: string; data?: T } {
  if (success) {
    if (data) {
      return { success, message, data };
    }
  }
    return { success, message };
  
}
