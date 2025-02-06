/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useReducer, useState } from "react";
import { z, ZodError } from "zod";
import FormWrapper from "@/components/FormWrapper";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UserCard from "./UserCard";
import { useToast } from "@/hooks/use-toast";


const UserInfoSchema = z.object({
  id: z.number().nullable(),
  user_id: z.string().min(6, "User ID must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

export type Action =
  | { type: "ENTER_ID"; payload: { inputID: string; users: UserInfo[] } }
  | { type: "EDIT_DATA"; payload: Partial<UserInfo> }
  | { type: "SAVE_DATA"; payload: boolean }
  | { type: "SET_ERRORS"; payload: Partial<UserInfo> }
  | { type: "RELOAD_DATA"; payload: UserInfo };

interface State {
  userID: number | null;
  zodErrors: Partial<UserInfo>;
  clientData: UserInfo | null;
  isMatched: boolean;
  originalData: UserInfo | null;
  clientID: string;
  inputData: UserInfo;
  validatedData: boolean;
  isEdited: boolean;
}

const defaultFormValues: UserInfo = {
  id: null,
  user_id: "",
  name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
};

type Data = Omit<UserInfo, 'id' | 'user_id'>

const defaultData: Data = {
  name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
};

const initialState: State = {
  userID: null,
  zodErrors: {},
  clientData: null,
  isMatched: false,
  originalData: null,
  clientID: "",
  inputData: defaultFormValues,
  validatedData: false,
  isEdited: false,
};

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ENTER_ID": {
      const { inputID, users } = action.payload;
      const user = users.find((u) => u.user_id === inputID);

      if (user) {
        console.log("User found:", user)
        return {
          ...state,
          userID: user.id,
          clientData: user,
          isMatched: true,
          originalData: user,
          clientID: user.user_id,
          inputData: user,
        };
      } else {
        console.log("No user found!")
        return {
          ...state,
          isMatched: false,
          clientData: { ...defaultFormValues, user_id: inputID },
          inputData: defaultFormValues,
          clientID: inputID,
        };

      }
    }

    case "EDIT_DATA":
      const updatedData = { ...state.inputData, ...action.payload };
      return {
        ...state,
        inputData: updatedData,
        isEdited: JSON.stringify(updatedData) !== JSON.stringify(state.originalData),
      };

    case "SAVE_DATA":
      return {
        ...state,
        isEdited: action.payload,
        zodErrors: {},
      };

    case "SET_ERRORS":
      const local_errors = action.payload;
      return {
        ...state,
        zodErrors: { ...local_errors }
      };

    case "RELOAD_DATA":
      return {
        ...state,
        inputData: action.payload,
        isEdited: false,
        zodErrors: {},
      };

    default:
      return state;
  }
};

export default function UserForm({
  users,
  setClientID,
  setErrors,
  currentUser,
  setCurrentUser,
}: {
  users: UserInfo[];
  setClientID: React.Dispatch<React.SetStateAction<number | null>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  currentUser: UserInfo;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInfo>>
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [idInput, setIdInput] = useState("");
  const debouncedID = useDebounce(idInput, 1000);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [formData, setFormData] = useState(defaultData)
  const debouncedData = useDebounce(formData, 500)
  const [isSaving, setIsSaving] = useState(false);

  const handleError = (value: boolean) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      0: value,
    }));
  };

  const zodValidation = (field: keyof UserInfo, value: string): Partial<UserInfo> => {
    try {
      const fieldSchema = UserInfoSchema.pick({ [field]: true } as Record<keyof UserInfo, true>);
      fieldSchema.parse({ [field]: value });
      return {};
    } catch (error) {
      if (error instanceof ZodError) {
        return { [field]: error.errors[0]?.message };
      }
    }
    return {};
  };

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch({
      type: "EDIT_DATA", payload: { [name]: value },
    })
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    if (state.isMatched && state.clientData) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, user_id, ...data } = state.clientData;
      setFormData(data);
      setClientID(id || 0);
    }
  }, [state.isMatched, setClientID, state.clientData]);

  useEffect(() => {
    if (debouncedData) {
      const allErrors: Partial<UserInfo> = {};
      Object.keys(debouncedData).forEach((key) => {
        const value = debouncedData[key as keyof Data];

        if (value !== null && value !== undefined && typeof value === "string") {
          const fieldError = zodValidation(key as keyof Data, value);

          if (fieldError && Object.keys(fieldError).length > 0) {
            allErrors[key as keyof Data] = fieldError[key as keyof Data];
          }
        }
      });
      dispatch({ type: "SET_ERRORS", payload: allErrors });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedData, state.isEdited, setErrors]);

  const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdInput(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    if (debouncedID) {
      const idError = zodValidation("user_id", debouncedID)
      const hasErrors = Object.keys(idError).length > 0

      if (!hasErrors) {
        dispatch({ type: "SET_ERRORS", payload: idError })
        dispatch({ type: "ENTER_ID", payload: { inputID: debouncedID, users } });

      } else {
        dispatch({ type: "SET_ERRORS", payload: idError })
        dispatch({ type: "ENTER_ID", payload: { inputID: debouncedID, users } })
      }

      setIsLoading(false);
    }
  }, [debouncedID, setErrors, users]);

  useEffect (() => {
    if (state.isMatched) {
      handleError(false)
    }
  },
  [state.isMatched])

  useEffect(() => {
    if (state.isEdited) {
      handleError(true)
    } 
    if (!state.isEdited && state.isMatched) {
      handleError(false)
    }
  }, [state.isEdited])

  useEffect(() => {
    if (state.isMatched) {
      const data = { ...state.inputData }
      setCurrentUser(data)
    }

  }, [state.isMatched])

  useEffect(() => {
    if (!state.isMatched && currentUser.id) {
      setIdInput(currentUser.user_id);
      dispatch({ type: "RELOAD_DATA", payload: { ...currentUser } })
    }
  }, [currentUser, state.isMatched]);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaving(true);
    dispatch({ type: "SAVE_DATA", payload: false });
  };

  useEffect(() => {
    if (isSaving && state.isMatched && state.originalData) {
      const updateUser = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${state.inputData.user_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: state.inputData.user_id,
              name: state.inputData.name,
              last_name: state.inputData.last_name,
              email: state.inputData.email,
              phone: state.inputData.phone,
              address: state.inputData.address,
            }),
          });

          if (response.ok) {
            const updatedUser = await response.json();
            dispatch({ type: "RELOAD_DATA", payload: updatedUser });
            setCurrentUser(updatedUser);
            toast({
              title: "Datos actualizados",
              description: "La información se ha guardado correctamente",
              variant: "default",
            });
            handleError(false);
          } else {
            throw new Error('Failed to update user');
          }
        } catch (error) {
          toast({
            title: "Error al actualizar",
            description: "No se pudieron guardar los cambios. Por favor, intente nuevamente.",
            variant: "destructive",
          });
          console.error("Error updating user:", error);
          dispatch({ type: "RELOAD_DATA", payload: state.originalData || defaultFormValues });
          handleError(true);
        } finally {
          setIsSaving(false);
        }
      };

      if (state.inputData.id) {
        updateUser();
      }
    }
  }, [isSaving, state.isMatched, state.originalData]);

  return (
    <FormWrapper
      title="Información del Cliente"
      description="Ingrese su ID de usuario y su información se cargará automáticamente"
    >
      <div className="flex flex-col gap-3 h-[580px] max-h-[45vh] overflow-y-auto relative bg-slate-100/50 text-slate-800 p-4 rounded-lg">
        {/* Client ID Input */}
        <div className="flex flex-col gap-2 w-full md:w-[60%]">
          <label htmlFor="clientId" className="text-sm font-medium">ID de usuario</label>
          <Input
            autoFocus
            type="text"
            name="clientId"
            id="clientId"
            placeholder="Ingrese su ID de usuario"
            value={idInput}
            onInput={handleIDChange}
            disabled={state.isMatched}
            className={`border border-slate-300 shadow-sm ${
              state.isMatched ? "bg-slate-200" : "bg-white"
            }`}
          />
          {state.zodErrors.user_id && (
            <p className="text-red-500 text-xs mt-1">{state.zodErrors.user_id}</p>
          )}
          {!state.zodErrors.user_id && !state.isMatched && debouncedID.length > 1 && (
            <p className="text-red-500 text-xs mt-1">Su número de cliente no existe</p>
          )}
          {!state.isMatched && isLoading && idInput.length > 1 && (
            <p className="text-xs text-slate-600">Cargando...</p>
          )}
        </div>

        {/* Dynamically Rendered Form Fields */}
        {state.isMatched && (
          <>
            <Separator className="my-2" />
            <UserCard
              userData={state.inputData}
              isEdited={state.isEdited}
              handleData={handleData}
              dispatch={dispatch as React.Dispatch<Action>}
              handleSave={handleSave}
            />
            
            {state.isEdited && (
              <p className="text-xs text-red-500 mt-1">
                Debe guardar los cambios antes de continuar
              </p>
            )}
          </>
        )}
      </div>
    </FormWrapper>
  );
}
