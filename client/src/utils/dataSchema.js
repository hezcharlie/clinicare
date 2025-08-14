import { z } from "zod";

export const validateSignUpSchema = z.object({
  fullname: z.string().min(3, {
    message: "Full name must be at least 3 characters long",
  }),
  email: z.email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
  role: z.enum(["admin", "staff", "doctor", "nurse", "patient"]).optional(),
});

export const validateSignInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export const validateForgotPasswordSchema = z.object({
  email: z.email({ message: "Email is required" }),
});

export const validateResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*$|#^<>.,-_/(){}[\]?&]/, {
      message: "Password must contain at least one special character",
    }),

  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*$|#^<>.,-_/(){}[\]?&]/, {
      message: "Password must contain at least one special character",
    }),
});

export const validateAccountSchema = z.object({
  verificationToken: z.string().min(3, {
    message: "Full name must be at least 3 characters long",
  }),
  email: z.email(),
  phone: z.string().min(11, {
    message: "Phone number is incomplete",
  }),
  dateOfBirth: z.string().date(),
  address: z.string().min(3, {
    message: "Please include an address, must be at least 3 characters long",
  }),
  gender: z.enum(["male", "female", "other"]).refine((value) => value !== "", {
    message: "Gender is required",
  }),

  bloodGroup: z
    .enum([
      "A-positive",
      "A-negative",
      "B-positive",
      "B-negative",
      "AB-positive",
      "AB-negative",
      "O-positive",
      "O-negative",
    ])
    .refine((value) => value !== "", {
      message: "Blood group is required",
    }),
  emergencyContact: z.string().min(3, {
    message: "Emergency contact must be at least 3 characters long",
  }),
  emergencyContactPhone: z.string().min(11, {
    message: "Emergency contact phone must be at least 11 characters long",
  }),
  emergencyContactRelationship: z.string().min(3, {
    message:
      "Emergency contact relationship must be at least 3 characters long",
  }),
});
