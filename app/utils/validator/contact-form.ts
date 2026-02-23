import { z } from "zod";

const FormDataSchema = z.object({
  name: z.string().min(2, "İsim en az 1 karakter olmalıdır"),
  surname: z.string().min(2, "Soyisim en az 1 karakter olmalıdır"),
  email: z.string().email("Geçersiz e-posta adresi"),
  subject: z.string(),
  message: z.string()
});


export const validateContactForm = (data: unknown) => {
  const result = FormDataSchema.safeParse(data);
  console.log(result.error)
  if (!result.success) {
    return false;
  }
  return true;
};